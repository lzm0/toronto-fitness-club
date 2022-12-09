import rest_framework
import rest_framework_simplejwt
from django.utils import timezone
from rest_framework import viewsets, permissions, mixins
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from studios.models import Studio, FitnessClass, ClassSchedule
from studios.serializers import StudioSerializer, StudioDetailSerializer, \
    ClassScheduleSerializer, \
    FitnessClassSerializer

from math import cos, sqrt, asin, pi


def distance(lat1, lon1, lat2, lon2):
    # a helper that could calculate the distance between two point inputted
    p = pi / 180
    a = 0.5 - cos((lat2 - lat1) * p) / 2 + cos(lat1 * p) * cos(lat2 * p) * (
            1 - cos((lon2 - lon1) * p)) / 2
    return 12742 * asin(sqrt(a))


class StudioViewSet(
    viewsets.GenericViewSet,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
):
    """
    A Studio View Set that could handle GET request. list and filtering based on
    the information provided
    """
    authentication_classes = [
        rest_framework_simplejwt.authentication.JWTAuthentication,
        rest_framework.authentication.SessionAuthentication,
    ]
    serializer_class = StudioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        A function that could list and filter the information of the studios by
        the information given in the payload.
        Example:
            GET:
            http://127.0.0.1:8000/api/studios/?name=UofT
            the corresponding studios with that name will return. Same for
            amenities, class_names, coaches, longitude& latitude.
        """
        studio_name = self.request.query_params.get('name')
        amenities = self.request.query_params.get('amenities')
        class_names = self.request.query_params.get('classes')
        coaches = self.request.query_params.get('coaches')
        latitude = self.request.query_params.get('lat')
        longitude = self.request.query_params.get('lon')

        queryset = Studio.objects.all()

        if studio_name:
            queryset = queryset.filter(name__icontains=studio_name)

        if amenities:
            amenities = amenities.split(',')
            for amenity in amenities:
                queryset = queryset.filter(amenities__type__icontains=amenity)

        if class_names:
            class_names = class_names.split(',')
            for class_name in class_names:
                queryset = queryset.filter(
                    fitness_classes__name__icontains=class_name)

        if coaches:
            coaches = coaches.split(',')
            for coach in coaches:
                queryset = queryset.filter(
                    fitness_classes__coach__icontains=coach)

        queryset = queryset.distinct()

        if longitude and latitude:
            latitude = float(latitude)
            longitude = float(longitude)
            queryset = sorted(queryset,
                              key=lambda studio: distance(studio.latitude,
                                                          studio.longitude,
                                                          latitude, longitude))
        return queryset

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = StudioDetailSerializer(instance)
        return Response(serializer.data)


class FitnessClassListView(APIView, PageNumberPagination):
    """A View that could handle the GET request that display all the classes in
    that studio
    Example:
        GET request
        http://127.0.0.1:8000/api/studios/1/classes/
        will display the information of the classes belongs to studio of
        studio_id == 1
    """
    authentication_classes = [
        rest_framework_simplejwt.authentication.JWTAuthentication,
        rest_framework.authentication.SessionAuthentication,
    ]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, studio_id):
        studio = get_object_or_404(Studio, id=studio_id)
        queryset = FitnessClass.objects.filter(studio=studio)
        page = self.paginate_queryset(queryset, request)
        serializer = FitnessClassSerializer(page, many=True,
                                            context={'request': request})
        return self.get_paginated_response(serializer.data)


class FitnessClassDetailView(APIView):
    """
    A View that could handle the GET request that display
     the studio that according to the input studio_id. And PATCH request that
     can enroll/drop current user to the given class
    Example:
        GET request
        http://127.0.0.1:8000/api/studios/1/classes/1/
        will display the information of the classes belongs to studio of
        studio_id == 1 and class_id == 1

        PATCH request
        http://127.0.0.1:8000/api/studios/1/classes/1/
        payload: {"enrolled": false}
        will remove current user from class with id 1 inside studio with id 1
    """
    authentication_classes = [
        rest_framework_simplejwt.authentication.JWTAuthentication,
        rest_framework.authentication.SessionAuthentication,
    ]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, studio_id, class_id):
        _ = get_object_or_404(Studio, id=studio_id)
        fitness_class = get_object_or_404(FitnessClass, id=class_id)
        serializer = FitnessClassSerializer(fitness_class,
                                            context={'request': request})
        return Response(serializer.data)

    def patch(self, request, studio_id, class_id):
        studio = get_object_or_404(Studio, id=studio_id)
        classes = FitnessClass.objects.filter(studio=studio)
        fitness_class = get_object_or_404(classes, id=class_id)
        enrolled = request.data.get('enrolled')
        if enrolled:
            if enrolled == 'true':
                fitness_class.users.add(request.user)
            elif enrolled == 'false':
                fitness_class.users.remove(request.user)
            else:
                return Response({'error': 'Invalid value for enrolled'})
            fitness_class.save()
        serializer = FitnessClassSerializer(fitness_class,
                                            context={'request': request})
        return Response(serializer.data)


class ClassScheduleListView(APIView, PageNumberPagination):
    """
    A View that could handle the GET request that display the schedule that
    according to payload.
    Example: GET request
    http://127.0.0.1:8000/api/studios/1/schedules/?name=Yoga&coach=Zimo Li&start_time=2022-11-17T00:00:00Z&end_time=2022-11-30T00:00:00Z

    will display the schedule according to payload that under studio with
    studio_id == 1
    """
    authentication_classes = [
        rest_framework_simplejwt.authentication.JWTAuthentication,
        rest_framework.authentication.SessionAuthentication,
    ]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, studio_id):
        studio = get_object_or_404(Studio, id=studio_id)
        classes = FitnessClass.objects.filter(studio=studio)
        queryset = ClassSchedule.objects.filter(fitness_class__in=classes)
        queryset = queryset.filter(start_time__gte=timezone.now())

        class_name = self.request.query_params.get('name')
        coach = self.request.query_params.get('coach')
        start_time = self.request.query_params.get('start_time')
        end_time = self.request.query_params.get('end_time')

        if class_name:
            queryset = queryset.filter(
                fitness_class__name__icontains=class_name)

        if coach:
            queryset = queryset.filter(fitness_class__coach__icontains=coach)

        if start_time:
            queryset = queryset.filter(start_time__gte=start_time)

        if end_time:
            queryset = queryset.filter(end_time__lte=end_time)

        queryset = queryset.distinct()
        page = self.paginate_queryset(queryset, request)
        serializer = ClassScheduleSerializer(page, many=True,
                                             context={'request': request})
        return self.get_paginated_response(serializer.data)


class ClassScheduleDetailView(APIView):
    """
    A Detail View that could handle the GET request that display the detail info
    of the schedule that according to certain studio id and schedule id.
    PATCH request may enroll/drop current user enrollment of the certain
    schedule based on the schedule id and studio id
    Example:
        GET request
        http://127.0.0.1:8000/api/studios/1/schedules/1/
        will display schedule with id 1 that has studio with studio_id == 1

        PATCH
        GET request
        http://127.0.0.1:8000/api/studios/1/schedules/1/
        payload: {"enrolled": true}
        will enroll schedule with id 1 that has studio with studio_id == 1
    """
    authentication_classes = [
        rest_framework_simplejwt.authentication.JWTAuthentication,
        rest_framework.authentication.SessionAuthentication,
    ]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, studio_id, schedule_id):
        _ = get_object_or_404(Studio, id=studio_id)
        schedule = get_object_or_404(ClassSchedule, id=schedule_id)
        serializer = ClassScheduleSerializer(schedule,
                                             context={'request': request})
        return Response(serializer.data)

    def patch(self, request, studio_id, schedule_id):
        studio = get_object_or_404(Studio, id=studio_id)
        schedules = ClassSchedule.objects.filter(fitness_class__studio=studio)
        schedule = get_object_or_404(schedules, id=schedule_id)
        enrolled = request.data.get('enrolled')
        if enrolled:
            if enrolled == 'true':
                if schedule.users.count() < schedule.fitness_class.capacity:
                    schedule.users.add(request.user)
                else:
                    return Response({'error': 'Class is full'})
            elif enrolled == 'false':
                schedule.users.remove(request.user)
            else:
                return Response({'error': 'Invalid value for enrolled'})
            schedule.save()
        serializer = ClassScheduleSerializer(schedule,
                                             context={'request': request})
        return Response(serializer.data)


class UserScheduleListView(APIView, PageNumberPagination):
    """
    A View that could handle the GET request that display all the schedule from
    the current logged-in user.
    Example:
        GET request
        http://127.0.0.1:8000/api/profile/schedules/
        will display all the schedule of the current user logged in
    """
    authentication_classes = [
        rest_framework_simplejwt.authentication.JWTAuthentication,
        rest_framework.authentication.SessionAuthentication,
    ]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        schedules = request.user.class_schedules.all()
        classes = request.user.fitness_classes.all()
        # rationale: if a user is enrolled in a class, they are also enrolled in all of its upcoming schedules.
        # However, since we did not choose to store the enrollment time for a class, we cannot determine
        # which instances of a class the user has enrolled in. Therefore, we will show only upcoming schedules.
        schedules = schedules | ClassSchedule.objects.filter(
            fitness_class__in=classes, start_time__gte=timezone.now())
        schedules = schedules.order_by('start_time')
        page = self.paginate_queryset(schedules, request)
        serializer = ClassScheduleSerializer(page, many=True,
                                             context={'request': request})
        return self.get_paginated_response(serializer.data)

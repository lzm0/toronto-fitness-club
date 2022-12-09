import rest_framework
import rest_framework_simplejwt
from django.utils import timezone
from rest_framework import permissions
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.serializers import UserSerializer, UserPlanSerializer, CardSerializer
from subscriptions.models import Plan, Invoice
from subscriptions.serializers import PlanSerializer, InvoiceSerializer


class UserView(APIView):
    """A View that could handle GET, POST, PATCH method from user and check if
    they have permission to access, which enable user login, editing and check
    their information.
    """
    authentication_classes = [
        rest_framework_simplejwt.authentication.JWTAuthentication,
        rest_framework.authentication.SessionAuthentication,
    ]

    def get_permissions(self):
        """
            Overwriting get_permissions method from Django default to enable
            any accessible permission to POST method, while another
            request.method other than POST will need to authenticated in order
            to access

        """
        if self.request.method == 'POST':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get(self, request):
        """
            Overwriting Get method from Django default to return user
            information when user uses GET method
        """
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def post(self, request):
        """
            Overwriting POST method from Django default to return user
            information when user uses POST method and it updates data into
            serializer
        """
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def patch(self, request):
        """
            Overwriting patch method from Django default to return user
            information when user uses PATCH method and allows user to update
            either full or partial information on Model User.
        """
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class UserPlanView(APIView):
    """A View that could handle GET, PUT, DELETE method from user to either
    display, edit or remove plan from User.
    """
    authentication_classes = [
        rest_framework_simplejwt.authentication.JWTAuthentication,
        rest_framework.authentication.SessionAuthentication,
    ]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
            Overwriting get method from Django default to check if user has
            any  plan relating to fitness club. Return 404 if User does not
            have any plan in database otherwise return detail of plan in
            Json response.
        """
        if not request.user.plan:
            return Response({'error': 'User does not have a plan'}, status=404)
        serializer = UserPlanSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        """
            Overwriting put method from Django default to check if user added
            new plan id that they want to start in content field
            Return status 400 if either (1) user did not put para 'plan'
            into field. (2) such plan already exists.
            Otherwise create new plan with relevant invoice and card User userd
            to pay into User database.
        """
        plan_id = request.data.get('plan')
        if plan_id:
            plan = get_object_or_404(Plan, id=plan_id)
            if request.user.plan == plan:
                return Response({'error': 'User already has this plan'}, status=400)
            request.user.plan = plan
            request.user.plan_start_date = timezone.now().date()
            request.user.save()
            invoice = Invoice.objects.create(
                user=request.user,
                plan=plan,
                date=timezone.now().date(),
                amount=plan.price,
                paid=False
            )
            if request.user.card:
                invoice.card = request.user.card
                invoice.paid = True
            invoice.save()
            request.user.invoices.add(invoice)
        else:
            return Response({'error': 'Plan ID is required'}, status=400)
        serializer = UserPlanSerializer(request.user)
        return Response(serializer.data, status=201)

    def delete(self, request):
        """
            Overwriting delete method from Django default to remove the plan
            that user already has. Return 204 if plan is successfully removed.
        """
        request.user.plan = None
        request.user.plan_start_date = None
        request.user.save()
        return Response({'message': 'Plan removed'}, status=204)


class UserCardView(APIView):
    authentication_classes = [
        rest_framework_simplejwt.authentication.JWTAuthentication,
        rest_framework.authentication.SessionAuthentication,
    ]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
            Overwriting get method from Django default to check if user has
            card or not. Return 404 if user does not have such card.
            Otherwise Return the http Response with all information for cards/
        """
        if not request.user.card:
            return Response({'error': 'User does not have a card'}, status=404)
        serializer = CardSerializer(request.user.card)
        return Response(serializer.data)

    def put(self, request):
        """
            Overwriting put method from Django default to update user's card
            and remove original card. Return 201 if success/
        """
        serializer = CardSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        old_card = request.user.card
        request.user.card = serializer.instance
        request.user.save()
        return Response(serializer.data, status=201)

    def delete(self, request):
        """
            Overwriting delete method from Django default to Remove user's card.
            Return 404 if the card is not found and Return 204 if success
        """
        if not request.user.card:
            return Response({'error': 'User does not have a card'}, status=404)
        card = request.user.card
        request.user.card = None
        request.user.save()
        card.delete()
        return Response({'message': 'Card removed'}, status=204)


class UserPaymentListView(APIView, PageNumberPagination):
    """A View that could handle GET method from user and display all the
    invoice they have
    """
    authentication_classes = [
        rest_framework_simplejwt.authentication.JWTAuthentication,
        rest_framework.authentication.SessionAuthentication,
    ]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
            Overwriting get method from Django default to display all the
            invoices that user has
        """
        page = self.paginate_queryset(request.user.invoices.all(), request)
        serializer = InvoiceSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

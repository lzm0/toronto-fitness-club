from rest_framework import serializers

from PB import settings
from studios.models import Studio, Amenity, ClassSchedule, FitnessClass


class StudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studio
        fields = ('id', 'name', 'address', 'latitude', 'longitude', 'postal_code', 'phone_number')


class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ('type', 'quantity')


class StudioDetailSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    amenities = AmenitySerializer(many=True, read_only=True)

    class Meta:
        model = Studio
        fields = (
            'id', 'name', 'address', 'latitude', 'longitude', 'postal_code', 'phone_number', 'images', 'amenities')

    def get_images(self, obj):
        return [settings.MEDIA_URL + image.image.name for image in obj.images.all()]


class FitnessClassSerializer(serializers.ModelSerializer):
    enrolled = serializers.SerializerMethodField()

    class Meta:
        model = FitnessClass
        fields = ('id', 'name', 'description', 'coach', 'keywords', 'capacity', 'enrolled')

    def get_enrolled(self, obj):
        user = self.context['request'].user
        return user in obj.users.all()


class ClassScheduleSerializer(serializers.ModelSerializer):
    enrolled = serializers.SerializerMethodField()
    fitness_class = FitnessClassSerializer(read_only=True)

    class Meta:
        model = ClassSchedule
        fields = ('id', 'fitness_class', 'start_time', 'end_time', 'enrolled')

    def get_enrolled(self, obj):
        user = self.context['request'].user
        return user in obj.users.all() or user in obj.fitness_class.users.all()


class UserClassScheduleSerializer(serializers.ModelSerializer):
    fitness_class = FitnessClassSerializer(read_only=True)
    studio = serializers.SerializerMethodField()

    class Meta:
        model = ClassSchedule
        fields = ('id', 'fitness_class', 'studio', 'start_time', 'end_time')

    def get_studio(self, obj):
        return StudioSerializer(obj.fitness_class.studio).data

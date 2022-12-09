from django.contrib.auth import get_user_model
from rest_framework import serializers

from accounts.models import Card


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'email', 'password', 'first_name', 'last_name', 'phone_number', 'avatar')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop('password')
        return representation

    def create(self, validated_data):
        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.save()
        return instance


class UserPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('plan', 'plan_start_date')


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('card_number', 'expiry_date', 'cvv')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['card_number'] = '*' * 12 + instance.card_number[-4:]
        representation.pop('cvv')
        return representation

    def create(self, validated_data):
        return Card.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.expiry_date = validated_data.get('expiry_date', instance.expiry_date)
        instance.save()
        return instance

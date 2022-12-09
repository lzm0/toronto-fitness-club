from django.contrib.auth.models import AbstractUser
from django.db import models

from studios.models import FitnessClass, ClassSchedule
from subscriptions.models import Plan


class Card(models.Model):
    card_number = models.CharField(max_length=16)
    expiry_date = models.CharField(max_length=4)
    cvv = models.CharField(max_length=3)

    def __str__(self):
        return self.card_number


class User(AbstractUser):
    avatar = models.ImageField(upload_to='avatars', blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    fitness_classes = models.ManyToManyField(to='studios.FitnessClass', related_name='users', blank=True)
    class_schedules = models.ManyToManyField(to='studios.ClassSchedule', related_name='users', blank=True)
    plan = models.ForeignKey(to='subscriptions.Plan', on_delete=models.PROTECT, related_name='users', blank=True,
                             null=True)
    plan_start_date = models.DateField(blank=True, null=True)
    card = models.ForeignKey(to='accounts.Card', on_delete=models.PROTECT, related_name='users', blank=True,
                             null=True)

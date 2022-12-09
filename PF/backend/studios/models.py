from django.db import models


class Studio(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    latitude = models.FloatField()
    longitude = models.FloatField()
    postal_code = models.CharField(max_length=10)
    phone_number = models.CharField(max_length=20)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['id']


class Image(models.Model):
    studio = models.ForeignKey(to='studios.Studio', on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='studio_images')


class Amenity(models.Model):
    studio = models.ForeignKey(to='studios.Studio', on_delete=models.CASCADE, related_name='amenities')
    type = models.CharField(max_length=50)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return self.type

    class Meta:
        verbose_name_plural = 'amenities'


class FitnessClass(models.Model):
    studio = models.ForeignKey(to='studios.Studio', on_delete=models.CASCADE, related_name='fitness_classes')
    name = models.CharField(max_length=50)
    description = models.TextField()
    coach = models.CharField(max_length=50)
    keywords = models.CharField(max_length=50)
    capacity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.studio.name} {self.name}"

    class Meta:
        verbose_name_plural = 'fitness classes'


class ClassSchedule(models.Model):
    fitness_class = models.ForeignKey(to='studios.FitnessClass', on_delete=models.CASCADE,
                                      related_name='class_schedules')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def __str__(self):
        return f'{self.fitness_class.name} - {self.start_time}'

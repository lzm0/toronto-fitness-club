from django.contrib import admin

from studios.models import Studio, Amenity, FitnessClass, ClassSchedule, Image


class ImageInline(admin.TabularInline):
    model = Image


class AmenityInline(admin.TabularInline):
    model = Amenity


class FitnessClassInline(admin.StackedInline):
    model = FitnessClass


class ClassScheduleInline(admin.TabularInline):
    model = ClassSchedule


class StudioAdmin(admin.ModelAdmin):
    inlines = [ImageInline, AmenityInline, FitnessClassInline]


class FitnessClassAdmin(admin.ModelAdmin):
    inlines = [ClassScheduleInline]


admin.site.register(Studio, StudioAdmin)
admin.site.register(FitnessClass, FitnessClassAdmin)

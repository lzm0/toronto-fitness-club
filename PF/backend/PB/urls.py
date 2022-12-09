"""PB URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from accounts.views import UserView, UserPlanView, UserCardView, UserPaymentListView
from studios.views import StudioViewSet, FitnessClassDetailView, ClassScheduleListView, \
    FitnessClassListView, ClassScheduleDetailView, UserScheduleListView
from subscriptions.views import PlanViewSet

router = DefaultRouter()
router.register('studios', StudioViewSet, basename='studios')
router.register('subscriptions/plans', PlanViewSet, basename='subscription-plans')

urlpatterns = \
    [
        path('admin/', admin.site.urls),
        path("api/profile/", UserView.as_view(), name="profile"),
        path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
        path('api/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
        path("api/", include(router.urls)),
        path("api/studios/<int:studio_id>/classes/", FitnessClassListView.as_view(), name="class_list"),
        path("api/studios/<int:studio_id>/classes/<int:class_id>/", FitnessClassDetailView.as_view(),
             name="class"),
        path("api/studios/<int:studio_id>/schedules/", ClassScheduleListView.as_view(), name="schedule_list"),
        path("api/studios/<int:studio_id>/schedules/<int:schedule_id>/", ClassScheduleDetailView.as_view(),
             name="schedule"),
        path('api/profile/schedules/', UserScheduleListView.as_view(), name='user_schedule_list'),
        path('api/profile/plan/', UserPlanView.as_view(), name='user-plan'),
        path('api/profile/card/', UserCardView.as_view(), name='user-card'),
        path('api/profile/payments/', UserPaymentListView.as_view(), name='user-payments'),
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

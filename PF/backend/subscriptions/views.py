import rest_framework
import rest_framework_simplejwt
from rest_framework import permissions, viewsets, mixins

from subscriptions.models import Plan
from subscriptions.serializers import PlanSerializer


class PlanViewSet(
    viewsets.GenericViewSet,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
):
    authentication_classes = [
        rest_framework_simplejwt.authentication.JWTAuthentication,
        rest_framework.authentication.SessionAuthentication,
    ]
    serializer_class = PlanSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Plan.objects.all()

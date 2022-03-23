from rest_framework import permissions
from django.http import HttpRequest
from users.models import RestifyUser
# from rest_framework.exceptions import PermissionDenied

# Sourced from: https://www.django-rest-framework.org/tutorial/4-authentication-and-permissions/#object-level-permissions
class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    # def has_object_permission(self, request, view, obj):
    #     # Read permissions are allowed to any request,
    #     # so we'll always allow GET, HEAD or OPTIONS requests.
    #     if request.method in permissions.SAFE_METHODS:
    #         return True

    #     print("xxxxxx", obj)

    #     # Write permissions are only allowed to the owner of the snippet.
    #     return obj.restaurant.user == request.user

    message = "This user has no restaurant"

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
    
        try:
            request.user.restaurant
        except RestifyUser.restaurant.RelatedObjectDoesNotExist:
            return False

        return True


class IsAuthenticatedOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request: HttpRequest, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return request.user.is_authenticated

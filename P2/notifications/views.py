from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required

from .models import Comment, Like, Follow

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def notifications(req: HttpRequest) -> HttpResponse:
    # Todo, replace this with token auth somehow
    user = req.user

    comments = iter(Comment.objects.filter(owner=user))
    likes = iter(Like.objects.filter(owner=user))
    follows = iter(Follow.objects.filter(owner=user))

    # Sort by datetime descending
    all_ = sorted(
        (*comments, *likes, *follows), key=lambda obj: obj.timestamp, reverse=True
    )

    # Check for limit
    if "limit" in req.GET:
        limit = int(req.GET["limit"])
        if limit >= 0:
            all_ = all_[:limit]

    response = []

    # Serialize
    for obj in all_:
        if isinstance(obj, Comment):
            data = {"type": "comment", "user": obj.user, "content": obj.content}
        elif isinstance(obj, Like):
            data = {"type": "like", "user": obj.user, "likes": obj.likes, "kind": obj.kind}
        elif isinstance(obj, Follow):
            data = {
                "type": "follow",
                "user": obj.user,
            }
        data["timestamp"] = obj.timestamp
        response.append(data)

    # return JsonResponse(response, safe=False)

    # Pretty print, for testing
    return JsonResponse(response, safe=False, json_dumps_params={"indent": 2})

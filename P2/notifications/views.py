from django.http import HttpRequest, HttpResponse

from rest_framework.response import Response

from .models import Comment, Like, Follow

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(["GET"])
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

    if "page_size" in req.GET:
        page_size = int(req.GET["page_size"])
    else:
        page_size = 10

    if "cursor" in req.GET:
        cursor = int(req.GET["cursor"])
    else:
        cursor = 0

    all_ = all_[cursor : cursor + page_size]

    response = []

    # Serialize
    for obj in all_:
        if isinstance(obj, Comment):
            data = {
                "type": "comment",
                "comment": {
                    "id": obj.comment.id,
                    "content": obj.comment.content,
                    "date": obj.comment.date,
                },
            }
        elif isinstance(obj, Like):
            data = {"type": "like", "kind": obj.kind}
        elif isinstance(obj, Follow):
            data = {
                "type": "follow",
            }
        data["timestamp"] = obj.timestamp
        user = obj.user
        data["user"] = {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
        }
        response.append(data)

    return Response(response)

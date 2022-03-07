from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required

# from django.contrib.auth import authenticate
from .models import Comment, Like, Post

from rest_framework.response import Response


@login_required
def notifications(req: HttpRequest) -> HttpResponse:
    # Todo, replace this with token auth somehow
    user = req.user

    # Todo: testing only
    # user = authenticate(req, username="george", password="x")

    comments = iter(Comment.objects.filter(owner=user))
    likes = iter(Like.objects.filter(owner=user))
    posts = iter(Post.objects.filter(owner=user))

    all_ = sorted([*comments, *likes, *posts], key=lambda x: x.timestamp, reverse=True)

    response = []

    for obj in all_:
        if isinstance(obj, Comment):
            data = {"type": "comment", "user": obj.user, "content": obj.content}
        elif isinstance(obj, Like):
            data = {"type": "like", "user": obj.user, "likes": obj.likes}
        elif isinstance(obj, Post):
            data = {
                "type": "post",
                "restaurant": obj.restaurant,
                "content": obj.content,
            }
        data["timestamp"] = obj.timestamp
        response.append(data)

    return JsonResponse(response, safe=False)

    # Pretty print, for testing
    return JsonResponse(response, safe=False, json_dumps_params={"indent": 2})

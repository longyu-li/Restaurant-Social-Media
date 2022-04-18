from typing import List
from rest_framework.decorators import api_view
from rest_framework.response import Response

from restaurants.models import Tag

@api_view(["GET"])
def get_tags(request, restaurant_id):
    tags_objs: List[Tag] = Tag.objects.filter(restaurant=restaurant_id)
    tags = [t.tag for t in tags_objs]
    return Response(tags)

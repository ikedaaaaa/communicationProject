from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from othello.serializers import UserSerializer, GroupSerializer
from django.http import HttpResponse, JsonResponse
import json


def index(request):
    return render(request, 'othello/index.html', context=None)


def posts(request):
    value1 = int(request.POST.get('key1')) + 1
    value2 = int(request.POST.get('key2')) + 2
    ret = {
        'key1': value1,
        'key2': value2
    }
    print(ret)

    return JsonResponse(ret)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

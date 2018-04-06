from django.contrib import auth
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse_lazy
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import (
    CreateView,
    DetailView,
    DeleteView,
    ListView,
    UpdateView
)


class HomeView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'home.html', {})


class IndexView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'index.html', {})


class AboutView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'about.html', {})


class AdminEditView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'admin_edit.html', {})

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

from examples.models import (
    Template,
    TemplateState,
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
        tmp_total_num = TemplateState.objects.all().count()
        tmp_done_num = Template.objects.filter(done=True).count()
        context = {
            'tmp_saved': TemplateState.objects.filter(saved=True).count(),
            'tmp_checked': TemplateState.objects.filter(checked=True).count(),
            'tmp_total_num': tmp_total_num,
            'tmp_done_num': tmp_done_num,
            'tmp_in_progress_num': tmp_total_num - tmp_done_num,

        }
        return render(request, 'admin_edit.html', context)

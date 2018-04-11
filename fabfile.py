from fabric.api import *

env.hosts = ['45.32.9.85']
env.user = 'root'

### Django shortcuts ###

@task
def shell():
    local('python manage.py shell')

@task
def runserver():
    local('python manage.py runserver')

@task
def migrate():
    local('python manage.py makemigrations')
    local('python manage.py migrate')

@task
def clean_db():
    local('python tools.py cleanmigrations')
    execute(migrate)

@task
def test():
    local('python manage.py test')

@task
def clean_db_and_test():
    execute(clean_db)
    execute(test)

### Github shortcut ###

@task
def lazy_commit():
    with settings(warn_only=True):
        local('git add .')
        local('git commit -m "commiting lazily: minor change only"')
    local('git push')

### Management shorcuts ###

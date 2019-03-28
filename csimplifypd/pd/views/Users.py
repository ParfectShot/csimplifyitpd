from django.shortcuts import render, redirect
import datetime
import json
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from itertools import chain
from pd.models.UserCreationForm import User_Master
from pd.models.Roles import Roles
from pd.models.CodeLookup import Code_lookup
from pd.models.UserRoleLink import User_role_link


def user_view(request):
    if request.method == "POST":
        data = json.load(request)
        print(data['id'])
        if data['id']:
            user = User_Master.objects.get(id=int(data['id']))
            user.username = data['txtfirstName'] + " " + data['txtlastName']
            user.contact_no = data['txtcontactNo']
            user.email = data['txtemailId']
            user.department = data['txtdeptvalue']
            user.status = data['txtstatusvalue']
            user.industry_segment = data['txtSchIndustrySegment']
            user.updated_at = datetime.datetime.now()
            user.updated_by = request.user.id

            user.save()
        else:
            user = User_Master(
                username=data['txtfirstName'] + " " + data['txtlastName'],
                password='test123',
                contact_no=data['txtcontactNo'],
                email=data['txtemailId'],
                department=data['txtdeptvalue'],
                status=data['txtstatusvalue'],
                industry_segment=data['txtSchIndustrySegment'],
                created_at=datetime.datetime.now(),
                created_by=request.user.id,
                updated_at=datetime.datetime.now(),
                updated_by=request.user.id)
            user.save()

        link_user = User_Master.objects.get(id=user.id)
        # print(link_user)
        role = list(data['selected_roles'])
        for i in range(len(role)):
            usr_role_link_obj = User_role_link(
                user_id=link_user.id, role_id=role[i])
            usr_role_link_obj.save()

        users = User_Master.objects.all()
        dpt_codes = Code_lookup.objects.filter(lookup_code='User Department')
        status_codes = Code_lookup.objects.filter(lookup_code="User Status")
        usr_role = User_role_link.objects.all()
        user_count = User_Master.objects.all().count()
        active_count = User_Master.objects.filter(status=0).count()
        inactive_count = User_Master.objects.filter(status=1).count()
        roles = Roles.objects.all()
        # print(roles)

        # actual_status = []
        # # actual_depts = []
        # actual_roles = []

        # for usr in users:
        #     actual_status.append(Code_lookup.objects.get(key_1=usr.status))
        #     actual_depts.append(Code_lookup.objects.get(key_1=usr.department))
        #     for user_role in
        #     actual_roles.append(Code_lookup.objects.get(key_1=usr.role))

        return render(
            request, 'pd/Users.html', {
                'users': users,
                'roles': roles,
                'dpt_codes': dpt_codes,
                'status_codes': status_codes,
                'active': active_count,
                'inactive': inactive_count,
                'total': user_count,
                'usr_role': usr_role,
            })

    dpt_codes = Code_lookup.objects.filter(lookup_code='User Department')
    status_codes = Code_lookup.objects.filter(lookup_code="User Status")

    user_count = User_Master.objects.all().count()
    active_count = User_Master.objects.filter(status=0).count()
    inactive_count = User_Master.objects.filter(status=1).count()

    usr_role = User_role_link.objects.all()

    users = User_Master.objects.all()
    # print(users)
    roles = Roles.objects.all()
    # print(roles)

    return render(
        request, 'pd/Users.html', {
            'users': users,
            'roles': roles,
            'dpt_codes': dpt_codes,
            'status_codes': status_codes,
            'active': active_count,
            'inactive': inactive_count,
            'total': user_count,
            'usr_role': usr_role,
        })


def delete(request, id):
    User_Master.objects.get(id=id).delete()

    dpt_codes = Code_lookup.objects.filter(lookup_code='User Department')
    status_codes = Code_lookup.objects.filter(lookup_code="User Status")

    users = User_Master.objects.all()
    # print(users)
    roles = Roles.objects.all()
    usr_role = User_role_link.objects.all()
    user_count = User_Master.objects.all().count()
    active_count = User_Master.objects.filter(status=0).count()
    inactive_count = User_Master.objects.filter(status=1).count()

    return render(
        request, 'pd/Users.html', {
            'users': users,
            'roles': roles,
            'dpt_codes': dpt_codes,
            'status_codes': status_codes,
            'active': active_count,
            'inactive': inactive_count,
            'total': user_count,
            'usr_role': usr_role,
        })


def update(request):
    print('view ran !')
    if request.is_ajax():
        print('ajax call')
        sdata = request.GET['id']
        # print(sdata)
        user = User_Master.objects.filter(id=sdata)

        usr_role_qs = User_Master.objects.get(id=sdata)
        usr_role = User_role_link.objects.filter(user_id=usr_role_qs.id)
        # print(usr_role)
        # usr_roles = User_role_link.objects.filter(user_id=user.id)
        usr_jsn = json.loads(serializers.serialize('json', user))
        usr_jsn[0]['fields']['roles'] = json.loads(
            serializers.serialize('json', usr_role))

        # print(usr_jsn)

        return HttpResponse(json.dumps(usr_jsn))
    return redirect('users')



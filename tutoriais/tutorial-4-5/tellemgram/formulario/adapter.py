from allauth.account.adapter import DefaultAccountAdapter

class CustomAccountAdapter(DefaultAccountAdapter):
    def save_user(self, request, user, form, commit=False):
        user = super().save_user(request, user, form, commit)
        data = form.cleaned_data
        user.username = data.get('username')
        user.name = data.get('name')
        user.surname = data.get('surname')
        user.email = data.get('email')
        user.save()
        return user
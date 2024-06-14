from django.utils.deprecation import MiddlewareMixin

class DisableCSRFMiddleware(MiddlewareMixin):
    def __init__(self, get_response):
        self.get_response = get_response

    def process_view(self, request, callback, callback_args, callback_kwargs):
        if request.path == '/users/accounts/password_reset/form/':
            setattr(request, '_dont_enforce_csrf_checks', True)
        return None
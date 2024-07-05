from djoser import email



class PasswordResetEmail(email.PasswordResetEmail):
    template_name = "email/reset_pass.html"

    def get_context_data(self):
        context = super().get_context_data()
        context['protocol'] = 'http'
        context['domain'] = 'localhost:5173'  # Ваш фронтенд домен и порт
        return context
    
class ActivationEmail(email.ActivationEmail):
    template_name = "email/activation.html"

    def get_context_data(self):
        context = super().get_context_data()
        context['protocol'] = 'http'
        context['domain'] = 'localhost:5173'
        return context


    
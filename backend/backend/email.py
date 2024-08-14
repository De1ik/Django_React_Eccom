from djoser import email
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags



# class PasswordResetEmail(email.PasswordResetEmail):
#     template_name = "email/reset_pass.html"

#     def get_context_data(self):
#         context = super().get_context_data()
#         context['protocol'] = 'http'
#         context['domain'] = 'localhost:5173'  # Ваш фронтенд домен и порт
#         return context
    
# class ActivationEmail(email.ActivationEmail):
#     template_name = "email/activation.html"

#     def get_context_data(self):
#         context = super().get_context_data()
#         context['protocol'] = 'http'
#         context['domain'] = 'localhost:5173'
#         return context


class PasswordResetEmail(email.PasswordResetEmail):
    template_name = "email/reset_pass.html"

    def get_context_data(self):
        context = super().get_context_data()
        context['protocol'] = 'http'
        context['domain'] = 'localhost:5173' 
        self.subject = "Password Reset Request Teddy Shop"
        return context

    def send(self, to, *args, **kwargs):
        if isinstance(to, list):
            to = to[0]
        context = self.get_context_data()
        html_content = render_to_string(self.template_name, context)
        text_content = strip_tags(html_content) 

        msg = EmailMultiAlternatives(
            self.subject,
            text_content,
            self.from_email,
            [to]
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send(fail_silently=False)


class ActivationEmail(email.ActivationEmail):
    template_name = "email/activation.html"

    def get_context_data(self):
        context = super().get_context_data()
        context['protocol'] = 'http'
        context['domain'] = 'localhost:5173'
        self.subject = "Account Activation Teddy Shop"
        return context

    def send(self, to, *args, **kwargs):
        if isinstance(to, list):
            to = to[0] 
        context = self.get_context_data()
        html_content = render_to_string(self.template_name, context)
        text_content = strip_tags(html_content) 

        msg = EmailMultiAlternatives(
            self.subject,
            text_content,
            self.from_email,
            [to]
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send(fail_silently=False)

    
from django.core.exceptions import ValidationError
from django.core.validators import validate_email as django_validate_email
from django.contrib.auth import get_user_model
import re


User = get_user_model()



def validate_field(name):
    pattern = r'^[a-zA-Z0-9]+$'

    # Check if the username matches the pattern
    if not re.match(pattern, name):
        raise ValidationError(
            {'username': ['Username can only contain letters and numbers']})

    if User.objects.filter(username=username).exists():
        raise ValidationError({'username': ['Username is already taken']})


def validate_password(password):
    if len(password) < 6:
        raise ValidationError(
            {'password': ['Password must be at least 6 characters long']})

    # Regular expression pattern to require at least one letter, one number, and one special character
    pattern = r'^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$'

    if not re.match(pattern, password):
        raise ValidationError({'password': [
                              'Password must contain at least one letter, one number, and one special character']})



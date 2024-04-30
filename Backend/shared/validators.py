from django.core.validators import RegexValidator

phone_num_validator = RegexValidator("[0-9]{3}-[0-9]{3}-[0-9]{4}")

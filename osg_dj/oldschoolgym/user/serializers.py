from .models import MyUser
from rest_framework import serializers


class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        exclude = ('user_permissions', 'groups')
        read_only_fields = ('created_at', 'is_superuser',
                            'is_staff', 'last_login', 'groups', 'user_permissions', 'verifying')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = MyUser.objects.create_user(**validated_data)
        return user


class MyUserSerializerToView(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('id', 'first_name', 'last_name', 'email', 'phone')


class ConfirmMailSerializer(serializers.Serializer):
    code = serializers.CharField(min_length=6, max_length=6)

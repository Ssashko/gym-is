# Generated by Django 4.1.7 on 2023-03-06 13:12

from django.db import migrations, models
import django.db.models.deletion
import django_resized.forms
import user.models
import user.utils


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserVerification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(default=user.utils.generate_confirmation_code, max_length=6)),
                ('is_activate', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='MyUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('bday', models.DateField()),
                ('password', models.TextField()),
                ('created_at', models.DateField(auto_now_add=True)),
                ('is_superuser', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('role', models.IntegerField(choices=[(0, 'customer'), (1, 'coach')])),
                ('avatar', django_resized.forms.ResizedImageField(crop=['middle', 'center'], force_format='PNG', keep_meta=False, quality=-1, scale=None, size=[512, 512], upload_to=user.models.avatar_path)),
                ('gender', models.CharField(choices=[('M', 'male'), ('F', 'female')], max_length=1)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
                ('verifying', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='user.userverification')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]

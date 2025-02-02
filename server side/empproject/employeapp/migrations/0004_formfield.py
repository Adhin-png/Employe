# Generated by Django 5.1.3 on 2024-12-05 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employeapp', '0003_employe_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='FormField',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('form_name', models.CharField(max_length=100)),
                ('label', models.CharField(max_length=100)),
                ('input_type', models.CharField(choices=[('text', 'Text'), ('number', 'Number'), ('date', 'Date'), ('password', 'Password')], max_length=20)),
            ],
        ),
    ]

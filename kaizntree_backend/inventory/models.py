from django.db import models
from django.utils.timezone import now



class Item(models.Model):
    sku = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    category = models.ForeignKey("Category", on_delete=models.CASCADE)
    tags = models.ManyToManyField("Tags")
    stock_status =models.IntegerField()
    available_stock = models.IntegerField()
    startdate = models.DateField(default=now)
    enddate = models.DateField(default=now)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=200)


class Tags(models.Model):
    name = models.CharField(max_length=200)



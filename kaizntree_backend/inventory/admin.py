from django.contrib import admin
from inventory.models import Item, Category, Tags
# Register your models here.

class ItemAdmin(admin.ModelAdmin): 
    pass


admin.site.register(Item, ItemAdmin)
admin.site.register(Category, ItemAdmin)
admin.site.register(Tags, ItemAdmin)
    
from django.contrib import admin
from .models import Category, Tag, Product, ProductImage

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'order')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'discount_price', 'stock', 'temperament', 'caffeine_free', 'is_active', 'is_featured')
    list_filter = ('category', 'temperament', 'caffeine_free', 'is_active', 'is_featured')
    search_fields = ('name', 'english_name', 'ingredients', 'benefits')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline]
    fieldsets = (
        ('اطلاعات پایه', {'fields': ('name', 'english_name', 'slug', 'category', 'tags', 'is_active', 'is_featured')}),
        ('قیمت و موجودی', {'fields': ('price', 'discount_price', 'stock', 'weight')}),
        ('توضیحات و خواص گیاهی', {'fields': ('short_description', 'description', 'ingredients', 'benefits', 'usage_method', 'warnings', 'temperament', 'caffeine_free')}),
        ('آمار و امتیازات', {'fields': ('sales_count', 'rating_average', 'review_count')}),
    )

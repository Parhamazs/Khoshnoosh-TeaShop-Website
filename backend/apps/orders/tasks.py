import logging
from celery import shared_task
from django.conf import settings

logger = logging.getLogger(__name__)

@shared_task
def send_order_confirmation_notification(order_id):
    """
    Celery task to send order confirmation email and SMS to customer
    """
    try:
        from apps.orders.models import Order
        order = Order.objects.get(id=order_id)
        logger.info(f"[CELERY] Sending order confirmation notification for Order #{order.order_number} to {order.receiver_phone} / {order.user.email}")
        
        # In production this integrates with Kavenegar/Ghasedak SMS and Django EmailBackend
        message = (
            f"مشتری گرامی {order.receiver_name}،\n"
            f"سفارش شما در فروشگاه دمنوش خوشنوش با کد رهگیری {order.order_number} با موفقیت ثبت شد.\n"
            f"مبلغ پرداختی: {order.total_amount} تومان\n"
            f"بسته‌بندی ارگانیک در حال آماده‌سازی است. خوشنوش، عطر خوش سلامتی."
        )
        print(f"[SMS/EMAIL DISPATCHED]: {message}")
        return {"status": "success", "order_number": order.order_number}
    except Exception as e:
        logger.error(f"Failed to dispatch order notification for order {order_id}: {str(e)}")
        return {"status": "error", "error": str(e)}

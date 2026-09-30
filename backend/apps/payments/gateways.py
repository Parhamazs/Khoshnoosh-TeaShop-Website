import uuid
from django.utils import timezone

class PaymentGatewayInterface:
    def request_payment(self, amount, description, callback_url):
        raise NotImplementedError

    def verify_payment(self, authority, amount):
        raise NotImplementedError

class SandboxGateway(PaymentGatewayInterface):
    """
    Mock sandbox gateway for testing Persian online payment workflows.
    Ready for immediate swap to real Zarinpal, Saman, or AsanPardakht.
    """
    def request_payment(self, amount, description, callback_url):
        authority = f"A000000000{uuid.uuid4().hex[:12].upper()}"
        payment_url = f"/checkout/gateway-simulation?authority={authority}&amount={amount}"
        return {
            "success": True,
            "authority": authority,
            "payment_url": payment_url
        }

    def verify_payment(self, authority, amount):
        ref_id = f"TRX-{uuid.uuid4().hex[:10].upper()}"
        return {
            "success": True,
            "ref_id": ref_id,
            "card_pan": "6037-99**-****-4218",
            "message": "پرداخت با موفقیت انجام شد."
        }

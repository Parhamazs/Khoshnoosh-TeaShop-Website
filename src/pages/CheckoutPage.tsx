import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, CheckCircle2, ArrowRight, AlertCircle, ShoppingBag } from 'lucide-react';
import { CartItem, Address, Order } from '../types';
import { formatToman, toPersianDigits } from '../utils/formatters';

interface CheckoutPageProps {
  cartItems: CartItem[];
  addresses: Address[];
  onOrderCompleted: (order: Order) => void;
  onBackToCart: () => void;
  onNavigateToShop: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartItems,
  addresses,
  onOrderCompleted,
  onBackToCart,
  onNavigateToShop,
}) => {
  const [selectedAddressId, setSelectedAddressId] = useState<number>(
    addresses.find((a) => a.is_default)?.id || addresses[0]?.id || 0
  );
  
  // Custom new address fields
  const [receiverName, setReceiverName] = useState('سارا احمدی');
  const [receiverPhone, setReceiverPhone] = useState('۰۹۳۵۱۲۳۴۵۶۷');
  const [province, setProvince] = useState('تهران');
  const [city, setCity] = useState('تهران');
  const [addressLine, setAddressLine] = useState('خیابان ولیعصر، بالاتر از پارک ساعی، پلاک ۱۲');
  const [postalCode, setPostalCode] = useState('۱۵۱۱۹۳۳۴۱۱');
  const [shippingNote, setShippingNote] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'post' | 'express'>('post');

  // Gateway Simulation State
  const [isGatewayOpen, setIsGatewayOpen] = useState(false);
  const [gatewaySimulatedRefId, setGatewaySimulatedRefId] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const subtotal = cartItems.reduce((sum, i) => sum + i.unit_price * i.quantity, 0);
  const shippingCost = subtotal >= 300000 ? 0 : shippingMethod === 'express' ? 55000 : 35000;
  const totalAmount = subtotal + shippingCost;

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    setIsGatewayOpen(true);
  };

  const handleSimulateSuccess = () => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `KN-${randomSuffix}`;
    const newOrder: Order = {
      id: Date.now(),
      order_number: orderNumber,
      status: 'paid',
      status_display: 'پرداخت شده / آماده‌سازی',
      receiver_name: receiverName,
      receiver_phone: receiverPhone,
      province,
      city,
      address: addressLine,
      postal_code: postalCode,
      shipping_note: shippingNote,
      subtotal,
      shipping_cost: shippingCost,
      discount_amount: 0,
      total_amount: totalAmount,
      items: cartItems.map((item) => ({
        id: item.id,
        product_name: item.product.name,
        unit_price: item.unit_price,
        quantity: item.quantity,
        subtotal: item.unit_price * item.quantity,
        product_slug: item.product.slug,
      })),
      created_at: new Date().toISOString(),
    };

    setCompletedOrder(newOrder);
    setIsGatewayOpen(false);
    onOrderCompleted(newOrder);
  };

  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2A3E2D]">
          سفارش شما با موفقیت ثبت و پرداخت شد!
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
          سپاس از حسن اعتماد شما به خوشنوش. دمنوش‌های شما در شرایط بهداشتی و در بسته‌بندی ارگانیک آماده ارسال خواهند شد.
        </p>

        {/* Receipt Box */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm text-right space-y-4 max-w-lg mx-auto text-xs">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-2 pb-3 border-b border-stone-100">
            <span className="text-stone-500">شماره رهگیری سفارش:</span>
            <span className="font-mono font-bold text-sm text-[#4F6F52]">{completedOrder.order_number}</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-2 pb-3 border-b border-stone-100">
            <span className="text-stone-500">مبلغ پرداخت شده:</span>
            <span className="font-mono font-bold text-stone-900">{formatToman(completedOrder.total_amount)}</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-2 pb-3 border-b border-stone-100">
            <span className="text-stone-500">تحویل‌گیرنده:</span>
            <span className="font-bold text-stone-800">{completedOrder.receiver_name} ({completedOrder.receiver_phone})</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1 sm:gap-2 pb-3 border-b border-stone-100">
            <span className="text-stone-500 shrink-0">نشانی تحویل:</span>
            <span className="text-stone-800 text-right sm:text-left font-medium">{completedOrder.province}، {completedOrder.city}، {completedOrder.address}</span>
          </div>

          <div className="p-3 bg-[#F4F6F0] rounded-lg text-emerald-800 text-[11px] leading-relaxed">
            پیامک تایید سفارش و جزئیات بسته‌بندی از طریق وب‌سرویس برای شماره همراه شما ارسال گردید.
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={onNavigateToShop}
            className="px-6 py-2.5 bg-[#4F6F52] hover:bg-[#3D5640] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            ادامه خرید از فروشگاه
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-stone-400 mx-auto" />
        <h2 className="text-lg font-bold text-stone-800">سبد خرید شما برای تسویه خالی است</h2>
        <button
          onClick={onNavigateToShop}
          className="px-5 py-2.5 bg-[#4F6F52] text-white text-xs font-bold rounded-lg"
        >
          رفتن به فروشگاه
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-extrabold text-[#2A3E2D]">تکمیل و تسویه‌حساب سفارش</h1>
          <p className="text-xs text-stone-500 mt-1">مشخصات ارسال و درگاه پرداخت الکترونیک</p>
        </div>
        <button
          onClick={onBackToCart}
          className="text-xs text-stone-600 hover:text-[#4F6F52] flex items-center gap-1 cursor-pointer self-start sm:self-auto"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به سبد خرید</span>
        </button>
      </div>

      <form onSubmit={handleStartPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Shipping & Receiver Form (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Saved Addresses (if any) */}
          {addresses.length > 0 && (
            <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3">
              <h3 className="text-xs font-bold text-stone-900">انتخاب از میان آدرس‌های ذخیره‌شده:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => {
                      setSelectedAddressId(addr.id);
                      setReceiverName(addr.receiver_name);
                      setReceiverPhone(addr.receiver_phone);
                      setProvince(addr.province);
                      setCity(addr.city);
                      setAddressLine(addr.address_line);
                      setPostalCode(addr.postal_code);
                    }}
                    className={`p-3 rounded-lg border cursor-pointer text-xs transition-colors ${
                      selectedAddressId === addr.id
                        ? 'border-[#4F6F52] bg-[#F4F6F0]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span>{addr.title}</span>
                      {addr.is_default && <span className="text-[10px] text-[#4F6F52]">پیش‌فرض</span>}
                    </div>
                    <p className="text-stone-600 line-clamp-2">{addr.address_line}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Receiver Information */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
            <h3 className="text-xs font-bold text-stone-900">مشخصات تحویل‌گیرنده و نشانی پستی:</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-stone-600 block mb-1">نام و نام خانوادگی تحویل‌گیرنده:</label>
                <input
                  type="text"
                  required
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                />
              </div>

              <div>
                <label className="text-[11px] text-stone-600 block mb-1">شماره تماس همراه:</label>
                <input
                  type="tel"
                  required
                  value={receiverPhone}
                  onChange={(e) => setReceiverPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-stone-600 block mb-1">استان:</label>
                <input
                  type="text"
                  required
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                />
              </div>

              <div>
                <label className="text-[11px] text-stone-600 block mb-1">شهر:</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-stone-600 block mb-1">نشانی پستی دقیق (کوچه، پلاک، زنگ، واحد):</label>
              <textarea
                required
                rows={2}
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-stone-600 block mb-1">کد پستی ۱۰ رقمی:</label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                />
              </div>

              <div>
                <label className="text-[11px] text-stone-600 block mb-1">یادداشت ارسال یا بسته‌بندی هدیه (اختیاری):</label>
                <input
                  type="text"
                  value={shippingNote}
                  onChange={(e) => setShippingNote(e.target.value)}
                  placeholder="مثال: بسته‌بندی کادویی شود یا قبل از تحویل تماس بگیرید"
                  className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                />
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3">
            <h3 className="text-xs font-bold text-stone-900">روش ارسال دمنوش:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setShippingMethod('post')}
                className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between text-xs ${
                  shippingMethod === 'post' ? 'border-[#4F6F52] bg-[#F4F6F0]' : 'border-stone-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#4F6F52]" />
                  <div>
                    <span className="font-bold block">پست پیشتاز سراسری</span>
                    <span className="text-[11px] text-stone-500">۲ الی ۳ روز کاری</span>
                  </div>
                </div>
                <span className="font-mono font-bold">
                  {subtotal >= 300000 ? 'رایگان' : formatToman(35000)}
                </span>
              </label>

              <label
                onClick={() => setShippingMethod('express')}
                className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between text-xs ${
                  shippingMethod === 'express' ? 'border-[#4F6F52] bg-[#F4F6F0]' : 'border-stone-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#DDA15E]" />
                  <div>
                    <span className="font-bold block">پیک اختصاصی تهران (همان‌روز)</span>
                    <span className="text-[11px] text-stone-500">تحویل تا غروب</span>
                  </div>
                </div>
                <span className="font-mono font-bold">
                  {subtotal >= 300000 ? 'رایگان' : formatToman(55000)}
                </span>
              </label>
            </div>
          </div>

        </div>

        {/* Order Summary & Payment Button (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-900 pb-3 border-b border-stone-100">
              خلاصه سفارش ({toPersianDigits(cartItems.length)} قلم کالا)
            </h3>

            {/* Itemized Mini List */}
            <div className="space-y-2 max-h-48 overflow-y-auto divide-y divide-stone-100 text-xs">
              {cartItems.map((item) => (
                <div key={item.id} className="pt-2 flex justify-between items-center">
                  <span className="text-stone-700 line-clamp-1">{item.product.name} × {toPersianDigits(item.quantity)}</span>
                  <span className="font-mono font-bold text-stone-900">{formatToman(item.unit_price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-3 border-t border-stone-200 space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>مجموع اقلام:</span>
                <span className="font-mono">{formatToman(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>هزینه حمل و ارسال:</span>
                <span className="font-mono">
                  {shippingCost === 0 ? 'رایگان' : formatToman(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>مبلغ نهایی پرداخت:</span>
                <span className="text-[#2A3E2D] font-mono">{formatToman(totalAmount)}</span>
              </div>
            </div>

            {/* Payment Trigger */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#4F6F52] hover:bg-[#3D5640] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <CreditCard className="w-4 h-4" />
              <span>پرداخت آنلاین از درگاه شتاب</span>
            </button>

            <div className="text-[11px] text-stone-500 text-center">
              اتصال امن به درگاه با پروتکل SSL و تاییدیه شاپرک
            </div>
          </div>
        </div>

      </form>

      {/* Sandbox Payment Gateway Modal */}
      {isGatewayOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-stone-200 text-center space-y-5">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <CreditCard className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[11px] text-stone-400 font-mono">درگاه پرداخت آزمایشی خوشنوش (Sandbox Gateway)</span>
              <h3 className="text-base font-bold text-stone-900 mt-1">تایید تراکنش بانکی</h3>
              <p className="text-xs text-stone-500 mt-1">
                مبلغ قابل کسر: <span className="font-bold text-[#2A3E2D] font-mono">{formatToman(totalAmount)}</span>
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg text-xs text-stone-600 text-right space-y-1">
              <p>پذیرنده: فروشگاه دمنوش‌های گیاهی خوشنوش</p>
              <p>شماره کارت شبیه‌سازی: ۶۰۳۷-۹۹**-****-۴۲۱۸</p>
              <p>کد پیگیری موقت: TR-{Date.now().toString().slice(-6)}</p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleSimulateSuccess}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                تایید و پرداخت موفق
              </button>
              <button
                type="button"
                onClick={() => setIsGatewayOpen(false)}
                className="flex-1 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                انصراف و بازگشت
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

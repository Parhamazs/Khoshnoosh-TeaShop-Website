import React from 'react';
import { Package, Clock, CheckCircle2, Truck, ChevronLeft } from 'lucide-react';
import { Order } from '../types';
import { formatToman, toPersianDigits, formatPersianDate, getOrderStatusBadge } from '../utils/formatters';

interface OrdersPageProps {
  orders: Order[];
  onNavigateToShop: () => void;
}

export const OrdersPage: React.FC<OrdersPageProps> = ({ orders, onNavigateToShop }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      
      <div>
        <h1 className="text-2xl font-extrabold text-[#2A3E2D]">سفارش‌های من</h1>
        <p className="text-xs text-stone-500 mt-1">مشاهده تاریخچه و رهگیری مرسولات دمنوش</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-stone-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-stone-800">شما هنوز سفارشی ثبت نکرده‌اید</h3>
          <p className="text-xs text-stone-500">
            از بین معجون‌ها و چای‌های گیاهی خوشنوش، دمنوش سازگار با طبع خود را انتخاب نمایید.
          </p>
          <button
            onClick={onNavigateToShop}
            className="px-5 py-2.5 bg-[#4F6F52] hover:bg-[#3D5640] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            مشاهده دمنوش‌ها
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const badge = getOrderStatusBadge(order.status);
            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs"
              >
                {/* Order Header */}
                <div className="p-4 sm:p-5 bg-[#FBFBFA] border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <div>
                      <span className="text-stone-400 block text-[11px]">شماره سفارش:</span>
                      <span className="font-mono font-bold text-stone-900">{order.order_number}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[11px]">تاریخ ثبت:</span>
                      <span className="text-stone-700">{formatPersianDate(order.created_at)}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[11px]">مبلغ کل:</span>
                      <span className="font-mono font-bold text-[#2A3E2D]">{formatToman(order.total_amount)}</span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold self-start sm:self-auto ${badge.bg} ${badge.text}`}>
                    {badge.label}
                  </span>
                </div>

                {/* Items */}
                <div className="p-4 sm:p-5 divide-y divide-stone-100 text-xs">
                  {order.items.map((item) => (
                    <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#4F6F52] shrink-0" />
                        <span className="font-semibold text-stone-800">{item.product_name}</span>
                        <span className="text-stone-400">× {toPersianDigits(item.quantity)}</span>
                      </div>
                      <span className="font-mono font-bold text-stone-700">{formatToman(item.subtotal)}</span>
                    </div>
                  ))}
                </div>

                {/* Receiver & Tracking footer */}
                <div className="px-4 py-3 bg-stone-50 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-stone-500">
                  <span>تحویل‌گیرنده: {order.receiver_name} | {order.city}، {order.address}</span>
                  <span className="text-[#4F6F52] font-semibold">بسته‌بندی ویژه گیاهی و ضد رطوبت</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

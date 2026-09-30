import React, { useState } from 'react';
import { X, Server, Database, Cpu, CheckCircle2, Copy, ExternalLink, Code } from 'lucide-react';

interface ApiExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiExplorerModal: React.FC<ApiExplorerModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'endpoints' | 'docker' | 'models' | 'celery'>('endpoints');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const endpoints = [
    { method: 'POST', path: '/api/auth/register/', desc: 'ثبت‌نام کاربر جدید با ایمیل، شماره تماس و گذرواژه', auth: 'عمومی' },
    { method: 'POST', path: '/api/auth/login/', desc: 'ورود و دریافت جفت توکن‌های JWT (Access & Refresh)', auth: 'عمومی' },
    { method: 'GET', path: '/api/auth/profile/', desc: 'دریافت و ویرایش اطلاعات پروفایل کاربری', auth: 'Bearer JWT' },
    { method: 'GET', path: '/api/products/', desc: 'لیست محصولات با فیلتر دسته‌بندی، طبع، قیمت و جستجو', auth: 'عمومی' },
    { method: 'GET', path: '/api/products/{slug}/', desc: 'جزئیات کامل دمنوش، ترکیبات، خواص و دستور دم‌آوری', auth: 'عمومی' },
    { method: 'GET', path: '/api/products/categories/', desc: 'فهرست دسته‌بندی‌های دمنوش به همراه تعداد اقلام', auth: 'عمومی' },
    { method: 'GET/POST', path: '/api/cart/', desc: 'مدیریت سبد خرید پایدار و افزودن اقلام', auth: 'Session / JWT' },
    { method: 'POST', path: '/api/orders/', desc: 'ثبت نهایی سفارش، کسر موجودی و اجرای تسک Celery', auth: 'Bearer JWT' },
    { method: 'POST', path: '/api/payments/request/', desc: 'درخواست توکن و آدرس اتصال به درگاه بانکی', auth: 'Bearer JWT' },
    { method: 'POST', path: '/api/payments/verify/', desc: 'اعتبارسنجی تراکنش بانکی و صدور کد رهگیری', auth: 'عمومی' },
    { method: 'GET', path: '/api/blog/posts/', desc: 'فهرست مقالات علمی و سنتی با دسته‌بندی و زمان مطالعه', auth: 'عمومی' },
    { method: 'GET/POST', path: '/api/wishlist/', desc: 'افزودن و مشاهده علاقه‌مندی‌های کاربر', auth: 'Bearer JWT' },
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col border border-stone-300 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#2A3E2D] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-[#DDA15E]" />
            <div>
              <h2 className="text-sm sm:text-base font-bold">
                معماری بک‌اند، مستندات Swagger و کانتینرهای داکر خوشنوش
              </h2>
              <p className="text-[11px] text-[#A9B388]">
                Django REST Framework · PostgreSQL · Celery + Redis · Gunicorn · Nginx
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-white rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-2 bg-stone-100 border-b border-stone-200 text-xs font-medium">
          <button
            onClick={() => setActiveTab('endpoints')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'endpoints' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            مسیرهای RESTful API ({endpoints.length})
          </button>
          <button
            onClick={() => setActiveTab('docker')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'docker' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            سرویس‌های Docker Compose
          </button>
          <button
            onClick={() => setActiveTab('models')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'models' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            مدل‌های دیتابیس (Django Models)
          </button>
          <button
            onClick={() => setActiveTab('celery')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'celery' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            وظایف پس‌زمینه (Celery + Redis)
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-xs text-stone-800">
          
          {activeTab === 'endpoints' && (
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50 text-emerald-900 rounded-lg flex items-center justify-between border border-emerald-200">
                <span>تمامی اندپوینت‌های فوق در مسیر <code>/backend/apps/</code> با drf-spectacular مستندسازی شده‌اند.</span>
                <span className="font-mono text-[11px] bg-emerald-100 px-2 py-0.5 rounded text-emerald-800">
                  Swagger UI: /api/docs/
                </span>
              </div>

              <div className="border border-stone-200 rounded-lg overflow-hidden divide-y divide-stone-100">
                {endpoints.map((ep, idx) => (
                  <div key={idx} className="p-3 hover:bg-stone-50 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        ep.method === 'POST' ? 'bg-amber-100 text-amber-800' :
                        ep.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {ep.method}
                      </span>
                      <code className="text-xs font-mono font-bold text-stone-900">{ep.path}</code>
                    </div>
                    <span className="text-stone-600 text-xs hidden md:inline">{ep.desc}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                        {ep.auth}
                      </span>
                      <button
                        onClick={() => handleCopy(ep.path, idx)}
                        className="p-1 text-stone-400 hover:text-stone-700"
                        title="کپی آدرس اندپوینت"
                      >
                        {copiedIndex === idx ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'docker' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-stone-200 rounded-lg bg-stone-50">
                  <div className="flex items-center gap-2 font-bold text-stone-900 mb-2">
                    <Database className="w-4 h-4 text-[#4F6F52]" />
                    <span>khoshnoosh_postgres (Port: 5432)</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    پایگاه داده PostgreSQL 15 Alpine با پیکربندی volume مجزا برای ذخیره ماندگار اطلاعات کاربران، دمنوش‌ها و سفارشات.
                  </p>
                </div>

                <div className="p-4 border border-stone-200 rounded-lg bg-stone-50">
                  <div className="flex items-center gap-2 font-bold text-stone-900 mb-2">
                    <Cpu className="w-4 h-4 text-rose-600" />
                    <span>khoshnoosh_redis (Port: 6379)</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    سرور Redis 7 Alpine به عنوان Message Broker برای صف وظایف Celery و کش پاسخ‌های API.
                  </p>
                </div>

                <div className="p-4 border border-stone-200 rounded-lg bg-stone-50">
                  <div className="flex items-center gap-2 font-bold text-stone-900 mb-2">
                    <Server className="w-4 h-4 text-[#4F6F52]" />
                    <span>khoshnoosh_backend (Port: 8000)</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    کانتینر پایتون ۳.۱۱ مجهز به وب‌سرور چندریسمانی Gunicorn با اجرای خودکار مایگریشن‌ها و لود بذر داده‌ها.
                  </p>
                </div>

                <div className="p-4 border border-stone-200 rounded-lg bg-stone-50">
                  <div className="flex items-center gap-2 font-bold text-stone-900 mb-2">
                    <ExternalLink className="w-4 h-4 text-blue-600" />
                    <span>khoshnoosh_nginx (Port: 80)</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    ریورس پروکسی یکپارچه برای هدایت ترافیک SPA و وب‌سرویس و فشرده‌سازی خودکار gzip.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-stone-900 text-stone-200 rounded-lg font-mono text-[11px] overflow-x-auto">
                # دستور اجرای فوری کانتینرها: <br/>
                docker compose up --build -d
              </div>
            </div>
          )}

          {activeTab === 'models' && (
            <div className="space-y-4">
              <p className="text-stone-600">
                مدل‌های ORM جنگو در پوشه <code>/backend/apps/</code> به صورت ماژولار پیاده‌سازی شده‌اند:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className="p-3 bg-stone-50 rounded border border-stone-200">
                  <h4 className="font-bold text-stone-900 mb-1">accounts</h4>
                  <ul className="text-stone-600 list-disc list-inside space-y-0.5 text-[11px]">
                    <li>User (AbstractUser, phone, email)</li>
                    <li>Address (province, city, postal_code)</li>
                  </ul>
                </div>

                <div className="p-3 bg-stone-50 rounded border border-stone-200">
                  <h4 className="font-bold text-stone-900 mb-1">products</h4>
                  <ul className="text-stone-600 list-disc list-inside space-y-0.5 text-[11px]">
                    <li>Category & Tag</li>
                    <li>Product (temperament, benefits, brewing)</li>
                    <li>ProductImage (multiple images)</li>
                  </ul>
                </div>

                <div className="p-3 bg-stone-50 rounded border border-stone-200">
                  <h4 className="font-bold text-stone-900 mb-1">orders & payments</h4>
                  <ul className="text-stone-600 list-disc list-inside space-y-0.5 text-[11px]">
                    <li>Order & OrderItem</li>
                    <li>Payment (Sandbox / Zarinpal gateway)</li>
                  </ul>
                </div>

                <div className="p-3 bg-stone-50 rounded border border-stone-200">
                  <h4 className="font-bold text-stone-900 mb-1">cart & wishlist</h4>
                  <ul className="text-stone-600 list-disc list-inside space-y-0.5 text-[11px]">
                    <li>Cart & CartItem</li>
                    <li>Wishlist & WishlistItem</li>
                  </ul>
                </div>

                <div className="p-3 bg-stone-50 rounded border border-stone-200">
                  <h4 className="font-bold text-stone-900 mb-1">blog & reviews</h4>
                  <ul className="text-stone-600 list-disc list-inside space-y-0.5 text-[11px]">
                    <li>BlogCategory & BlogPost</li>
                    <li>ProductReview (ratings, comments)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'celery' && (
            <div className="space-y-4">
              <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg text-amber-900">
                <h4 className="font-bold mb-1">تسک ارسال پیامک و ایمیل تایید سفارش (Celery Async Worker)</h4>
                <p className="text-xs leading-relaxed">
                  هنگامی که خریدار سفارش خود را نهایی می‌کند، فرآیند ثبت سفارش مسدود نمی‌شود؛ تسک <code>send_order_confirmation_notification.delay(order.id)</code> در صف ریدیس قرار گرفته و کارگر Celery آن را به صورت ناهمگام پردازش می‌کند.
                </p>
              </div>

              <div className="bg-stone-900 text-stone-100 p-4 rounded-lg font-mono text-[11px] overflow-x-auto leading-relaxed">
                <span className="text-purple-400">@shared_task</span><br/>
                <span className="text-blue-400">def</span> <span className="text-yellow-300">send_order_confirmation_notification</span>(order_id):<br/>
                &nbsp;&nbsp;order = Order.objects.get(id=order_id)<br/>
                &nbsp;&nbsp;message = f"مشتری گرامی &#123;order.receiver_name&#125;، سفارش &#123;order.order_number&#125; ثبت شد."<br/>
                &nbsp;&nbsp;sms_service.send(to=order.receiver_phone, text=message)<br/>
                &nbsp;&nbsp;<span className="text-blue-400">return</span> &#123;"status": "success"&#125;
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            فروشگاه دمنوش‌های گیاهی خوشنوش (Khoshnoosh E-Commerce)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-bold"
          >
            بستن پنجره
          </button>
        </div>
      </div>
    </div>
  );
};

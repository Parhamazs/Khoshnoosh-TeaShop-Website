import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2A3E2D]">
          تماس با دمنوش‌های خوشنوش
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
          مشاوره درباره انتخاب دمنوش مناسب طبع، سفارشات عمده سازمانی یا هرگونه پیشنهاد و انتقاد
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info (5 cols) */}
        <div className="md:col-span-5 bg-[#2A3E2D] text-[#E8ECE0] p-6 sm:p-8 rounded-2xl space-y-6">
          <h3 className="text-base font-bold text-white">راه‌های ارتباط مستقیم</h3>
          
          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#DDA15E] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-white">تلفن پشتیبانی و سفارشات:</span>
                <span className="text-[#A9B388] font-mono">۰۲۱-۸۸۹۹۲۲۳۳ / ۰۹۱۲۱۱۱۲۲۳۳</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#DDA15E] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-white">پست الکترونیک:</span>
                <span className="text-[#A9B388] font-mono">info@khoshnoosh.ir</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#DDA15E] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-white">دفتر مرکزی:</span>
                <span className="text-[#A9B388] leading-relaxed">تهران، میدان ونک، خیابان ملاصدرا، پلاک ۸۵، ساختمان سپهر</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#3D5640] text-[11px] text-[#A9B388] leading-relaxed">
            ساعات پاسخگویی کارشناسان گیاهی: شنبه تا پنج‌شنبه از ساعت ۹ الی ۱۸
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
          {sent ? (
            <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>پیام شما با موفقیت ارسال شد. کارشناسان خوشنوش به زودی با شما تماس خواهند گرفت.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">نام شما:</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">ایمیل یا شماره تماس:</label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-700 block mb-1">موضوع پیام:</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="مشاوره دمنوش، سفارش عمده، انتقاد..."
                  className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-700 block mb-1">متن پیام:</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FBFBFA] border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#4F6F52] hover:bg-[#3D5640] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ارسال پیام به پشتیبانی</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};

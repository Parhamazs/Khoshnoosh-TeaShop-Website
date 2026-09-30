import React, { useState } from 'react';
import { User, Mail, Phone, Save, CheckCircle2 } from 'lucide-react';
import { User as UserType } from '../types';

interface ProfilePageProps {
  user: UserType;
  onUpdateProfile: (updated: Partial<UserType>) => void;
  onLogout: () => void;
  onNavigate: (tab: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdateProfile, onLogout, onNavigate }) => {
  const [fullName, setFullName] = useState(user.full_name || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number || '');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ full_name: fullName, phone_number: phoneNumber });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#2A3E2D]">پروفایل کاربری</h1>
        <p className="text-xs text-stone-500 mt-1">مدیریت اطلاعات هویتی و دسترسی سریع به پنل</p>
      </div>

      {/* Quick Hub Navigation Cards on Mobile & Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-center">
        <button
          type="button"
          onClick={() => onNavigate('orders')}
          className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-[#4F6F52] hover:bg-[#F4F6F0] transition-colors cursor-pointer flex sm:flex-col items-center justify-between sm:justify-center gap-2 sm:space-y-1"
        >
          <span className="text-xs sm:text-sm font-bold text-stone-800">سفارش‌های من</span>
          <span className="text-[10px] text-stone-500">رهگیری مرسولات</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('addresses')}
          className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-[#4F6F52] hover:bg-[#F4F6F0] transition-colors cursor-pointer flex sm:flex-col items-center justify-between sm:justify-center gap-2 sm:space-y-1"
        >
          <span className="text-xs sm:text-sm font-bold text-stone-800">آدرس‌های پستی</span>
          <span className="text-[10px] text-stone-500">محل‌های تحویل</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('wishlist')}
          className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-[#4F6F52] hover:bg-[#F4F6F0] transition-colors cursor-pointer flex sm:flex-col items-center justify-between sm:justify-center gap-2 sm:space-y-1"
        >
          <span className="text-xs sm:text-sm font-bold text-stone-800">علاقه‌مندی‌ها</span>
          <span className="text-[10px] text-stone-500">دمنوش‌های منتخب</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 p-5 sm:p-7 shadow-xs space-y-6">
        
        {/* User Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-stone-100 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#4F6F52] text-[#FEFAE0] flex items-center justify-center font-bold text-lg sm:text-xl shrink-0">
              {fullName ? fullName.slice(0, 1) : 'خ'}
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-stone-900">{fullName || 'کاربر گرامی'}</h3>
              <p className="text-[11px] sm:text-xs text-stone-500 font-mono">{user.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="w-full sm:w-auto px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-lg border border-rose-200 transition-colors cursor-pointer text-center"
          >
            خروج از حساب
          </button>
        </div>

        {saved && (
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>اطلاعات پروفایل با موفقیت بروزرسانی شد.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              نام و نام خانوادگی:
            </label>
            <div className="relative">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full pl-3 pr-9 py-2 text-xs bg-[#FBFBFA] border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
              />
              <User className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              آدرس ایمیل (شناسه کاربری):
            </label>
            <div className="relative">
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full pl-3 pr-9 py-2 text-xs bg-stone-100 text-stone-500 border border-stone-200 rounded-lg cursor-not-allowed font-mono"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              شماره موبایل جهت هماهنگی ارسال:
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                className="w-full pl-3 pr-9 py-2 text-xs bg-[#FBFBFA] border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
              />
              <Phone className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#4F6F52] hover:bg-[#3D5640] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>ذخیره تغییرات</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

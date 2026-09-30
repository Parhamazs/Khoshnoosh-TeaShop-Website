import React, { useState } from 'react';
import { X, User, Lock, Mail, Phone, LogIn, UserPlus } from 'lucide-react';
import { User as UserType } from '../types';
import { BrandLogo } from '../components/BrandLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserType) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('لطفاً ایمیل و رمز عبور را وارد نمایید.');
      return;
    }

    const loggedUser: UserType = {
      id: Date.now(),
      email,
      full_name: fullName || (email.startsWith('admin') ? 'مدیر فروشگاه خوشنوش' : 'سارا احمدی'),
      phone_number: phone || '۰۹۳۵۱۲۳۴۵۶۷',
    };

    onLoginSuccess(loggedUser);
    onClose();
  };

  const handleQuickLogin = (role: 'customer' | 'admin') => {
    if (role === 'admin') {
      const u: UserType = {
        id: 1,
        email: 'admin@khoshnoosh.ir',
        full_name: 'مدیر کل فروشگاه خوشنوش',
        phone_number: '۰۹۱۲۱۱۱۲۲۳۳',
      };
      onLoginSuccess(u);
    } else {
      const u: UserType = {
        id: 2,
        email: 'sara@example.com',
        full_name: 'سارا احمدی (مشتری وفادار)',
        phone_number: '۰۹۳۵۱۲۳۴۵۶۷',
      };
      onLoginSuccess(u);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-stone-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <BrandLogo className="w-7 h-7" />
            <h2 className="text-sm font-bold text-stone-900">
              {mode === 'login' ? 'ورود به حساب کاربری خوشنوش' : 'ثبت‌نام در باشگاه سلامت خوشنوش'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex bg-stone-100 p-1 rounded-lg my-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-1.5 rounded-md transition-colors ${
              mode === 'login' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
            }`}
          >
            ورود با ایمیل
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(''); }}
            className={`flex-1 py-1.5 rounded-md transition-colors ${
              mode === 'register' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
            }`}
          >
            عضویت جدید
          </button>
        </div>

        {/* Quick Demo Logins */}
        <div className="p-3 bg-[#F4F6F0] rounded-xl border border-[#D5DFC7] mb-4 text-xs">
          <span className="font-bold text-[#2A3E2D] block mb-1.5">ورود سریع با حساب‌های نمونه (جهت تست):</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('customer')}
              className="flex-1 py-1.5 bg-white hover:bg-stone-50 border border-[#A9B388] text-[#2A3E2D] font-medium rounded text-[11px]"
            >
              حساب مشتری (سارا)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="flex-1 py-1.5 bg-white hover:bg-stone-50 border border-[#A9B388] text-[#2A3E2D] font-medium rounded text-[11px]"
            >
              حساب مدیر سیستم
            </button>
          </div>
        </div>

        {error && <div className="p-2.5 bg-rose-50 text-rose-700 text-xs rounded-lg mb-3">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'register' && (
            <div>
              <label className="text-[11px] text-stone-600 block mb-1">نام و نام خانوادگی:</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="مثال: علی احمدی"
                  className="w-full pl-3 pr-8 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                />
                <User className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] text-stone-600 block mb-1">آدرس ایمیل:</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-3 pr-8 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
              />
              <Mail className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="text-[11px] text-stone-600 block mb-1">شماره همراه:</label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  className="w-full pl-3 pr-8 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                />
                <Phone className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] text-stone-600 block mb-1">کلمه عبور:</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="حداقل ۶ کاراکتر"
                className="w-full pl-3 pr-8 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
              />
              <Lock className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#4F6F52] hover:bg-[#3D5640] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2"
          >
            {mode === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            <span>{mode === 'login' ? 'ورود به حساب کاربری' : 'ثبت‌نام و ایجاد حساب'}</span>
          </button>
        </form>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { MapPin, Plus, Trash2, CheckCircle2, Home } from 'lucide-react';
import { Address } from '../types';

interface AddressesPageProps {
  addresses: Address[];
  onAddAddress: (addr: Address) => void;
  onDeleteAddress: (id: number) => void;
  onSetDefault: (id: number) => void;
}

export const AddressesPage: React.FC<AddressesPageProps> = ({
  addresses,
  onAddAddress,
  onDeleteAddress,
  onSetDefault,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('منزل');
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [province, setProvince] = useState('تهران');
  const [city, setCity] = useState('تهران');
  const [addressLine, setAddressLine] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr: Address = {
      id: Date.now(),
      title,
      receiver_name: receiverName,
      receiver_phone: receiverPhone,
      province,
      city,
      address_line: addressLine,
      postal_code: postalCode,
      is_default: addresses.length === 0,
    };
    onAddAddress(newAddr);
    setShowModal(false);
    setTitle('منزل');
    setReceiverName('');
    setReceiverPhone('');
    setAddressLine('');
    setPostalCode('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#2A3E2D]">آدرس‌های پستی من</h1>
          <p className="text-xs text-stone-500 mt-1">مدیریت آدرس‌ها جهت تسریع در فرآیند ارسال</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-[#4F6F52] hover:bg-[#3D5640] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-auto w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>افزودن آدرس جدید</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`bg-white rounded-xl p-5 border transition-all flex flex-col justify-between ${
              addr.is_default ? 'border-[#4F6F52] shadow-xs' : 'border-stone-200'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                  <Home className="w-4 h-4 text-[#4F6F52]" />
                  <span>{addr.title}</span>
                </span>
                {addr.is_default && (
                  <span className="text-[11px] font-bold text-[#4F6F52] bg-[#F4F6F0] px-2 py-0.5 rounded">
                    آدرس پیش‌فرض
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-700 leading-relaxed">
                {addr.province}، {addr.city}، {addr.address_line}
              </p>

              <div className="text-[11px] text-stone-500 space-y-0.5 pt-1">
                <p>کد پستی: <span className="font-mono">{addr.postal_code}</span></p>
                <p>تحویل‌گیرنده: {addr.receiver_name} ({addr.receiver_phone})</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              {!addr.is_default ? (
                <button
                  onClick={() => onSetDefault(addr.id)}
                  className="text-[#4F6F52] hover:underline font-semibold cursor-pointer"
                >
                  تنظیم به عنوان پیش‌فرض
                </button>
              ) : (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>انتخاب شده برای ارسال</span>
                </span>
              )}

              <button
                onClick={() => onDeleteAddress(addr.id)}
                className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                title="حذف آدرس"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 border border-stone-200">
            <h3 className="text-base font-bold text-stone-900 mb-4 pb-3 border-b border-stone-100">
              ثبت آدرس پستی جدید
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-stone-600 block mb-1">عنوان آدرس:</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="منزل، محل کار، ویلا..."
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-600 block mb-1">کد پستی ۱۰ رقمی:</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-stone-600 block mb-1">نام تحویل‌گیرنده:</label>
                  <input
                    type="text"
                    required
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-600 block mb-1">شماره تماس همراه:</label>
                  <input
                    type="tel"
                    required
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-stone-600 block mb-1">استان:</label>
                  <input
                    type="text"
                    required
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-600 block mb-1">شهر:</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-stone-600 block mb-1">نشانی دقیق پستی:</label>
                <textarea
                  required
                  rows={2}
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg hover:bg-stone-300"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#4F6F52] text-white text-xs font-bold rounded-lg hover:bg-[#3D5640]"
                >
                  ثبت آدرس
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

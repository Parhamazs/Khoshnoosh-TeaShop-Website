/**
 * Utility functions for Persian formatting
 */

const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianDigits(num: number | string): string {
  if (num === null || num === undefined) return '';
  return num
    .toString()
    .replace(/[0-9]/g, (digit) => persianDigits[parseInt(digit, 10)]);
}

export function formatToman(price: number): string {
  if (price === null || price === undefined) return '۰ تومان';
  const formattedWithCommas = Math.round(price).toLocaleString('fa-IR');
  return `${formattedWithCommas} تومان`;
}

export function formatPersianDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(d);
  } catch {
    return dateString;
  }
}

export function getTemperamentLabel(temperament: string): string {
  switch (temperament) {
    case 'warm':
      return 'طبع گرم و خشک';
    case 'warm_wet':
      return 'طبع گرم و تر';
    case 'cold':
      return 'طبع سرد و خشک';
    case 'cold_wet':
      return 'طبع سرد و تر';
    case 'moderate':
      return 'طبع معتدل';
    default:
      return 'نامشخص';
  }
}

export function getOrderStatusBadge(status: string): { label: string; bg: string; text: string } {
  switch (status) {
    case 'pending':
      return { label: 'در انتظار پرداخت', bg: 'bg-amber-50', text: 'text-amber-800' };
    case 'paid':
      return { label: 'پرداخت شده', bg: 'bg-emerald-50', text: 'text-emerald-800' };
    case 'processing':
      return { label: 'در حال بسته‌بندی گیاهی', bg: 'bg-blue-50', text: 'text-blue-800' };
    case 'shipped':
      return { label: 'ارسال شده با پست', bg: 'bg-indigo-50', text: 'text-indigo-800' };
    case 'delivered':
      return { label: 'تحویل داده شده', bg: 'bg-emerald-50', text: 'text-emerald-800' };
    case 'cancelled':
      return { label: 'لغو شده', bg: 'bg-rose-50', text: 'text-rose-800' };
    default:
      return { label: status, bg: 'bg-gray-50', text: 'text-gray-800' };
  }
}

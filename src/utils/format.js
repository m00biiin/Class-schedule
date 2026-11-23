// توابع نمایش اعداد، ساعت و تاریخ به فارسی

export const fa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);

export const JALALI_MONTHS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

export const formatClock = (h, m = 0) => `${fa(h)}:${fa(String(m).padStart(2, '0'))}`;

export const formatJalali = ({ jy, jm, jd }, withYear = true) =>
  `${fa(jd)} ${JALALI_MONTHS[jm - 1]}${withYear ? ` ${fa(jy)}` : ''}`;

export const parityLabel = (parity) => (parity === 'even' ? 'هفته زوج' : 'هفته فرد');

// مدت زمان به شکل «۲ ساعت و ۱۰ دقیقه»
export function formatDuration(ms) {
  const total = Math.max(1, Math.ceil(ms / 60000));
  const d = Math.floor(total / 1440);
  const h = Math.floor((total % 1440) / 60);
  const m = total % 60;
  if (d > 0) return `${fa(d)} روز${h ? ` و ${fa(h)} ساعت` : ''}`;
  if (h > 0) return `${fa(h)} ساعت${m ? ` و ${fa(m)} دقیقه` : ''}`;
  return `${fa(m)} دقیقه`;
}

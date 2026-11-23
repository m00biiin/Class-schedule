import { toGregorian, jalaliMonthLength } from './jalali';
import { toJalaliDate } from './week';
import { fa } from './format';

const MIN = 60 * 1000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

// زمان دقیق امتحان به‌صورت Date میلادی
export function examDate({ date, time }) {
  const g = toGregorian(date.jy, date.jm, date.jd);
  return new Date(g.gy, g.gm - 1, g.gd, time.h, time.m);
}

// متن تایمر: بیش از یک روز «x ماه، y روز» و کمتر از یک روز «ساعت و دقیقه»
export function examCountdown(exam, now) {
  const ms = examDate(exam) - now;
  if (ms <= 0) return { state: 'done', text: 'برگزار شد' };

  if (ms < DAY) {
    const h = Math.floor(ms / HOUR);
    const m = Math.floor((ms % HOUR) / MIN);
    const text = h > 0 ? `${fa(h)} ساعت${m ? ` و ${fa(m)} دقیقه` : ''}` : `${fa(Math.max(m, 1))} دقیقه`;
    return { state: 'soon', text: `${text} تا امتحان` };
  }

  // اختلاف تقویمی بر اساس ماه‌های شمسی
  const cur = toJalaliDate(now);
  const t = exam.date;
  let months = (t.jy - cur.jy) * 12 + (t.jm - cur.jm);
  let days = t.jd - cur.jd;
  if (days < 0) {
    months -= 1;
    const prevMonth = t.jm === 1 ? 12 : t.jm - 1;
    const prevYear = t.jm === 1 ? t.jy - 1 : t.jy;
    days += jalaliMonthLength(prevYear, prevMonth);
  }
  const parts = [];
  if (months > 0) parts.push(`${fa(months)} ماه`);
  if (days > 0) parts.push(`${fa(days)} روز`);
  return { state: 'later', text: `${parts.join('، ')} تا امتحان` };
}

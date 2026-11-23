import { toJalali } from './jalali';

export const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const addDays = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
};

// اندیس روز هفته: ۰ = شنبه ... ۶ = جمعه
export const dayIndex = (date) => (date.getDay() + 1) % 7;

export const toJalaliDate = (date) => toJalali(date.getFullYear(), date.getMonth() + 1, date.getDate());

// هفته زوج یعنی شنبه‌ی آن هفته تاریخ (روز ماه) زوج دارد
export function weekParity(date) {
  const saturday = addDays(date, -dayIndex(date));
  return toJalaliDate(saturday).jd % 2 === 0 ? 'even' : 'odd';
}

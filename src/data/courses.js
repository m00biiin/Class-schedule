// داده‌های درس‌ها و برنامه‌ی هفتگی. برای تغییر برنامه فقط همین فایل را ویرایش کن.

// روزهای کاری هفته به ترتیب شنبه تا پنجشنبه
export const DAYS = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه'];

// همه‌ی روزهای هفته (اندیس ۰ = شنبه، ۶ = جمعه)
export const WEEKDAYS = [...DAYS, 'جمعه'];

// ساعت شروع هر بازه و مدت هر کلاس (ساعت)
export const SLOT_STARTS = [8, 10, 12, 14, 16];
export const SLOT_HOURS = 2;

// tone شماره‌ی رنگ نوار کنار هر درس است (۱ تا ۵)
export const COURSES = {
  math: { name: 'ریاضی ۱', units: 3, tone: 1 },
  prog: { name: 'مبانی کامپیوتر و برنامه‌سازی', units: 3, tone: 2 },
  intro: { name: 'آشنایی با صنعت کامپیوتر (کاربینی)', units: 1, tone: 3 },
  persian: { name: 'زبان فارسی', units: 3, tone: 4 },
  defense: { name: 'علوم و معارف دفاع مقدس و مقاومت', units: 2, tone: 5 },
};

export const COURSE_ORDER = ['math', 'prog', 'intro', 'persian', 'defense'];

// هر جلسه: day = اندیس روز، slot = اندیس بازه‌ی ساعتی، evenOnly = فقط هفته‌های زوج
export const SESSIONS = [
  { course: 'intro', day: 0, slot: 3, room: 'مکان نامشخص', evenOnly: false },
  { course: 'math', day: 1, slot: 1, room: '۲۲۱ برق', evenOnly: false },
  { course: 'persian', day: 1, slot: 3, room: '۲۲۸ برق', evenOnly: true },
  { course: 'prog', day: 1, slot: 4, room: '۲۲۸ برق', evenOnly: true },
  { course: 'persian', day: 3, slot: 0, room: '۲۲۸ برق', evenOnly: false },
  { course: 'prog', day: 3, slot: 1, room: '۲۲۸ برق', evenOnly: false },
  { course: 'math', day: 3, slot: 4, room: '۲۲۱ برق', evenOnly: true },
  { course: 'defense', day: 4, slot: 0, room: '۲۴۸ برق', evenOnly: false },
];

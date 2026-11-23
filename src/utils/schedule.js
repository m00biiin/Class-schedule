import { SESSIONS, SLOT_STARTS, SLOT_HOURS } from '../data/courses';
import { addDays, startOfDay, dayIndex, weekParity } from './week';

// آیا این جلسه در هفته‌ی زوج یا فرد برگزار می‌شود؟
export const isHeld = (session, parity) => !(session.evenOnly && parity === 'odd');

export const sessionsOnDay = (day) =>
  SESSIONS.filter((s) => s.day === day).sort((a, b) => a.slot - b.slot);

export const sessionsOfCourse = (courseId, parity) =>
  SESSIONS.filter((s) => s.course === courseId && isHeld(s, parity)).sort(
    (a, b) => a.day - b.day || a.slot - b.slot,
  );

// زمان شروع و پایان یک جلسه در یک روز مشخص
export function sessionRange(session, date) {
  const start = new Date(date);
  start.setHours(SLOT_STARTS[session.slot], 0, 0, 0);
  const end = new Date(start);
  end.setHours(start.getHours() + SLOT_HOURS);
  return { start, end };
}

// کلاس در حال برگزاری یا نزدیک‌ترین کلاس بعدی (تا ۱۴ روز آینده)
export function findNextClass(now, lookaheadDays = 14) {
  for (let i = 0; i <= lookaheadDays; i += 1) {
    const date = addDays(startOfDay(now), i);
    const parity = weekParity(date);
    const hit = sessionsOnDay(dayIndex(date))
      .filter((s) => isHeld(s, parity))
      .map((session) => ({ session, ...sessionRange(session, date) }))
      .find((c) => c.end > now);
    if (hit) return { ...hit, live: hit.start <= now, daysAhead: i };
  }
  return null;
}

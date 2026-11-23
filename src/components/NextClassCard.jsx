import { COURSES, WEEKDAYS, SLOT_STARTS, SLOT_HOURS } from '../data/courses';
import { findNextClass } from '../utils/schedule';
import { dayIndex } from '../utils/week';
import { formatClock, formatDuration } from '../utils/format';

// کارت «کلاس بعدی»: اگر کلاسی در جریان باشد نوار پیشرفت نشان می‌دهد
export default function NextClassCard({ now, onSelect }) {
  const next = findNextClass(now);
  if (!next) return null;

  const { session, start, end, live, daysAhead } = next;
  const course = COURSES[session.course];
  const startHour = SLOT_STARTS[session.slot];

  let when = WEEKDAYS[dayIndex(start)];
  if (daysAhead === 0) when = 'امروز';
  else if (daysAhead === 1) when = 'فردا';

  const progress = live ? Math.min(100, Math.round(((now - start) / (end - start)) * 100)) : 0;

  return (
    <section
      className={`next tone-${course.tone}`}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(session.course)}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(session.course)}
    >
      <i className="bar" />
      <div className="next-body">
        <div className="next-top">
          <span className={live ? 'live' : ''}>{live ? 'در حال برگزاری' : 'کلاس بعدی'}</span>
          <span>{when}</span>
        </div>
        <div className="next-name">{course.name}</div>
        <div className="next-meta">
          {formatClock(startHour)} تا {formatClock(startHour + SLOT_HOURS)} • {session.room}
        </div>
        <div className="next-count">
          {live ? `${formatDuration(end - now)} تا پایان کلاس` : `${formatDuration(start - now)} دیگر`}
        </div>
        {live && (
          <div className="progress" aria-hidden="true">
            <i style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </section>
  );
}

import { COURSES, SLOT_STARTS, SLOT_HOURS } from '../data/courses';
import { isHeld } from '../utils/schedule';
import { formatClock } from '../utils/format';

// یک ردیف کلاس با ساعت، نوار رنگی درس و نام کلاس
export default function ClassRow({ session, week, index = 0, onSelect }) {
  const course = COURSES[session.course];
  const held = isHeld(session, week);
  const start = SLOT_STARTS[session.slot];

  let badge = '';
  if (!held) badge = 'این هفته نیست';
  else if (session.evenOnly) badge = 'فقط زوج';

  return (
    <div
      className={`row tone-${course.tone}${held ? '' : ' off'}`}
      style={{ '--i': index }}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(session.course)}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(session.course)}
    >
      <div className="tm">
        <b>{formatClock(start)}</b>
        <span>{formatClock(start + SLOT_HOURS)}</span>
      </div>
      <i className="bar" />
      <div className="inf">
        <b>{course.name}</b>
        <span>{session.room}</span>
      </div>
      {badge && <em className="bd">{badge}</em>}
      <span className="chev">‹</span>
    </div>
  );
}

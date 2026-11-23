import { DAYS } from '../data/courses';
import { SESSIONS } from '../data/courses';

// نوار انتخاب روز؛ نقطه‌ی زیر روز یعنی آن روز کلاس دارد
export default function DayStrip({ selected, onSelect }) {
  return (
    <div className="strip">
      {DAYS.map((name, i) => {
        const hasClass = SESSIONS.some((s) => s.day === i);
        const cls = `dy${i === selected ? ' on' : ''}${hasClass ? ' has' : ''}`;
        return (
          <button key={name} className={cls} onClick={() => onSelect(i)}>
            {name}
            <i />
          </button>
        );
      })}
    </div>
  );
}

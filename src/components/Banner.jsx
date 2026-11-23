import { useEffect, useRef, useState } from 'react';
import { COURSES, WEEKDAYS, SLOT_STARTS, SLOT_HOURS } from '../data/courses';
import { sessionsOfCourse } from '../utils/schedule';
import { formatClock, fa, parityLabel } from '../utils/format';

const AUTO_HIDE_MS = 8000;
const SWIPE_CLOSE_PX = 35;

function Lines({ courseId, parity, muted }) {
  const list = sessionsOfCourse(courseId, parity);
  if (!list.length) return <div className={`bl${muted ? ' o' : ''}`}>در این هفته برگزار نمی‌شود</div>;
  return list.map((s) => {
    const start = SLOT_STARTS[s.slot];
    return (
      <div className={`bl${muted ? ' o' : ''}`} key={`${s.day}-${s.slot}`}>
        <em>{WEEKDAYS[s.day]}</em> • {formatClock(start)} تا {formatClock(start + SLOT_HOURS)} • {s.room}
      </div>
    );
  });
}

// اعلان بالای صفحه با جزئیات درس (مثل نوتیفیکیشن آیفون)
export default function Banner({ courseId, week, onClose }) {
  const [shownId, setShownId] = useState(courseId);
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  const touch = useRef({ startY: 0, dy: 0 });
  closeRef.current = onClose;

  // با هر درس جدید، متن عوض و تایمر بسته‌شدن دوباره شروع می‌شود
  useEffect(() => {
    if (!courseId) return undefined;
    setShownId(courseId);
    const timer = setTimeout(() => closeRef.current(), AUTO_HIDE_MS);
    return () => clearTimeout(timer);
  }, [courseId]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeRef.current();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const course = shownId ? COURSES[shownId] : null;
  const other = week === 'even' ? 'odd' : 'even';

  const onTouchStart = (e) => {
    touch.current = { startY: e.touches[0].clientY, dy: 0 };
    ref.current.classList.add('drag');
  };
  const onTouchMove = (e) => {
    const dy = e.touches[0].clientY - touch.current.startY;
    touch.current.dy = dy;
    if (dy < 0) ref.current.style.transform = `translate(-50%, ${dy}px)`;
  };
  const onTouchEnd = () => {
    ref.current.classList.remove('drag');
    ref.current.style.transform = '';
    if (touch.current.dy < -SWIPE_CLOSE_PX) onClose();
  };

  return (
    <div
      ref={ref}
      className={`bn${course ? ` tone-${course.tone}` : ''}${courseId ? ' show' : ''}`}
      role="status"
      aria-live="polite"
      onClick={() => touch.current.dy > -8 && onClose()}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {course && (
        <>
          <div className="bh">
            <span className="bi">📅</span>
            <span>برنامه کلاس</span>
            <span className="bn-time">الان</span>
          </div>
          <div className="bt">{course.name}</div>
          <div className="bu">{fa(course.units)} واحد</div>
          <div className="bw">{parityLabel(week)}</div>
          <Lines courseId={shownId} parity={week} />
          <div className="bw o">{parityLabel(other)}</div>
          <Lines courseId={shownId} parity={other} muted />
          <div className="grab" />
        </>
      )}
    </div>
  );
}

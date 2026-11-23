import { COURSES, WEEKDAYS } from '../data/courses';
import { examCountdown, examDate } from '../utils/exams';
import { dayIndex } from '../utils/week';
import { JALALI_MONTHS, fa, formatClock } from '../utils/format';

// یک امتحان با تاریخ، ساعت و تایمر معکوس
export default function ExamRow({ exam, now, index = 0, nearest = false }) {
  const course = COURSES[exam.course];
  const { state, text } = examCountdown(exam, now);
  const weekday = WEEKDAYS[dayIndex(examDate(exam))];
  const cls = `row tone-${course.tone}${state === 'done' ? ' off' : ''}${nearest ? ' nearest' : ''}`;

  return (
    <div className={cls} style={{ '--i': index }}>
      <div className="tm">
        <b>{fa(exam.date.jd)}</b>
        <span>{JALALI_MONTHS[exam.date.jm - 1]}</span>
      </div>
      <i className="bar" />
      <div className="inf">
        <b>{course.name}</b>
        <span>
          {weekday} • ساعت {formatClock(exam.time.h, exam.time.m)}
        </span>
        <span className={`count ${state}`}>{text}</span>
      </div>
    </div>
  );
}

import { COURSES, COURSE_ORDER, WEEKDAYS } from '../data/courses';
import { sessionsOfCourse } from '../utils/schedule';
import { fa } from '../utils/format';
import PageHeader from '../components/PageHeader';
import WeekSwitch from '../components/WeekSwitch';

export default function CoursesPage({ week, currentParity, onWeekChange, onSelectCourse }) {
  const totalUnits = COURSE_ORDER.reduce((sum, id) => sum + COURSES[id].units, 0);

  return (
    <>
      <PageHeader title="درس‌ها" subtitle={`${fa(COURSE_ORDER.length)} درس • ${fa(totalUnits)} واحد`} />
      <WeekSwitch value={week} current={currentParity} onChange={onWeekChange} />
      <div className="group">
        {COURSE_ORDER.map((id, i) => {
          const course = COURSES[id];
          const days = [...new Set(sessionsOfCourse(id, week).map((s) => WEEKDAYS[s.day]))];
          return (
            <div
              key={id}
              className={`row tone-${course.tone}`}
              style={{ '--i': i }}
              role="button"
              tabIndex={0}
              onClick={() => onSelectCourse(id)}
              onKeyDown={(e) => e.key === 'Enter' && onSelectCourse(id)}
            >
              <i className="bar" />
              <div className="inf">
                <b>{course.name}</b>
                <span>
                  {fa(course.units)} واحد • {days.join('، ')}
                </span>
              </div>
              <span className="chev">‹</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

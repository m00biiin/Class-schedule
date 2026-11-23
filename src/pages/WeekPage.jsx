import { DAYS } from '../data/courses';
import { dayIndex } from '../utils/week';
import { sessionsOnDay } from '../utils/schedule';
import { parityLabel } from '../utils/format';
import PageHeader from '../components/PageHeader';
import WeekSwitch from '../components/WeekSwitch';
import ClassRow from '../components/ClassRow';

export default function WeekPage({ now, week, currentParity, onWeekChange, onSelectCourse }) {
  const today = dayIndex(now);

  return (
    <>
      <PageHeader title="این هفته" subtitle={parityLabel(week)} />
      <WeekSwitch value={week} current={currentParity} onChange={onWeekChange} />
      {DAYS.map((name, d) => {
        const sessions = sessionsOnDay(d);
        if (!sessions.length) return null;
        return (
          <section key={name}>
            <div className="sec">
              {name}
              {d === today && <em>امروز</em>}
            </div>
            <div className="group">
              {sessions.map((s, i) => (
                <ClassRow key={`${s.day}-${s.slot}`} session={s} week={week} index={i} onSelect={onSelectCourse} />
              ))}
            </div>
          </section>
        );
      })}
      <p className="foot">دوشنبه و پنجشنبه کلاس نداری. هفته زوج یعنی شنبه‌ی آن هفته تاریخ زوج دارد.</p>
    </>
  );
}

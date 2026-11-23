import { useState } from 'react';
import { DAYS, WEEKDAYS } from '../data/courses';
import { dayIndex, toJalaliDate } from '../utils/week';
import { isHeld, sessionsOnDay } from '../utils/schedule';
import { fa, formatJalali, parityLabel } from '../utils/format';
import PageHeader from '../components/PageHeader';
import WeekSwitch from '../components/WeekSwitch';
import NextClassCard from '../components/NextClassCard';
import DayStrip from '../components/DayStrip';
import ClassRow from '../components/ClassRow';

export default function TodayPage({ now, week, currentParity, onWeekChange, onSelectCourse }) {
  const todayIndex = dayIndex(now);
  const [day, setDay] = useState(todayIndex > 5 ? 0 : todayIndex);

  const sessions = sessionsOnDay(day);
  const count = sessions.filter((s) => isHeld(s, week)).length;
  const subtitle = `${count ? `${fa(count)} کلاس` : 'بدون کلاس'} • ${parityLabel(week)}`;
  const dateLine = `${WEEKDAYS[todayIndex]} ${formatJalali(toJalaliDate(now))}`;

  return (
    <>
      <PageHeader eyebrow={dateLine} title={day === todayIndex ? 'امروز' : DAYS[day]} subtitle={subtitle} />
      <NextClassCard now={now} onSelect={onSelectCourse} />
      <WeekSwitch value={week} current={currentParity} onChange={onWeekChange} />
      <DayStrip selected={day} onSelect={setDay} />
      {sessions.length ? (
        <div className="group" key={`${day}-${week}`}>
          {sessions.map((s, i) => (
            <ClassRow key={`${s.day}-${s.slot}`} session={s} week={week} index={i} onSelect={onSelectCourse} />
          ))}
        </div>
      ) : (
        <div className="group">
          <div className="none">این روز کلاس نداری 🎉</div>
        </div>
      )}
    </>
  );
}

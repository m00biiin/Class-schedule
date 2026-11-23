import { useEffect, useState } from 'react';
import useNow from './hooks/useNow';
import { weekParity } from './utils/week';
import { haptic } from './utils/haptics';
import TabBar from './components/TabBar';
import Banner from './components/Banner';
import { TodayIcon, WeekIcon, CoursesIcon, ExamsIcon } from './components/Icons';
import TodayPage from './pages/TodayPage';
import WeekPage from './pages/WeekPage';
import CoursesPage from './pages/CoursesPage';
import ExamsPage from './pages/ExamsPage';

const TABS = [
  { id: 'today', label: 'امروز', Icon: TodayIcon },
  { id: 'week', label: 'هفته', Icon: WeekIcon },
  { id: 'courses', label: 'درس‌ها', Icon: CoursesIcon },
  { id: 'exams', label: 'امتحانات', Icon: ExamsIcon },
];

export default function App() {
  const now = useNow();
  const currentParity = weekParity(now); // هفته‌ی جاری به‌صورت خودکار
  const [tab, setTab] = useState('today');
  const [week, setWeek] = useState(currentParity); // کاربر می‌تواند هفته‌ی دیگر را هم ببیند
  const [courseId, setCourseId] = useState(null);

  // وقتی هفته‌ی جدید شروع شد، دوباره روی هفته‌ی جاری برگرد
  useEffect(() => {
    setWeek(currentParity);
  }, [currentParity]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab]);

  const shared = {
    now,
    week,
    currentParity,
    onWeekChange: (w) => {
      haptic(6);
      setWeek(w);
    },
    onSelectCourse: (id) => {
      haptic(10);
      setCourseId(id);
    },
  };

  return (
    <>
      <main className="app">
        <div className="page" key={tab}>
          {tab === 'today' && <TodayPage {...shared} />}
          {tab === 'week' && <WeekPage {...shared} />}
          {tab === 'courses' && <CoursesPage {...shared} />}
          {tab === 'exams' && <ExamsPage now={now} />}
        </div>
      </main>
      <TabBar tabs={TABS} active={tab} onChange={setTab} />
      <Banner courseId={courseId} week={week} onClose={() => setCourseId(null)} />
    </>
  );
}

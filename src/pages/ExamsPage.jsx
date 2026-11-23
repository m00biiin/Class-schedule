import { EXAMS } from '../data/exams';
import { examDate } from '../utils/exams';
import { fa } from '../utils/format';
import PageHeader from '../components/PageHeader';
import ExamRow from '../components/ExamRow';

export default function ExamsPage({ now }) {
  const exams = [...EXAMS].sort((a, b) => examDate(a) - examDate(b));
  const upcoming = exams.filter((e) => examDate(e) > now);
  const nearest = upcoming[0];
  const subtitle = upcoming.length ? `${fa(exams.length)} امتحان • ${fa(upcoming.length)} مانده` : 'همه‌ی امتحان‌ها برگزار شد';

  return (
    <>
      <PageHeader title="امتحانات" subtitle={subtitle} />
      <div className="group">
        {exams.map((exam, i) => (
          <ExamRow key={exam.course} exam={exam} now={now} index={i} nearest={exam === nearest} />
        ))}
      </div>
      <p className="foot">تایمر وقتی کمتر از یک روز مانده باشد، ساعت و دقیقه‌ی باقی‌مانده را نشان می‌دهد.</p>
    </>
  );
}

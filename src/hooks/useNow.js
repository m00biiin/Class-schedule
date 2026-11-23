import { useEffect, useState } from 'react';

// زمان فعلی که هر چند ثانیه و هنگام برگشتن به برنامه به‌روز می‌شود
export default function useNow(interval = 30000) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    const onVisible = () => {
      if (!document.hidden) tick();
    };
    const id = setInterval(tick, interval);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [interval]);

  return now;
}

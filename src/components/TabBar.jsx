import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { haptic } from '../utils/haptics';

// نوار تب شناور با انیمیشن «قطره‌ی مایع»:
// یک قطره‌ی کوچک اول به تب جدید می‌رود و حباب اصلی با تأخیر به آن می‌چسبد.
export default function TabBar({ tabs, active, onChange }) {
  const barRef = useRef(null);
  const buttons = useRef({});
  const pillRef = useRef(null);
  const dropRef = useRef(null);
  const ready = useRef(false);

  const place = useCallback((el, btn) => {
    el.style.left = `${btn.offsetLeft - 6}px`;
    el.style.width = `${btn.offsetWidth}px`;
  }, []);

  useLayoutEffect(() => {
    const btn = buttons.current[active];
    if (!btn) return undefined;
    const pill = pillRef.current;
    const drop = dropRef.current;

    // بار اول: بدون انیمیشن در جای درست قرار بگیر
    if (!ready.current) {
      place(pill, btn);
      place(drop, btn);
      ready.current = true;
      requestAnimationFrame(() => barRef.current?.classList.add('ready'));
      return undefined;
    }

    drop.style.left = `${btn.offsetLeft - 6 + btn.offsetWidth / 2 - 20}px`;
    drop.style.width = '40px';
    place(pill, btn);
    const timer = setTimeout(() => place(drop, btn), 420);
    return () => clearTimeout(timer);
  }, [active, place]);

  // اگر اندازه‌ی صفحه عوض شد، موقعیت را دوباره حساب کن
  useEffect(() => {
    const onResize = () => {
      const btn = buttons.current[active];
      if (!btn) return;
      place(pillRef.current, btn);
      place(dropRef.current, btn);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [active, place]);

  return (
    <nav className="tabs" ref={barRef} aria-label="بخش‌های برنامه">
      <svg width="0" height="0" className="goo-defs" aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
            <feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
          </filter>
        </defs>
      </svg>
      <div className="goo" aria-hidden="true">
        <i className="goo-pill" ref={pillRef} />
        <i className="goo-drop" ref={dropRef} />
      </div>
      {tabs.map(({ id, label, Icon }) => (
        <button
          key={id}
          ref={(el) => {
            buttons.current[id] = el;
          }}
          className={id === active ? 'on' : ''}
          aria-current={id === active ? 'page' : undefined}
          onClick={() => {
            if (id === active) return;
            haptic(8);
            onChange(id);
          }}
        >
          <Icon />
          {label}
        </button>
      ))}
    </nav>
  );
}

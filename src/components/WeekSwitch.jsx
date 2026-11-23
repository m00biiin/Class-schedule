const OPTIONS = [
  { id: 'even', label: 'هفته زوج' },
  { id: 'odd', label: 'هفته فرد' },
];

// کلید انتخاب هفته زوج یا فرد؛ نقطه‌ی کوچک کنار هفته‌ی جاری است
export default function WeekSwitch({ value, current, onChange }) {
  return (
    <div className="seg" role="tablist" aria-label="انتخاب هفته">
      {OPTIONS.map(({ id, label }) => (
        <button
          key={id}
          role="tab"
          aria-selected={value === id}
          className={value === id ? 'on' : ''}
          onClick={() => onChange(id)}
        >
          {label}
          {current === id && <i className="cur" title="هفته‌ی جاری" />}
        </button>
      ))}
    </div>
  );
}

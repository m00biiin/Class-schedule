// آیکون‌های نوار پایین (خطی، هم‌اندازه با متن)
const Svg = ({ children }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    {children}
  </svg>
);

export const TodayIcon = () => (
  <Svg>
    <rect x="3.5" y="5" width="17" height="15.5" rx="3.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
    <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none" />
  </Svg>
);

export const WeekIcon = () => (
  <Svg>
    <rect x="3.5" y="5" width="17" height="15.5" rx="3.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4M8.5 14h.01M12 14h.01M15.5 14h.01M8.5 17.2h.01M12 17.2h.01" />
  </Svg>
);

export const CoursesIcon = () => (
  <Svg>
    <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15H7.5A2.5 2.5 0 0 0 5 20.5v-15z" />
    <path d="M5 20.5A2.5 2.5 0 0 0 7.5 21H19v-3M9 7.5h6" />
  </Svg>
);

export const ExamsIcon = () => (
  <Svg>
    <path d="M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1z" />
    <path d="M8 6H6.5A1.5 1.5 0 0 0 5 7.5v12A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 17.5 6H16" />
    <path d="M9 14l2 2 4-4" />
  </Svg>
);

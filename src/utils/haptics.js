// لرزش خفیف (فقط روی دستگاه‌هایی که پشتیبانی می‌کنند، مثل اندروید)
export function haptic(ms = 8) {
  if (typeof navigator === 'undefined' || !navigator.vibrate) return;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  navigator.vibrate(ms);
}

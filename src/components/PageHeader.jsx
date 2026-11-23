// عنوان بزرگ هر صفحه (مثل عنوان بزرگ iOS)
export default function PageHeader({ title, subtitle, eyebrow }) {
  return (
    <header>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      <p className="sub">{subtitle}</p>
    </header>
  );
}

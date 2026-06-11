export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && (
        <p className="eyebrow text-xs text-rust mb-3">{eyebrow}</p>
      )}
      <h2 className="font-serif text-3xl md:text-4xl text-walnut-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-walnut-700/80 leading-relaxed">{subtitle}</p>
      )}
      <div
        className={`mt-5 h-px w-16 bg-gold-400 ${center ? "mx-auto" : ""}`}
      />
    </div>
  );
}

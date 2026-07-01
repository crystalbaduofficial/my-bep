import { ReactNode } from "react";

interface SectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  centered?: boolean;
  id?: string;
}

export function Section({
  title,
  subtitle,
  description,
  children,
  className = "",
  centered = false,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-20 md:py-32 px-4 md:px-8 relative z-10 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {(title || subtitle || description) && (
          <div className={`mb-16 ${centered ? "text-center" : ""}`}>
            {subtitle && (
              <p className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-2">
                {subtitle}
              </p>
            )}
            {title && <h2 className="heading-2 mb-4">{title}</h2>}
            {description && (
              <p className="subtext max-w-2xl">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

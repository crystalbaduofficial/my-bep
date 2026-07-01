import { ReactNode } from "react";

interface PremiumCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
  href?: string;
}

export function PremiumCard({
  icon,
  title,
  description,
  children,
  className = "",
  href,
}: PremiumCardProps) {
  const content = (
    <div className={`premium-card group ${className}`}>
      {icon && <div className="mb-4 text-blue-400">{icon}</div>}
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      {children}
      {href && (
        <div className="mt-4 text-blue-400 text-sm font-medium group-hover:text-blue-300 transition">
          Learn more →
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block no-underline">
        {content}
      </a>
    );
  }

  return content;
}

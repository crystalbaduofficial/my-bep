import React from "react";
import clsx from "clsx";

interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
}

export default function GlassCard({
  children,
  interactive = true,
  className,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={clsx(
        "glass-card",
        interactive && "hover:shadow-xl hover:shadow-blue-500/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

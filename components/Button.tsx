interface ButtonProps {
  href: string;
  variant: "primary" | "secondary" | "ghost";
  size: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({ href, variant, size, children }: ButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg",
  };

  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
  };

  return (
    <a
      href={href}
      className={`${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </a>
  );
}

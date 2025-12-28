import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpinningGradientButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  asChild?: boolean;
  size?: "default" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function SpinningGradientButton({
  children,
  className,
  onClick,
  size = "default",
  href,
  target,
  rel,
  type = "button",
  disabled = false,
}: SpinningGradientButtonProps) {
  const sizeClasses = size === "lg" ? "h-12 px-8 text-base" : "h-10 px-6 text-sm";
  
  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2 w-full">
      {children}
    </span>
  );

  const buttonClasses = cn(
    "group relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300",
    "bg-background/80 dark:bg-background/60 backdrop-blur-md",
    "text-foreground",
    "hover:scale-[1.02] active:scale-[0.98]",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
    sizeClasses,
    className
  );

  const gradientWrapper = (
    <>
      {/* Sliding gradient border */}
      <span className="absolute inset-0 rounded-lg overflow-hidden">
        <span 
          className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #3b82f6 20%, #8b5cf6 50%, #ec4899 80%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "slideGradient 3s linear infinite",
          }}
        />
      </span>
      {/* Inner background */}
      <span className="absolute inset-[1.5px] rounded-[7px] bg-background/95 dark:bg-background/90 backdrop-blur-xl" />
      {/* Subtle glow on hover */}
      <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
      {content}
      
      <style>{`
        @keyframes slideGradient {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={buttonClasses}
        onClick={onClick}
      >
        {gradientWrapper}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {gradientWrapper}
    </button>
  );
}

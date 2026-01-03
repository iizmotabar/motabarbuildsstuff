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
      {/* Subtle sliding gradient border - lighter colors */}
      <span className="absolute inset-0 rounded-lg overflow-hidden">
        <span 
          className="absolute inset-0 opacity-60 group-hover:opacity-90 transition-opacity duration-500"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(192, 162, 255, 0.7) 30%, rgba(147, 197, 253, 0.7) 70%, transparent 100%)",
            backgroundSize: "300% 100%",
            animation: "slideGradient 5s ease-in-out infinite",
          }}
        />
      </span>
      {/* Inner background */}
      <span className="absolute inset-[1px] rounded-[7px] bg-background dark:bg-background/95 backdrop-blur-xl" />
      {content}
      
      <style>{`
        @keyframes slideGradient {
          0%, 100% {
            background-position: 200% 0;
          }
          50% {
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

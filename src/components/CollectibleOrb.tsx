import { useState } from "react";
import { cn } from "@/lib/utils";

interface CollectibleOrbProps {
  id: string;
  className?: string;
}

export function CollectibleOrb({ id, className }: CollectibleOrbProps) {
  const [collected, setCollected] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCollect = () => {
    if (collected) return;
    
    setIsAnimating(true);
    setCollected(true);
    
    // Call global collect function
    if ((window as any).collectOrb) {
      (window as any).collectOrb(id);
    }
  };

  if (collected) return null;

  return (
    <button
      onClick={handleCollect}
      className={cn(
        "absolute z-20 group cursor-pointer",
        "h-8 w-8 rounded-full",
        "transition-all duration-300 hover:scale-125",
        isAnimating && "animate-ping",
        className
      )}
      aria-label="Collect orb"
    >
      {/* Large outer glow - more visible */}
      <span className="absolute -inset-3 rounded-full bg-purple-500/10 blur-xl animate-pulse" />
      
      {/* Pulsing ring */}
      <span 
        className="absolute inset-0 rounded-full border border-purple-400/40"
        style={{ animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite" }}
      />
      
      {/* Secondary ring */}
      <span 
        className="absolute inset-1 rounded-full border border-purple-400/20"
        style={{ animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s" }}
      />
      
      {/* Core orb */}
      <span 
        className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-400 via-purple-500 to-blue-500 group-hover:from-purple-300 group-hover:to-blue-400 transition-all shadow-lg shadow-purple-500/50"
        style={{
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      />
      
      {/* Inner sparkle */}
      <span className="absolute top-2.5 left-3 h-1.5 w-1.5 rounded-full bg-white/90" />
      <span className="absolute top-3.5 left-2.5 h-1 w-1 rounded-full bg-white/60" />
      
      {/* Floating particles effect */}
      <span 
        className="absolute -top-1 left-1/2 h-1 w-1 rounded-full bg-purple-400/60"
        style={{ animation: "float 3s ease-in-out infinite" }}
      />
      <span 
        className="absolute top-1/2 -right-1 h-0.5 w-0.5 rounded-full bg-blue-400/60"
        style={{ animation: "float 3s ease-in-out infinite 1s" }}
      />
      
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-4px) scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </button>
  );
}

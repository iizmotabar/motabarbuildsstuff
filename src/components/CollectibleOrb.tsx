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
        "h-6 w-6 rounded-full",
        "transition-all duration-300",
        isAnimating && "animate-ping",
        className
      )}
      title="Click to collect!"
    >
      {/* Outer glow */}
      <span className="absolute inset-0 rounded-full bg-purple-500/20 blur-md group-hover:bg-purple-500/40 transition-all" />
      
      {/* Pulsing ring */}
      <span className="absolute inset-0 rounded-full border border-purple-500/30 animate-ping opacity-75" />
      
      {/* Core orb */}
      <span 
        className="absolute inset-1 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 group-hover:from-purple-300 group-hover:to-blue-400 transition-all shadow-lg shadow-purple-500/30"
        style={{
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      />
      
      {/* Sparkle */}
      <span className="absolute top-1 left-1.5 h-1 w-1 rounded-full bg-white/80" />
    </button>
  );
}

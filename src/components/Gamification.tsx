import { useEffect, useState, useCallback } from "react";
import { Trophy, ChevronUp, Sparkles, HelpCircle, X } from "lucide-react";

interface Collectible {
  id: string;
  collected: boolean;
}

export function Gamification() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [collectibles, setCollectibles] = useState<Collectible[]>([
    { id: "hero", collected: false },
    { id: "services", collected: false },
    { id: "packages", collected: false },
    { id: "contact", collected: false },
  ]);
  const [showCollected, setShowCollected] = useState(false);
  const [lastCollected, setLastCollected] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);

  const collectedCount = collectibles.filter(c => c.collected).length;
  const totalCollectibles = collectibles.length;

  const collectOrb = useCallback((id: string) => {
    setCollectibles(prev => {
      const item = prev.find(c => c.id === id);
      if (item && !item.collected) {
        setLastCollected(id);
        setShowCollected(true);
        setHintDismissed(true); // Hide hint after first collection
        setTimeout(() => setShowCollected(false), 2000);
        return prev.map(c => c.id === id ? { ...c, collected: true } : c);
      }
      return prev;
    });
  }, []);

  // Expose collectOrb globally for orbs to call
  useEffect(() => {
    (window as any).collectOrb = collectOrb;
    return () => {
      delete (window as any).collectOrb;
    };
  }, [collectOrb]);

  // Show hint after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hintDismissed && collectedCount === 0) {
        setShowHint(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [hintDismissed, collectedCount]);

  // Auto-hide hint after some time
  useEffect(() => {
    if (showHint) {
      const timer = setTimeout(() => {
        setShowHint(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [showHint]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const allCollected = collectedCount === totalCollectibles;

  return (
    <>
      {/* Subtle scroll progress - thin line at top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-orange-500/50 to-amber-500/50 transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Onboarding hint */}
      <div
        className={`fixed bottom-20 right-5 z-50 max-w-[220px] transition-all duration-500 ${
          showHint && !hintDismissed
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-md border border-orange-500/20 rounded-xl p-4 shadow-xl shadow-orange-500/10">
          <button
            onClick={() => setHintDismissed(true)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-4 w-4 text-orange-400" />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground mb-1">Hidden orbs!</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Look for glowing orange orbs scattered across the page. Click them to collect!
              </p>
            </div>
          </div>
          {/* Arrow pointing to indicator */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-background/95 border-r border-b border-orange-500/20 transform rotate-45" />
        </div>
      </div>

      {/* Minimal collectible counter - bottom right */}
      <div
        className="fixed bottom-5 right-5 z-40"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Tooltip on hover */}
        <div
          className={`absolute bottom-14 right-0 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div className="bg-background/90 backdrop-blur-md border border-border/40 rounded-lg px-3 py-2 shadow-lg text-xs whitespace-nowrap">
            <p className="text-muted-foreground">
              {allCollected ? "All orbs found! 🎉" : `${collectedCount}/${totalCollectibles} orbs collected`}
            </p>
            <div className="flex gap-1 mt-1.5">
              {collectibles.map(c => (
                <div
                  key={c.id}
                  className={`h-2 w-2 rounded-full transition-all ${
                    c.collected 
                      ? "bg-gradient-to-r from-orange-500 to-amber-500" 
                      : "bg-muted/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Compact indicator */}
        <div className={`relative h-10 w-10 cursor-pointer transition-transform ${isHovered ? "scale-110" : ""}`}>
          <div className="absolute inset-0 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 shadow-md" />
          
          {/* Pulsing ring for attention when no orbs collected */}
          {collectedCount === 0 && !hintDismissed && (
            <span className="absolute inset-0 rounded-full border-2 border-orange-500/30 animate-ping" />
          )}
          
          {/* Progress ring */}
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 40 40">
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted/20"
            />
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="url(#collectGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${(collectedCount / totalCollectibles) * 100} 100`}
              className="transition-all duration-700"
            />
            <defs>
              <linearGradient id="collectGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            {allCollected ? (
              <Trophy className="h-4 w-4 text-yellow-500" />
            ) : collectedCount > 0 ? (
              <span className="text-xs font-bold text-foreground">{collectedCount}</span>
            ) : (
              <HelpCircle className="h-4 w-4 text-orange-400/70" />
            )}
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-5 left-5 z-40 h-9 w-9 rounded-full bg-background/70 backdrop-blur-sm border border-border/40 shadow-md flex items-center justify-center hover:bg-background/90 transition-all duration-300 ${
          scrollProgress > 40 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ChevronUp className="h-4 w-4 text-muted-foreground" />
      </button>

      {/* Collection toast */}
      <div
        className={`fixed bottom-20 right-5 z-50 flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10 backdrop-blur-md border border-orange-500/20 shadow-lg transition-all duration-400 ${
          showCollected
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <Sparkles className="h-4 w-4 text-orange-400" />
        <span className="text-xs font-medium text-foreground">
          +1 orb! ({collectedCount}/{totalCollectibles})
        </span>
      </div>
    </>
  );
}

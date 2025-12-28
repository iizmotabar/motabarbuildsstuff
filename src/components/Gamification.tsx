import { useEffect, useState, useCallback } from "react";
import { Sparkles, Trophy, ChevronUp } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
}

export function Gamification() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionsVisited, setSectionsVisited] = useState<Set<string>>(new Set());
  const [clicks, setClicks] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [latestAchievement, setLatestAchievement] = useState<Achievement | null>(null);
  
  const totalSections = 9;

  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: "explorer", title: "Explorer", icon: "🔍", unlocked: false },
    { id: "curious", title: "Curious", icon: "🧠", unlocked: false },
    { id: "dedicated", title: "Dedicated", icon: "⭐", unlocked: false },
    { id: "clicker", title: "Clicker", icon: "👆", unlocked: false },
    { id: "scroll", title: "Deep Diver", icon: "🏊", unlocked: false },
  ]);

  const unlockAchievement = useCallback((id: string) => {
    setAchievements(prev => {
      const achievement = prev.find(a => a.id === id);
      if (achievement && !achievement.unlocked) {
        setLatestAchievement({ ...achievement, unlocked: true });
        setShowAchievement(true);
        setTimeout(() => setShowAchievement(false), 2500);
        return prev.map(a => a.id === id ? { ...a, unlocked: true } : a);
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const id = section.getAttribute("id");
        if (rect.top < window.innerHeight * 0.6 && rect.bottom > 0 && id) {
          setSectionsVisited(prev => new Set([...prev, id]));
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = () => setClicks(prev => prev + 1);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (sectionsVisited.size >= 3) unlockAchievement("explorer");
    if (sectionsVisited.size >= 5) unlockAchievement("curious");
    if (sectionsVisited.size >= totalSections) unlockAchievement("dedicated");
    if (clicks >= 15) unlockAchievement("clicker");
    if (scrollProgress >= 85) unlockAchievement("scroll");
  }, [sectionsVisited.size, clicks, scrollProgress, unlockAchievement]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const progressPercent = (sectionsVisited.size / totalSections) * 100;

  return (
    <>
      {/* Subtle scroll progress - thin line at top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-purple-500/60 to-blue-500/60 transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Minimal floating indicator - bottom right */}
      <div
        className="fixed bottom-5 right-5 z-40"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Expanded state */}
        <div
          className={`absolute bottom-0 right-0 transition-all duration-300 ease-out ${
            isHovered 
              ? "opacity-100 translate-y-0 pointer-events-auto" 
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div className="bg-background/80 backdrop-blur-md border border-border/40 rounded-xl p-3 mb-14 shadow-lg min-w-[140px]">
            <p className="text-[10px] text-muted-foreground mb-2">Badges</p>
            <div className="flex gap-1.5">
              {achievements.map(a => (
                <div
                  key={a.id}
                  className={`h-6 w-6 rounded text-xs flex items-center justify-center transition-all ${
                    a.unlocked 
                      ? "bg-yellow-500/10 border border-yellow-500/30" 
                      : "bg-muted/20 border border-border/20 opacity-30"
                  }`}
                  title={a.unlocked ? a.title : "???"}
                >
                  {a.unlocked ? a.icon : "?"}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compact circular indicator */}
        <div className="relative h-11 w-11 cursor-pointer">
          {/* Background circle */}
          <div className="absolute inset-0 rounded-full bg-background/70 backdrop-blur-sm border border-border/40 shadow-md" />
          
          {/* Progress ring */}
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted/20"
            />
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${progressPercent * 1.13} 113`}
              className="transition-all duration-500"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            {unlockedCount > 0 ? (
              <span className="text-xs font-bold text-foreground">{unlockedCount}</span>
            ) : (
              <Sparkles className="h-3.5 w-3.5 text-purple-400/70" />
            )}
          </div>
        </div>
      </div>

      {/* Scroll to top - appears after scrolling */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-5 left-5 z-40 h-9 w-9 rounded-full bg-background/70 backdrop-blur-sm border border-border/40 shadow-md flex items-center justify-center hover:bg-background/90 transition-all duration-300 ${
          scrollProgress > 40 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ChevronUp className="h-4 w-4 text-muted-foreground" />
      </button>

      {/* Subtle achievement toast */}
      <div
        className={`fixed bottom-20 right-5 z-50 flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/10 backdrop-blur-md border border-yellow-500/20 shadow-lg transition-all duration-400 ${
          showAchievement
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <span className="text-base">{latestAchievement?.icon}</span>
        <div>
          <p className="text-[10px] text-yellow-500/80">Unlocked</p>
          <p className="text-xs font-medium text-foreground">{latestAchievement?.title}</p>
        </div>
      </div>
    </>
  );
}

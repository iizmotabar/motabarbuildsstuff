import { useEffect, useState, useCallback } from "react";
import { Sparkles, Trophy, ChevronUp, Eye, MousePointer } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export function Gamification() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionsVisited, setSectionsVisited] = useState<Set<string>>(new Set());
  const [clicks, setClicks] = useState(0);
  const [showWidget, setShowWidget] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [latestAchievement, setLatestAchievement] = useState<Achievement | null>(null);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const totalSections = 9;

  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: "explorer", title: "Explorer", description: "Visit 3 sections", icon: "🔍", unlocked: false },
    { id: "curious", title: "Curious Mind", description: "Visit 5 sections", icon: "🧠", unlocked: false },
    { id: "dedicated", title: "Dedicated", description: "Visit all sections", icon: "⭐", unlocked: false },
    { id: "clicker", title: "Click Master", description: "Click 10 times", icon: "👆", unlocked: false },
    { id: "scroll", title: "Deep Diver", description: "Scroll to 80%", icon: "🏊", unlocked: false },
  ]);

  const unlockAchievement = useCallback((id: string) => {
    setAchievements(prev => {
      const achievement = prev.find(a => a.id === id);
      if (achievement && !achievement.unlocked) {
        setLatestAchievement({ ...achievement, unlocked: true });
        setShowAchievement(true);
        setTimeout(() => setShowAchievement(false), 3000);
        return prev.map(a => a.id === id ? { ...a, unlocked: true } : a);
      }
      return prev;
    });
  }, []);

  // Track scroll and sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Show widget after some scrolling
      if (scrollTop > 200) setShowWidget(true);

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

  // Track clicks for interactivity
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      setClicks(prev => prev + 1);
      
      // Create sparkle effect
      const sparkle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setSparkles(prev => [...prev, sparkle]);
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== sparkle.id));
      }, 600);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Check achievements
  useEffect(() => {
    if (sectionsVisited.size >= 3) unlockAchievement("explorer");
    if (sectionsVisited.size >= 5) unlockAchievement("curious");
    if (sectionsVisited.size >= totalSections) unlockAchievement("dedicated");
    if (clicks >= 10) unlockAchievement("clicker");
    if (scrollProgress >= 80) unlockAchievement("scroll");
  }, [sectionsVisited.size, clicks, scrollProgress, unlockAchievement]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const explorationScore = Math.round((sectionsVisited.size / totalSections) * 100);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted/30">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-150 ease-out shadow-sm shadow-purple-500/50"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Click Sparkles */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="fixed z-50 pointer-events-none"
          style={{ left: sparkle.x, top: sparkle.y }}
        >
          <Sparkles className="h-6 w-6 text-yellow-400 animate-ping" />
        </div>
      ))}

      {/* Main Widget - Bottom Right */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${
          showWidget ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        <div className="bg-background/90 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-purple-500/10 overflow-hidden w-64">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-b border-border/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Eye className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Exploration</p>
                  <p className="text-sm font-bold text-foreground">{explorationScore}% Complete</p>
                </div>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                <Trophy className="h-3 w-3 text-yellow-500" />
                <span className="text-xs font-bold text-yellow-500">{unlockedCount}/{achievements.length}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-4 py-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Sections Discovered</span>
              <span className="font-medium text-foreground">{sectionsVisited.size}/{totalSections}</span>
            </div>
            <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${(sectionsVisited.size / totalSections) * 100}%` }}
              />
            </div>
          </div>

          {/* Achievements */}
          <div className="px-4 pb-3">
            <p className="text-xs text-muted-foreground mb-2">Achievements</p>
            <div className="flex gap-2 flex-wrap">
              {achievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`h-8 w-8 rounded-lg flex items-center justify-center text-sm transition-all duration-300 cursor-default ${
                    achievement.unlocked
                      ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 scale-100"
                      : "bg-muted/30 border border-border/30 grayscale opacity-40"
                  }`}
                  title={achievement.unlocked ? `${achievement.title}: ${achievement.description}` : "???"}
                >
                  {achievement.unlocked ? achievement.icon : "?"}
                </div>
              ))}
            </div>
          </div>

          {/* Hint */}
          <div className="px-4 py-2 bg-muted/20 border-t border-border/30">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MousePointer className="h-3 w-3" />
              <span>Scroll & explore to unlock badges!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 left-6 z-40 h-12 w-12 rounded-full bg-background/90 backdrop-blur-md border border-border/50 shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 ${
          scrollProgress > 30 ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        <ChevronUp className="h-5 w-5 text-foreground" />
      </button>

      {/* Achievement Popup */}
      <div
        className={`fixed top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 backdrop-blur-xl border border-yellow-500/30 shadow-2xl shadow-yellow-500/20 transition-all duration-500 ${
          showAchievement
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-8 scale-95 pointer-events-none"
        }`}
      >
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl shadow-lg">
          {latestAchievement?.icon}
        </div>
        <div>
          <p className="text-xs font-medium text-yellow-500">Achievement Unlocked!</p>
          <p className="text-lg font-bold text-foreground">{latestAchievement?.title}</p>
          <p className="text-xs text-muted-foreground">{latestAchievement?.description}</p>
        </div>
      </div>
    </>
  );
}

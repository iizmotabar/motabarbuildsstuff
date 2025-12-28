import { useEffect, useState } from "react";
import { Database, Zap, Trophy, Star } from "lucide-react";

export function Gamification() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dataPoints, setDataPoints] = useState(0);
  const [sectionsVisited, setSectionsVisited] = useState<Set<string>>(new Set());
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementText, setAchievementText] = useState("");

  const achievements = [
    { threshold: 3, text: "Data Explorer 🔍", icon: "search" },
    { threshold: 5, text: "Insight Hunter 📊", icon: "chart" },
    { threshold: 7, text: "Analytics Pro ⚡", icon: "zap" },
    { threshold: 9, text: "Data Master 🏆", icon: "trophy" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Check which sections are in view
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const id = section.getAttribute("id");
        if (rect.top < window.innerHeight * 0.5 && rect.bottom > 0 && id) {
          setSectionsVisited((prev) => {
            const newSet = new Set(prev);
            if (!newSet.has(id)) {
              newSet.add(id);
              // Increment data points when new section is visited
              setDataPoints((p) => p + Math.floor(Math.random() * 50) + 20);
            }
            return newSet;
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check for achievements
  useEffect(() => {
    const count = sectionsVisited.size;
    const achievement = achievements.find((a) => a.threshold === count);
    if (achievement) {
      setAchievementText(achievement.text);
      setShowAchievement(true);
      setTimeout(() => setShowAchievement(false), 3000);
    }
  }, [sectionsVisited.size]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-background/50 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Data Points Counter */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-3 px-4 py-3 rounded-full bg-background/80 backdrop-blur-md border border-border/50 shadow-lg shadow-purple-500/10 group hover:scale-105 transition-transform cursor-default">
        <div className="relative">
          <Database className="h-5 w-5 text-purple-400" />
          <div className="absolute -top-1 -right-1 h-2 w-2 bg-green-400 rounded-full animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Data Points</span>
          <span className="text-lg font-bold text-foreground tabular-nums">
            {dataPoints.toLocaleString()}
          </span>
        </div>
        <Zap className="h-4 w-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Sections Discovered */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border/50 shadow-lg shadow-purple-500/10">
        <Star className="h-4 w-4 text-yellow-400" />
        <span className="text-sm font-medium text-foreground">
          {sectionsVisited.size}/9 sections
        </span>
      </div>

      {/* Achievement Popup */}
      <div
        className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border border-yellow-500/30 shadow-lg shadow-yellow-500/20 transition-all duration-500 ${
          showAchievement
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <Trophy className="h-6 w-6 text-yellow-400" />
        <div className="flex flex-col">
          <span className="text-xs text-yellow-400/80 font-medium">Achievement Unlocked!</span>
          <span className="text-base font-bold text-foreground">{achievementText}</span>
        </div>
      </div>
    </>
  );
}

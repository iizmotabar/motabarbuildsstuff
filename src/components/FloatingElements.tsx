import { useEffect, useState } from "react";
import { 
  Database, 
  Cloud, 
  BarChart3, 
  Code2, 
  Workflow, 
  Layers,
  Terminal,
  GitBranch,
  Cpu,
  Server,
  PieChart,
  LineChart
} from "lucide-react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "code" | "data" | "icon" | "dot" | "ring" | "cross";
  content?: string;
  iconIndex?: number;
}

const codeSnippets = ["SELECT", "JOIN", "WHERE", "dbt", "pip", "git", "npm", "SQL", "ETL", "API"];
const dataSymbols = ["{ }", "[ ]", "< />", "=>", "::", "//", "##", "$$"];

const icons = [Database, Cloud, BarChart3, Code2, Workflow, Layers, Terminal, GitBranch, Cpu, Server, PieChart, LineChart];

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const newElements: FloatingElement[] = Array.from({ length: 45 }, (_, i) => {
      const types: FloatingElement["type"][] = ["code", "data", "icon", "dot", "ring", "cross"];
      const type = types[Math.floor(Math.random() * types.length)];
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 24 + 12,
        duration: Math.random() * 40 + 25,
        delay: Math.random() * 15,
        type,
        content: type === "code" 
          ? codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
          : dataSymbols[Math.floor(Math.random() * dataSymbols.length)],
        iconIndex: Math.floor(Math.random() * icons.length),
      };
    });
    setElements(newElements);
  }, []);

  const renderElement = (el: FloatingElement) => {
    const baseOpacity = "opacity-[0.03] dark:opacity-[0.05]";
    
    switch (el.type) {
      case "code":
        return (
          <span 
            className={`font-mono text-orange-400 ${baseOpacity} whitespace-nowrap font-medium`} 
            style={{ fontSize: el.size * 0.6 }}
          >
            {el.content}
          </span>
        );
      case "data":
        return (
          <span 
            className={`font-mono text-amber-400 ${baseOpacity} font-bold`} 
            style={{ fontSize: el.size * 0.7 }}
          >
            {el.content}
          </span>
        );
      case "icon": {
        const IconComponent = icons[el.iconIndex || 0];
        return (
          <IconComponent 
            className={`text-orange-400 ${baseOpacity}`}
            style={{ width: el.size, height: el.size }}
            strokeWidth={1.5}
          />
        );
      }
      case "dot":
        return (
          <div
            className={`rounded-full bg-gradient-to-br from-orange-500 to-amber-500 ${baseOpacity}`}
            style={{ width: el.size * 0.25, height: el.size * 0.25 }}
          />
        );
      case "ring":
        return (
          <div
            className={`rounded-full border border-orange-400/30 ${baseOpacity}`}
            style={{ width: el.size, height: el.size }}
          />
        );
      case "cross":
        return (
          <div className={`relative ${baseOpacity}`} style={{ width: el.size * 0.5, height: el.size * 0.5 }}>
            <div className="absolute top-1/2 left-0 w-full h-px bg-orange-400 -translate-y-1/2" />
            <div className="absolute top-0 left-1/2 w-px h-full bg-orange-400 -translate-x-1/2" />
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-float"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            animationDuration: `${el.duration}s`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {renderElement(el)}
        </div>
      ))}
      
      {/* Subtle grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] dark:opacity-[0.025]">
        <defs>
          <pattern id="floatGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="currentColor" className="text-orange-500" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#floatGrid)" />
      </svg>

      {/* Connecting constellation lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02] dark:opacity-[0.03]">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(25, 95%, 55%)" />
            <stop offset="100%" stopColor="hsl(35, 100%, 50%)" />
          </linearGradient>
        </defs>
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1={`${5 + i * 8}%`}
            y1={`${15 + Math.sin(i * 0.8) * 25}%`}
            x2={`${12 + i * 8}%`}
            y2={`${55 + Math.cos(i * 0.6) * 25}%`}
            stroke="url(#lineGrad)"
            strokeWidth="0.5"
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <circle
            key={`node-${i}`}
            cx={`${10 + i * 12}%`}
            cy={`${30 + Math.sin(i) * 20}%`}
            r="2"
            fill="url(#lineGrad)"
          />
        ))}
      </svg>
    </div>
  );
}

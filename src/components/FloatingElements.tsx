import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "code" | "data" | "bracket" | "dot" | "line";
  content?: string;
}

const codeSnippets = ["SELECT *", "JOIN", "WHERE", "GROUP BY", "dbt run", "pip install", "npm i", "git push"];
const dataSymbols = ["{ }", "[ ]", "< />", "=>", "::"];

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const newElements: FloatingElement[] = Array.from({ length: 30 }, (_, i) => {
      const type = ["code", "data", "bracket", "dot", "line"][Math.floor(Math.random() * 5)] as FloatingElement["type"];
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 15,
        duration: Math.random() * 30 + 20,
        delay: Math.random() * 10,
        type,
        content: type === "code" 
          ? codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
          : dataSymbols[Math.floor(Math.random() * dataSymbols.length)],
      };
    });
    setElements(newElements);
  }, []);

  const renderElement = (el: FloatingElement) => {
    const baseOpacity = "opacity-[0.04] dark:opacity-[0.06]";
    
    switch (el.type) {
      case "code":
        return (
          <span 
            className={`font-mono text-blue-500 ${baseOpacity} whitespace-nowrap`} 
            style={{ fontSize: el.size * 0.5 }}
          >
            {el.content}
          </span>
        );
      case "data":
        return (
          <span 
            className={`font-mono text-purple-500 ${baseOpacity} font-bold`} 
            style={{ fontSize: el.size * 0.7 }}
          >
            {el.content}
          </span>
        );
      case "bracket":
        return (
          <span 
            className={`font-mono text-cyan-500 ${baseOpacity}`} 
            style={{ fontSize: el.size }}
          >
            {"<>"}
          </span>
        );
      case "dot":
        return (
          <div
            className={`rounded-full bg-gradient-to-r from-blue-500 to-purple-500 ${baseOpacity}`}
            style={{ width: el.size * 0.3, height: el.size * 0.3 }}
          />
        );
      case "line":
        return (
          <div
            className={`bg-gradient-to-r from-blue-500/50 to-purple-500/50 ${baseOpacity} rounded-full`}
            style={{ width: el.size * 2, height: 2 }}
          />
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
      
      {/* Connecting lines effect */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02] dark:opacity-[0.03]">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
            <stop offset="100%" stopColor="hsl(271, 81%, 56%)" />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1={`${10 + i * 12}%`}
            y1={`${20 + Math.sin(i) * 30}%`}
            x2={`${20 + i * 12}%`}
            y2={`${60 + Math.cos(i) * 20}%`}
            stroke="url(#lineGrad)"
            strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  );
}

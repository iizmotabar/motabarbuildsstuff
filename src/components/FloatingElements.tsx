import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "circle" | "square" | "code" | "bracket";
}

const codeSnippets = ["</>", "{}", "[]", "=>", "01", "&&", "||", "::"];

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const newElements: FloatingElement[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 20,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      type: ["circle", "square", "code", "bracket"][Math.floor(Math.random() * 4)] as FloatingElement["type"],
    }));
    setElements(newElements);
  }, []);

  const renderElement = (el: FloatingElement) => {
    const baseClasses = "absolute opacity-[0.03] dark:opacity-[0.05]";
    
    switch (el.type) {
      case "circle":
        return (
          <div
            className={`${baseClasses} rounded-full border-2 border-foreground`}
            style={{ width: el.size, height: el.size }}
          />
        );
      case "square":
        return (
          <div
            className={`${baseClasses} rounded-lg border-2 border-foreground rotate-45`}
            style={{ width: el.size * 0.8, height: el.size * 0.8 }}
          />
        );
      case "code":
        return (
          <span className={`${baseClasses} font-mono text-foreground font-bold`} style={{ fontSize: el.size * 0.6 }}>
            {codeSnippets[el.id % codeSnippets.length]}
          </span>
        );
      case "bracket":
        return (
          <span className={`${baseClasses} font-mono text-foreground font-light`} style={{ fontSize: el.size }}>
            {"<>"}
          </span>
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
    </div>
  );
}

export function GradientOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Primary orb - deep burnt orange - top right */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-20 dark:opacity-[0.08] blur-[160px] animate-orb-1"
        style={{
          background: "radial-gradient(circle, hsl(20, 90%, 45%) 0%, hsl(28, 85%, 40%) 50%, transparent 70%)",
          top: "-20%",
          right: "-15%",
        }}
      />
      
      {/* Secondary orb - warm amber - bottom left */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-15 dark:opacity-[0.05] blur-[140px] animate-orb-2"
        style={{
          background: "radial-gradient(circle, hsl(30, 85%, 42%) 0%, hsl(35, 80%, 38%) 50%, transparent 70%)",
          bottom: "-10%",
          left: "-20%",
        }}
      />
      
      {/* Tertiary orb - subtle rust - center */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-10 dark:opacity-[0.04] blur-[120px] animate-orb-3"
        style={{
          background: "radial-gradient(circle, hsl(18, 80%, 48%) 0%, hsl(25, 75%, 42%) 50%, transparent 70%)",
          top: "40%",
          left: "60%",
          transform: "translate(-50%, -50%)",
        }}
      />
      
      {/* Small accent orb - muted gold */}
      <div 
        className="absolute w-[300px] h-[300px] rounded-full opacity-8 dark:opacity-[0.03] blur-[100px] animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, hsl(38, 75%, 45%) 0%, transparent 70%)",
          top: "70%",
          right: "20%",
        }}
      />
      
      {/* Grid overlay - very subtle */}
      <div 
        className="absolute inset-0 opacity-[0.01] dark:opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(25, 50%, 40%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(25, 50%, 40%) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

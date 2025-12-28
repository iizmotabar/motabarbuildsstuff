export function GradientOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Primary orb - blue/purple - top right */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-25 dark:opacity-15 blur-[120px] animate-orb-1"
        style={{
          background: "radial-gradient(circle, hsl(217, 91%, 60%) 0%, hsl(271, 81%, 56%) 50%, transparent 70%)",
          top: "-20%",
          right: "-15%",
        }}
      />
      
      {/* Secondary orb - cyan/blue - bottom left */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-10 blur-[100px] animate-orb-2"
        style={{
          background: "radial-gradient(circle, hsl(190, 90%, 50%) 0%, hsl(217, 91%, 60%) 50%, transparent 70%)",
          bottom: "-10%",
          left: "-20%",
        }}
      />
      
      {/* Tertiary orb - purple/pink - center */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 dark:opacity-8 blur-[80px] animate-orb-3"
        style={{
          background: "radial-gradient(circle, hsl(271, 81%, 56%) 0%, hsl(330, 80%, 60%) 50%, transparent 70%)",
          top: "40%",
          left: "60%",
          transform: "translate(-50%, -50%)",
        }}
      />
      
      {/* Small accent orb - data green */}
      <div 
        className="absolute w-[300px] h-[300px] rounded-full opacity-10 dark:opacity-5 blur-[60px] animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, hsl(160, 70%, 50%) 0%, transparent 70%)",
          top: "70%",
          right: "20%",
        }}
      />
      
      {/* Grid overlay for tech feel */}
      <div 
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(217, 91%, 60%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(217, 91%, 60%) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

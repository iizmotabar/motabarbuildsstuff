export function GradientOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Primary orb - softer blue/purple - top right */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-20 dark:opacity-12 blur-[140px] animate-orb-1"
        style={{
          background: "radial-gradient(circle, hsl(217, 80%, 70%) 0%, hsl(271, 70%, 65%) 50%, transparent 70%)",
          top: "-20%",
          right: "-15%",
        }}
      />
      
      {/* Secondary orb - softer cyan/blue - bottom left */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-15 dark:opacity-8 blur-[120px] animate-orb-2"
        style={{
          background: "radial-gradient(circle, hsl(190, 80%, 60%) 0%, hsl(217, 80%, 70%) 50%, transparent 70%)",
          bottom: "-10%",
          left: "-20%",
        }}
      />
      
      {/* Tertiary orb - softer purple/pink - center */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-10 dark:opacity-6 blur-[100px] animate-orb-3"
        style={{
          background: "radial-gradient(circle, hsl(271, 70%, 70%) 0%, hsl(330, 70%, 70%) 50%, transparent 70%)",
          top: "40%",
          left: "60%",
          transform: "translate(-50%, -50%)",
        }}
      />
      
      {/* Small accent orb - softer green */}
      <div 
        className="absolute w-[300px] h-[300px] rounded-full opacity-8 dark:opacity-4 blur-[80px] animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, hsl(160, 60%, 60%) 0%, transparent 70%)",
          top: "70%",
          right: "20%",
        }}
      />
      
      {/* Grid overlay - more subtle */}
      <div 
        className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(217, 70%, 70%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(217, 70%, 70%) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

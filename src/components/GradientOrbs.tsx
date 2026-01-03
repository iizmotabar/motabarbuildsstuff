export function GradientOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Primary orb - neutral cool gray - top right */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-15 dark:opacity-[0.06] blur-[160px] animate-orb-1"
        style={{
          background: "radial-gradient(circle, hsl(220, 15%, 50%) 0%, hsl(220, 10%, 40%) 50%, transparent 70%)",
          top: "-20%",
          right: "-15%",
        }}
      />
      
      {/* Secondary orb - warm gray - bottom left */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-12 dark:opacity-[0.04] blur-[140px] animate-orb-2"
        style={{
          background: "radial-gradient(circle, hsl(210, 10%, 45%) 0%, hsl(200, 8%, 35%) 50%, transparent 70%)",
          bottom: "-10%",
          left: "-20%",
        }}
      />
      
      {/* Tertiary orb - subtle neutral - center */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-8 dark:opacity-[0.03] blur-[120px] animate-orb-3"
        style={{
          background: "radial-gradient(circle, hsl(230, 12%, 48%) 0%, hsl(220, 10%, 38%) 50%, transparent 70%)",
          top: "40%",
          left: "60%",
          transform: "translate(-50%, -50%)",
        }}
      />
      
      {/* Small accent orb - cool gray */}
      <div 
        className="absolute w-[300px] h-[300px] rounded-full opacity-6 dark:opacity-[0.02] blur-[100px] animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, hsl(215, 10%, 50%) 0%, transparent 70%)",
          top: "70%",
          right: "20%",
        }}
      />
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.01] dark:opacity-[0.008]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(220, 10%, 40%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(220, 10%, 40%) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

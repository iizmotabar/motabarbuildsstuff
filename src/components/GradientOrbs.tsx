export function GradientOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Primary orb - blue/purple */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-10 blur-[100px] animate-orb-1"
        style={{
          background: "linear-gradient(135deg, hsl(217, 91%, 60%), hsl(271, 81%, 56%))",
          top: "-10%",
          right: "-10%",
        }}
      />
      
      {/* Secondary orb - cyan */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 dark:opacity-8 blur-[120px] animate-orb-2"
        style={{
          background: "linear-gradient(135deg, hsl(190, 90%, 50%), hsl(217, 91%, 60%))",
          bottom: "10%",
          left: "-15%",
        }}
      />
      
      {/* Tertiary orb - purple/pink */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full opacity-10 dark:opacity-5 blur-[80px] animate-orb-3"
        style={{
          background: "linear-gradient(135deg, hsl(271, 81%, 56%), hsl(330, 80%, 60%))",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}

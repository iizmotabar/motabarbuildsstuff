export function GridPattern() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dot grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
      
      {/* Gradient overlay for fade effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, transparent 0%, hsl(var(--background)) 70%),
            radial-gradient(ellipse at 50% 100%, transparent 0%, hsl(var(--background)) 70%)
          `,
        }}
      />
    </div>
  );
}

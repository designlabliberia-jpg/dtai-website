export function ServiceAmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute -left-24 -top-32 h-96 w-96 rounded-full bg-tech-blue/25 blur-3xl animate-[serviceDrift1_16s_ease-in-out_infinite]" />
      <div className="absolute -right-16 top-1/4 h-[28rem] w-[28rem] rounded-full bg-brand/20 blur-3xl animate-[serviceDrift2_20s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-4rem] left-1/3 h-80 w-80 rounded-full bg-tech-blue/20 blur-3xl animate-[serviceDrift3_24s_ease-in-out_infinite]" />

      <style>{`
        @keyframes serviceDrift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, 40px) scale(1.1); }
        }
        @keyframes serviceDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-70px, -30px) scale(1.08); }
        }
        @keyframes serviceDrift3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, -50px) scale(1.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          div[aria-hidden] > div { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

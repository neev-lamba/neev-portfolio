// Five start lights, looping via CSS (globals.css). Static and lit with reduced motion.
export default function LightsOut() {
  return (
    <div className="flex gap-3" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="light-dot" />
      ))}
    </div>
  );
}

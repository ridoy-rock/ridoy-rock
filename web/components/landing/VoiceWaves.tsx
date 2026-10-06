// Animated "voice" ribbon: layered sine waves drifting sideways.
// Every wavelength divides 1440, so shifting a path by 1440 loops seamlessly.

const PERIOD = 1440;
const HEIGHT = 400;
const STEP = 36;

type Wave = {
  amp: number;
  len: number;
  phase: number;
  amp2: number;
  len2: number;
  color: string;
  opacity: number;
  width: number;
  duration: number;
};

const WAVES: Wave[] = [
  { amp: 70, len: 1440, phase: 4.0, amp2: 12, len2: 720, color: "#7b66ff", opacity: 0.55, width: 1.5, duration: 26 },
  { amp: 80, len: 1440, phase: 2.1, amp2: 10, len2: 288, color: "#e6e8ff", opacity: 0.25, width: 1, duration: 40 },
  { amp: 60, len: 1440, phase: 0.0, amp2: 18, len2: 360, color: "#bcbdff", opacity: 0.6, width: 1.5, duration: 28 },
  { amp: 72, len: 1440, phase: 0.6, amp2: 14, len2: 480, color: "#9d99ff", opacity: 0.5, width: 1.25, duration: 34 },
  { amp: 48, len: 720, phase: 1.2, amp2: 20, len2: 1440, color: "#7b66ff", opacity: 0.8, width: 2, duration: 22 },
  { amp: 40, len: 720, phase: 3.0, amp2: 25, len2: 1440, color: "#d9dbff", opacity: 0.35, width: 1, duration: 30 },
];

function wavePath({ amp, len, phase, amp2, len2 }: Wave) {
  const y0 = HEIGHT / 2;
  const pts: [number, number][] = [];
  for (let x = 0; x <= PERIOD * 2; x += STEP) {
    const t = (x / PERIOD) * Math.PI * 2;
    pts.push([x, y0 + amp * Math.sin(t * (PERIOD / len) + phase) + amp2 * Math.sin(t * (PERIOD / len2) + phase * 1.7)]);
  }
  // Catmull-Rom through the samples, as cubic Béziers
  let d = `M0 ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = x1 + (x2 - p0[0]) / 6;
    const c1y = y1 + (y2 - p0[1]) / 6;
    const c2x = x2 - (p3[0] - x1) / 6;
    const c2y = y2 - (p3[1] - y1) / 6;
    d += `C${c1x.toFixed(0)} ${c1y.toFixed(1)} ${c2x.toFixed(0)} ${c2y.toFixed(1)} ${x2} ${y2.toFixed(1)}`;
  }
  return d;
}

export function VoiceWaves({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${PERIOD} ${HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      <defs>
        <linearGradient id={`${id}-fade`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.2" stopColor="#fff" />
          <stop offset="0.8" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`${id}-mask`}>
          <rect width={PERIOD} height={HEIGHT} fill={`url(#${id}-fade)`} />
        </mask>
      </defs>
      <g mask={`url(#${id}-mask)`} fill="none">
        {WAVES.map((w, i) => (
          <path
            key={i}
            d={wavePath(w)}
            stroke={w.color}
            strokeOpacity={w.opacity}
            strokeWidth={w.width}
            vectorEffect="non-scaling-stroke"
            className="motion-safe:animate-wave"
            style={{ animationDuration: `${w.duration}s` }}
          />
        ))}
      </g>
    </svg>
  );
}

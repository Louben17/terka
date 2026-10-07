// Plovoucí mýdlové bubliny a měkké barevné skvrny v pozadí. Čisté CSS, žádný JS.

const bubbles = [
  { left: '6%', top: '22%', size: 92, delay: 0, duration: 15 },
  { left: '14%', top: '68%', size: 46, delay: -4, duration: 12 },
  { left: '24%', top: '12%', size: 28, delay: -8, duration: 10 },
  { left: '78%', top: '16%', size: 120, delay: -2, duration: 18 },
  { left: '88%', top: '58%', size: 64, delay: -6, duration: 14 },
  { left: '70%', top: '78%', size: 36, delay: -10, duration: 11 },
  { left: '42%', top: '84%', size: 22, delay: -3, duration: 9 },
  { left: '94%', top: '30%', size: 24, delay: -7, duration: 10 },
  { left: '3%', top: '46%', size: 30, delay: -5, duration: 13 },
  { left: '58%', top: '8%', size: 40, delay: -9, duration: 16 },
]

export function Bubbles({ dim = false }: { dim?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Aurora skvrny */}
      <div className="animate-drift absolute -top-1/4 -left-1/4 size-[70vmax] rounded-full bg-mint opacity-80 blur-3xl" />
      <div
        className="animate-drift absolute -right-1/4 -bottom-1/3 size-[60vmax] rounded-full bg-lilac opacity-70 blur-3xl"
        style={{ animationDelay: '-7s' }}
      />
      <div
        className="animate-drift absolute top-1/4 left-1/2 size-[38vmax] -translate-x-1/2 rounded-full bg-blush opacity-60 blur-3xl"
        style={{ animationDelay: '-13s' }}
      />

      {/* Bubliny */}
      <div className={dim ? 'opacity-50' : ''}>
        {bubbles.map((b, i) => (
          <span
            key={i}
            className="bubble animate-float absolute"
            style={{
              left: b.left,
              top: b.top,
              width: b.size,
              height: b.size,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Plynulý přechod do pozadí stránky */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-cream" />
    </div>
  )
}

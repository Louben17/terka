import { Sparkle } from 'lucide-react'

function Row({ items, reverse, dark }: { items: string[]; reverse?: boolean; dark?: boolean }) {
  // Obsah dvakrát za sebou → plynulá nekonečná smyčka (animace posouvá o -50 %).
  const loop = [...items, ...items]
  return (
    <div
      className={`flex w-max animate-marquee items-center gap-8 py-5 ${reverse ? '[animation-direction:reverse]' : ''}`}
    >
      {loop.map((item, i) => (
        <span key={i} className="flex items-center gap-8 whitespace-nowrap">
          <span className={`font-serif text-2xl italic sm:text-3xl ${dark ? 'text-cream' : 'text-ink'}`}>{item}</span>
          <Sparkle size={18} className={dark ? 'text-sage' : 'text-moss'} />
        </span>
      ))}
    </div>
  )
}

export function Marquee({ items }: { items: string[] }) {
  const half = Math.ceil(items.length / 2)
  return (
    <section aria-label="Rychlé úklidové tipy" className="relative h-64 overflow-hidden sm:h-72">
      <div className="absolute inset-x-[-5%] top-[64%] -translate-y-1/2 rotate-[2.5deg] border-y border-line bg-paper">
        <Row items={items.slice(half)} reverse />
      </div>
      <div className="absolute inset-x-[-5%] top-[38%] z-10 -translate-y-1/2 -rotate-[3deg] bg-moss-deep">
        <Row items={items.slice(0, half)} dark />
      </div>
    </section>
  )
}

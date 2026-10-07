// Ploché dekorativní tvary v barvách webu – plné barvy, žádné rozmazání ani průhlednost.

export function Shapes({ variant = 'hero' }: { variant?: 'hero' | 'subtle' }) {
  if (variant === 'subtle') {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -top-20 -right-16 size-64 rounded-full bg-sage" />
        <span className="absolute -right-6 bottom-0 h-24 w-48 rounded-t-full bg-sun sm:right-24" />
        <span className="animate-float absolute top-16 right-56 hidden size-8 rounded-full bg-blush lg:block" />
      </div>
    )
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* velký kruh vlevo nahoře */}
      <span className="absolute -top-[12vmin] -left-[10vmin] size-[42vmin] rounded-full bg-sage" />
      {/* půlkruh vpravo dole */}
      <span className="absolute right-[6%] bottom-0 h-[16vmin] w-[32vmin] rounded-t-full bg-sun" />
      {/* malý kruh vpravo nahoře */}
      <span className="animate-float absolute top-[22%] right-[10%] size-[7vmin] rounded-full bg-blush" />
      {/* obrys kruhu vlevo dole */}
      <span
        className="animate-spin-slow absolute bottom-[14%] left-[8%] size-[16vmin] rounded-full border-2 border-dashed border-moss/30"
      />
      {/* tečka */}
      <span
        className="animate-float absolute top-[58%] right-[22%] size-[2.2vmin] rounded-full bg-moss"
        style={{ animationDelay: '-6s' }}
      />
    </div>
  )
}

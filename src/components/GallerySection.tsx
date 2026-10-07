import Image from 'next/image'
import { Reveal } from './Reveal'

const fotky = [
  {
    src: '/images/galerie-loznice.jpg',
    alt: 'Čerstvě ustlaná postel se lněným povlečením v ranním světle',
    misto: 'Ložnice',
    tip: 'Povlečení vyměň jednou za jeden až dva týdny.',
    grid: 'lg:col-start-1 lg:row-span-2',
    sizes: '(min-width: 1024px) 280px, 50vw',
  },
  {
    src: '/images/galerie-pomocnici.jpg',
    alt: 'Dřevěné kartáče, bavlněné hadříky, skleněný rozprašovač a jedlá soda na lněném ubrusu',
    misto: 'Pomocníci',
    tip: 'Pár dobrých kartáčů a hadříků udělá víc než plná skříň drogerie.',
    grid: 'col-span-2 lg:col-start-2',
    sizes: '(min-width: 1024px) 560px, 100vw',
  },
  {
    src: '/images/galerie-okno.jpg',
    alt: 'Čisté okno se lněnou záclonou a pokojovými rostlinami na parapetu',
    misto: 'Okna',
    tip: 'Okna myj za zataženého dne – na slunci roztok zaschne do šmouh.',
    grid: 'lg:col-start-4 lg:row-span-2 lg:row-start-1',
    sizes: '(min-width: 1024px) 280px, 50vw',
  },
  {
    src: '/images/galerie-pradlo.jpg',
    alt: 'Proutěný koš s poskládaným prádlem vedle dřevěného sušáku',
    misto: 'Prádlo',
    tip: 'Skládej hned po sundání ze sušáku a ušetříš si žehlení.',
    grid: 'lg:col-start-2',
    sizes: '(min-width: 1024px) 280px, 50vw',
  },
  {
    src: '/images/galerie-koupelna.jpg',
    alt: 'Srolované bílé ručníky na dřevěné stoličce v čisté koupelně',
    misto: 'Koupelna',
    tip: 'Po sprchování stáhni vodu stěrkou – vodní kámen nemá šanci.',
    grid: 'lg:col-start-3',
    sizes: '(min-width: 1024px) 280px, 50vw',
  },
]

export function GallerySection() {
  return (
    <section id="inspirace" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <Reveal className="max-w-2xl">
        <p className="text-sm tracking-[0.2em] text-moss uppercase">Inspirace</p>
        <h2 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-7xl">
          Uklizený domov, <em className="text-moss">klidná hlava</em>
        </h2>
        <p className="mt-6 text-lg text-ink-soft">
          Malé rituály, které dělají z bytu místo, kam se rádi vracíte. Každá fotka skrývá jeden tip.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-flow-dense auto-rows-[220px] grid-cols-2 gap-4 sm:auto-rows-[260px] lg:grid-cols-4 lg:grid-rows-[300px_300px]">
        {fotky.map((f, i) => (
          <Reveal key={f.src} delay={i * 0.08} className={`${f.grid} ${i === 0 || i === 2 ? 'row-span-2' : ''}`}>
            <figure className="group relative h-full overflow-hidden rounded-[1.75rem] bg-mint">
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes={f.sizes}
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-cream sm:p-5">
                <span className="inline-block rounded-full bg-paper px-3 py-1 text-xs font-medium text-ink">{f.misto}</span>
                <p className="mt-2 max-h-0 overflow-hidden font-serif text-lg leading-snug opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100 max-lg:max-h-32 max-lg:opacity-100 sm:text-xl">
                  {f.tip}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { site } from '@/data/site'
import { InstagramIcon } from './InstagramIcon'
import { Reveal } from './Reveal'

const fotky = [
  '/images/galerie-pomocnici.jpg',
  '/images/galerie-loznice.jpg',
  '/images/clanek-prirodni-cistice.jpg',
  '/images/galerie-koupelna.jpg',
  '/images/clanek-kuchyn.jpg',
  '/images/galerie-pradlo.jpg',
]

export function InstagramSection({ tips }: { tips: string[] }) {
  return (
    <section id="instagram" className="px-4 py-16 sm:px-6">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-moss-deep text-cream">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="animate-drift absolute -top-1/2 -left-1/4 size-[40rem] rounded-full bg-moss opacity-80 blur-3xl" />
          <div
            className="animate-drift absolute -right-1/4 -bottom-1/2 size-[36rem] rounded-full bg-sage/30 blur-3xl"
            style={{ animationDelay: '-9s' }}
          />
        </div>

        <div className="relative grid items-center gap-12 p-8 sm:p-14 lg:grid-cols-2">
          <div>
            <p className="flex items-center gap-2 text-sm tracking-[0.2em] text-sage uppercase">
              <InstagramIcon size={16} /> Instagram
            </p>
            <h2 className="mt-5 font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl">
              Malé krůčky každý den na <em className="text-sage">Instagramu</em>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/70">
              Úklidová videa, testy přírodních čističů, rutiny a zákulisí. Přidej se k ostatním, kdo uklízí vědomě a
              s radostí.
            </p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-cream py-2 pr-2 pl-6 text-lg text-ink transition-all hover:bg-white hover:shadow-[0_0_40px_-5px_rgb(167_191_161/0.6)]"
            >
              Sledovat {site.instagramHandle}
              <span className="flex size-10 items-center justify-center rounded-full bg-ink text-cream transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight size={18} />
              </span>
            </a>
          </div>

          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="grid grid-cols-3 gap-3 pb-10"
            aria-label={`Otevřít Instagram ${site.instagramHandle}`}
          >
            {[0, 1, 2].map((col) => (
              <div key={col} className={`flex flex-col gap-3 ${col === 1 ? 'pt-10' : ''}`}>
                {[tips[col], tips[col + 3]].filter(Boolean).map((tip, row) => (
                  <div
                    key={tip}
                    className="group relative flex aspect-[4/5] items-end overflow-hidden rounded-2xl bg-moss p-3 transition-transform duration-500 hover:z-10 hover:scale-105 sm:p-4"
                  >
                    <Image
                      src={fotky[col + row * 3]}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 180px, 30vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                    <p className="relative font-serif text-sm leading-tight text-cream sm:text-lg">{tip}</p>
                    <span className="absolute inset-0 flex items-center justify-center bg-ink/40 text-cream opacity-0 transition-opacity group-hover:opacity-100">
                      <InstagramIcon size={28} />
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </a>
        </div>
      </Reveal>
    </section>
  )
}

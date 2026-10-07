import { site } from '@/data/site'
import { InstagramIcon } from './InstagramIcon'
import { Reveal } from './Reveal'

export function AboutSection() {
  return (
    <section id="o-mne" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        {/* Portrét – zatím monogram v oblouku. Fotku stačí vložit jako /public/tereza.jpg a nahradit <span>. */}
        <Reveal className="relative mx-auto aspect-[4/5] w-full max-w-sm">
          <div className="absolute inset-0 overflow-hidden rounded-t-full rounded-b-[2.5rem] bg-sage">
            <span className="absolute -bottom-16 -left-16 size-56 rounded-full bg-mint" />
            <span className="absolute inset-0 flex items-center justify-center pt-10 font-serif text-[12rem] leading-none text-cream italic sm:text-[15rem]">
              T
            </span>
          </div>
          <span className="animate-float absolute top-6 -right-4 size-14 rounded-full bg-sun" />
          <span className="absolute bottom-24 -left-5 size-10 rounded-full bg-blush" />
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="surface absolute right-0 bottom-6 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm transition-colors hover:bg-mint sm:-right-6"
          >
            <InstagramIcon size={16} /> {site.instagramHandle}
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-sm tracking-[0.2em] text-moss uppercase">O mně</p>
          <h2 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight sm:text-7xl">
            Ahoj, jsem <em className="text-moss">Tereza</em>
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>
              Mám vášeň pro úklidová videa, zkoumání složení čisticích prostředků a hledání způsobů, jak udržet
              domov čistý s minimálním dopadem na přírodu.
            </p>
            <p>
              Na Instagramu sdílím malé krůčky vedoucí k velkým změnám. Testuji přírodní čističe, vytvářím
              jednoduché rutiny a ukazuji, co opravdu funguje. Úklid pro mě není jen o lesku a třpytu – je to cesta
              k prostředí, kde se cítíme skvěle.
            </p>
          </div>
          <blockquote className="mt-10 border-l-2 border-sage pl-6 font-serif text-3xl leading-snug text-ink italic">
            „Nejsem perfektní hospodyňka. Jsem milovnice pořádku, vůně čerstvě uklizeného prostoru a pocitu, že
            dělám něco dobrého.“
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}

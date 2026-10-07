import { site } from '@/data/site'
import { InstagramIcon } from './InstagramIcon'
import { Reveal } from './Reveal'

export function AboutSection() {
  return (
    <section id="o-mne" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        {/* Portrét – zatím monogram v bublině. Fotku stačí vložit jako /public/tereza.jpg a nahradit <span>. */}
        <Reveal className="relative mx-auto aspect-square w-full max-w-md">
          <div className="cover-sage absolute inset-0 rounded-full" />
          <div className="bubble absolute inset-[6%]" />
          <span className="absolute inset-0 flex items-center justify-center font-serif text-[11rem] leading-none text-white/80 italic sm:text-[14rem]">
            T
          </span>
          <span className="bubble animate-float absolute -top-2 right-6 size-16" />
          <span className="bubble animate-float absolute bottom-8 -left-4 size-10" style={{ animationDelay: '-5s' }} />
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="glass absolute right-0 bottom-6 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm transition-transform hover:scale-105 sm:-right-4"
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

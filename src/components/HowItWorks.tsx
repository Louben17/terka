import { Leaf, MousePointerClick, Timer } from 'lucide-react'
import { Reveal } from './Reveal'

const steps = [
  {
    icon: MousePointerClick,
    title: 'Otevři výzvu',
    text: 'Každý den čeká nová výzva dne. Nesedí ti? Zamíchej si další – v zásobníku jich je přes sto.',
    tone: 'bg-mint',
  },
  {
    icon: Timer,
    title: 'Dej tomu deset minut',
    text: 'Žádné celodenní drhnutí. Jedna konkrétní věc, kterou zvládneš mezi kávou a odchodem z domu.',
    tone: 'bg-sun',
  },
  {
    icon: Leaf,
    title: 'Odškrtni a raduj se',
    text: 'Označ výzvu jako splněnou a sleduj, jak se ti doma i v hlavě dělá víc místa. Šetrně k sobě i k planetě.',
    tone: 'bg-lilac',
  },
]

export function HowItWorks({ count }: { count: number }) {
  return (
    <section id="jak-to-funguje" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-sm tracking-[0.2em] text-moss uppercase">Jak to funguje</p>
        <h2 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-7xl">
          Úklid po malých <em className="text-moss">krůčcích</em>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink-soft">
          Jedna myšlenka. Jedna výzva. Jedna malá změna, která má smysl.
        </p>
      </Reveal>

      <ol className="mt-16 grid gap-5 md:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 0.12}>
            <div className="group relative h-full overflow-hidden rounded-[2rem] border border-line bg-paper p-8 transition-colors duration-500 hover:border-sage">
              <div
                className={`absolute -top-12 -right-12 size-36 rounded-full ${step.tone} transition-transform duration-700 group-hover:scale-110`}
              />
              <div className="relative flex items-start justify-between">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-ink text-cream">
                  <step.icon size={24} strokeWidth={1.6} />
                </span>
                <span className="relative font-serif text-6xl text-ink/25">0{i + 1}</span>
              </div>
              <h3 className="relative mt-10 font-serif text-3xl tracking-tight">{step.title}</h3>
              <p className="relative mt-3 leading-relaxed text-ink-soft">{step.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={0.2} className="mt-5 grid grid-cols-3 divide-x divide-line rounded-[2rem] border border-line bg-paper/60 py-8 text-center">
        {[
          { value: String(count), label: 'výzev v zásobníku' },
          { value: '10', label: 'minut denně stačí' },
          { value: '0', label: 'zbytečné chemie' },
        ].map((stat) => (
          <div key={stat.label} className="px-2">
            <p className="font-serif text-5xl tracking-tight sm:text-6xl">{stat.value}</p>
            <p className="mt-1 text-xs text-ink-soft sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

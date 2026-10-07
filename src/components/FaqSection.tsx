import Link from 'next/link'
import { Plus } from 'lucide-react'
import { JsonLd } from './JsonLd'
import { Reveal } from './Reveal'

// Odpovědi na časté dotazy z vyhledávání. `text` jde do schema.org, `obsah` se zobrazí na webu.
const otazky: { otazka: string; text: string; obsah: React.ReactNode }[] = [
  {
    otazka: 'Jak se donutit k úklidu, když se mi nechce?',
    text: 'Začněte malým krokem. Nastavte si časovač na 10 minut a uklízejte jen jednu zónu – linku, botník nebo konferenční stolek. Konkrétní drobný úkol, třeba úklidová výzva dne, odstraní rozhodování „co dřív“ a po pár minutách se do úklidu většinou dostanete sami.',
    obsah: (
      <>
        Začněte malým krokem. Nastavte si časovač na 10 minut a uklízejte jen jednu zónu – linku, botník nebo
        konferenční stolek. Konkrétní drobný úkol, třeba <Link href="/#vyzva">úklidová výzva dne</Link>, odstraní
        rozhodování „co dřív“ a po pár minutách se do úklidu většinou dostanete sami. Víc v článku{' '}
        <Link href="/clanky/rychly-uklid-za-10-minut">Rychlý úklid za 10 minut</Link>.
      </>
    ),
  },
  {
    otazka: 'Čím nahradit chemické čisticí prostředky?',
    text: 'Většinu domácnosti zvládnete s octem (vodní kámen, sklo), jedlou sodou (drhnutí, pachy), kyselinou citronovou (odvápnění konvice a pračky) a jemným mýdlem na mastnotu. Ocet ale nepatří na přírodní kámen a nelakované dřevo a kyseliny se nikdy nesmí míchat s chlórovými přípravky.',
    obsah: (
      <>
        Většinu domácnosti zvládnete s octem (vodní kámen, sklo), jedlou sodou (drhnutí, pachy), kyselinou citronovou
        (odvápnění konvice a pračky) a jemným mýdlem na mastnotu. Ocet ale nepatří na přírodní kámen a nelakované
        dřevo a kyseliny se nikdy nesmí míchat s chlórovými přípravky. Podrobně v článku{' '}
        <Link href="/clanky/ocet-jedla-soda-citron-na-uklid">Ocet, jedlá soda a citron na úklid</Link>.
      </>
    ),
  },
  {
    otazka: 'Jak často uklízet domácnost?',
    text: 'Osvědčený rytmus: denně drobnosti zhruba na 10 minut (nádobí, linka, věci na své místo), jednou týdně koupelna, podlahy a prach, povlečení jednou za jeden až dva týdny a jednou za měsíc větší úkol – lednice, trouba, okna nebo jedna skříň.',
    obsah: (
      <>
        Osvědčený rytmus: denně drobnosti zhruba na 10 minut (nádobí, linka, věci na své místo), jednou týdně
        koupelna, podlahy a prach, povlečení jednou za jeden až dva týdny a jednou za měsíc větší úkol – lednice,
        trouba, okna nebo jedna skříň. Inspiraci najdete v{' '}
        <Link href="/uklidove-vyzvy">seznamu úklidových výzev</Link>.
      </>
    ),
  },
  {
    otazka: 'Jak zapojit do úklidu celou rodinu?',
    text: 'Udělejte z úklidu hru: každý si vezme jednu místnost, pusťte si playlist a změřte čas. Děti zvládnou třídit hračky, srovnat boty nebo zalít květiny. Pomáhá i pravidlo, že každá věc má své místo, kam se po použití vrací.',
    obsah: (
      <>
        Udělejte z úklidu hru: každý si vezme jednu místnost, pusťte si playlist a změřte čas. Děti zvládnou třídit
        hračky, srovnat boty nebo zalít květiny. Pomáhá i pravidlo, že každá věc má své místo, kam se po použití
        vrací.
      </>
    ),
  },
  {
    otazka: 'Jak fungují úklidové výzvy?',
    text: 'Každý den je na webu jedna výzva dne – stejná pro všechny. Když vám nesedí, tlačítkem Další výzva si vylosujete jinou, výzvy se neopakují, dokud neprojdete celý zásobník. Splněné výzvy si můžete odškrtnout a prohlížeč si je zapamatuje.',
    obsah: (
      <>
        Každý den je na webu jedna <Link href="/#vyzva">výzva dne</Link> – stejná pro všechny. Když vám nesedí,
        tlačítkem „Další výzva“ si vylosujete jinou a výzvy se neopakují, dokud neprojdete celý zásobník. Splněné
        výzvy si můžete odškrtnout a prohlížeč si je zapamatuje.
      </>
    ),
  },
]

export function FaqSection() {
  return (
    <section id="caste-otazky" className="mx-auto max-w-4xl px-4 py-24 sm:px-6 sm:py-32">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: otazky.map((o) => ({
            '@type': 'Question',
            name: o.otazka,
            acceptedAnswer: { '@type': 'Answer', text: o.text },
          })),
        }}
      />
      <Reveal className="text-center">
        <p className="text-sm tracking-[0.2em] text-moss uppercase">Časté otázky</p>
        <h2 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-7xl">
          Na co se <em className="text-moss">ptáte</em>
        </h2>
      </Reveal>

      <div className="mt-12 divide-y divide-line border-y border-line">
        {otazky.map((o) => (
          <details key={o.otazka} className="group py-2">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 [&::-webkit-details-marker]:hidden">
              <h3 className="font-serif text-2xl leading-snug sm:text-3xl">{o.otazka}</h3>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line transition-transform duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-cream">
                <Plus size={18} />
              </span>
            </summary>
            <p className="pr-14 pb-6 text-lg leading-relaxed text-ink-soft [&_a]:text-moss [&_a]:underline [&_a]:underline-offset-4">
              {o.obsah}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}

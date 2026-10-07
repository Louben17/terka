import { AboutSection } from '@/components/AboutSection'
import { ArticlesSection } from '@/components/ArticlesSection'
import { ChallengeHero } from '@/components/ChallengeHero'
import { GallerySection } from '@/components/GallerySection'
import { HowItWorks } from '@/components/HowItWorks'
import { InstagramSection } from '@/components/InstagramSection'
import { Marquee } from '@/components/Marquee'
import { getVyzvy, pragueDateKey } from '@/lib/vyzvy'

// Výzvy se načítají na serveru a stránka se obnovuje nejpozději po 5 minutách
// (po změně v administraci okamžitě díky revalidateTag).
export const revalidate = 300

function hash(input: string) {
  let h = 0
  for (const ch of input) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h
}

export default async function HomePage() {
  const vyzvy = await getVyzvy()
  const dateKey = pragueDateKey()
  const seed = hash(dateKey)

  // Výzva dne – pro všechny návštěvníky stejná, každý den jiná.
  const dailyIndex = seed % vyzvy.length

  const dateLabel = new Intl.DateTimeFormat('cs-CZ', {
    timeZone: 'Europe/Prague',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())

  // Krátké výzvy do běžícího pásu a na Instagram dlaždice – každý den jiný výběr.
  const short = vyzvy.filter((v) => v.length <= 60)
  const offset = short.length ? seed % short.length : 0
  const rotated = [...short.slice(offset), ...short.slice(0, offset)]

  return (
    <>
      <ChallengeHero vyzvy={vyzvy} dailyIndex={dailyIndex} dateLabel={dateLabel} />
      <HowItWorks count={vyzvy.length} />
      <Marquee items={rotated.slice(0, 16)} />
      <ArticlesSection />
      <GallerySection />
      <AboutSection />
      <InstagramSection tips={rotated.slice(16, 22)} />
    </>
  )
}

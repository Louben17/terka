import Link from 'next/link'
import { Bubbles } from '@/components/Bubbles'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative flex min-h-[80svh] items-center justify-center overflow-hidden px-4 text-center">
          <Bubbles dim />
          <div className="relative">
            <p className="font-serif text-[10rem] leading-none text-moss/30 italic">404</p>
            <h1 className="font-serif text-5xl tracking-tight">Tady už je uklizeno</h1>
            <p className="mt-4 text-ink-soft">
              Stránka, kterou hledáte, neexistuje nebo skončila v tříděném odpadu.
            </p>
            <Link href="/" className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-cream hover:bg-moss">
              Zpět na výzvu dne
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

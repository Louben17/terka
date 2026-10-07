// Hlavní (kanonická) adresa webu. Vercel servíruje web na www, verze bez www má být jen přesměrování.
const url = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.uklidovaguru.cz').replace(/\/$/, '')

export const site = {
  name: 'Úklidová Guru',
  url,
  instagram: 'https://www.instagram.com/uklidovaguru/',
  instagramHandle: '@uklidovaguru',
  author: 'Tereza',
  authorBio:
    'Tereza je autorkou Úklidové Guru. Testuje přírodní čisticí prostředky, vymýšlí jednoduché úklidové rutiny a na Instagramu @uklidovaguru ukazuje, co v domácnosti opravdu funguje.',
  logo: '/images/logo.png',
  description:
    'Úklidové výzvy na každý den, šetrné tipy na úklid domácnosti a návody, jak uklízet bez zbytečné chemie. Jedna výzva, deset minut, čistší domov.',
}

export const navLinks = [
  { href: '/#vyzva', label: 'Výzva dne' },
  { href: '/uklidove-vyzvy', label: 'Všechny výzvy' },
  { href: '/clanky', label: 'Články' },
  { href: '/#inspirace', label: 'Inspirace' },
  { href: '/#o-mne', label: 'O mně' },
]

export const absoluteUrl = (path = '/') => `${site.url}${path === '/' ? '' : path}`

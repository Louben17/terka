// Články o úklidu. Nový článek = nový objekt v poli `clanky` (stránka se vygeneruje automaticky).

export type Blok =
  | { typ: 'odstavec'; text: string }
  | { typ: 'nadpis'; text: string }
  | { typ: 'seznam'; polozky: string[]; cislovany?: boolean }
  | { typ: 'tip'; titulek: string; text: string }
  | { typ: 'varovani'; titulek: string; text: string }

export interface Clanek {
  slug: string
  titulek: string
  perex: string
  kategorie: string
  datum: string // YYYY-MM-DD
  minutCteni: number
  /** Barevný motiv obálky – viz `.cover-*` v globals.css */
  motiv: 'sage' | 'blush' | 'sun' | 'lilac'
  obsah: Blok[]
}

export const clanky: Clanek[] = [
  {
    slug: 'prirodni-cistice-ocet-soda-citron',
    titulek: 'Ocet, soda a citron: co přírodní čističe opravdu zvládnou',
    perex:
      'Tři suroviny z kuchyňské linky nahradí půlku drogerie. Jen je potřeba vědět, kam patří – a kam rozhodně ne.',
    kategorie: 'Přírodní úklid',
    datum: '2026-09-18',
    minutCteni: 6,
    motiv: 'sage',
    obsah: [
      {
        typ: 'odstavec',
        text: 'Přírodní úklid není o tom vyhodit všechno z drogerie a drhnout dům octem. Je o tom pochopit, co která surovina umí. Kyselina rozpouští vodní kámen, zásada si poradí s mastnotou a jemný abrazivní prášek vyleští bez poškrábání. Když to víte, vystačíte si s pár levnými a šetrnými pomocníky.',
      },
      { typ: 'nadpis', text: 'Ocet – na vodní kámen a sklo' },
      {
        typ: 'odstavec',
        text: 'Obyčejný kuchyňský ocet (kolem 8 %) je slabá kyselina, která rozpouští vápenaté usazeniny. Ředěný s vodou v poměru zhruba 1 : 1 skvěle funguje na baterie, sprchové kouty, obklady a okna. Na zrcadla a sklo stačí ještě slabší roztok a utěrka z mikrovlákna.',
      },
      {
        typ: 'varovani',
        titulek: 'Kam ocet nepatří',
        text: 'Přírodní kámen (mramor, žula, travertin), nelakované a voskované dřevo, spárovací hmota v dlouhodobém kontaktu a gumová těsnění. Kyselina kámen naleptá a zmatní – a to už nevrátíte.',
      },
      { typ: 'nadpis', text: 'Jedlá soda – jemný prášek na všechno' },
      {
        typ: 'odstavec',
        text: 'Jedlá soda (hydrogenuhličitan sodný) je mírně zásaditá a jemně abrazivní. Smíchaná s trochou vody vytvoří pastu, která si poradí s připečenými zbytky na plechu, šmouhami na dřezu nebo zašlou vanou. Navíc pohlcuje pachy – otevřená miska v lednici nebo posypaný koberec na pár hodin před vysátím dělají divy.',
      },
      {
        typ: 'tip',
        titulek: 'Soda není soda',
        text: 'Jedlá soda a soda na praní (uhličitan sodný) jsou dvě různé věci. Soda na praní je mnohem silnější odmašťovač – skvělá na digestoř nebo zašlé pracovní oděvy, ale pracujte s ní v rukavicích.',
      },
      { typ: 'nadpis', text: 'Citron a kyselina citronová' },
      {
        typ: 'odstavec',
        text: 'Kyselina citronová je nejšetrnější cesta, jak odvápnit rychlovarnou konvici: dvě lžičky na naplněnou konvici, převařit, nechat chvíli stát a vypláchnout. Čerstvý citron zase krásně provoní mikrovlnku a pomůže změkčit zaschlé zbytky – o tom víc v článku o kuchyni.',
      },
      { typ: 'nadpis', text: 'Nejčastější omyl: ocet + soda' },
      {
        typ: 'odstavec',
        text: 'Šumivá reakce octa se sodou vypadá efektně, ale obě látky se navzájem neutralizují. Výsledkem je hlavně voda, trocha soli a oxid uhličitý – tedy méně čisticí síly, ne víc. Používejte je raději postupně: nejdřív sodou vydrhnout, opláchnout, potom octem odvápnit.',
      },
      {
        typ: 'varovani',
        titulek: 'Nikdy nemíchejte s chlórem',
        text: 'Ocet ani jiné kyseliny nikdy nekombinujte s přípravky na bázi chlóru (typicky Savo a různé čističe WC). Uvolňuje se jedovatý plyn. Pokud chlór doma používáte, střídejte prostředky až po důkladném opláchnutí.',
      },
      { typ: 'nadpis', text: 'Základní přírodní sada' },
      {
        typ: 'seznam',
        polozky: [
          'rozprašovač s ředěným octem (sklo, baterie, vodní kámen)',
          'jedlá soda v dóze se sypátkem (pasta na drhnutí, pachy)',
          'kyselina citronová (konvice, pračka, kávovar)',
          'jemné mýdlo nebo prostředek na nádobí (univerzální mastnota)',
          'pár utěrek z mikrovlákna – udělají polovinu práce samy',
        ],
      },
    ],
  },
  {
    slug: 'desetiminutovy-uklid',
    titulek: 'Desetiminutový úklid: pořádek bez celodenního drhnutí',
    perex:
      'Nejlepší úklid je ten, který se opravdu stane. Krátké, pravidelné dávky porazí jednu velkou sobotní akci.',
    kategorie: 'Rutiny',
    datum: '2026-08-27',
    minutCteni: 5,
    motiv: 'sun',
    obsah: [
      {
        typ: 'odstavec',
        text: 'Velký úklid jednou za čas vyčerpá a stejně se k němu nechce. Deset minut denně je naopak tak málo, že se nedá vymluvit. A protože se nepořádek nestihne nahromadit, deset minut většinou opravdu stačí.',
      },
      { typ: 'nadpis', text: 'Jak na to' },
      {
        typ: 'seznam',
        cislovany: true,
        polozky: [
          'Nastavte si časovač na 10 minut. Konec je konec – i když nejste hotoví.',
          'Vyberte si jednu zónu: linku, botník, konferenční stolek.',
          'Vezměte košík a seberte všechno, co nepatří na místo. Rozneste to až na konci.',
          'Postupujte shora dolů – prach padá dolů, podlahu dělejte jako poslední.',
          'Odměňte se: káva, oblíbená písnička, odškrtnutá výzva.',
        ],
      },
      {
        typ: 'tip',
        titulek: 'Pravidlo jedné minuty',
        text: 'Co zabere méně než minutu, udělejte hned. Pověsit kabát, dát hrnek do myčky, zahodit obálku. Právě tyhle drobnosti tvoří většinu nepořádku.',
      },
      { typ: 'nadpis', text: 'Večerní reset' },
      {
        typ: 'odstavec',
        text: 'Pět minut před spaním vrátí byt do „výchozího stavu“: prázdný dřez, volná linka, polštáře na gauči, věci na zítřek připravené u dveří. Ráno pak nezačínáte chaosem a celý den se nese jinak.',
      },
      { typ: 'nadpis', text: 'Udělejte z toho hru' },
      {
        typ: 'odstavec',
        text: 'Právě proto vznikly úklidové výzvy na tomhle webu. Jedna konkrétní věc, žádné přemýšlení, co dřív. Otevřete stránku, splňte výzvu a máte hotovo. Zítra přijde další.',
      },
    ],
  },
  {
    slug: 'kuchyn-krok-za-krokem',
    titulek: 'Kuchyň krok za krokem: od mikrovlnky po digestoř',
    perex:
      'Kuchyň je srdce domova a zároveň místo, kde se nejrychleji usazuje mastnota. Tady je postup, který ji zvládne bez agresivní chemie.',
    kategorie: 'Kuchyň',
    datum: '2026-07-30',
    minutCteni: 7,
    motiv: 'blush',
    obsah: [
      {
        typ: 'odstavec',
        text: 'Kuchyň nemusíte uklízet celou najednou. Rozdělte si ji na pár menších úkolů a každý zvládnete za jedno odpoledne – nebo za jednu výzvu denně.',
      },
      { typ: 'nadpis', text: 'Mikrovlnka bez drhnutí' },
      {
        typ: 'odstavec',
        text: 'Do misky vhodné do mikrovlnky nalijte vodu a vymačkejte půlku citronu (nebo přidejte lžíci octa). Zapněte na 3–5 minut, až se vnitřek zapaří, a nechte dvířka pár minut zavřená. Zaschlé zbytky pak setřete jedním tahem a vnitřek krásně voní.',
      },
      { typ: 'nadpis', text: 'Digestoř a tukové filtry' },
      {
        typ: 'odstavec',
        text: 'Kovové tukové filtry vyndejte a namočte do co nejteplejší vody s lžící sody na praní nebo trochou prostředku na nádobí. Po půlhodině je stačí projet kartáčkem a opláchnout. Mnoho filtrů lze mýt i v myčce – ověřte si to ale v návodu, hliníkové filtry mohou ztmavnout.',
      },
      { typ: 'nadpis', text: 'Dřez a baterie' },
      {
        typ: 'seznam',
        polozky: [
          'Dřez posypte jedlou sodou, vydrhněte houbičkou a opláchněte.',
          'Baterii zabalte do utěrky namočené v ředěném octu, nechte 15 minut působit a otřete.',
          'Sítko a odtok propláchněte horkou vodou, ideálně jednou týdně.',
          'Na závěr vše vyleštěte suchou utěrkou z mikrovlákna – žádné mapy od vody.',
        ],
      },
      { typ: 'nadpis', text: 'Lednice' },
      {
        typ: 'odstavec',
        text: 'Než začnete mýt, projděte trvanlivost a vyhoďte, co už nejde zachránit. Police otřete teplou vodou s trochou jedlé sody – neutralizuje pachy a nezanechá parfemovanou vůni, kterou by přejaly potraviny. Starší věci přesuňte dopředu, ať je sníte jako první.',
      },
      {
        typ: 'tip',
        titulek: 'Úchytky a vypínače',
        text: 'Nejšpinavější místa v kuchyni často nejsou vidět: úchytky skříněk, ovladače trouby, vypínače. Jednou týdně je otřete hadříkem s mýdlovou vodou – zabere to dvě minuty.',
      },
    ],
  },
  {
    slug: 'minimalismus-bez-vycitek',
    titulek: 'Jak se zbavit věcí bez výčitek',
    perex:
      'Méně věcí znamená méně úklidu. Jak se rozloučit s tím, co už nepotřebujete – a dát tomu ještě druhý život.',
    kategorie: 'Minimalismus',
    datum: '2026-06-12',
    minutCteni: 5,
    motiv: 'lilac',
    obsah: [
      {
        typ: 'odstavec',
        text: 'Každá věc, kterou vlastníme, chce svoje místo, svůj čas a svůj úklid. Proto bývá nejúčinnějším úklidovým trikem prostě mít méně. Nejde o prázdné bílé byty – jde o to, aby doma zůstalo hlavně to, co používáte a máte rádi.',
      },
      { typ: 'nadpis', text: 'Metoda tří krabic' },
      {
        typ: 'odstavec',
        text: 'Připravte si tři krabice: NECHAT, DAROVAT / PRODAT a VYHODIT. Projděte jednu zásuvku nebo jednu poličku a každou věc vezměte do ruky. Rozhodujte rychle – když váháte déle než pár vteřin, věc pravděpodobně nepotřebujete.',
      },
      {
        typ: 'seznam',
        polozky: [
          'Používala jsem to za poslední rok?',
          'Koupila bych si to znovu?',
          'Mám doma jinou věc, která dělá totéž?',
          'Nechávám si to jen z pocitu viny?',
        ],
      },
      { typ: 'nadpis', text: 'Kam s věcmi' },
      {
        typ: 'seznam',
        polozky: [
          'Oblečení a textil – kontejnery na textil, charitní obchody, swapy s kamarádkami.',
          'Knihy – knihobudky, antikvariáty, místní knihovny.',
          'Elektro – zpětný odběr v obchodech nebo sběrný dvůr, nikdy ne do směsného odpadu.',
          'Nábytek a hračky – bazary, sousedské skupiny, azylové domy.',
        ],
      },
      {
        typ: 'tip',
        titulek: 'Jedna dovnitř, jedna ven',
        text: 'Když domů přinesete novou věc, jedna podobná odchází. Jednoduché pravidlo, které zastaví hromadění dřív, než začne.',
      },
      {
        typ: 'odstavec',
        text: 'Nespěchejte. Jedna zásuvka denně je za měsíc třicet zásuvek. A každý vyklizený kout je prostor, který už nemusíte uklízet.',
      },
    ],
  },
]

export function getClanek(slug: string) {
  return clanky.find((c) => c.slug === slug)
}

export function formatDatum(datum: string) {
  return new Intl.DateTimeFormat('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${datum}T12:00:00`)
  )
}

// Články o úklidu. Nový článek = nový objekt v poli `clanky` (stránka se vygeneruje automaticky).

export type Blok =
  | { typ: 'odstavec'; text: string }
  | { typ: 'nadpis'; text: string }
  | { typ: 'seznam'; polozky: string[]; cislovany?: boolean }
  | { typ: 'tip'; titulek: string; text: string }
  | { typ: 'varovani'; titulek: string; text: string }

export interface Clanek {
  /** URL článku – krátká, s klíčovými slovy, bez diakritiky */
  slug: string
  titulek: string
  /** Titulek pro Google (do ~60 znaků), když se má lišit od nadpisu */
  seoTitulek: string
  /** Meta description (do ~155 znaků) */
  seoPopis: string
  perex: string
  /** Hlavní body článku – zobrazí se nahoře jako „Ve zkratce“ (dobré pro featured snippets) */
  shrnuti: string[]
  /** Regulární výraz pro výběr souvisejících výzev ze Supabase */
  vyzvyFiltr: string
  kategorie: string
  datum: string // YYYY-MM-DD
  upraveno: string // YYYY-MM-DD
  minutCteni: number
  /** Barevný motiv obálky – viz `.cover-*` v globals.css (podklad pod fotkou) */
  motiv: 'sage' | 'blush' | 'sun' | 'lilac'
  /** Obálka v /public/images */
  obrazek: string
  obrazekAlt: string
  obsah: Blok[]
}

export const clanky: Clanek[] = [
  {
    slug: 'ocet-jedla-soda-citron-na-uklid',
    titulek: 'Ocet, soda a citron: co přírodní čističe opravdu zvládnou',
    seoTitulek: 'Ocet, jedlá soda a citron na úklid: kdy pomůžou a kdy škodí',
    seoPopis: 'Jak uklízet octem, jedlou sodou a kyselinou citronovou. Kam ocet nepatří, proč nemíchat ocet se sodou a jak si sestavit přírodní úklidovou sadu.',
    shrnuti: [
      'Ocet rozpouští vodní kámen – ale nepatří na mramor, žulu ani nelakované dřevo.',
      'Jedlá soda jemně drhne a pohlcuje pachy, soda na praní je silný odmašťovač.',
      'Ocet se sodou se navzájem neutralizují – používejte je postupně, ne smíchané.',
      'Kyseliny nikdy nemíchejte s chlórovými přípravky.',
    ],
    vyzvyFiltr: 'oct|soda|sod[ou]|citr|chemi|přírodn|ekolog|esenciál|recept',
    perex:
      'Tři suroviny z kuchyňské linky nahradí půlku drogerie. Jen je potřeba vědět, kam patří – a kam rozhodně ne.',
    kategorie: 'Přírodní úklid',
    datum: '2026-09-18',
    upraveno: '2026-10-07',
    minutCteni: 6,
    motiv: 'sage',
    obrazek: '/images/clanek-prirodni-cistice.jpg',
    obrazekAlt: 'Skleněný rozprašovač, ocet, jedlá soda a citrony na lněném ubrusu',
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
    slug: 'rychly-uklid-za-10-minut',
    titulek: 'Desetiminutový úklid: pořádek bez celodenního drhnutí',
    seoTitulek: 'Rychlý úklid za 10 minut denně: jednoduchá rutina',
    seoPopis: 'Jak udržet pořádek bez celodenního drhnutí. Desetiminutová úklidová rutina, pravidlo jedné minuty a večerní reset krok za krokem.',
    shrnuti: [
      'Nastavte časovač na 10 minut a uklízejte jen jednu zónu.',
      'Co zabere méně než minutu, udělejte hned.',
      'Pětiminutový večerní reset vrátí byt do výchozího stavu.',
      'Pravidelné krátké dávky porazí jeden velký víkendový úklid.',
    ],
    vyzvyFiltr: 'minut|časomír|rychl|večer|ráno|rutin|hudb|playlist|odměn|stůl|židl',
    perex:
      'Nejlepší úklid je ten, který se opravdu stane. Krátké, pravidelné dávky porazí jednu velkou sobotní akci.',
    kategorie: 'Rutiny',
    datum: '2026-08-27',
    upraveno: '2026-10-07',
    minutCteni: 5,
    motiv: 'sun',
    obrazek: '/images/clanek-desetiminutovy.jpg',
    obrazekAlt: 'Uklizený obývací pokoj s přesýpacími hodinami na konferenčním stolku',
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
    slug: 'jak-uklidit-kuchyn',
    titulek: 'Kuchyň krok za krokem: od mikrovlnky po digestoř',
    seoTitulek: 'Jak uklidit kuchyň: mikrovlnka, digestoř, dřez i lednice',
    seoPopis: 'Postup úklidu kuchyně bez agresivní chemie: jak vyčistit mikrovlnku citronem, odmastit digestoř, odvápnit baterii a umýt lednici.',
    shrnuti: [
      'Mikrovlnku vyčistí miska vody s citronem – zapnout na 3–5 minut a setřít.',
      'Tukové filtry digestoře namočte do horké vody se sodou na praní.',
      'Baterii odvápníte utěrkou namočenou v ředěném octu.',
      'Lednici umyjte vodou s jedlou sodou – neutralizuje pachy.',
    ],
    vyzvyFiltr: 'kuchy|lednic|mrazá|dřez|mikrovln|digesto|troub|sporák|varn|nádob|myčk|link|kávovar|konvic|spíž|potravin|koření|hrnc|pánv',
    perex:
      'Kuchyň je srdce domova a zároveň místo, kde se nejrychleji usazuje mastnota. Tady je postup, který ji zvládne bez agresivní chemie.',
    kategorie: 'Kuchyň',
    datum: '2026-07-30',
    upraveno: '2026-10-07',
    minutCteni: 7,
    motiv: 'blush',
    obrazek: '/images/clanek-kuchyn.jpg',
    obrazekAlt: 'Čistá kuchyň se šalvějově zelenými skříňkami a miskou citronů',
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
    slug: 'jak-se-zbavit-veci',
    titulek: 'Jak se zbavit věcí bez výčitek',
    seoTitulek: 'Jak se zbavit věcí bez výčitek: metoda tří krabic',
    seoPopis: 'Minimalismus v praxi: jak třídit věci metodou tří krabic, kam s oblečením, knihami a elektrem a jak zastavit hromadění věcí doma.',
    shrnuti: [
      'Třiďte do tří krabic: nechat, darovat/prodat, vyhodit.',
      'Každou věc vezměte do ruky a rozhodněte během pár vteřin.',
      'Oblečení, knihy i elektro mají kam odejít – nevyhazujte je do směsného odpadu.',
      'Pravidlo „jedna dovnitř, jedna ven“ zastaví hromadění.',
    ],
    vyzvyFiltr: 'daruj|vyhoď|vytřiď|roztřiď|zbav|minimal|bazar|sběrn|krabic|oblečení|nenosíš|kondo|méně|omez',
    perex:
      'Méně věcí znamená méně úklidu. Jak se rozloučit s tím, co už nepotřebujete – a dát tomu ještě druhý život.',
    kategorie: 'Minimalismus',
    datum: '2026-06-12',
    upraveno: '2026-10-07',
    minutCteni: 5,
    motiv: 'lilac',
    obrazek: '/images/clanek-minimalismus.jpg',
    obrazekAlt: 'Tři krabice s poskládaným oblečením před uspořádanou šatní skříní',
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

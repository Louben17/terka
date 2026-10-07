// Rozdělení výzev do tematických skupin podle klíčových slov (pořadí rozhoduje – první shoda vyhrává).

export interface Kategorie {
  id: string
  nazev: string
  popis: string
  vzor: RegExp | null
}

export const kategorie: Kategorie[] = [
  {
    id: 'kuchyn',
    nazev: 'Úklid kuchyně',
    popis: 'Lednice, dřez, mikrovlnka, digestoř i spíž – výzvy pro čistou a voňavou kuchyň.',
    vzor: /kuchy|lednic|mrazá|dřez|mikrovln|digesto|troub|sporák|varn|nádob|myčk|link[uy]|kávovar|konvic|spíž|potravin|koření|utěrk|hrnc|pánv|příbor|talíř|jídl|vaření|chleb|topinkovač/i,
  },
  {
    id: 'koupelna',
    nazev: 'Koupelna a prádlo',
    popis: 'Vana, sprcha, WC, zrcadla, ručníky a praní – koupelna bez vodního kamene.',
    vzor: /koupel|\bvan[uay]?\b|sprch|záchod|\bWC\b|toalet|umyvadl|zrcad|ručník|kartáček|pračk|prádl|prací|kosmet|šampon|mýdl/i,
  },
  {
    id: 'obyvak',
    nazev: 'Obývák a ložnice',
    popis: 'Sedačka, postel, polštáře, rostliny i kabely – místa, kde odpočíváme.',
    vzor: /obýv|sedačk|gauč|polštář|\bdek[yu]?\b|postel|povlečen|matrac|ložnic|ovladač|konzol|knih|květin|kytk|rostlin|svíčk|lamp|svítidl|obraz|kabel|televiz|stolk/i,
  },
  {
    id: 'podlahy',
    nazev: 'Podlahy, okna a prach',
    popis: 'Vysávání, vytírání, parapety, lišty, kliky a pavučiny.',
    vzor: /podlah|vysaj|vysav|vyluxuj|vytř|prach|lišt|parapet|okn|záclon|závěs|pavuč|rohy|dveř|klik|vypínač|stěn|koberec|rohožk/i,
  },
  {
    id: 'trideni',
    nazev: 'Třídění a organizace věcí',
    popis: 'Šatník, šuplíky, krabice a věci navíc – méně věcí znamená méně úklidu.',
    vzor: /skří|šatn|oblečení|oblec|tričk|\bbot[yuo]?\b|šuplík|zásuv|krabic|daruj|vyhoď|vytřiď|roztřiď|sběrn|bazar|kondo|ponož|kabát|bund|šperk|kabelk|tašk|věci|hračk|štítk|polic/i,
  },
  {
    id: 'rutiny',
    nazev: 'Rutiny, motivace a další',
    popis: 'Úklidové návyky, rodinné výzvy a malé radosti, které úklid zpříjemní.',
    vzor: null,
  },
]

export function rozdelDoKategorii(vyzvy: string[]) {
  const skupiny = new Map<string, string[]>(kategorie.map((k) => [k.id, []]))
  for (const text of vyzvy) {
    const k = kategorie.find((k) => k.vzor === null || k.vzor.test(text))!
    skupiny.get(k.id)!.push(text)
  }
  return kategorie.map((k) => ({ ...k, vyzvy: skupiny.get(k.id)! })).filter((k) => k.vyzvy.length > 0)
}

export function souvisejiciVyzvy(vyzvy: string[], filtr: string, pocet = 6) {
  const vzor = new RegExp(filtr, 'i')
  return vyzvy.filter((v) => vzor.test(v)).slice(0, pocet)
}

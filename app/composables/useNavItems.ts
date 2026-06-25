export interface NavItem {
  label: string
  slug: string
}

export const categories: NavItem[] = [
  { label: 'Absoluto', slug: 'absoluto' },
  { label: 'Junior', slug: 'junior' },
  { label: 'Infantil', slug: 'infantil' },
  { label: 'Alevín', slug: 'alevin' },
]

export const modalities: NavItem[] = [
  { label: 'Dúo', slug: 'duo' },
  { label: 'Dúo Mixto', slug: 'duo-mixto' },
  { label: 'Combo', slug: 'combo' },
  { label: 'Equipo', slug: 'equipo' },
]

export function useNavItems() {
  return { categories, modalities }
}

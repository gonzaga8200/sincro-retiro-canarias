export interface NavItem {
  label: string
  slug: string
}

export function useNavItems() {
  const { t } = useI18n()

  const categories = computed<NavItem[]>(() => [
    { label: t('categories.absoluto'), slug: 'absoluto' },
    { label: t('categories.junior'), slug: 'junior' },
    { label: t('categories.infantil'), slug: 'infantil' },
    { label: t('categories.alevin'), slug: 'alevin' },
  ])

  const modalities = computed<NavItem[]>(() => [
    { label: t('modalities.duo'), slug: 'duo' },
    { label: t('modalities.duo_mixto'), slug: 'duo-mixto' },
    { label: t('modalities.combo'), slug: 'combo' },
    { label: t('modalities.equipo'), slug: 'equipo' },
  ])

  return { categories, modalities }
}

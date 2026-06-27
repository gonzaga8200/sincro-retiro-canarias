<script setup lang="ts">
const { categories, modalities } = useNavItems()
const { locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const route = useRoute()

const mobileOpen = ref(false)
const openCategory = ref<string | null>(null)
const langOpen = ref(false)

watch(() => route.path, () => {
  mobileOpen.value = false
  openCategory.value = null
  langOpen.value = false
})

function onDesktopEnter(slug: string) { openCategory.value = slug }
function onDesktopLeave() { openCategory.value = null }

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
  if (!mobileOpen.value) openCategory.value = null
}

function toggleCategory(slug: string) {
  openCategory.value = openCategory.value === slug ? null : slug
}

// JS transition hooks for reliable height animation
function onAccordionEnter(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = '0'
  htmlEl.style.overflow = 'hidden'
  requestAnimationFrame(() => { htmlEl.style.height = htmlEl.scrollHeight + 'px' })
}
function onAccordionAfterEnter(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = ''
  htmlEl.style.overflow = ''
}
function onAccordionLeave(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = htmlEl.scrollHeight + 'px'
  htmlEl.style.overflow = 'hidden'
  requestAnimationFrame(() => { htmlEl.style.height = '0' })
}
</script>

<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">

        <!-- Brand -->
        <NuxtLink :to="localePath('/')" class="flex items-center gap-2.5 group">
          <span class="text-2xl leading-none select-none">🏊</span>
          <div class="leading-tight">
            <p class="text-sm font-bold text-gray-900 group-hover:text-primary-600 transition-colors hidden sm:block">
              {{ $t('nav.brand') }}
            </p>
            <p class="text-xs font-bold text-gray-900 group-hover:text-primary-600 transition-colors sm:hidden">
              {{ $t('nav.brandShort') }}
            </p>
          </div>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-0.5">
          <div
            v-for="cat in categories"
            :key="cat.slug"
            class="relative"
            @mouseenter="onDesktopEnter(cat.slug)"
            @mouseleave="onDesktopLeave"
          >
            <button
              class="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="openCategory === cat.slug
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
            >
              {{ cat.label }}
              <svg
                class="w-3.5 h-3.5 text-gray-400 transition-transform duration-200"
                :class="{ 'rotate-180 text-primary-500': openCategory === cat.slug }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <Transition name="dropdown">
              <div
                v-if="openCategory === cat.slug"
                class="absolute top-[calc(100%+6px)] left-0 w-44 bg-white rounded-xl border border-gray-100 shadow-xl shadow-gray-200/60 py-1.5 overflow-hidden"
              >
                <NuxtLink
                  v-for="mod in modalities"
                  :key="mod.slug"
                  :to="localePath(`/${cat.slug}/${mod.slug}`)"
                  class="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                >
                  <span class="w-1 h-1 rounded-full bg-current opacity-40 shrink-0" />
                  {{ mod.label }}
                </NuxtLink>
              </div>
            </Transition>
          </div>
        </nav>

        <div class="flex items-center gap-1">
          <!-- Language switcher (desktop) -->
          <div
            class="relative hidden md:block"
            @mouseenter="langOpen = true"
            @mouseleave="langOpen = false"
          >
            <button
              class="flex items-center gap-1 px-3 py-2 text-xs font-bold uppercase tracking-wide text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {{ locale }}
              <svg class="w-3 h-3 text-gray-400 transition-transform duration-200" :class="{ 'rotate-180': langOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <Transition name="dropdown">
              <div
                v-if="langOpen"
                class="absolute right-0 top-[calc(100%+6px)] bg-white rounded-xl border border-gray-100 shadow-xl shadow-gray-200/60 py-1.5 min-w-[130px] overflow-hidden"
              >
                <NuxtLink
                  v-for="l in locales"
                  :key="l.code"
                  :to="switchLocalePath(l.code)"
                  class="flex items-center gap-2.5 px-4 py-2 text-sm transition-colors"
                  :class="locale === l.code
                    ? 'text-primary-600 font-semibold bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'"
                >
                  <AppFlag :code="l.code" />
                  {{ l.name }}
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <!-- Burger button -->
          <button
            class="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
            :aria-expanded="mobileOpen"
            :aria-label="$t('nav.menu')"
            @click="toggleMobile"
          >
            <Transition name="icon" mode="out-in">
              <svg v-if="!mobileOpen" key="open" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else key="close" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Transition>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu panel -->
    <Transition name="panel">
      <div v-if="mobileOpen" class="md:hidden border-t border-gray-100 bg-white">
        <nav class="px-3 py-3 space-y-0.5">
          <div v-for="cat in categories" :key="cat.slug">
            <button
              class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              :class="openCategory === cat.slug
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'"
              @click="toggleCategory(cat.slug)"
            >
              {{ cat.label }}
              <svg
                class="w-4 h-4 text-gray-400 transition-transform duration-200"
                :class="{ 'rotate-180 text-primary-500': openCategory === cat.slug }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <Transition
              name="accordion"
              @enter="onAccordionEnter"
              @after-enter="onAccordionAfterEnter"
              @leave="onAccordionLeave"
            >
              <div v-if="openCategory === cat.slug">
                <NuxtLink
                  v-for="mod in modalities"
                  :key="mod.slug"
                  :to="localePath(`/${cat.slug}/${mod.slug}`)"
                  class="flex items-center gap-2.5 pl-6 pr-3 py-2.5 text-sm text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <span class="w-1 h-1 rounded-full bg-current opacity-40 shrink-0" />
                  {{ mod.label }}
                </NuxtLink>
              </div>
            </Transition>
          </div>
        </nav>

        <!-- Language switcher (mobile) -->
        <div class="px-3 pb-3 pt-1 border-t border-gray-50 mt-1">
          <p class="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Idioma / Language</p>
          <div class="grid grid-cols-3 gap-1">
            <NuxtLink
              v-for="l in locales"
              :key="l.code"
              :to="switchLocalePath(l.code)"
              class="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors"
              :class="locale === l.code
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'"
            >
              <AppFlag :code="l.code" />
              {{ l.code.toUpperCase() }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}

.panel-enter-active,
.panel-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.accordion-enter-active,
.accordion-leave-active {
  transition: height 0.22s ease, opacity 0.18s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
}

.icon-enter-active,
.icon-leave-active {
  transition: opacity 0.1s ease, transform 0.1s ease;
}
.icon-enter-from,
.icon-leave-to {
  opacity: 0;
  transform: rotate(45deg) scale(0.8);
}
</style>

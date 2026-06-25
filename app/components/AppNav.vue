<script setup lang="ts">
const { categories, modalities } = useNavItems()
const route = useRoute()

const mobileOpen = ref(false)
const openCategory = ref<string | null>(null)

watch(() => route.path, () => {
  mobileOpen.value = false
  openCategory.value = null
})

function onDesktopEnter(slug: string) {
  openCategory.value = slug
}

function onDesktopLeave() {
  openCategory.value = null
}

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
  if (!mobileOpen.value) openCategory.value = null
}

function toggleCategory(slug: string) {
  openCategory.value = openCategory.value === slug ? null : slug
}

// JS transition hooks for reliable height animation (avoids max-height guessing)
function onAccordionEnter(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = '0'
  htmlEl.style.overflow = 'hidden'
  requestAnimationFrame(() => {
    htmlEl.style.height = htmlEl.scrollHeight + 'px'
  })
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
  requestAnimationFrame(() => {
    htmlEl.style.height = '0'
  })
}
</script>

<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">

        <!-- Brand -->
        <NuxtLink
          to="/"
          class="flex items-center gap-2.5 group"
        >
          <span class="text-2xl leading-none select-none">🏊</span>
          <div class="leading-tight">
            <p class="text-sm font-bold text-gray-900 group-hover:text-primary-600 transition-colors hidden sm:block">
              Sincro Retiro Canarias
            </p>
            <p class="text-xs font-bold text-gray-900 group-hover:text-primary-600 transition-colors sm:hidden">
              SRC
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
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
                  :to="`/${cat.slug}/${mod.slug}`"
                  class="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                >
                  <span class="w-1 h-1 rounded-full bg-current opacity-40 shrink-0" />
                  {{ mod.label }}
                </NuxtLink>
              </div>
            </Transition>
          </div>
        </nav>

        <!-- Burger button -->
        <button
          class="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
          :aria-expanded="mobileOpen"
          aria-label="Menú"
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
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
                  :to="`/${cat.slug}/${mod.slug}`"
                  class="flex items-center gap-2.5 pl-6 pr-3 py-2.5 text-sm text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <span class="w-1 h-1 rounded-full bg-current opacity-40 shrink-0" />
                  {{ mod.label }}
                </NuxtLink>
              </div>
            </Transition>

          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* Desktop dropdown */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}

/* Mobile panel slide */
.panel-enter-active,
.panel-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Accordion height (handled by JS hooks, only needs timing) */
.accordion-enter-active,
.accordion-leave-active {
  transition: height 0.22s ease, opacity 0.18s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
}

/* Burger ↔ close icon swap */
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

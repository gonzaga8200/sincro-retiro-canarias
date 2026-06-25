<script setup lang="ts">
const categories = [
  { label: 'Absoluto', slug: 'absoluto' },
  { label: 'Junior', slug: 'junior' },
  { label: 'Infantil', slug: 'infantil' },
  { label: 'Alevín', slug: 'alevin' },
]

const modalities = [
  { label: 'Dúo', slug: 'duo' },
  { label: 'Dúo Mixto', slug: 'duo-mixto' },
  { label: 'Combo', slug: 'combo' },
  { label: 'Equipo', slug: 'equipo' },
]

const mobileOpen = ref(false)
const openCategory = ref<string | null>(null)
const route = useRoute()

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
  if (!mobileOpen.value) openCategory.value = null
}

function toggleCategory(slug: string) {
  openCategory.value = openCategory.value === slug ? null : slug
}

watch(() => route.path, () => {
  mobileOpen.value = false
  openCategory.value = null
})
</script>

<template>
  <nav class="bg-white shadow-md relative z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">

        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 shrink-0">
          <span class="text-2xl leading-none">🏊</span>
          <span class="font-bold text-primary-700 text-lg hidden sm:block">Sincro Retiro Canarias</span>
          <span class="font-bold text-primary-700 text-base sm:hidden">SRC</span>
        </NuxtLink>

        <!-- Desktop menu -->
        <div class="hidden md:flex items-center gap-1">
          <div
            v-for="cat in categories"
            :key="cat.slug"
            class="relative"
            @mouseenter="openCategory = cat.slug"
            @mouseleave="openCategory = null"
          >
            <button
              class="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-primary-50 hover:text-primary-700 transition"
              :class="openCategory === cat.slug ? 'bg-primary-50 text-primary-700' : ''"
            >
              {{ cat.label }}
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="openCategory === cat.slug ? 'rotate-180' : ''"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <Transition name="dropdown">
              <div
                v-if="openCategory === cat.slug"
                class="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1"
              >
                <NuxtLink
                  v-for="mod in modalities"
                  :key="mod.slug"
                  :to="`/${cat.slug}/${mod.slug}`"
                  class="block px-4 py-2.5 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition"
                >
                  {{ mod.label }}
                </NuxtLink>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Burger button -->
        <button
          class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
          :aria-expanded="mobileOpen"
          aria-label="Abrir menú"
          @click="toggleMobile"
        >
          <svg v-if="!mobileOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide-down">
      <div v-if="mobileOpen" class="md:hidden border-t border-gray-100">
        <div class="px-4 py-3 space-y-1">
          <div v-for="cat in categories" :key="cat.slug">
            <button
              class="w-full flex items-center justify-between px-3 py-2.5 text-left text-sm font-medium text-gray-700 rounded-lg hover:bg-primary-50 hover:text-primary-700 transition"
              :class="openCategory === cat.slug ? 'bg-primary-50 text-primary-700' : ''"
              @click="toggleCategory(cat.slug)"
            >
              {{ cat.label }}
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="openCategory === cat.slug ? 'rotate-180' : ''"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <Transition name="accordion">
              <div v-if="openCategory === cat.slug" class="overflow-hidden">
                <NuxtLink
                  v-for="mod in modalities"
                  :key="mod.slug"
                  :to="`/${cat.slug}/${mod.slug}`"
                  class="block ml-4 px-3 py-2 text-sm text-gray-500 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition"
                >
                  {{ mod.label }}
                </NuxtLink>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.2s ease, max-height 0.25s ease;
  max-height: 500px;
  overflow: hidden;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: opacity 0.15s ease, max-height 0.2s ease;
  max-height: 200px;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>

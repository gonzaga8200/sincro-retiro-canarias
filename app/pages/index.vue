<script setup lang="ts">
const { categories, modalities } = useNavItems()
const localePath = useLocalePath()

const imageLoaded = ref(false)
const textVisible = ref(false)

onMounted(() => {
  setTimeout(() => (textVisible.value = true), 100)
})
</script>

<template>
  <!-- Hero -->
  <section
    class="relative overflow-hidden bg-slate-900"
    style="height: clamp(360px, 72vh, 740px)"
  >
    <!-- Image -->
    <NuxtPicture
      src="/images/sincro.png"
      alt="Natación artística sincronizada — Campeonato de España 2026"
      :img-attrs="{
        class: `absolute inset-0 w-full h-full object-cover object-center transition-[opacity,transform] duration-[1400ms] ease-out will-change-transform ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.05]'}`,
        loading: 'eager',
        fetchpriority: 'high',
      }"
      width="1408"
      height="768"
      sizes="100vw sm:100vw lg:100vw"
      @load="imageLoaded = true"
    />

    <!-- Layered gradients -->
    <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-slate-900/10 pointer-events-none" />
    <div class="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-transparent to-transparent pointer-events-none" />

    <!-- Hero text -->
    <div class="absolute inset-0 flex flex-col justify-end">
      <div class="max-w-5xl mx-auto w-full px-6 sm:px-10 pb-10 sm:pb-14">
        <Transition name="hero-text" appear>
          <div v-if="textVisible" class="space-y-3">
            <h1 class="text-white font-extrabold leading-none tracking-tight"
              style="font-size: clamp(2.2rem, 6vw, 4rem)"
            >
              {{ $t('home.title') }}
            </h1>
            <p class="text-white/50 text-sm sm:text-base font-medium">
              {{ $t('home.subtitle') }}
            </p>
          </div>
        </Transition>
      </div>
    </div>
  </section>

  <!-- Categories -->
  <section class="max-w-5xl mx-auto px-6 sm:px-10 py-12">
    <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-5">
      {{ $t('home.resultsBy') }}
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="(cat, i) in categories"
        :key="cat.slug"
        class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-shadow hover:shadow-md"
        :style="`animation-delay: ${i * 80}ms`"
      >
        <div class="px-5 pt-4 pb-3 border-b border-gray-50">
          <h2 class="text-sm font-bold text-gray-900">{{ cat.label }}</h2>
        </div>
        <ul class="p-2 space-y-0.5">
          <li v-for="mod in modalities" :key="mod.slug">
            <NuxtLink
              :to="localePath(`/${cat.slug}/${mod.slug}`)"
              class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            >
              <span class="w-1 h-1 rounded-full bg-current opacity-50 shrink-0" />
              {{ mod.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-text-enter-active {
  transition: opacity 0.9s ease 0.15s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s;
}
.hero-text-enter-from {
  opacity: 0;
  transform: translateY(22px);
}
</style>

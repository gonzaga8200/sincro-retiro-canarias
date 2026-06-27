<script setup lang="ts">
defineProps<{ code: string }>()

const flags: Record<string, string> = {
  es: '🇪🇸',
  en: '🇬🇧',
  fr: '🇫🇷',
  de: '🇩🇪',
  it: '🇮🇹',
}
</script>

<template>
  <img
    v-if="code === 'ca'"
    src="/images/catala.svg"
    alt="Català"
    class="w-5 h-[14px] shrink-0 rounded-[2px]"
  />
  <span v-else class="text-base leading-none shrink-0">{{ flags[code] }}</span>
</template>

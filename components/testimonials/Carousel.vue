<script setup>
const items = [
    "Testimoni 1",
    "Testimoni 2",
    "Testimoni 3",
    "Testimoni 4",
    "Testimoni 5",
]
</script>

<template>
    <!-- TODO: loop, button bug, Bikin sendiri -->
  <UCarousel
    v-slot="{ item }"
    :items="items"
    :ui="{
      item: 'basis-full',
      container: 'rounded-lg'
    }"
    :prev-button="{
      color: 'gray',
      icon: 'i-heroicons-arrow-left-20-solid',
      class: '-left-12'
    }"
    :next-button="{
      color: 'gray',
      icon: 'i-heroicons-arrow-right-20-solid',
      class: '-right-12'
    }"
    arrows
    class="w-64 mx-auto"
  >
    <p class="text-2xl">{{ item }}</p>
</UCarousel>
</template>
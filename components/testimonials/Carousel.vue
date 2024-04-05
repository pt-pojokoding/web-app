<script setup lang="ts">
  const items = [
    "Testimoni 1",
    "Testimoni 2",
    "Testimoni 3",
    "Testimoni 4",
    "Testimoni 5",
  ]

  const items2 = [
    {
      name: 'Asep',
      img_url: 'https://images.unsplash.com/photo-1712100596750-f5a184222206?q=80&w=2804&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      job: 'Mahasiswa'
    },
    {
      name: 'Tono',
      img_url: 'https://images.unsplash.com/photo-1712100596750-f5a184222206?q=80&w=2804&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      testimonial: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      job: 'Mahasiswa'
    }
  ]
</script>

<template>
  <!-- TODO: loop, button bug, Bikin sendiri -->
  <UCarousel
    v-slot="{ item, index }"
    :items="items2"
    :ui="{
      item: 'basis-full flex flex-col w-full h-fit text-white justify-center items-center',
      container: 'rounded-lg '
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
    class="w-full mx-auto"
  >
    <div class="w-full h-full text-center text-pretty border rounded-lg px-5 py-3">
      <p>{{ item.testimonial }}</p>
      <div class="mt-8">
        <img :src="item.img_url" class="size-10 object-cover mx-auto rounded-full" />
        <div class="">
          <h4 class="font-semibold">{{ item.name }}</h4>
          <p>{{ item.job }}</p>
        </div>
      </div>
    </div>
  </UCarousel>
</template>
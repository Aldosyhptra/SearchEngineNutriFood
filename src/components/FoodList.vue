<script setup>
defineProps({
  recipe: Object
})

const limitWords = (text, limit) => {
  if (!text) return '';
  const words = text.split(' ');
  return words.length <= limit ? text : words.slice(0, limit).join(' ') + '...';
}
</script>

<template>
    <div class="shadow-md max-w-3xl mx-auto flex flex-row justify-between items-start mb-10  p-4 ">
        <div class="text-start">
            <p class="text-gray-500 text-xs">{{ limitWords(recipe.link, 10) }}</p>
            <a :href="recipe.link" target="_blank" class="text-2xl font-semibold text-blue-600 hover:underline">
            {{ recipe.judul }}
            </a>
            <p class="mt-3 italic text-gray-600">{{ recipe.ringkasan_gizi }}</p>

            <h3 class="mt-4 font-semibold">Bahan:</h3>
            <p class="">{{ recipe.bahan }}</p>

            <!-- <h3 class="mt-4 font-semibold">Tahapan:</h3>
            <ol class="list-decimal list-inside">
            <li v-for="(step, i) in recipe.tahapan" :key="i">{{ step }}</li>
            </ol> -->
        </div>
        <a :href="recipe.link" target="_blank" class="text-2xl font-semibold text-blue-600 hover:underline">
            <img  :src="recipe.gambar" :alt="recipe.judul" class="w-50 max-w-xs mt-2 rounded ml-5" />
        </a>
    </div>
</template>
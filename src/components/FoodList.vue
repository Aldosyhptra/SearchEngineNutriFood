<script setup>
import { ref } from 'vue'
import Modal from './modal.vue'

defineProps({
  recipes: Array
})

const showModal = ref(false)
const selectedRecipe = ref(null)

const openModal = (recipe) => {
  selectedRecipe.value = recipe
  showModal.value = true
}

const limitWords = (text, limit) => {
  if (!text) return ''
  const words = text.split(' ')
  return words.length <= limit ? text : words.slice(0, limit).join(' ') + '...'
}
</script>

<template>

  <div v-if="recipes.length === 0" class="text-center text-gray-500 mt-10">
    Tidak ada resep ditemukan.
  </div>

  <div v-else>
    <div
      v-for="(recipe, index) in recipes"
      :key="index"
      class="shadow-md max-w-3xl mx-auto flex md:flex-row flex-col justify-between items-start mb-10 p-4 cursor-pointer  hover:shadow-lg transition-all duration-300 rounded-lg hover:bg-gray-900">
      <div @click="openModal(recipe)" class="text-start order-1 md:order-0 ">
        <p class="text-gray-500 text-xs">{{ limitWords(recipe.link, 10) }}</p>
        <a  class="text-2xl capitalize font-semibold text-blue-600 hover:underline cursor-pointer">
          {{ recipe.judul }}
        </a>
        <p class="mt-3 italic text-gray-500">{{ recipe.gizi }}</p>
        
        <h3 class="mt-4 font-semibold">Bahan:</h3>
        <p>{{ limitWords(recipe.bahan, 25) }}</p>
      </div>
      
        <img :src="recipe.gambar" :alt="recipe.judul" class="w-50 max-w-xs mt-2 rounded mx-auto md:ml-5" />
      <div>
        <Modal v-if="showModal" @close="showModal = false">
            <h2 class="text-xl text-black capitalize font-bold mb-4">{{ selectedRecipe.judul }}</h2>
            <img :src="selectedRecipe.gambar" :alt="selectedRecipe.judul" class="w-50 max-w-xs mt-2 rounded mx-auto" />
            <p class="mt-3 italic text-gray-500">{{ selectedRecipe.gizi }}</p>
            <div class="mt-4 text-black">
              <h3 class="font-semibold">Bahan:</h3>
              <ol class="list-disc text-start list-inside space-y-1 mt-2">
                <li
                  v-for="(step, index) in selectedRecipe.bahan.split(/[\,\-]+/).map(s => s.trim()).filter(s => s)"
                  :key="index"
                >
                  {{ step }}
                </li>
              </ol>
            </div>
            <div class="mt-4 text-black">
              <h3 class="font-semibold">Tahapan:</h3>
              <ol class="list-decimal text-start list-inside space-y-1 mt-2">
                <li
                  v-for="(step, index) in selectedRecipe.tahapan.split(/[\|\.]+/).map(s => s.trim()).filter(s => s)"
                  :key="index"
                >
                  {{ step }}
                </li>
              </ol>
            </div>
            <div class="flex flex-wrap mt-4 justify-end gap-5">
              <button
                @click="showModal = false"
                class="bg-amber-400 text-white px-4 py-2 rounded hover:bg-amber-500"
              >
                Tutup
              </button>
              <a :href="selectedRecipe.link" target="_blank" class="text-white">
                <button
                  class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Lihat Resep
                </button>
              </a>
            </div>
        </Modal>
      </div>
      
    </div>
  </div>
</template>

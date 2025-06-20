<script setup>
import { ref, computed, watch } from 'vue'
import { X } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const keyword = ref('')
const router = useRouter()

// 🔹 Data statis keyword suggestion
const keywordList = [
  'Nasi Goreng',
  'Soto Ayam',
  'Rendang',
  'Ayam Bakar',
  'Sate Padang',
  'Bakso',
  'Rawon',
  'Gudeg',
]

// 🔹 Filter suggestion berdasarkan input
const suggestions = computed(() =>
  keyword.value.length > 0
    ? keywordList.filter(item =>
        item.toLowerCase().includes(keyword.value.toLowerCase())
      )
    : []
)

function clearQuery(){
  keyword.value=""
}

function onSubmit(e) {
  e.preventDefault()
  if (keyword.value.trim() === '') return
  router.push({ name: 'SearchList', query: { query: keyword.value.trim(), page: 1 } })
  keyword.value=""
}

// 🔹 Klik suggestion → submit otomatis
function selectSuggestion(suggestion) {
  const lower = suggestion.toLowerCase().trim()
  keyword.value = lower
  router.push({ name: 'SearchList', query: { query: lower.trim(), page: 1 } })
  keyword.value=""
}
</script>

<template>
  <div class="">
    <form @submit="onSubmit" class="flex justify-center items-center max-w-md mx-auto mt-5 relative">
      <label for="simple-search" class="sr-only">Search</label>
      <div class="relative w-50 md:w-250">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          v-model="keyword"
          type="text"
          id="simple-search"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Telusuri Resep..."
          autocomplete="off"
        />

        <ul
          v-if="suggestions.length > 0"
          class="absolute z-10 bg-[#213547] border border-gray-300 w-full rounded mt-1 shadow-lg max-h-48 overflow-y-auto"
        >
          <li
            v-for="(item, index) in suggestions"
            :key="index"
            @click="selectSuggestion(item)"
            class="px-4 py-2 transition-all transition-200 hover:bg-blue-900 cursor-pointer"
          >
            {{ item }}
          </li>
        </ul>
        <X @click="clearQuery()" class="w-5 h-5 text-gray-200 cursor-pointer absolute top-3 right-2"
         />
      </div>

      <button
        type="submit"
        class="p-2.5 ms-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transform transition-all transition-150 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center hover:scale-105 "
      >
        Cari
      </button>
    </form>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

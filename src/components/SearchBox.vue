<script setup>
import { ref, computed, watch } from 'vue'
import { X } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const keyword = ref('')
const model = ref('cosine') // default

const router = useRouter()

const keywordList = [
  'Nasi Goreng',
  'Soto Ayam',
  'Rendang',
  'Ayam Bakar',
  'Sate Padang',
  'Bakso',
  'Rawon',
  'Nasi Uduk',
  'Nasi Kuning',
  'Lontong Sayur',
  'Tongseng',
  'Sop Buntut',
  'Pecel Lele',
  'Ayam Penyet',
  'Ikan Bakar',
  'Sayur Asem',
  'Capcay',
  'Mie Goreng',
  'Mie Rebus',
  'Kwetiau Goreng',
  'Martabak Telur',
  'Martabak Manis',
  'Pempek',
  'Lumpia',
  'Tahu Gejrot',
  'Tahu Sumedang',
  'Tempe Mendoan',
  'Sate Ayam',
  'Sate Kambing',
  'Nasi Liwet',
  'Nasi Pecel',
  'Serabi',
  'Klepon',
  'Es Cendol',
  'Es Campur',
  'Es Teler',
  'Bubur Ayam',
  'Bubur Manado',
  'Ayam Rica-Rica',
  'Ikan Asam Pedas',
  'Asinan Betawi',
  'Kerak Telor',
  'Sambal Goreng Ati',
  'Dendeng Balado',
  'Sop Kambing',
  'Soto Betawi',
  'Soto Banjar',
  'Soto Kudus',
  'Soto Medan',
  'Sop Konro',
  'Coto Makassar'
]

const suggestions = computed(() =>
  keyword.value.length > 0
    ? keywordList.filter(item =>
        item.toLowerCase().includes(keyword.value.toLowerCase())
      )
    : []
)

function clearQuery(){
  keyword.value = ""
}

function searchWithModel(value) {
  if (!value.trim()) return
  router.push({
    name: 'SearchList',
    params: { model: model.value },
    query: { query: value.toLowerCase().trim(), page: 1 }
  })
  keyword.value = ""
}

function onSubmit(e) {
  e.preventDefault()
  searchWithModel(keyword.value)
}

function selectSuggestion(suggestion) {
  searchWithModel(suggestion)
}
</script>

<template>
  <div class="">
    <form @submit="onSubmit" class="flex justify-center items-center max-w-md mx-auto mt-5 relative">
      <div class="relative w-50 md:w-250">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          v-model="keyword"
          type="text"
          class="bg-[#213547] border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
          placeholder="Telusuri Resep..."
          autocomplete="off"
        />
        <ul v-if="suggestions.length > 0" class="absolute z-10 bg-[#213547] border border-gray-600 w-full rounded mt-1 shadow-lg max-h-48 overflow-y-auto">
          <li v-for="(item, index) in suggestions" :key="index" @click="selectSuggestion(item)"
              class="px-4 py-2 transition-all transition-200 hover:bg-blue-900 cursor-pointer">
            {{ item }}
          </li>
        </ul>
        <X @click="clearQuery()" class="w-5 h-5 text-gray-200 cursor-pointer absolute top-3 right-2" />
      </div>

      <!-- 🔽 Dropdown Model -->
      <select v-model="model" class="ml-2 p-2 rounded-md bg-[#213547] border-1 border-gray-600 text-white">
        <option value="cosine">Cosine</option>
        <option value="bm25">BM25</option>
      </select>

      <button
        type="submit"
        class="p-2.5 ms-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transform transition-all transition-150 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center hover:scale-105"
      >
        Cari
      </button>
    </form>
  </div>
</template>

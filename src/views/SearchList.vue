<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import FoodList from '../components/FoodList.vue'
import SearchBox from '../components/SearchBox.vue'

const route = useRoute()
const router = useRouter()

const query = ref(route.query.query || '')
const page = ref(Number(route.query.page) || 1)
const model = ref(route.params.model || 'cosine')
const recipes = ref([])
const loading = ref(false)

const pagination = ref({
  page: 1,
  per_page: 10,
  total: 0,
  total_pages: 1
})

const isOpen = ref(false)
const dropdownRef = ref(null)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function handleClickOutside(e) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

// Fungsi berpindah model
function modelGet(modelinput) {
  model.value = modelinput
  router.push({
    name: 'SearchList',
    params: { model: modelinput },
    query: {
      query: query.value,
      page: 1
    }
  })
}

// Fungsi pagination
function goToPage(newPage) {
  if (
    newPage !== page.value &&
    newPage >= 1 &&
    newPage <= pagination.value.total_pages
  ) {
    router.push({
      name: 'SearchList',
      params: { model: model.value },
      query: {
        query: query.value,
        page: newPage
      }
    })
  }
}

// Ambil data dari backend
const fetchRecipes = async () => {
  if (!query.value.trim()) return

  loading.value = true
  try {
    const response = await axios.get(`http://127.0.0.1:5000/search/${model.value}`, {
      params: { query: query.value, page: page.value }
    })

    const data = response.data
    recipes.value = data.results || []
    pagination.value = data.pagination
  } catch (error) {
    console.error('Gagal fetch data:', error)
    recipes.value = []
  } finally {
    loading.value = false
  }
}

// Watcher untuk perubahan route
watch(
  () => route.fullPath,
  () => {
    query.value = route.query.query || ''
    page.value = parseInt(route.query.page) || 1
    model.value = route.params.model || 'cosine'
    fetchRecipes()
  },
  { immediate: true }
)

// Untuk navbar animasi
const isScrollingDown = ref(false)
let lastScrollY = window.scrollY

const handleScroll = () => {
  const currentScrollY = window.scrollY
  isScrollingDown.value = currentScrollY > lastScrollY
  lastScrollY = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-transform duration-300',
      isScrollingDown ? '-translate-y-full' : 'translate-y-0',
      'bg-gradient-to-r from-gray-700  to-gray-900 flex flex-row flex-wrap items-center md:justify-between justify-center px-4 py-3 shadow'
    ]"
  >
    <router-link to="/" class="uppercase hover:opacity-80 hover:text-gray-500 transition-all duration-200">
      <p class="md:text-5xl text-3xl uppercase mr-10 md:mr-0 mb-5 md:mb-0 mt-5 md:mt-0">
        <span class="text-amber-400">nutri</span>food
      </p>
    </router-link>
    <SearchBox class="-mt-5 mb-2 md:mb-0" />
  </div>



  <div class=" mx-auto md:mt-20 mt-50">
    <div v-if="loading" class="text-center text-gray-500 text-lg">
      Loading...
    </div>

    <FoodList v-else-if="Array.isArray(recipes) && recipes.length > 0" :recipes="recipes" />
      <div v-else class="text-center mt-5 text-white">Resep Tidak Ada</div>    
      <p v-if="!loading && recipes.length" class="p-3 rounded-lg  text-white">
      Halaman <span class="font-bold"> {{ page }} </span> dari <span class="font-bold"> {{ pagination.total_pages }} </span></p>
  </div>

  <div v-if="!loading && recipes.length" class="flex justify-center md:mt-6 space-x-5">
    <button
      @click="goToPage(page - 1)"
      :disabled="page <= 1"
      class="px-3 py-1 border rounded bg-white text-gray-800 hover:bg-gray-200 disabled:opacity-50"
    >
      « Sebelumnya
    </button>
    <button
      @click="goToPage(page + 1)"
      :disabled="page >= pagination.total_pages"
      class="px-3 py-1  border rounded bg-white text-gray-800 hover:bg-gray-200 disabled:opacity-50"
    >
     Selanjutnya »
    </button>
  </div>
</template>

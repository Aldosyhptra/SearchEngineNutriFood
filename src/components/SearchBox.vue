<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const keyword = ref('')
const router = useRouter()

function onSubmit(e) {
  e.preventDefault()
  if (keyword.value.trim() === '') return

  // Redirect ke halaman searchlist dengan query parameter ?q=keyword
  router.push({ name: 'SearchList', query: { q: keyword.value.trim() } })
}
</script>

<template>
  <div class="">
    <form @submit="onSubmit" class="flex justify-center items-center max-w-md mx-auto mt-5">
      <label for="simple-search" class="sr-only">Search</label>
      <div class="relative w-50 md:w-250">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          v-model="keyword"
          type="text"
          id="simple-search"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Telusuri Resep..."
          required
        />
      </div>
      <button
        type="submit"
        class="p-2.5 ms-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center hover:scale-105 transform transition-all duration-150"
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

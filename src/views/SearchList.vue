<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import FoodList from '../components/FoodList.vue'
import SearchBox from '../components/SearchBox.vue'

const recipes = ref([
  {
    judul: "Telur Dadar Sayur",
    link: "https://www.fatsecret.co.id/resep/93111468-telur-dadar-sayur/Default.aspx",
    gambar: "https://m.ftscrt.com/static/recipe/17b0ac40-49b8-4ec5-997f-30ff3df81994_sq.jpg",
    ringkasan_gizi: "Terdapat 268kalori dalam 1 porsi Telur Dadar Sayur. Rincian Kalori: 64% lemak, 24% karb, 13% prot.",
    bahan: "4 g bumbu kaldu rasa ayam, 1 sdm minyak kelapa murni, 1 besar telur, 100 gram selada kol",
    tahapan: [
      "Irisi sayuran tipis tipis.",
      "Kocok telur dan tambahkan bubuk kaldu.",
      "Masukan sayuran aduk rata.",
      "Panaskan minyak kelapa lalu goreng telur hingga matang."
    ]
  },
  {
    judul: "Brownies",
    link: "https://www.fatsecret.co.id/resep/91329429-brownies/Default.aspx",
    gambar: "https://m.ftscrt.com/static/recipe/38cea3a0-db69-4b43-82a9-6a551b83b5a7_sq.jpg",
    ringkasan_gizi: "Terdapat 79kalori dalam 1 porsi Brownies. Rincian Kalori: 54% lemak, 39% karb, 7% prot.",
    bahan: "20 g margarin, 30 g instant oatmeal, 30 g dark chocolate 90%, 20 gram kakao bubuk (tanpa gula), 20 gram gula pasir",
    tahapan: [
      "Lelehkan dark coklat dan margarin.",
      "Campurkan oat dan coklat bubuk.",
      "Campur semua bahan dengan baik.",
      "Tuang ke dalam cetakan dan panggang selama 25 menit pada suhu 180°C."
    ]
  },

])
</script>

<template>
    <div class="flex flex-row items-center justify-between mb-10 ">
        <div>
            <router-link to="/" class="uppercase hover:opacity-80 hover:text-gray-500 transition-all duration-200">
                <h1 class="text-5xl uppercase">
                    <span class="text-amber-400">nutri</span>food
                </h1>
            </router-link>
        </div>
        <SearchBox class="-mt-5"/>
    </div>
    <h1 class="mb-15">Daftar Resep</h1>
    <FoodList v-for="(recipe, index) in recipes" :key="index" :recipe="recipe" />
</template>

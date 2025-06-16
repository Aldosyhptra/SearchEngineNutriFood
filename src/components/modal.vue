<template>
  <div class="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
    <div
        class="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 relative animate-fade-in-up
         max-h-[90vh] overflow-y-auto no-scrollbar"
    >
      <!-- Slot Konten Modal -->
      <slot />
    </div>
  </div>
</template>

<script setup>
// Tidak butuh props, hanya emit 'close'
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out;
  /* Scroll aktif tapi tersembunyi */
}
.no-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}
.no-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

</style>

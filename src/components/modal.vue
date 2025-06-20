<template>
  <div
    class="fixed inset-0 bg-black/10 flex items-center justify-center z-50  cursor-auto"
    @click.self="emit('close')"
  >
    <div
      class="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 relative animate-fade-in-up
             max-h-[90vh] overflow-y-auto no-scrollbar"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close'])
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
}

.no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>

<template>
    <div class="flex justify-center items-center h-screen bg-withe">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-fdvinodos mb-4">404</h1>
        <h2 class="text-3xl font-semibold text-fdrojo mb-4">Recurso no encontrado</h2>
        <p class="text-lg text-fdnaranja">Lo sentimos, la página que buscas no se encuentra.</p>
        <!-- Agrega el v-progress-circular para mostrar la cuenta regresiva -->
        <v-progress-circular
          :rotate="360"
          :size="100"
          :width="15"
          :value="value"
          color="teal"
        >
          {{ value }}
        </v-progress-circular>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        value: 5 // Inicia con el valor de 3 segundos
      };
    },
    mounted() {
      // Inicia la cuenta regresiva
      this.countdown();
    },
    methods: {
      countdown() {
        setInterval(() => {
          this.value--; // Disminuye el valor cada segundo
          if (this.value === 0) {
            // Si llega a cero, redirige al inicio
            this.$router.push({ path: '/home' });
          }
        }, 1000);
      }
    }
  }
  </script>
  
  <style scoped>
  /* Agrega tus estilos personalizados aquí */
  </style>
  
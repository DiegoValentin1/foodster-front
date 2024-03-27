<template>
    <div>
      <header class="w-full">
        <v-tabs fixed-tabs background-color="#6A040F" dark>
          <v-tab to="/home">
            Banquetes
          </v-tab>
          <v-tab to="/home/entradas">
            Entradas
          </v-tab>
          <v-tab to="/home/fuertes">
            Fuertes
          </v-tab>
          <v-tab to="/home/utencilios">
            Utencilios
          </v-tab>
        </v-tabs>
      </header>
      
      <!-- Renderizar el componente correspondiente a la ruta activa -->
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  import Cards from './Cards.vue';
  
  export default {
    components: {
      Cards
    }
  }
  </script>
  
  <style scoped>
  /* Estilos personalizados según sea necesario */
  </style>
  
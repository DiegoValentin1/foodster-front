<template>
  <div>
    <header class="w-full">
      <v-tabs fixed-tabs  dark class="bg-gray-900">
        <v-tab to="/home">
          Paquetes
        </v-tab>
        <v-tab to="/home/entradas">
          Servicios
        </v-tab>
        <v-tab to="/home/fuertes">
          Fuertes
        </v-tab>
        <v-tab to="/home/utencilios">
          Utencilios
        </v-tab>
        <!-- Icono de carrito de compras -->
        <v-spacer></v-spacer>
        <v-tab icon to="/home/carrito">
          <v-icon>mdi-cart</v-icon>
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
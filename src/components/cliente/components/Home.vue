<template>
  <div>
    <header class="w-full">
      <v-tabs fixed-tabs  dark class="bg-gray-900">
        <v-tab to="/home/inicio">
          Inicio
          <v-icon>mdi-home</v-icon>
        </v-tab>
        <v-tab to="/home/paquetes">
          Paquetes
          <v-icon>mdi-package-variant-closed</v-icon>
        </v-tab>
        <v-tab to="/home/servicios">
          Servicios
          <v-icon>mdi-food</v-icon>
        </v-tab>
        <v-tab icon to="/home/carrito/">
          Carrito
          <v-icon>mdi-cart</v-icon>
        </v-tab>
        <v-tab icon to="/home/perfil/">
          Perfil
          <v-icon>mdi-account</v-icon>
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
.v-app-bar {
  background-color: #6A040F;
}

.v-toolbar {
  color: white;
}

.v-btn {
  color: white;
}

.v-icon {
  color: white;
}

/* Estilos personalizados según sea necesario */
</style>
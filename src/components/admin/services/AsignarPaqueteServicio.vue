<template>
  <div>
    <h1>Asignar paquete a servicio</h1>
    <p>Vas a agregar un paquete al servicio: {{ $route.query.item.nombre }}</p>
    <router-link to="/admin/servicios">
      <v-btn color="red">Cancelar</v-btn>
    </router-link>
    <v-btn color="green" dark @click="Asignar">Asignar</v-btn>
    <div class="row">
      <div class="card-container row">
        <v-progress-linear
          color="blue darken-2"
          height="5"
          indeterminate
          v-if="loading"
        ></v-progress-linear>
        <div
          class="card-item col-lg-2 col-md-2 col-sm-6 col-12 mb-4"
          v-for="(item, index) in paquetes"
          :key="index"
          @mousedown="dragStart(item, $event)"
          @mousemove="drag(item, $event)"
          @mouseup="dragEnd"
        >
          <CardPaquete :paquete="item" />
        </div>
      </div>
      <div class="fixed-container">
        <h1>Paquetes a asignar</h1>
        <div v-for="(item, index) in draggedItems" :key="index">
          <CardPaquete :paquete="item" />
        </div>
        <v-icon color="red darken-2" @click="vaciarItems">mdi-delete</v-icon>
        <!-- Icono de bote de basura -->
      </div>
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="5"
        @input="fetchPaquetes"
        class="my-4 w-11/12 mx-auto"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import CardPaquete from "@/components/cliente/components/CardPaqueteServicio.vue";
import { getAllPaquetesPaginado } from "@/services/PaquetesServices";
import {
  getServiciosPaquete,
  createServicioPaquete,
  updateServicioPaquete,
  deleteServicioPaquete,
  getServicioPaqueteById,
  getServiciosPaqueteByStatus,
  getServiciosPaqueteByStatusPaginated,
  getServiciosPaqueteByPaqueteId,
  getServiciosPaquetePaginated,
  deleteServicioPaqueteByStatus,
} from "@/services/ServiciosPaqueteService";

export default {
  components: {
    CardPaquete,
  },
  data() {
    return {
      paquetes: [],
      loading: false,
      currentPage: 1,
      totalPages: 0,
      itemsPerPage: 10,
      draggedItems: [], // Almacena las tarjetas arrastradas
      dragging: false, // Estado de arrastre
      startPosition: { x: 0, y: 0 }, // Posición inicial del arrastre
      currentPosition: { x: 0, y: 0 }, // Posición actual del arrastre
    };
  },
  methods: {
    async fetchPaquetes() {
      this.loading = true;
      const response = await getAllPaquetesPaginado(
        this.currentPage - 1,
        this.itemsPerPage
      );
      if (response) {
        this.totalPages = response.totalPages;
        this.paquetes = response.content.map((item) => ({
          ...item,
          position: { x: 0, y: 0 }, // Inicializa la posición de los paquetes
        }));
      } else {
        this.totalPages = 0;
        this.paquetes = [];
        this.currentPage = 1;
      }
      this.loading = false;
    },
    dragStart(item, event) {
      if (
        !this.draggedItems.some(
          (draggedItem) => draggedItem.idPaquete === item.idPaquete
        )
      ) {
        this.dragging = true;
        this.startPosition = { x: event.clientX, y: event.clientY };
        this.currentPosition = { x: event.clientX, y: event.clientY };
        this.draggedItems.push(item);
      }
    },
    drag(item, event) {
      if (this.dragging) {
        const dx = event.clientX - this.currentPosition.x;
        const dy = event.clientY - this.currentPosition.y;
        this.currentPosition = { x: event.clientX, y: event.clientY };
        this.draggedItems = this.draggedItems.map((draggedItem) => {
          if (draggedItem.idPaquete === item.idPaquete) {
            return {
              ...draggedItem,
              position: {
                x: draggedItem.position.x + dx,
                y: draggedItem.position.y + dy,
              },
            };
          }
          return draggedItem;
        });
      }
    },
    dragEnd() {
      this.dragging = false;
    },
    async Asignar() {
      for (const item of this.draggedItems) {
        const servicioPaquete = {
          paquete: {
            idPaquete: item.idPaquete,
          },
          servicio: {
            idServicio: this.$route.query.item.idServicio,
          },
        };
        await createServicioPaquete(servicioPaquete);
      }
      this.vaciarItems();
    },
    vaciarItems() {
      this.draggedItems = []; // Vacía los ítems arrastrados
    },
    async traerServiciosPaquete() {
      const response = await getServiciosPaquete();
      console.log("todos los servicio paquetes", response);
    },
  },
  mounted() {
    this.fetchPaquetes();
  },
};
</script>

<style scoped>
.card-container {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  width:70%;
  margin-right: 250px;
}

.card-item {
  flex: 5 0;
}

.fixed-container {
    padding-top: 65px;
    position: fixed;
  top: 0;
  right: 20px;
  width: 200px;
  height: 100%;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  overflow-y: auto;
  color: #6b00cf;
}

.dragged-item {
  margin-bottom: 10px; /* Espacio entre tarjetas arrastradas */
  position: absolute;
}
</style>

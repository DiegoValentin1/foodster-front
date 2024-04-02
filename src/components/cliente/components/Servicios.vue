<template>
  <div>
    <div class="flex justify-center items-center">
      <h1 class="text-2xl font-semibold text-gray-700">Servicios</h1>
    </div>
    <v-select
        :items="categories"
        v-model="selectedCategory"
        label="Selecciona una categoría"
        item-text="nombre"
        item-value="id_categoria"
        return-object
        class="w-11/12 mx-auto text-lg"
    ></v-select>
    <div class="flex justify-center items-center">
      <v-btn
          v-if="selectedCategory"
          @click="selectedCategory = null"
          class="w-11/12 mx-auto bg-blue-900 text-white"
      >
        Limpiar filtro
      </v-btn>
    </div>
    <div class="card-container row">
      <v-progress-linear
          color="blue darken-2"
          height="5"
          indeterminate
          v-if="loading"
      ></v-progress-linear>
      <div class="card-item col-lg-3 col-md-4 col-sm-6 col-12 mb-4" v-for="(item, index) in services" :key="index">
        <CardService :servicio="item"  />
      </div>
    </div>
    <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="5"
        @input="fetchServices"
        class="my-4 w-11/12 mx-auto"
    ></v-pagination>
  </div>
</template>

<script>
import CardService from "@/components/cliente/components/CardService.vue";
import {getServicios} from "@/services/ServicesServices";
import {getServiciosByCategoria} from "@/services/ServicesServices";
import {getCategoriasServicios} from "@/services/CategoryServices";

export default {
  components: {
    CardService
  },
  data() {
    return {
      services: [],
      categories: [],
      selectedCategory: null,
      loading: false,
      currentPage: 1,
      totalPages: 0,
      itemsPerPage: 10,
    };
  },
  methods: {
    async fetchServices(page = 1) {
      this.loading = true;
      const allServices = this.selectedCategory ? await getServiciosByCategoria(this.selectedCategory.idCategoria) : await getServicios();
      this.totalPages = Math.ceil(allServices.length / this.itemsPerPage);
      this.services = allServices.slice((page - 1) * this.itemsPerPage, page * this.itemsPerPage);
      this.loading = false;
    },
    async fetchCategories() {
      this.loading = true;
      this.categories = await getCategoriasServicios();
      this.loading = false;
    },
  },
  mounted() {
    this.fetchServices();
    this.fetchCategories();
  },
  watch: {
    selectedCategory(newCategory) {
      this.currentPage = 1;
      this.fetchServices(newCategory ? newCategory.idCategoria : null);
    }
  },
}
</script>

<style scoped>
.card-container {
  margin-top: 20px;
}

.card-item {
  flex: 1 0 auto;
}
</style>

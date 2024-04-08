<template>
  <v-card
    :loading="loading"
    class="mx-auto my-4 animate__animated animate__rubberBand"
    max-width="300"
  >
    <template slot="progress">
      <v-progress-linear
        color="blue"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="150" :src="servicio.imagen"></v-img>

    <v-card-title class="text-h6">{{ servicio.nombre }}</v-card-title>

    <v-card-text>
      <div class="my-2 text-caption">
        {{ servicio.categoria.nombre }}
      </div>

      <div class="text-caption">
        {{ servicio.descripcion }}
      </div>

      <div class="my-2 font-weight-black">
        ${{ servicio.precio.toFixed(2) }}
      </div>
    </v-card-text>

    <v-divider class="mx-2"></v-divider>
    <v-card-actions>
      <v-btn
        v-if="!inCart"
        color="deep-purple lighten-2"
        text
        @click="agregarElemento(servicio)"
      >
        Agregar al carrito
      </v-btn>
      <div v-else >Ya en carrito</div>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useCartStore } from "../../../stores/cart.store";

export default {
  data: () => ({
    loading: false,
    selection: 1,
    show: false,
    inCart: false,
  }),

  props: {
    servicio: {
      type: Object,
    },
  },
  mounted() {
    this.setIsInCart();
  },

  methods: {
    agregarElemento(item) {
      const cart = useCartStore();
      this.loading = true;
      cart.addStuff(item);
      this.setIsInCart();
      this.loading = false;
    },
    setIsInCart() {
      const cart = useCartStore();
      this.inCart = cart.isInCart(this.$props.servicio.idServicio);
    },
  },
};
</script>

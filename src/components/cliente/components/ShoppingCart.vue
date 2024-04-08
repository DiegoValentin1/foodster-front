<template>
  <v-app>
    <v-container>
      <v-row v-if="loading">
        <v-progress-circular indeterminate></v-progress-circular>
      </v-row>
      <v-row v-else-if="carrito.length > 0">
        <v-col
          cols="12"
          sm="6"
          md="3"
          v-for="(item, index) in carrito"
          :key="index"
        >
          <v-card
            draggable="true"
            @dragstart="dragStart(index)"
            @dragover.prevent
            @drop="drop(index)"
          >
            <!-- <v-img :src="item.imagen"></v-img> -->
            <v-card-text>
              <div class="font-bold text-lg">
                {{ `$ ${item.precio && item.precio.toFixed(2)} MXN` }}
              </div>
              <div>{{ "Cantidad: " + item.cantidad }}</div>
              <!-- Add other item details here -->
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" @click="incrementQuantity(item.idServicio)">+</v-btn>
              <v-btn
                color="error"
                @click="decrementQuantity(item.idServicio)"
                >-</v-btn
              >
              <v-btn
                color="error"
                @click="removeFromCart(item.idServicio)"
                >Remove</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-icon color="red" @drop="removeFromCartDrag()" @dragover.prevent
            >mdi-delete</v-icon
          >
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12">
          <div class="text-center text-xl">
            No tienes servicios en el carrito...
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-row>
        <v-col cols="12">
          <div class="text-center text-xl" @click="buyCart()">
            Comprar
          </div>
        </v-col>
      </v-row>
  </v-app>
</template>

<script>
import { useCartStore } from "../../../stores/cart.store";

export default {
  data() {
    return {
      carrito: [],
      loading: false,
      draggedItemIndex: 0,
    };
  },
  methods: {
    async fetchCarrito() {
      loading.value = true;
      // Fetch cart items from server
      loading.value = false;
    },

    incrementQuantity(idServicio) {
      this.carrito = this.carrito.map((item)=>{
        if (item.idServicio == idServicio) {
        item.cantidad +=1;
        }
        return item;

      });
    },

    decrementQuantity(idServicio) {
      let itemToRemove = false;
      this.carrito = this.carrito.map((item) => {
        if (item.idServicio === idServicio) {
          if (item.cantidad > 1) {
            item.cantidad -= 1;
          } else {
            itemToRemove = true;
          }
        }
        return item;
      });

      if (itemToRemove) {
        this.removeFromCart(idServicio);
      }
    },

    removeFromCart(idServicio) {
      const cart = useCartStore();
      cart.substractStuff(idServicio);
      this.loadCart();
    },
    removeFromCartDrag() {
      const index = draggedItemIndex.value;

      console.log("removeFromCartDrag", carrito.pop(index));
      draggedItemIndex.value = null;
    },
    dragStart(index) {
      draggedItemIndex.value = index;
    },
    drop(index) {
      const itemToMove = carrito.splice(draggedItemIndex.value, 1)[0];
      carrito.splice(index, 0, itemToMove);
      draggedItemIndex.value = null;
    },
    loadCart() {
      const cart = useCartStore();
      this.carrito = cart.cart;
      console.log(this.carrito);
    },
    buyCart(){
        if(this.carrito.length === 0)return alert("No hay cosas puto");
        const envio = this.carrito.map((item)=>{
            return {cantidad: item.cantidad, idServicio:item.idServicio}
        });

        console.log(envio);
    }
  },
  mounted() {
    this.loadCart();
  },
};
</script>

<style scoped>
/* Add Tailwind CSS classes here */
</style>
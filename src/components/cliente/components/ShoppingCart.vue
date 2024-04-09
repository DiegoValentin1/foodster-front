<template>
  <v-app>
    <v-stepper non-linear style="height: 100vh">
      <v-stepper-header style="height: 10%">
        <v-stepper-step editable step="1">
          Selecciona tus servicios
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="2">Fecha del evento</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3" editable>Envío y pago</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1" style="height: 90%">
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
                    <v-btn
                      color="success"
                      @click="incrementQuantity(item.idServicio)"
                      >+</v-btn
                    >
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
                <v-icon
                  color="red"
                  @drop="removeFromCartDrag()"
                  @dragover.prevent
                  >mdi-delete</v-icon
                >
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="12">
                <div class="text-center text-xl">
                  Parece ser que no hay servicios en el carrito :(
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-container>
            <v-row v-if="loading">
              <v-progress-circular indeterminate></v-progress-circular>
            </v-row>
            <v-row v-else-if="carrito.length > 0">
              <v-col cols="12" sm="12" md="12">
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <div style="font-weight: 500; font-size: larger">
                      Selecciona la fecha y hora en la que iniciará el evento
                    </div>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    <div style="font-weight: 500; font-size: larger">
                      Selecciona la fecha y hora en la que terminará el evento
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3" sm="6" md="3">
                    <v-date-picker v-model="date"></v-date-picker>
                  </v-col>
                  <v-col cols="3" sm="6" md="3">
                    <v-time-picker v-model="time"></v-time-picker>
                  </v-col>
                  <v-col cols="3" sm="6" md="3">
                    <v-date-picker
                      v-model="date2"
                      color="green lighten-1"
                    ></v-date-picker>
                  </v-col>
                  <v-col cols="3" sm="6" md="3">
                    <v-time-picker
                      v-model="time2"
                      color="green lighten-1"
                    ></v-time-picker>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="12">
                <div class="text-center text-xl">
                  Parece ser que no hay servicios en el carrito :(
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-container>
            <v-row v-if="loading">
              <v-progress-circular indeterminate></v-progress-circular>
            </v-row>
            <v-row v-else-if="carrito.length > 0">
              <v-col cols="6" sm="12" md="6">
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <div
                      style="font-weight: 500; font-size: larger"
                      class="flex flex-row items-center gap-[20px]"
                    >
                      Cantidad de personas que asistirán
                      <div
                        style="font-size: xx-large"
                        class="text-[#333] underline"
                      >
                        {{ people }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="12" md="6">
                    <v-col cols="9" sm="12" md="9">
                      <v-slider
                        v-model="people"
                        hint="Im a hint"
                        max="1000"
                        min="1"
                      ></v-slider>
                    </v-col>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <div
                      style="font-weight: 500; font-size: larger"
                      class="flex flex-row items-center gap-[20px]"
                    >
                      Dirección del evento
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="12" md="6">
                    <v-radio-group
                      v-if="direcciones.length > 0"
                      v-model="direccion"
                    >
                      <v-radio
                        v-for="n in direcciones"
                        :key="n.idDireccion"
                        :label="`${n.calle} #${n.numero}`"
                        :value="n.idDireccion"
                      ></v-radio>
                    </v-radio-group>
                    <div v-else>
                      Parece que no tienes direcciones, agrega una y vuelve
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6" sm="12" md="6">
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <section
                      aria-labelledby="summary-heading"
                      class="bg-gray-50 rounded-lg px-4 lg:col-span-5"
                    >
                      <h2
                        id="summary-heading"
                        class="text-lg font-medium text-gray-900"
                      >
                        Total
                      </h2>

                      <dl class="mt-6 space-y-4">
                        <div class="flex items-center justify-between">
                          <dt class="text-sm text-gray-600">
                            Pago por persona
                          </dt>
                          <dd class="text-sm font-medium text-gray-900">
                            {{
                              totalCarrito.toLocaleString("es-MX", {
                                style: "currency",
                                currency: "MXN",
                                maximumFractionDigits: 2,
                              })
                            }}
                          </dd>
                        </div>
                        <div
                          class="border-t border-gray-200 pt-4 flex items-center justify-between"
                        >
                          <dt class="flex items-center text-sm text-gray-600">
                            <span>Pago por persona * Cantidad de personas</span>
                          </dt>
                          <dd class="text-sm font-medium text-gray-900">
                            {{
                              (totalCarrito * people).toLocaleString("es-MX", {
                                style: "currency",
                                currency: "MXN",
                                maximumFractionDigits: 2,
                              })
                            }}
                          </dd>
                        </div>
                        <div
                          class="border-t border-gray-200 pt-4 flex items-center justify-between"
                        >
                          <dt class="flex items-center text-sm text-gray-600">
                            <span>Envío</span>
                            <a
                              href="#"
                              class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                            >
                              <span class="sr-only"
                                >Learn more about how shipping is
                                calculated</span
                              >
                              <!-- Heroicon name: solid/question-mark-circle -->
                              <svg
                                class="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </a>
                          </dt>
                          <dd class="text-sm font-medium text-gray-900">
                            $5.00
                          </dd>
                        </div>
                        <div
                          class="border-t border-gray-200 pt-4 flex items-center justify-between"
                        >
                          <dt class="flex text-sm text-gray-600">
                            <span>Impuestos</span>
                          </dt>
                          <dd class="text-sm font-medium text-gray-900">
                            {{
                              (totalCarrito * people * 0.16).toLocaleString(
                                "es-MX",
                                {
                                  style: "currency",
                                  currency: "MXN",
                                  maximumFractionDigits: 2,
                                }
                              )
                            }}
                          </dd>
                        </div>
                        <div
                          class="border-t border-gray-200 pt-4 flex items-center justify-between"
                        >
                          <dt class="text-base font-medium text-gray-900">
                            Total del pedido
                          </dt>
                          <dd class="text-base font-medium text-gray-900">
                            {{
                              (
                                totalCarrito * people +
                                totalCarrito * people * 0.16
                              ).toLocaleString("es-MX", {
                                style: "currency",
                                currency: "MXN",
                                maximumFractionDigits: 2,
                              })
                            }}
                          </dd>
                        </div>
                      </dl>

                      <div class="mt-6">
                        <button
                          type="submit"
                          class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >
                          Checkout
                        </button>
                      </div>
                    </section>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="12">
                <div class="text-center text-xl">
                  Parece ser que no hay servicios en el carrito :(
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-app>
</template>

<script>
import DireccionesService from "../../../services/DireccionesService";
import { useCartStore } from "../../../stores/cart.store";
import { useAuthStore } from "../../../stores/auth.store";

export default {
  data() {
    return {
      carrito: [],
      loading: false,
      draggedItemIndex: 0,
      date: null,
      date2: null,
      time: null,
      time2: null,
      people: 1,
      direcciones: [],
      direccion: null,
      totalCarrito: 0,
    };
  },
  methods: {
    async fetchCarrito() {
      loading.value = true;
      // Fetch cart items from server
      loading.value = false;
    },

    incrementQuantity(idServicio) {
      this.carrito = this.carrito.map((item) => {
        if (item.idServicio == idServicio) {
          item.cantidad += 1;
        }
        return item;
      });
      this.setTotal();
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
      this.setTotal();
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
    setTotal() {
      const cart = useCartStore();
      this.totalCarrito = cart.getTotal();
      console.log(this.totalCarrito);
    },
    async loadCart() {
      const cart = useCartStore();
      const authStore = useAuthStore();
      const idUsuario = authStore.user.usuarios.idUsuario;
      this.direcciones = await DireccionesService.getDireccionesByUser(
        idUsuario
      );
      console.log(this.direcciones);
      this.carrito = cart.cart;
      this.setTotal();
      console.log(this.carrito);
    },
    buyCart() {
      if (this.carrito.length === 0) return alert("No hay cosas puto");
      const envio = this.carrito.map((item) => {
        return { cantidad: item.cantidad, idServicio: item.idServicio };
      });

      console.log(envio);
    },
  },
  mounted() {
    this.loadCart();
  },
};
</script>

<style scoped>
/* Add Tailwind CSS classes here */
</style>
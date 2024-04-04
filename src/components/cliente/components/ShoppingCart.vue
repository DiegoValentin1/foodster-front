<template>
    <v-app>
        <v-container>
            <v-row v-if="loading">
                <v-progress-circular indeterminate></v-progress-circular>
            </v-row>
            <v-row v-else-if="carrito.length > 0">
                <v-col cols="12" sm="6" md="3" v-for="(item, index) in carrito" :key="item.servicios.id_producto">
                    <v-card draggable="true" @dragstart="dragStart(index)" @dragover.prevent @drop="drop(index)">
                        <v-img :src="item.imagen"></v-img>
                        <v-card-text>
                            <div class="font-bold text-lg">{{ "$ " + item.precio.toFixed(2) + " MXN" }}</div>
                            <div>{{ "Cantidad: " + item.cantidad }}</div>
                            <!-- Add other item details here -->
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="success" @click="incrementQuantity(item)">+</v-btn>
                            <v-btn color="error" @click="decrementQuantity(item)">-</v-btn>
                            <v-btn color="error" @click="removeFromCart(item)">Remove</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-icon color="red" @drop="removeFromCartDrag()" @dragover.prevent>mdi-delete</v-icon>
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col cols="12">
                    <div class="text-center text-xl">No tienes servicios en el carrito...</div>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const carrito = [
            {
                servicios: {
                    id_producto: 1,
                    nombre: 'Servicio 1',
                },
                imagen: 'https://via.placeholder.com/150',
                precio: 100,
                cantidad: 1,
            },
            {
                servicios: {
                    id_producto: 2,
                    nombre: 'Servicio 2',
                },
                imagen: 'https://via.placeholder.com/150',
                precio: 200,
                cantidad: 2,
            },
        ]
        const loading = ref(false);
        const draggedItemIndex = ref(null);

        const fetchCarrito = async () => {
            loading.value = true;
            // Fetch cart items from server
            loading.value = false;
        };

        onMounted(fetchCarrito);

        const incrementQuantity = (item) => {
            // Increment item quantity
        };

        const decrementQuantity = (item) => {
            // Decrement item quantity
        };

        const removeFromCart = (item) => {
            // Remove item from cart
        };
        const removeFromCartDrag = () => {
            const index = draggedItemIndex.value;
           
            console.log('removeFromCartDrag',  carrito.pop(index));
            draggedItemIndex.value = null;

        };

        const dragStart = (index) => {
            draggedItemIndex.value = index;
        };

        const drop = (index) => {
            const itemToMove = carrito.splice(draggedItemIndex.value, 1)[0];
            carrito.splice(index, 0, itemToMove);
            draggedItemIndex.value = null;
        };

        return {
            carrito,
            loading,
            incrementQuantity,
            decrementQuantity,
            removeFromCart,
            removeFromCartDrag, // Add this line
            dragStart,
            drop,
        };
    },
};
</script>

<style scoped>
/* Add Tailwind CSS classes here */
</style>
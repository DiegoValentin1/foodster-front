import {defineStore} from 'pinia';
import {showNotification} from "@/utils/notification";


export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        cart: JSON.parse(localStorage.getItem('cart')) || [],
    }),
    actions: {
        addStuff(nuevoServicio) {
            this.cart = [...this.cart, {...nuevoServicio, cantidad: 1}];
            localStorage.setItem('cart', JSON.stringify(this.cart));
            showNotification('success', 'Articulo añadido correctamente');
        },
        substractStuff(idServicio) {
            this.cart = this.cart.filter((item) => item.idServicio !== idServicio);
            localStorage.setItem('cart', JSON.stringify(this.cart));
            showNotification('success', 'Articulo sustraido correctamente');
            console.log(this.$state);
        },
        isInCart(idServicio) {
            return this.cart.some(item => item.idServicio === idServicio);
        },
        getTotal() {
            return this.cart.reduce((suma, item) => {
                let precio = item.precioDescuento > 0 ? item.precioDescuento : item.precio;
                return suma + (precio * item.cantidad)
            }, 0)
        },
        deleteAll() {
            this.cart = [];
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
    }
});
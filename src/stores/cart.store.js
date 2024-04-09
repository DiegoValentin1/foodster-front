import {defineStore} from 'pinia';
import {showNotification} from "@/utils/notification";

const baseUrl = `/eventos`;

export const useCartStore = defineStore({
    id: 'cart', state: () => ({
        cart: [],

    }), actions: {
            addStuff(nuevoServicio) {
            this.cart = [...this.cart, {...nuevoServicio, cantidad:1}];
            showNotification('success', 'Articulo añadido correctamente');
            }, 
            substractStuff(idServicio) {
                this.cart = this.cart.filter((item) => item.idServicio !== idServicio);
                showNotification('success', 'Articulo sustraido correctamente');
                console.log(this.$state);
            },
            isInCart(idServicio){
                return this.cart.some(item=> item.idServicio === idServicio);
            },
            getTotal(){
                return this.cart.reduce((suma, item)=>{
                    return suma + (item.precio*item.cantidad)
                }, 0)
            },

            deleteAll(){
                this.cart = [];
            },
    }
});

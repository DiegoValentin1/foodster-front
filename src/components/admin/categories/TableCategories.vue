<template>
    <v-card>
      <v-tabs v-model="tab" background-color="primary" dark>
        <v-tab>Personal</v-tab>
        <v-tab>Servicios</v-tab>
      </v-tabs>
  
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card>
            <v-card-title>
              Categoría Personal
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field v-model="searchPersonal" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogPersonal" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Nuevo personal</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Agregar nueva categoría de personal</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="nuevaCategoriaPersonal.nombre" label="Nombre"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select v-model="nuevaCategoriaPersonal.active" :items="[{text:'Activo', value:true}, {text:'Inactivo', value:false}]" label="Estado"></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cerrarModalAgregarCategoriaPersonal">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="agregarCategoriaPersonal">Guardar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-title>
            <v-data-table class="mx-auto" style="height: 400px;" :headers="headersPersonal" :items="categoriasPersonal" :search="searchPersonal">
              <template v-slot:item="{ item }">
                <tr>
                  <td class="text-start">{{ item.nombre }}</td>
                  <td class="text-start">{{ item.active ? 'Activo' : 'Inactivo' }}</td>
                  <td class="text-start">{{ item.ultima_modificacion }}</td>
                  <td class="text-center">
                    <v-icon color="blue" @click="editItemPersonal(item)">mdi-pencil</v-icon>
                    <v-icon color="red" @click="deleteItemPersonal(item)">mdi-delete</v-icon>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <v-card-title>
              Categoría Servicios
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field v-model="searchServicios" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogServicios" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Nuevo Servicio</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Agregar nuevo servicio</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="nuevoServicio.nombre" label="Nombre"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select v-model="nuevoServicio.active" :items="[{text:'Activo', value:true}, {text:'Inactivo', value:false}]" label="Estado"></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cerrarModalAgregarServicio">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="agregarServicio">Guardar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-title>
            <v-data-table class="mx-auto" style="height: 400px;" :headers="headersServicios" :items="categoriasServicios" :search="searchServicios">
              <template v-slot:item="{ item }">
                <tr>
                  <td class="text-start">{{ item.nombre }}</td>
                  <td class="text-start">{{ item.active ? 'Activo' : 'Inactivo' }}</td>
                  <td class="text-start">{{ item.ultima_modificacion }}</td>
                  <td class="text-center">
                    <v-icon color="blue" @click="editItemServicio(item)">mdi-pencil</v-icon>
                    <v-icon color="red" @click="deleteItemServicio(item)">mdi-delete</v-icon>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </template>
  
  <script>
import {
    getCategoriasPersonales,
    actualizarCategoriaPersonal,
    crearCategoriaPersonal,
    eliminarCategoriaPersonal
} from '../../../services/CategoryServices.js'

export default {
  data() {
    return {
      tab: null,
      searchPersonal: '',
      dialogPersonal: false,
      nuevaCategoriaPersonal: {
        nombre: '',
        active: true // Por defecto, nueva categoría activa
      },
      headersPersonal: [
        { text: 'Nombre', align: 'start', sortable: false, value: 'nombre' },
        { text: 'Estado', align: 'start', sortable: false, value: 'active' },
        { text: 'Última Modificación', align: 'start', sortable: false, value: 'ultima_modificacion' },
        { text: 'Acciones', align: 'center', sortable: false, value: 'acciones' },
      ],
      categoriasPersonal: [],
      searchServicios: '',
      dialogServicios: false,
      nuevoServicio: {
        nombre: '',
        active: true // Por defecto, nuevo servicio activo
      },
      headersServicios: [
        { text: 'Nombre', align: 'start', sortable: false, value: 'nombre' },
        { text: 'Estado', align: 'start', sortable: false, value: 'active' },
        { text: 'Última Modificación', align: 'start', sortable: false, value: 'ultima_modificacion' },
        { text: 'Acciones', align: 'center', sortable: false, value: 'acciones' },
      ],
      categoriasServicios: [],
    }
  },
  created() {
    this.getCategoriasPersonales(); // Llama al método para obtener las categorías personales cuando se crea el componente
  },
  methods: {
    async getCategoriasPersonales() {
      try {
        const response = await getCategoriasPersonales();
        this.categoriasPersonal = response.data;
      } catch (error) {
        console.error("Error al obtener las categorías personales:", error);
        // Maneja el error adecuadamente, como mostrando un mensaje al usuario
      }
    },
    editItemPersonal(item) {
      console.log("Edit Personal")
    },
    deleteItemPersonal(item) {
      // Lógica para eliminar la categoría personal
    },
    cerrarModalAgregarCategoriaPersonal() {
      this.dialogPersonal = false;
      // Limpiar el formulario al cerrar el modal
      this.nuevaCategoriaPersonal = {
        nombre: '',
        active: true // Por defecto, nueva categoría activa
      };
    },
    agregarCategoriaPersonal() {
      // Lógica para agregar la nueva categoría personal
      console.log("Nueva categoría personal guardada:", this.nuevaCategoriaPersonal);
      // Cerrar el modal
      this.dialogPersonal = false;
      // Limpiar el formulario al cerrar el modal
      this.nuevaCategoriaPersonal = {
        nombre: '',
        active: true // Por defecto, nueva categoría activa
      };
    },
    editItemServicio(item) {
      console.log("Edit Servicio")
    },
    deleteItemServicio(item) {
      // Lógica para eliminar el servicio
    },
    cerrarModalAgregarServicio() {
      this.dialogServicios = false;
      // Limpiar el formulario al cerrar el modal
      this.nuevoServicio = {
        nombre: '',
        active: true // Por defecto, nuevo servicio activo
      };
    },
    agregarServicio() {
      // Lógica para agregar el nuevo servicio
      console.log("Nuevo servicio guardado:", this.nuevoServicio);
      // Cerrar el modal
      this.dialogServicios = false;
      // Limpiar el formulario al cerrar el modal
      this.nuevoServicio = {
        nombre: '',
        active: true // Por defecto, nuevo servicio activo
      };
    }
  }
}
</script>

  
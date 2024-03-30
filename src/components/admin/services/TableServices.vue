<template>
    <v-card>
      <v-tabs v-model="tab" background-color="primary" dark>
        <v-tab>Servicios</v-tab>
        <v-tab>Paquetes</v-tab>
        <v-tab>Evento</v-tab>
      </v-tabs>
  
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card>
            <v-card-title>
              Servicios
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field v-model="searchPersonal" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogPersonal" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Nueva servicio</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Agregar nuevo</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="nuevoServicio.nombre" label="Nombre"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="nuevoServicio.descripcion" label="Descripcion"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="nuevoServicio.precio" label="Precio"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="nuevoServicio.descuento" label="Descuento"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="nuevoServicio.imagen" label="Imagen"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="nuevoServicio.existencia" label="Existencia"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="nuevoServicio.categoria" label="Categoria"></v-text-field>
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
            <v-data-table class="mx-auto" style="height: 400px;" :headers="headersServicios" :items="servicios" :search="searchServicios">
              <template v-slot:item="{ item }">
                <tr>
                  <td class="text-start">{{ item.nombre }}</td>
                  <td class="text-start">{{ item.descripcion }}</td>
                  <td class="text-start">{{ item.precio }}</td>
                  <td class="text-start">{{ item.descuento }}</td>
                  <td class="text-start">{{ item.imagen }}</td>
                  <td class="text-start">{{ item.existencia }}</td>
                  <td class="text-start">{{ item.categoria }}</td>
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
        <v-tab-item>
          <v-card>
            <v-card-title>
              Servicio Paquete
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field v-model="searchServicios" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogServicios" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Nuevo paquete</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Agregar nuevo paquete</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="nuevoPaquete.nombre" label="Nombre"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="nuevoPaquete.descripcion" label="Descripcion"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="nuevoPaquete.recomendado" label="Recomendado Para"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="nuevoPaquete.imagen" label="Imagen"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="nuevoPaquete.num_pedidos" label="Numéro Pedidos"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select v-model="nuevoPaquete.active" :items="[{text:'Activo', value:true}, {text:'Inactivo', value:false}]" label="Estado"></v-select>
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
            <v-data-table class="mx-auto" style="height: 400px;" :headers="headersPaquete" :items="paquete" :search="searchServicios">
              <template v-slot:item="{ item }">
                <tr>
                  <td class="text-start">{{ item.nombre }}</td>
                  <td class="text-start">{{ item.descripcion }}</td>
                  <td class="text-start">{{ item.recomendado }}</td>
                  <td class="text-start">{{ item.imagen }}</td>
                  <td class="text-start">{{ item.num_pedidos }}</td>
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
        <v-tab-item>
            <v-card>
            <v-card-title>
              Servicio Evento
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
  export default {
    data() {
      return {
        tab: null,
        searchPersonal: '',
        dialogPersonal: false,
        nuevoServicio: {
          nombre: '',
          descripcion: '',
          precio: '',
          descuento: '',
          imagen: '',
          existencia: '',
          categoria: '',
          active: true 
        },
        nuevoPaquete: {
          nombre: '',
          descripcion: '',
          recomendado: '',
          imagen: '',
          num_pedidos: '',
          active: true 
        },
        searchServicios: '',
        dialogServicios: false,
        headersServicios: [
          { text: 'Nombres', align: 'start', sortable: false, value: 'nombre' },
          { text: "Descripcion", aling: 'start', sortable: false, value: 'descripcion' },
          { text: 'Precio', align: 'start', sortable: false, value: 'precio' },
          { text: 'Descuento', align: 'start', sortable: false, value: 'descuento' },
          { text: 'Imagen', align: 'start', sorpotable: false, value:'imagen' },
          { text: 'Existencia', align: 'start', sortable: false, value: 'existencia' },
          { text: 'Categoria', align: 'start', sortable: false, value: 'categoria' },
          { text: 'Estado', align: 'start', sortable: false, value: 'active' },
          { text: 'Última Modificación', align: 'start', sortable: false, value: 'ultima_modificacion' },
          { text: 'Acciones', align: 'center', sortable: false, value: 'acciones' },
        ],

        servicios: [
          {
            nombre: 'Nombre servi 1',
            descripcion: 'Descripcion 1',
            precio: 100,
            descuento: 10,
            imagen: 'imagen 1',
            existencia: 10,
            categoria: 'Categoria 1',
            active: true,
            ultima_modificacion: '2024-03-29 10:00:00' // Ejemplo de fecha, debe obtenerse de la base de datos
          },
          {
            nombre: 'Nombre 2',
            descripcion: 'Descripcion 2',
            precio: 200,
            descuento: 20,
            imagen: 'imagen 2',
            existencia: 20,
            categoria: 'Categoria 2',
            active: false,
            ultima_modificacion: '2024-03-28 15:30:00' // Ejemplo de fecha, debe obtenerse de la base de datos
          },
          {
            nombre: 'Nombre 3',
            descripcion: 'Descripcion 3',
            precio: 300,
            descuento: 30,
            imagen: 'imagen 3',
            existencia: 30,
            categoria: 'Categoria 3',
            active: true,
            ultima_modificacion: '2024-03-27 08:45:00' // Ejemplo de fecha, debe obtenerse de la base de datos
          }
        ],
        headersPaquete: [
          { text: 'Nombres', align: 'start', sortable: false, value: 'nombre' },
          { text: "Descripcion", aling: 'start', sortable: false, value: 'descripcion' },
          { text: 'Recomendado Para', align: 'start', sortable: false, value: 'recomendado' },
          { text: 'Imagen', align: 'start', sorpotable: false, value:'imagen' },
          { text: 'Numéro Pedidos', align: 'start', sortable: false, value: 'num_pedidos' },
          { text: 'Estado', align: 'start', sortable: false, value: 'active' },
          { text: 'Última Modificación', align: 'start', sortable: false, value: 'ultima_modificacion' },
          { text: 'Acciones', align: 'center', sortable: false, value: 'acciones' },
        ],
        paquete: [
          {
            nombre: 'Nombre 1',
            descripcion: 'Descripcion 1',
            recomendado: 'Recomendado 1',
            imagen: 'imagen 1',
            num_pedidos: 10,
            active: true,
            ultima_modificacion: '2024-03-29 10:00:00' // Ejemplo de fecha, debe obtenerse de la base de datos
          },
          {
            nombre: 'Nombre 2',
            descripcion: 'Descripcion 2',
            recomendado: 'Recomendado 2',
            imagen: 'imagen 2',
            num_pedidos: 20,
            active: false,
            ultima_modificacion: '2024-03-28 15:30:00' // Ejemplo de fecha, debe obtenerse de la base de datos
          },
          {
            nombre: 'Nombre 3',
            descripcion: 'Descripcion 3',
            recomendado: 'Recomendado 3',
            imagen: 'imagen 3',
            num_pedidos: 30,
            active: true,
            ultima_modificacion: '2024-03-27 08:45:00' // Ejemplo de fecha, debe obtenerse de la base de datos
          }
        ],
      }
    },
    methods: {
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
  
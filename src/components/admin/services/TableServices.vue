<template>
  <v-card>
    <v-tabs v-model="tab" background-color="primary" dark>
      <v-tab>Servicios</v-tab>
      <v-tab>Paquetes</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card >
          <v-card-title>
            Servicios
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchServicios"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialogServicios" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  >Nuevo servicio</v-btn
                >
              </template>
              <v-card >
                <v-card-title>
                  <span class="text-h5">Agregar nuevo servicio</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="nuevoServicio.nombre"
                          label="Nombre"
                        ></v-text-field>
                        <v-text-field
                          v-model="nuevoServicio.descripcion"
                          label="Descripcion"
                        ></v-text-field>
                        <v-text-field
                          v-model="nuevoServicio.precio"
                          label="Precio"
                          type="number"
                          step="0.01"
                        ></v-text-field>
                        <v-text-field
                          v-model="nuevoServicio.precioDescuento"
                          label="Precio Descuento"
                          type="number"
                          step="0.01"
                        ></v-text-field>
                      </v-col>

                      <!-- Segunda columna -->
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="nuevoServicio.existencias"
                          label="Existencias"
                          type="number"
                        ></v-text-field>
                        <v-select
                          v-model="nuevoServicio.categoria.idCategoria"
                          :items="categoriasServicios"
                          item-text="nombre"
                          item-value="idCategoria"
                          label="Categoria"
                        ></v-select>
                        
                          <v-select
                          v-model="nuevoServicio.active"
                          :items="[
                            { text: 'Activo', value: true },
                            { text: 'Inactivo', value: false },
                          ]"
                          label="Estado"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="6" md="12">

                        <v-file-input  @change="onFileChange"  type="file" accept="image/*" label="Imagen" filled
                          prepend-icon="mdi-camera">
                        </v-file-input>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="cerrarModalAgregarServicio"
                    >Cancelar</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="agregarServicio"
                    >Guardar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-data-table
            class="mx-auto"
            style="height: auto; max-height: 500px; overflow-y: auto"
            :headers="headersServicios"
            :items="servicios"
            :search="searchServicios"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td class="text-start">{{ item.nombre }}</td>
                <td class="text-start">{{ item.descripcion }}</td>
                <td class="text-start">{{ item.precio }}</td>
                <td class="text-start">{{ item.precioDescuento }}</td>
                <td class="text-start">
                  <img
                    :src="item.imagen"
                    style="max-width: 100px; max-height: 100px"
                  />
                </td>

                <td class="text-start">{{ item.existencias }}</td>
                <td class="text-start">{{ item.categoria.nombre }}</td>
                <td class="text-start">
            <v-chip :color="item.active ? 'green' : 'red'" outlined small>{{
              item.active ? "Activo" : "Inactivo"
            }}</v-chip>
          </td>
                <td class="text-start">
                  {{
                    new Date(item.ultimaModificacion).toLocaleString("es-ES", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  }}
                </td>
                <td class="text-center">
                  <v-dialog
                    v-model="dialogosEditarServicio[item.idServicio]"
                    max-width="500px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        color="blue"
                        v-bind="attrs"
                        v-on="on"
                        @click="openEditServicioDialog(item.idServicio)"
                        >mdi-pencil</v-icon
                      >
                    </template>
                    <v-card>
                      <v-card-title> Editar servicio </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="item.nombre"
                                label="Nombre"
                              ></v-text-field>
                              <v-text-field
                                v-model="item.descripcion"
                                label="Descripcion"
                                :rules="[
                                  (v) => !!v || 'La descripción es requerida',
                                ]"
                                type="text"
                              ></v-text-field>
                              <v-text-field
                                v-model="item.precio"
                                label="Precio"
                                :rules="[
                                  (v) => !!v || 'El precio es requerido',
                                ]"
                                type="number"
                              ></v-text-field>
                              <v-text-field
                                v-model="item.precioDescuento"
                                label="Precio Descuento"
                                :rules="[
                                  (v) =>
                                    !!v ||
                                    'El precio de descuento es requerido',
                                ]"
                                type="number"
                              ></v-text-field>
                              <v-select
                                v-model="item.active"
                                :items="[
                                  { text: 'Activo', value: true },
                                  { text: 'Inactivo', value: false },
                                ]"
                                label="Estado"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="item.existencias"
                                label="Existencias"
                                :rules="[
                                  (v) =>
                                    !!v || 'Las existencias son requeridas',
                                ]"
                                type="number"
                              ></v-text-field>
                              <v-select
                                v-model="item.categoria.idCategoria"
                                :items="categoriasServicios"
                                item-text="nombre"
                                item-value="idCategoria"
                                label="Categoria"
                              ></v-select>
                              <input
                                type="file"
                                @change="onFileChange"
                                accept="image/*"
                              />
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="cancelEditItemServicio(item)"
                          >Cerrar</v-btn
                        >

                        <v-btn
                          color="blue darken-1"
                          text
                          @click="editItemServicio(item)"
                          >Guardar</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-icon
                    color="red"
                    @click="deleteItemServicio(item.idServicio)"
                    >mdi-delete</v-icon
                  >
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
            <v-text-field
              v-model="searchServicios"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialogPaquete" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  >Nuevo paquete</v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Agregar nuevo paquete</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="nuevoPaquete.paquete.idPaquete"
                          :items="paquete"
                          item-text="nombre"
                          item-value="idPaquete"
                          label="Paquete"
                        ></v-select>
                        <v-select
                          v-model="nuevoPaquete.servicio.idServicio"
                          :items="servicios"
                          item-text="nombre"
                          item-value="idServicio"
                          label="Servicio"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="nuevoPaquete.active"
                          :items="[
                            { text: 'Activo', value: true },
                            { text: 'Inactivo', value: false },
                          ]"
                          label="Estado"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="cerrarModalAgregarServicio"
                    >Cancelar</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="agregarPaquete"
                    >Guardar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-data-table
            class="mx-auto"
            style="height: auto; max-height: 500px; overflow-y: auto"
            :headers="headersPaquete"
            :items="servicioPaquete"
            :search="searchServicios"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td class="text-start">{{ item.paquete.nombre }}</td>
                <td class="text-start">{{ item.servicio.nombre }}</td>
                <td class="text-start">
                  {{
                    new Date(item.ultimaModificacion).toLocaleString("es-ES", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit", 
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  }}
                </td>
                <td class="text-start">
            <v-chip :color="item.active ? 'green' : 'red'" outlined small>{{
              item.active ? "Activo" : "Inactivo"
            }}</v-chip>
          </td>
                <td class="text-start">{{ item.ultima_modificacion }}</td>
                  <v-dialog
                    v-model="dialogosEditarPaquete[item.idServicioPaquete]"
                    max-width="500px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        color="blue"
                        v-bind="attrs"
                        v-on="on"
                        @click="openEditServicioDialog(item.idServicioPaquete)"
                        >mdi-pencil</v-icon
                      >
                    </template>
                    <v-card>
                      <v-card-title> Editar servicio paquete </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-select
                                v-model="item.paquete.idPaquete"
                                :items="paquete"
                                item-text="nombre"
                                item-value="idPaquete"
                                label="Paquete"
                              ></v-select>
                              <v-select
                                v-model="item.servicio.idServicio"
                                :items="servicios"
                                item-text="nombre"
                                item-value="idServicio"
                                label="Servicio"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-select
                                v-model="item.active"
                                :items="[
                                  { text: 'Activo', value: true },
                                  { text: 'Inactivo', value: false },
                                ]"
                                label="Estado"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="cancelEditItemServicio(item)"
                          >Cerrar</v-btn
                        >

                        <v-btn
                          color="blue darken-1"
                          text
                          @click="editarServicioPaquete(item)"
                          >Guardar</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-icon
                    color="red"
                    @click="deleteItemServicioPaquete(item.idServicioPaquete)"
                    >mdi-delete</v-icon
                  >
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
  getServicios,
  updateServicio,
  createServicio,
  deleteServicio,
  deleteServicioPaqueteByStatus,
  deleteServicioPaquete,
  getServiciosPaqueteByStatus,
  createServicioPaquete,
  updateServicioPaquete,
  getServiciosPaquete,
  deleteServicioByStatus,
  getServiciosByStatus,
} from "../../../services/ServicesServices.js";
import { getCategoriasServicios } from "../../../services/CategoryServices.js";
import { getAllPaquetes } from "../../../services/PaquetesServices.js";
export default {
  data() {
    return {
      tab: null,
      searchServicios: "",
      dialogServicios: false,
      dialogPaquete: false,
      dialogosEditarServicio: {},
      dialogosEditarPaquete: {},
      categoriasServicios: [],

      nuevoServicio: {
        nombre: "",
        descripcion: "",
        precio: 0,
        precioDescuento: 0,
        imagen: "",
        existencias: 0, // Corregido a "existencias" en lugar de "existencia"
        categoria: {
          idCategoria: "", // Deberías decidir si este campo es generado automáticamente o si el usuario lo ingresa
          nombre: "",
          ultimaModificacion: new Date().toISOString(), // Esto generará la fecha actual en el formato correcto
          active: true,
        },
        ultimaModificacion: new Date().toISOString(), // Esto generará la fecha actual en el formato correcto
        active: true,
      },

      nuevoPaquete: {
        paquete: {
          idPaquete: "",
        },

        servicio: {
          idServicio: "",
        },
        ultimaModificacion: new Date().toISOString(),
        active: true,
      },
      headersServicios: [
        { text: "Nombre", align: "start", sortable: false, value: "nombre" },
        {
          text: "Descripcion",
          align: "start",
          sortable: false,
          value: "descripcion",
        },
        { text: "Precio", align: "start", sortable: false, value: "precio" },
        {
          text: "Descuento",
          align: "start",
          sortable: false,
          value: "precioDescuento",
        },
        { text: "Imagen", align: "start", sortable: false, value: "imagen" },
        {
          text: "Existencia",
          align: "start",
          sortable: false,
          value: "existencia",
        },
        {
          text: "Categoria",
          align: "start",
          sortable: false,
          value: "categoria.nombre",
        }, // Corregido aquí
        { text: "Estado", align: "start", sortable: false, value: "active" },
        {
          text: "Última Modificación",
          align: "start",
          sortable: false,
          value: "ultimaModificacion",
        },
        {
          text: "Acciones",
          align: "center",
          sortable: false,
          value: "acciones",
        },
      ],

      servicios: [],
      headersPaquete: [
        {
          text: "Nombre paquete",
          align: "start",
          sortable: false,
          value: "nombrePaquete",
        },
        {
          text: "Nombre servicio",
          align: "start",
          sortable: false,
          value: "nombrePaquete",
        },
        {
          text: "Última modificación",
          align: "start",
          sortable: false,
          value: "ultimaModificacion",
        },
        { text: "Estado", align: "start", sortable: false, value: "active" },
        {
          text: "Acciones",
          align: "center",
          sortable: false,
          value: "acciones",
        },
      ],
      paquete: [],
      servicioPaquete: [],
    };
  },
  methods: {
    async fetchServicios() {
      // Renombrado el método
      try {
        const response = await getServicios();
        if (response) {
          this.servicios = response;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchServiciosPaquete() {
      try {
        const response = await getServiciosPaquete();
        if (response) {
          this.servicioPaquete = response;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getCategoriasServicios() {
      try {
        const response = await getCategoriasServicios();
        if (response) {
          this.categoriasServicios = response;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getAllPaquetes() {
      try {
        const response = await getAllPaquetes();
        if (response) {
          this.paquete = response;
        }
      } catch (error) {
        console.error(error);
      }
    },

    cancelEditItemServicio(item) {
      // Close the edit dialog without saving
      this.dialogosEditarServicio[item.idServicio] = false;
    },
    cerrarModalAgregarServicio() {
      this.dialogServicios = false;
      // Limpiar el formulario al cerrar el modal
      this.nuevoServicio = {
        nombre: "",
        descripcion: "",
        precio: 0,
        precioDescuento: 0,
        imagen: "",
        existencias: 0, // Corregido aquí
        categoria: {
          idCategoria: "", // Deberías decidir si este campo es generado automáticamente o si el usuario lo ingresa
          nombre: "",
          ultimaModificacion: new Date().toISOString(), // Esto generará la fecha actual en el formato correcto
          active: true,
        },
        ultimaModificacion: new Date().toISOString(), // Esto generará la fecha actual en el formato correcto
        active: true,
      };
    },
    async editItemServicio(nuevoServicio) {
      nuevoServicio.ultimaModificacion = new Date().toISOString(); // Esto generará la fecha actual en el formato correcto
      nuevoServicio.categoria.ultimaModificacion = new Date().toISOString(); // Esto generará la fecha actual en el formato correcto
      nuevoServicio.imagen = this.nuevoServicio.imagen;
      try {

        await updateServicio(nuevoServicio);
        this.fetchServicios(); // Llamada al método renombrado
        this.dialogosEditarServicio[nuevoServicio.idServicio] = false;
      } catch (error) {
        console.error("Error al actualizar categoría de servicio:", error);
      }
    },
    async editarServicioPaquete(nuevoPaquete) {
      nuevoPaquete.ultimaModificacion = new Date().toISOString(); // Esto generará la fecha actual en el formato correcto
      try {
        // Call the service to update the service
        await updateServicioPaquete(nuevoPaquete);
        this.fetchServiciosPaquete(); // Llamada al método renombrado
        // Close the edit dialog
        this.dialogosEditarPaquete[nuevoPaquete.idServicioPaquete] = false;
      } catch (error) {
        console.error("Error al actualizar categoría de servicio:", error);
      }
    },
    async deleteItemServicio(idServicio) {
      try {
        await deleteServicio(idServicio);
        this.fetchServicios(); // Recargar la lista de servicios
      } catch (error) {
        console.error("Error al eliminar servicio:", error);
      }
    },
    async deleteItemServicioPaquete(idServicioPaquete) {
      try {

        await deleteServicioPaquete(idServicioPaquete);

        const index = this.servicioPaquete.findIndex(
          (service) => service.idServicioPaquete === idServicioPaquete
        );
        if (index !== -1) {
          this.servicioPaquete.splice(index, 1);
        }
      } catch (error) {
        console.error("Error al eliminar categoría de servicio:", error);
      }
    },
    async agregarServicio() {
      try {
        const nuevoServicio = await createServicio(this.nuevoServicio);
        if (nuevoServicio) {
          this.dialogServicios = false;
          this.nuevoServicio = {
            nombre: "",
            descripcion: "",
            precio: 0,
            precioDescuento: 0,
            imagen: "",
            existencias: 0, // Corregido aquí
            categoria: {
              idCategoria: "", // Deberías decidir si este campo es generado automáticamente o si el usuario lo ingresa
              nombre: "",
              ultimaModificacion: new Date().toISOString(), // Esto generará la fecha actual en el formato correcto
              active: true,
            },
            ultimaModificacion: new Date().toISOString(), // Esto generará la fecha actual en el formato correcto

            active: true, // Por defecto, nuevo servicio activo
          };
          this.cerrarModalAgregarServicio();
          this.fetchServicios(); // Llamada al método renombrado
        }
      } catch (error) {
        console.error("Error al agregar categoría de servicio:", error);
      }
    },
    async agregarPaquete() {
      try {
        const nuevoPaquete = await createServicioPaquete(this.nuevoPaquete);
        if (nuevoPaquete) {
          this.dialogPaquete = false;
          this.nuevoPaquete = {
            paquete: {
              idPaquete: "",
            },

            servicio: {
              idServicio: "",
            },
            ultimaModificacion: new Date().toISOString(),
            active: true,
          };
          this.cerrarModalAgregarServicio();
          this.getAllPaquetes(); // Llamada al método renombrado
          this.fetchServiciosPaquete();
        }
      } catch (error) {
        console.error("Error al agregar categoría de servicio:", error);
      }
    },

    openEditServicioDialog(idServicio) {
      this.$set(this.dialogosEditarServicio, idServicio, true);
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.convertToBase64(file);
      }
    },

    convertToBase64(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.$set(this.nuevoServicio, "imagen", reader.result);
      };
      reader.onerror = (error) => {
        console.error("Error al leer la imagen:", error);
      };
    },

    convertToImageUrl(base64) {
      return "data:image/jpeg;base64," + base64;
    },
  },
  mounted() {
    this.fetchServicios(); // Llamada al método renombrado
    this.fetchServiciosPaquete();
    this.getCategoriasServicios();
    this.getAllPaquetes();
  },
};
</script>

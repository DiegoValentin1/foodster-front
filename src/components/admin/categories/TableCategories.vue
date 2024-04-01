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
            <v-text-field
              v-model="searchPersonal"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialogPersonal" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  >Nuevo personal</v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5"
                    >Agregar nueva categoría de personal</span
                  >
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="nuevaCategoriaPersonal.nombre"
                          label="Nombre"
                          :rules="[v => !!v || 'El nombre es requerido', v => /^[a-zA-Z0-9\s]+$/.test(v) || 'El nombre solo puede contener letras y números']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="nuevaCategoriaPersonal.active"
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
                    @click="cerrarModalAgregarCategoriaPersonal"
                    >Cancelar</v-btn
                  >
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="agregarCategoriaPersonal"
                    >Guardar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-data-table
            class="mx-auto"
            style="height: auto; max-height: 500px; overflow-y: auto;"
            :headers="headersPersonal"
            :items="categoriasPersonal"
            :search="searchPersonal"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td class="text-start">{{ item.nombre }}</td>
                <td class="text-start">
            <v-chip :color="item.active ? 'green' : 'red'" outlined small>{{
              item.active ? "Activo" : "Inactivo"
            }}</v-chip>
          </td>
                <td class="text-start">{{ new Date(item.ultimaModificacion).toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}</td>
                <td class="text-center">
                  <v-dialog
                    v-model="dialogosEditar[item.idCategoria]"
                    max-width="500px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        color="blue"
                        v-bind="attrs"
                        v-on="on"
                        @click="openEditDialog(item.idCategoria)"
                        >mdi-pencil</v-icon
                      >
                    </template>
                    <v-card>
                      <v-card-title>
                        Editar categoría de personal
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="item.nombre"
                                label="Nombre"
                                :rules="[v => !!v || 'El nombre es requerido', v => /^[a-zA-Z0-9\s]+$/.test(v) || 'El nombre solo puede contener letras y números']"
                              ></v-text-field>
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
                          @click="cancelEditItemPersonal(item)"
                          >Cerrar</v-btn
                        >

                        <v-btn
                          color="blue darken-1"
                          text
                          @click="editItemPersonal(item)"
                          >Guardar</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-icon
                    color="red"
                    @click="deleteItemPersonal(item.idCategoria)"
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
            Categoría Servicio
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
              <v-card>
                <v-card-title>
                  <span class="text-h5"
                    >Agregar nueva categoría de servicio</span
                  >
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="nuevoServicio.nombre"
                          label="Nombre"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="nuevoServicio.active"
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
                    @click="cerrarModalAgregarCategoriaServicio"
                    >Cancelar</v-btn
                  >
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="agregarCategoriaServicio"
                    >Guardar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-data-table
            class="mx-auto"
            style="height: auto; max-height: 500px; overflow-y: auto;"
            :headers="headersServicios"
            :items="categoriasServicios"
            :search="searchServicios"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td class="text-start">{{ item.nombre }}</td>
                <td class="text-start">
            <v-chip :color="item.active ? 'green' : 'red'" outlined small>{{
              item.active ? "Activo" : "Inactivo"
            }}</v-chip>
          </td>
                <td class="text-start">{{ new Date(item.ultimaModificacion).toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}</td>
                <td class="text-center">
                  <v-dialog
                    v-model="dialogosEditarServicio[item.idCategoria]"
                    max-width="500px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        color="blue"
                        v-bind="attrs"
                        v-on="on"
                        @click="openEditServicioDialog(item.idCategoria)"
                        >mdi-pencil</v-icon
                      >
                    </template>
                    <v-card>
                      <v-card-title>
                        Editar categoría de servicio
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="item.nombre"
                                label="Nombre"
                              ></v-text-field>
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
                          @click="editItemServicio(item)"
                          >Guardar</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-icon
                    color="red"
                    @click="deleteItemServicio(item.idCategoria)"
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
  getCategoriasPersonales,
  actualizarCategoriaPersonal,
  crearCategoriaPersonal,
  eliminarCategoriaPersonal,
  getCategoriasServicios,
  actualizarCategoriaServicio,
  crearCategoriaServicio,
  getCategoriasServiciosPorEstado,
  eliminarCategoriaServicio,
  eliminarCategoriaServicioPorEstado,
} from "../../../services/CategoryServices.js";

export default {
  data() {
    return {
      tab: null,
      searchPersonal: "",
      dialogPersonal: false,
      dialogServicios: false,
      dialogosEditar: {},
      dialogosEditarServicio: {},
      nuevaCategoriaPersonal: {
        nombre: "",
        active: true, // Por defecto, nueva categoría activa
      },
      headersPersonal: [
        { text: "Nombre", align: "start", sortable: false, value: "nombre" },
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
      categoriasPersonal: [],
      searchServicios: "",
      dialogServicios: false,
      nuevoServicio: {
        nombre: "",
        active: true, // Por defecto, nuevo servicio activo
      },
      headersServicios: [
        { text: "Nombre", align: "start", sortable: false, value: "nombre" },
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
      categoriasServicios: [],
    };
  },
  methods: {
    async getCategoriasPersonales() {
      try {
        const response = await getCategoriasPersonales();
        if (response) {
          this.categoriasPersonal = response;
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

    cancelEditItemPersonal(item) {
      // Close the edit dialog without saving
      this.dialogosEditar[item.idCategoria] = false;
    },
    cancelEditItemServicio(item) {
      // Close the edit dialog without saving
      this.dialogosEditarServicio[item.idCategoria] = false;
    },
    async editItemPersonal(item) {
      console.log("Editando categoría personal:", item);
      try{
        // Set the edit dialog state for this row to true
        this.$set(this.dialogosEditar, item.idCategoria, true);

        // Find the index of the object in categoriasPersonal and update it
        const index = this.categoriasPersonal.findIndex(
          (category) => category.idCategoria === item.idCategoria
        );
        if (index !== -1) {
          // Update the object in the categoriasPersonal list
          this.categoriasPersonal[index].nombre = item.nombre;
          this.categoriasPersonal[index].active = item.active;

          // Call the service to update the category
          await actualizarCategoriaPersonal(item);
        }
        // Close the edit dialog after saving
        this.dialogosEditar[item.idCategoria] = false;
      } catch (error) {
        console.error("Error al editar categoría personal:", error);
      }
    },
    async editItemServicio(item) {
      try {
        // Set the edit dialog state for this row to true
        this.$set(this.dialogosEditar, item.idCategoria, true);
        console.log("Editando categoría de servicio:", item);

        // Find the index of the object in categoriasServicios and update it
        const index = this.categoriasServicios.findIndex(
          (category) => category.idCategoria === item.idCategoria
        );
        if (index !== -1) {
          // Update the object in the categoriasServicios list
          this.categoriasServicios[index].nombre = item.nombre;
          this.categoriasServicios[index].active = item.active;

          // Call the service to update the category
          await actualizarCategoriaServicio(item);
        }
        // Close the edit dialog after saving
        this.dialogosEditarServicio[item.idCategoria] = false;
      } catch (error) {
        console.error("Error al editar categoría de servicio:", error);
      }
    },

    async deleteItemPersonal(item) {
      try {
        // Call the service to delete the category
        console.log("Eliminando categoría personal:", item);
        await eliminarCategoriaPersonal(item);
        // Remove the deleted category from the list
        const index = this.categoriasPersonal.findIndex(
          (category) => category.uid === item.uid
        );
        if (index !== -1) {
          this.categoriasPersonal.splice(index, 1);
        }
      } catch (error) {
        console.error("Error al eliminar categoría personal:", error);
      }
    },
    async deleteItemServicio(item) {
      try {
        // Call the service to delete the category
        console.log("Eliminando categoría de servicio:", item);
        await eliminarCategoriaServicio(item);
        // Remove the deleted category from the list
        const index = this.categoriasServicios.findIndex(
          (category) => category.uid === item.uid
        );
        if (index !== -1) {
          this.categoriasServicios.splice(index, 1);
        }
      } catch (error) {
        console.error("Error al eliminar categoría de servicio:", error);
      }
    },
    cerrarModalAgregarCategoriaPersonal() {
      this.dialogPersonal = false;
      // Limpiar el formulario al cerrar el modal
      this.nuevaCategoriaPersonal = {
        nombre: "",
        active: true, // Por defecto, nueva categoría activa
      };
    },
    cerrarModalAgregarCategoriaServicio() {
      this.dialogServicios = false;
      // Limpiar el formulario al cerrar el modal
      this.nuevoServicio = {
        nombre: "",
        active: true, // Por defecto, nuevo servicio activo
      };
    },
    async agregarCategoriaPersonal() {
      try {
        const nuevaCategoria = await crearCategoriaPersonal(
          this.nuevaCategoriaPersonal
        );
        if (nuevaCategoria) {
          this.getCategoriasPersonales();
          this.getCategoriasServicios();

          // Cerrar el modal
          this.dialogPersonal = false;

          // Limpiar el formulario al cerrar el modal
          this.nuevaCategoriaPersonal = {
            nombre: "",
            active: true, // Por defecto, nueva categoría activa
          };
        }
      } catch (error) {
        console.error("Error al agregar categoría personal:", error);
      }
    },
    async agregarCategoriaServicio() {
      try {
        const nuevoServicio = await crearCategoriaServicio(this.nuevoServicio);
        if (nuevoServicio) {
          this.getCategoriasPersonales();
          this.getCategoriasServicios();
          this.dialogServicios = false;
          this.nuevoServicio = {
            nombre: "",
            active: true, // Por defecto, nuevo servicio activo
          };
        }
      } catch (error) {
        console.error("Error al agregar categoría de servicio:", error);
      }
    },
    openEditDialog(idCategoria) {
      this.$set(this.dialogosEditar, idCategoria, true);
    },
    openEditServicioDialog(idCategoria) {
      this.$set(this.dialogosEditarServicio, idCategoria, true);
    },
    cerrarModalAgregarServicio() {
      this.dialogServicios = false;
      // Limpiar el formulario al cerrar el modal
      this.nuevoServicio = {
        nombre: "",
        active: true, // Por defecto, nuevo servicio activo
      };
    },
  },
  mounted() {
    this.getCategoriasPersonales();
    this.getCategoriasServicios();
  },
};
</script>
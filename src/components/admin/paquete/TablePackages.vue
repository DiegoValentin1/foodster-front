<template>
  <v-card>
    <v-card-title>
      Servicios
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchPaquetes"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialogPaquete" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
            >Nuevo servicio</v-btn
          >
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Agregar nuevo paquete</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="nuevoPaquete.nombre"
                    label="Nombre"
                    :rules="[(v) => !!v || 'El nombre es requerido']"
                  ></v-text-field>
                  <v-text-field
                    v-model="nuevoPaquete.descripcion"
                    label="Descripción"
                    :rules="[(v) => !!v || 'La descripción es requerida']"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="nuevoPaquete.recomendadoPara"
                    label="Recomendado para"
                    :rules="[(v) => !!v || 'El recomendado para es requerido']"
                    type="text"
                  ></v-text-field>
                  <input type="file" @change="onFileChange" accept="image/*" />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="cerrarModalAgregarPaquete"
              >Cancelar</v-btn
            >
            <v-btn color="blue darken-1" text @click="agregarPaquete(nuevoPaquete)"
              >Guardar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-title>
    <v-data-table
      class="mx-auto"
      style="height: auto; max-height: 500px; overflow-y: auto"
      :headers="headersPaquetes"
      :items="paquetes"
      :search="searchPaquetes"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-start">{{ item.nombre }}</td>
          <td class="text-start">{{ item.descripcion }}</td>
          <td class="text-start">{{ item.recomendadoPara }}</td>
          <td class="text-start">
                  <img
                    :src="item.imagen"
                    style="max-width: 100px; max-height: 100px"
                  />
                </td>
          <td class="text-start">{{ item.numeroPedidos }}</td>
          <td class="text-start">
            {{ item.active ? "Activo" : "Inactivo" }}
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
              v-model="dialogosEditarPaquete[item.idPaquete]"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="blue"
                  v-bind="attrs"
                  v-on="on"
                  @click="openEditServicioDialog(item.idPaquete)"
                  >mdi-pencil</v-icon
                >
              </template>
              <v-card>
                <v-card-title> Editar servicio </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="item.nombre"
                          label="Nombre"
                            :rules="[(v) => !!v || 'El nombre es requerido']"
                        ></v-text-field>
                        <v-text-field
                          v-model="item.descripcion"
                          label="Descripción"
                          :rules="[(v) => !!v || 'La descripción es requerida']"
                          type="text"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="item.recomendadoPara"
                          label="Recomendado para"
                          :rules="[(v) => !!v || 'El recomendado para es requerido']"
                          type="text"
                        ></v-text-field>
                        <input type="file" @change="onFileChange" accept="image/*" />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="cancelEditItemPaquete(item)"
                    >Cerrar</v-btn
                  >

                  <v-btn
                    color="blue darken-1"
                    text
                    @click="editItemPaquete(item)"
                    >Guardar</v-btn
                  >
                </v-card-actions>
              </v-card> 
            </v-dialog>
            <v-icon color="red" @click="deleteItemPaquete(item.idPaquete)"
              >mdi-delete</v-icon
            >
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import {
  getAllPaquetes,
  updatePaquete,
  createPaquete,
  getPaquetesByStatus,
  deletePaquete,
  deletePaqueteByStatus,
} from "../../../services/PaquetesServices.js";
export default {
  data() {
    return {
      tab: null,
      searchPaquetes: "",
      dialogPaquete: false,
      dialogosEditarPaquete: {},

      nuevoPaquete: {
        nombre: "",
        descripcion: "",
        recomendadoPara: "",
        imagen: "",
        numeroPedidos: 0,
        ultimaModificacion: new Date().toISOString(),
        active: true,
      },
      headersPaquetes: [
        { text: "Nombre", align: "start", sortable: false, value: "nombre" },
        {
          text: "Descripción",
          align: "start",
          sortable: false,
          value: "descripcion",
        },
        {
          text: "Recomendado para: ",
          align: "start",
          sortable: false,
          value: "precioDescuento",
        },
        { text: "Imagen", align: "start", sortable: false, value: "imagen" },
        {
          text: "Número pedidos",
          align: "start",
          sortable: false,
          value: "existencias",
        },
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
      paquetes: [],
    };
  },
  methods: {
    async getAllPaquetes() {
      try {
        const response = await getAllPaquetes();
        if (response) {
          this.paquetes = response;
        }
      } catch (error) {
        console.error(error);
      }
    },

    cancelEditItemPaquete(item) {
      // Close the edit dialog without saving
      this.dialogosEditarPaquete[item.idPaquete] = false;
    },
    cerrarModalAgregarPaquete() {
      this.dialogPaquete = false;
      // Limpiar el formulario al cerrar el modal
      this.nuevoPaquete = {
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
    async editItemPaquete(nuevoPaquete) {
      nuevoPaquete.ultimaModificacion = new Date().toISOString(); // Esto generará la fecha actual en el formato correcto
      nuevoPaquete.imagen = this.nuevoPaquete.imagen;
      try {
        await updatePaquete (nuevoPaquete);
        this.getAllPaquetes
        this.dialogosEditarPaquete[nuevoPaquete.idPaquete] = false;
      } catch (error) {
        console.error("Error al actualizar paquete", error);
      }
    },
    async deleteItemPaquete(idPaquete) {
      try {
        await deletePaquete(idPaquete);
        this.getAllPaquetes(); // Recargar la lista de servicios
      } catch (error) {
        console.error("Error al eliminar servicio:", error);
      }
    },
    async agregarPaquete(nuevoPaquete) {
        console.log(nuevoPaquete);
      try {
        const nuevoPaquete = await createPaquete(this.nuevoPaquete);
        if (nuevoPaquete) {
          this.dialogPaquete = false;
          this.nuevoPaquete = {
            paquete: {
              nombre: "",
              descripcion: "",
              recomendadoPara: "",
              imagen: "",
              numeroPedidos: 0,
              ultimaModificacion: new Date().toISOString(),
              active: true,
            },
            ultimaModificacion: new Date().toISOString(),
            active: true,
          };
          this.cerrarModalAgregarServicio();
          this.getAllPaquetes(); 
        }
      } catch (error) {
        console.error("Error al agregar categoría de servicio:", error);
      }
    },

    openEditServicioDialog(idPaquete) {
      this.$set(this.dialogosEditarPaquete, idPaquete, true);
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
        this.$set(this.nuevoPaquete, "imagen", reader.result);
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
    this.getAllPaquetes();
  },
};
</script>

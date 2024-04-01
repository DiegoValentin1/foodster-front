<template>
  <v-card>
    <v-card-title>
      Evento
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchEventos"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialogEvento" max-width="500px">
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
                    v-model="nuevoEvento.nombre"
                    label="Nombre"
                    :rules="[(v) => !!v || 'El nombre es requerido']"
                  ></v-text-field>
                  <v-text-field
                    v-model="nuevoEvento.descripcion"
                    label="Descripción"
                    :rules="[(v) => !!v || 'La descripción es requerida']"
                    type="text"
                  ></v-text-field>
                  <v-select
                    v-model="nuevoEvento.active"
                    :items="[
                      { text: 'Activo', value: true },
                      { text: 'Inactivo', value: false },
                    ]"
                    label="Estado"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="nuevoEvento.recomendadoPara"
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
            <v-btn color="blue darken-1" text @click="cerrarModalAgregarEvento"
              >Cancelar</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="agregarEvento(nuevoEvento)"
              >Guardar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-title>
    <v-data-table
      class="mx-auto"
      style="height: auto; max-height: 500px; overflow-y: auto"
      :headers="headers"
      :items="eventos"
      :search="searchEventos"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-start">{{ item.numeroPersonas }}</td>
          <td class="text-start">{{ item.costoTotal }}</td>
          <td class="text-start">
            {{
              new Date(item.fechaHoraInicio).toLocaleString("es-ES", {
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
            {{
              new Date(item.fechaHoraFin).toLocaleString("es-ES", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            }}
          </td>
          <td class="text-start">{{ item.personalizado }}</td>
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
          <td class="text-center">
            <v-dialog
              v-model="dialogosEditarEvento[item.idEvento]"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="blue"
                  v-bind="attrs"
                  v-on="on"
                  @click="openEditServicioDialog(item.idEvento)"
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
                          v-model="item.numeroPersonas"
                          label="Número de Personas"
                          :rules="[
                            (v) => !!v || 'El número de personas es requerido',
                          ]"
                        ></v-text-field>
                        <v-text-field
                          v-model="item.costoTotal"
                          label="Costo Total"
                          :rules="[(v) => !!v || 'El costo total es requerido']"
                          type="number"
                        ></v-text-field>
                        <v-text-field
                          v-model="item.fechaHoraInicio"
                          label="Fecha y Hora de Inicio"
                          :rules="[
                            (v) =>
                              !!v || 'La fecha y hora de inicio es requerida',
                          ]"
                          type="datetime-local"
                        ></v-text-field>
                        <v-text-field
                          v-model="item.fechaHoraFin"
                          label="Fecha y Hora de Fin"
                          :rules="[
                            (v) => !!v || 'La fecha y hora de fin es requerida',
                          ]"
                          type="datetime-local"
                        ></v-text-field>
                        <v-select
                          v-model="item.personalizado"
                          :items="[
                            { text: 'Personalizado', value: true },
                            { text: 'No personalizado', value: false },
                          ]"
                          label="Personalizado"
                        ></v-select>
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
                    @click="cancelEditItemEvento(item)"
                    >Cerrar</v-btn
                  >
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="editItemEvento(item)"
                    >Guardar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-icon color="red" @click="deleteItemEvento(item.idEvento)"
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
  getEventos,
  updateEvento,
  createEvento,
  getEventosByStatus,
  deleteEvento,
} from "../../../services/EventosServices";
export default {
  data() {
    return {
      searchEventos: "",
      dialogEvento: false,
      dialogosEditarEvento: {},

      nuevoEvento: {
        numeroPersonas: 0,
        costoTotal: 0,
        personalizado: false,
        fechaHoraInicio: "",
        fechaHoraFin: "",
        active: true,
      },
      headers: [
        {
          text: "Número de Personas",
          align: "start",
          sortable: false,
          value: "numeroPersonas",
        },
        {
          text: "Costo Total",
          align: "start",
          sortable: false,
          value: "costoTotal",
        },
        {
          text: "Fecha y Hora de Inicio",
          align: "start",
          sortable: false,
          value: "fechaHoraInicio",
        },
        {
          text: "Fecha y Hora de Fin",
          align: "start",
          sortable: false,
          value: "fechaHoraFin",
        },
        {
          text: "Personalizado",
          align: "start",
          sortable: false,
          value: "personalizado",
        },
        {
          text: "Ultima Modificacion",
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
      eventos: [],
    };
  },

  methods: {
    async getAllEventos() {
      try {
        const response = await getEventos();
        if (response) {
          this.eventos = response;
          console.log(this.eventos);
        }
      } catch (error) {
        console.error(error);
      }
    },

    cancelEditItemEvento(item) {
      // Close the edit dialog without saving
      this.dialogosEditarEvento[item.idEvento] = false;
    },
    cerrarModalAgregarEvento() {
      this.dialogEvento = false;
      // Limpiar el formulario al cerrar el modal
      this.nuevoEvento = {
        numeroPersonas: 0,
        costoTotal: 0,
        personalizado: false,
        fechaHoraInicio: "",
        fechaHoraFin: "",
        active: true,
      };
    },
    async editItemEvento(item) {
      console.log("Item a editar:", item); // Agregar esta línea para verificar el objeto item
      item.ultimaModificacion = new Date().toISOString();
      try {
        await updateEvento(item);
        this.getAllEventos();
        this.dialogosEditarEvento[item.idEvento] = false;
      } catch (error) {
        console.error("Error al actualizar paquete", error);
      }
    },

    async deleteItemEvento(idEvento) {
      try {
        await deleteEvento(idEvento);
        this.getAllEventos();
      } catch (error) {
        console.error("Error al eliminar servicio:", error);
      }
    },

    async agregarEvento(nuevoEvento) {
      try {
        const response = await createEvento(nuevoEvento);
        if (response) {
          this.dialogEvento = false;
          this.cerrarModalAgregarEvento();
          this.getAllEventos();
        }
      } catch (error) {
        console.error("Error al agregar categoría de servicio:", error);
      }
    },

    openEditServicioDialog(idEvento) {
      this.$set(this.dialogosEditarEvento, idEvento, true);
    },
  },
  mounted() {
    this.getAllEventos();
  },
};
</script>

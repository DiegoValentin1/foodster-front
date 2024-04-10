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
    </v-card-title>

    <v-data-table
        class="mx-auto"
        style="height: auto; max-height: 500px; overflow-y: auto"
        :items-per-page-options="[5, 10, 15]"
        :headers="headers"
        :items="eventos"
        :server-items-length="totalItems"
        :items-per-page.sync="itemsPerPage"
        :loading="loading"
        :search="searchEventos"
        :page.sync="currentPage"
        @update:page="getAllEventos"
        @update:items-per-page="getAllEventos"

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
              }}
            </v-chip>
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
                >mdi-pencil
                </v-icon
                >
              </template>
              <v-card>
                <v-card-title> Editar evento</v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                            v-model="item.numeroPersonas"
                            label="Número de Personas"
                            :rules="[
                            (v) => !!v || 'El número de personas es requerido',
                            (v) => (v && v > 0) || 'El número de personas debe ser mayor a 0',
                            (v) => (v && v < 1000) || 'El número de personas debe ser menor a 1000',
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
                  >Cerrar
                  </v-btn
                  >
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="editItemEvento(item)"
                  >Guardar
                  </v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-icon color="red" @click="deleteItemEvento(item.idEvento)"
            >mdi-delete
            </v-icon
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
  deleteEvento, getAllPaginado,
} from "../../../services/EventosServices";
import swalService from "@/services/SwalService";
import {getAllPaquetesPaginado} from "@/services/PaquetesServices";

export default {
  data() {
    return {
      loading: false,
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
        {text: "Estado", align: "start", sortable: false, value: "active"},
        {
          text: "Acciones",
          align: "center",
          sortable: false,
          value: "acciones",
        },
      ],
      eventos: [],
      currentPage: 1,
      totalItems: 0,
      totalPages: 0,
      itemsPerPage: 10,
    };
  },

  methods: {
    async getAllEventos() {
      try {
        this.loading = true;
        const response = await getAllPaginado(this.currentPage - 1, this.itemsPerPage);
        if (response) {
          this.totalPages = response.totalPages;
          this.totalItems = response.totalElements;
          this.eventos = response.content;
          this.loading = false;
        } else {
          this.totalPages = 0;
          this.eventos = [];
          this.currentPage = 1;
          this.totalItems = 0;
          this.loading = false;
        }
      } catch (error) {
        console.error(error);
        this.loading = false;
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
        let proceder = swalService.confirmationWarning(
            "¿Estás seguro de eliminar el evento?"
        );
        if (proceder) {
          await deleteEvento(idEvento);
          await this.getAllEventos();
        }
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

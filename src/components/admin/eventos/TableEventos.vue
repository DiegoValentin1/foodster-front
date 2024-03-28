<template>
  <v-card>
    <v-card-title>
      Eventos
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar Evento" single-line
        hide-details></v-text-field>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Nuevo Evento</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Agregar nuevo evento</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoEvento.numeroPersonas" label="Número de Personas"
                    type="number"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoEvento.costoTotal" label="Costo Total" type="number"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoEvento.personalizado" label="Personalizado"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="7">
                  <v-text-field v-model="nuevoEvento.fechaHoraInicio" label="Fecha y Hora de Inicio"
                    type="datetime-local"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="7">
                  <v-text-field v-model="nuevoEvento.fechaHoraFin" label="Fecha y Hora de Fin"
                    type="datetime-local"></v-text-field>

                </v-col>

              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cerrarModalAgregarEvento">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="agregarEvento">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-title>
    <v-data-table class="mx-auto" style="height: 400px;" :headers="headers" :items="eventos" :search="search">
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-start">{{ item.idEvento }}</td>
          <td class="text-start">{{ item.numeroPersonas }}</td>
          <td class="text-start">{{ item.costoTotal }}</td>
          <td class="text-start">{{ item.fechaHoraInicio }}</td>
          <td class="text-start">{{ item.fechaHoraFin }}</td>
          <td class="text-start">{{ item.personalizado }}</td>
          <td class="text-start">{{ item.ultimaModificacion }}</td>

          <td class="text-start">
            <v-chip :color="item.active ? 'green' : 'red'" outlined small>{{ item.active ? 'Activo' : 'Inactivo'
              }}</v-chip>
          </td>
          <td class="text-center">
            <v-icon color="blue" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon color="red" @click="deleteItem(item)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar Evento</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedEvento.numeroPersonas" label="Número de Personas"
                  type="number"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedEvento.costoTotal" label="Costo Total" type="number"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedEvento.fechaHoraInicio" label="Fecha y Hora de Inicio"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedEvento.fechaHoraFin" label="Fecha y Hora de Fin"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancelEdit">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="saveEdit">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import eventosService from '../../../services/EventosServices'

export default {
  data() {
    return {
      eventos: [],
      search: '',
      dialog: false,
      editDialog: false,
      nuevoEvento: {
        numeroPersonas: '',
        costoTotal: '',
        fechaHoraInicio: '',
        fechaHoraFin: ''
      },
      editedEvento: {
        numeroPersonas: '',
        costoTotal: '',
        fechaHoraInicio: '',
        fechaHoraFin: ''
      },
      headers: [
        { text: 'ID', align: 'start', sortable: false, value: 'idEvento' },
        { text: 'Número de Personas', align: 'start', sortable: false, value: 'numeroPersonas' },
        { text: 'Costo Total', align: 'start', sortable: false, value: 'costoTotal' },
        { text: 'Fecha y Hora de Inicio', align: 'start', sortable: false, value: 'fechaHoraInicio' },
        { text: 'Fecha y Hora de Fin', align: 'start', sortable: false, value: 'fechaHoraFin' },
        { text: 'Personalizado', align: 'start', sortable: false, value: 'personalizado' },
        { text: 'Ultima Modificacion', align: 'start', sortable: false, value: 'ultimaModificacion' },
        { text: 'Estado', align: 'start', sortable: false, value: 'active' },
        { text: 'Acciones', align: 'center', sortable: false, value: 'acciones' },
      ]
    };
  },
  mounted() {
    this.getEventos();
  },
  methods: {
    async getEventos() {
      try {
        const response = await eventosService.getEventos();
        if (Array.isArray(response.data)) {
          this.eventos = response.data;
        } else if (typeof response.data === 'object') {
          this.eventos = [response.data];
        } else {

          console.error('La respuesta de la API no es un array ni un objeto válido:', response);
        }
      } catch (error) {
        console.log(error)
      }
    },
    editItem(item) {
      // Copiar los datos del evento a editar
      this.editedEvento = { ...item };
      // Abrir el modal de edición
      this.editDialog = true;
    },
    cancelEdit() {
      // Cerrar el modal de edición
      this.editDialog = false;
      // Restablecer los datos del evento en edición
      this.editedEvento = {
        numeroPersonas: '',
        costoTotal: '',
        fechaHoraInicio: '',
        fechaHoraFin: ''
      };
    },
    saveEdit() {
      // Aquí implementarías la lógica para guardar los cambios del evento editado
      console.log("Evento editado:", this.editedEvento);
      // Cerrar el modal de edición
      this.editDialog = false;
      // Limpiar los datos del evento editado
      this.editedEvento = {
        numeroPersonas: '',
        costoTotal: '',
        fechaHoraInicio: '',
        fechaHoraFin: ''
      };
    },
    deleteItem(item) {
      // Aquí implementarías la lógica para eliminar el evento
    },
    cerrarModalAgregarEvento() {
      this.dialog = false;
      // Limpiar el formulario al cerrar el modal
      this.nuevoEvento = {
        numeroPersonas: '',
        costoTotal: '',
        fechaHoraInicio: '',
        fechaHoraFin: ''
      };
    },
    async agregarEvento() {
      try {
        // Llamada a la función insert con el nuevo evento
        await insert(this.nuevoEvento);

        // Si no hay errores, el evento se ha guardado correctamente en el servidor
        console.log("Nuevo evento guardado:", this.nuevoEvento);

        // Cerrar el modal
        this.dialog = false;

        // Limpiar el formulario al cerrar el modal
        this.nuevoEvento = {
          numeroPersonas: '',
          costoTotal: '',
          fechaHoraInicio: '',
          fechaHoraFin: ''
        };
      } catch (error) {
        // Si hay un error, se captura y se muestra en la consola
        console.log(error);
        // Puedes manejar el error de acuerdo a tus necesidades aquí
      }
    }
  }
}
</script>

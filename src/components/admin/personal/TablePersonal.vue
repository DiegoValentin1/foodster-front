<template>
  <v-card>
    <v-card-title>
      Personal
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Nueva Persona</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Agregar nueva persona</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoUsuario.nombre" label="Nombre"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoUsuario.apellidos" label="Apellidos"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoUsuario.cargo" label="Cargo"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoUsuario.correo" :rules="emailRules" label="Correo"
                    required></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoUsuario.numero" label="Numero"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeModalAddPersonal">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="addPersonal">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-title>
    <v-data-table class="mx-auto" style="height: 400px;" :headers="headers" :items="personal" :search="search">
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-start">{{ item.idPersonal }}</td>
          <td class="text-start">{{ item.nombres }}</td>
          <td class="text-start">{{ item.pApellodo }}</td>
          <td class="text-start">{{ item.sApellido }}</td>
          <td class="text-start">{{ item.telefono }}</td>
          <td class="text-start">{{ item.correo }}</td>
          <td class="text-start">{{ item.rol }}</td>
          <td class="text-start">{{ item.categoria }}</td>
          <td class="text-start">{{ item.ultimaModificacion }}</td>
          <td class="text-start">
            <v-chip :color="item.estado === 'Activo' ? 'green' : 'red'" outlined small>{{ item.estado }}</v-chip>
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
          <span class="text-h5">Editar persona</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.apellidos" label="Apellidos"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.cargo" label="Cargo"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.correo" label="Correo"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.numero" label="Numero"></v-text-field>
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
import personalServices from '../../../services/PersonalServices'
export default {
  data() {
    return {
      personal: [],
      search: '',
      dialog: false,
      editDialog: false,
      valid: false,
      nuevoUsuario: {
        nombre: '',
        apellidos: '',
        cargo: '',
        numero: '',
        status: ''
      },
      editedItem: {
        nombre: '',
        apellidos: '',
        cargo: '',
        numero: ''
      },
      headers: [
        { text: '#', align: 'start', sortable: true, value: 'idPersonal' },
        { text: 'Nombre', align: 'start', sortable: false, value: 'nombres' },
        { text: 'Primer Apellido', align: 'start', sortable: false, value: 'pApellido' },
        { text: 'Segundo Apellido', align: 'start', sortable: false, value: 'sApellido' },
        { text: 'Telefono', align: 'start', sortable: false, value: 'telefono' },
        { text: 'Correo', align: 'start', sortable: false, value: 'correo' },
        { text: 'Rol', align: 'start', sortable: false, value: 'role' },
        { text: 'Cargo', align: 'start', sortable: false, value: 'cargo' },
        { text: 'Ultima Modificación', align: 'start', sortable: false, value: 'ultimaModificacion' },
        { text: 'Estado', align: 'start', sortable: false, value: 'estado' },
        
        { text: 'Acciones', align: 'center', sortable: false, value: 'acciones' },
      ],

      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    };
  },
  mounted() {
    this.getPersonal();
  },
  methods: {
    async getPersonal() {
      try {
        const response = await personalServices.getPersonal();
        if (Array.isArray(response.data)) {
          this.personal = response.data.map(persona => ({
            idPersonal: persona.idPersonal,
            nombres: persona.usuarios.nombres,
            pApellodo: persona.usuarios.primerApellido,
            sApellido: persona.usuarios.segundoApellido,
            apellidos: `${persona.usuarios.primerApellido} ${persona.usuarios.segundoApellido}`,
            telefono: persona.usuarios.telefono,
            correo: persona.usuarios.correo,
            rol: persona.usuarios.roles.length > 0 ? persona.usuarios.roles[0].nombre : '',
            categoria: persona.categoria.nombre,
            ultimaModificacion: persona.ultimaModificacion,
            estado: persona.active ? 'Activo' : 'Inactivo'
          }));
        } else if (typeof response.data === 'object') {
          const persona = response.data;
          this.personal = [{
            idPersonal: persona.idPersonal,
            nombre: persona.usuarios.nombres,
            apellidos: `${persona.usuarios.primerApellido} ${persona.usuarios.segundoApellido}`,
            telefono: persona.usuarios.telefono,
            correo: persona.usuarios.correo,
            rol: persona.usuarios.roles.length > 0 ? persona.usuarios.roles[0].nombre : '',
            categoria: persona.categoria.nombre,
            ultimaModificacion: persona.ultimaModificacion,
            estado: persona.active ? 'Activo' : 'Inactivo'
          }];
        } else {
          console.error('La respuesta de la API no es un array ni un objeto válido:', response);
        }
      } catch (error) {
        console.error(error);
      }
    },

    editItem(item) {
      // Copiar los datos de la persona a editar
      this.editedItem = { ...item };
      // Abrir el modal de edición
      this.editDialog = true;
    },
    cancelEdit() {
      // Cerrar el modal de edición
      this.editDialog = false;
      // Restablecer los datos de la persona en edición
      this.editedItem = {
       
      };
    },
    saveEdit() {
      // Aquí implementarías la lógica para guardar los cambios de la persona editada
      console.log("Persona editada:", this.editedItem);
      // Cerrar el modal de edición
      this.editDialog = false;
      // Limpiar los datos de la persona editada
      this.editedItem = {
       
      };
    },
    addPersonal() {
      console.log("METHOD ADD PERSONAL")
    },
    deleteItem(item) {
      // Cambiar el estado de la persona de activo a inactivo o viceversa
      item.status = item.status === 'Activo' ? 'Inactivo' : 'Activo';
    },
    closeModalAddPersonal() {
      this.dialog = false;
      // Limpiar el formulario al cerrar el modal
    },
    async addPersonal() {
      console.log("METHOD ADD PERSONAL")
    }


  }
}
</script>

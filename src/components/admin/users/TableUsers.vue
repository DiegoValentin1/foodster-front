<template>
  <v-card>
    <v-card-title color-te>
      Usuarios
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="#0091EA" dark class="mb-2" v-on="on"><v-icon dark>mdi-plus</v-icon></v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Agregar nuevo usuario</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoUsuario.nombres" label="Nombres"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoUsuario.primerApellido" label="Primer Apellido"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoUsuario.segundoApellido" label="Segundo Apellido"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoUsuario.telefono" label="Teléfono"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoUsuario.correo" label="Correo"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoUsuario.ultimaModificacion" label="Última Modificación"
                    disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoUsuario.estado" label="Estado"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoUsuario.rolNombre" label="Nombre del Rol"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeModalAddUsuario">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="addUsuario">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-title>
    <v-data-table :headers="headers" :items="users" :search="search">
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-start">{{ item.nombres }}</td>
          <td class="text-start">{{ item.primerApellido }}</td>
          <td class="text-start">{{ item.segundoApellido }}</td>
          <td class="text-start">{{ item.telefono }}</td>
          <td class="text-start">{{ item.correo }}</td>
          <td class="text-start">{{ item.ultimaModificacion }}</td>
          <td class="text-start">
            <v-chip :color="item.active ? 'green' : 'red'" outlined small>
              {{ item.active ? 'Activo' : 'Inactivo' }}
            </v-chip>
          </td>
          <td class="text-start">{{ item.roles && item.roles.length > 0 ? item.roles[0].nombre : '' }}</td>

          <td class="text-center">
            <v-icon color="blue" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon color="red" @click="changeStatus(item.idUsuario)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar Usuario</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="usuarioEditado.nombres" label="Nombres"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="usuarioEditado.primerApellido" label="Primer Apellido"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="usuarioEditado.segundoApellido" label="Segundo Apellido"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="usuarioEditado.telefono" label="Teléfono"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="usuarioEditado.correo" label="Correo"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="usuarioEditado.ultimaModificacion" label="Última Modificación"
                  disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="usuarioEditado.active" label="Estado" disabled></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-row v-for="(rol, index) in usuarioEditado.roles" :key="index">
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="rol.nombre" label="Nombre del Rol" disabled></v-text-field>
                  </v-col>
                </v-row>
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeModalUpdateUsuario">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="updateUsuario">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-card>
</template>

<script>
import usersServices from '../../../services/UsersServices'

export default {
  data() {
    return {
      users: [],
      search: '',
      dialog: false,
      editDialog: false,
      nuevoUsuario: {
        nombres: '',
        primerApellido: '',
        segundoApellido: '',
        telefono: '',
        correo: '',
        ultimaModificacion: '',
        estado: '',
        rolNombre: ''
      },
      usuarioEditado: {
        nombres: '',
        primerApellido: '',
        segundoApellido: '',
        telefono: '',
        correo: '',
        ultimaModificacion: '',
        estado: '',
        roles: []
      },
      headers: [
        { text: 'Nombres', align: 'start', sortable: true, value: 'nombres' },
        { text: 'Primer Apellido', align: 'start', sortable: true, value: 'primerApellido' },
        { text: 'Segundo Apellido', align: 'start', sortable: true, value: 'segundoApellido' },
        { text: 'Teléfono', align: 'start', sortable: false, value: 'telefono' },
        { text: 'Correo', align: 'start', sortable: false, value: 'correo' },
        { text: 'Última Modificación', align: 'start', sortable: true, value: 'ultimaModificacion' },
        { text: 'Estado', align: 'start', sortable: false, value: 'active' },
        { text: 'Nombre del Rol', align: 'start', sortable: false, value: 'rolNombre' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
    }
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        const response = await usersServices.getUsers();
        if (Array.isArray(response.data)) {
          this.users = response.data;
        } else if (typeof response.data === 'object') {
          this.users = [response.data];
        } else {
          console.error('La respuesta de la API no es un array ni un objeto válido:', response);
        }
      } catch (error) {
        console.log(error)
      }
    },
    //NOT FOUND, THIS METHOD NOT EXIST IN THE API
    async changeStatus(idUsuario) {
      try {
        const response = await usersServices.changeStatus(idUsuario);
        this.getUsers();
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    },
    closeModalAddUsuario() {
      this.dialog = false;
      this.nuevoUsuario = {};
    },

    async addUsuario() {
      console.log("METHOD ADD USER")
    },
    editItem(item) {
      this.usuarioEditado = { ...item };
      this.editDialog = true;
    },
    async updateUsuario() {
      console.log("METHOD UPDATE USER");
    },


    closeModalUpdateUsuario() {
      this.editDialog = false;
      this.usuarioEditado = {};
    }
  }
}
</script>

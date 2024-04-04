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
          <v-btn color="#0091EA" dark class="mb-2" v-on="on">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
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
                  <v-text-field v-model="nuevoUsuario.correo" label="Correo"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoUsuario.ultimaModificacion" label="Contraseña"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoUsuario.estado" label="Confirmar contraseña"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select label="Rol" v-model="nuevoUsuario.roles.idRol" :items="roles" item-text="nombre"
                            item-value="idRole">
                  </v-select>
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
    <v-data-table class="mx-auto" style="height: auto; max-height: 500px; overflow-y: auto" :headers="headers"
                  :items="users" :search="search">
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-start">{{ item.nombres }}</td>
          <td class="text-start">{{ item.primerApellido }}</td>
          <td class="text-start">{{ item.segundoApellido }}</td>
          <td class="text-start">{{ item.telefono }}</td>
          <td class="text-start">{{ item.correo }}</td>
          <td class="text-start">{{ new Date(item.ultimaModificacion).toLocaleString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }) }}</td>
          <td class="text-start">
            <v-chip @click="changeStatus(item.idUsuario)" :color="item.active ? 'green' : 'red'" outlined small>
              {{ item.active ? 'Activo' : 'Inactivo' }}
            </v-chip>
          </td>
          <td class="text-start">{{ item.roles && item.roles.length > 0 ? item.roles[0].nombre : 'SN' }}</td>

          <td class="text-center">
            <v-icon color="blue" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon color="red" @click="deleteUser(item.idUsuario)">mdi-delete</v-icon>
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
                <v-text-field v-model="usuarioEditado.contrasena" label="Contraseña"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select label="Rol" v-model="nuevoUsuario.roles.idRol" :items="roles" item-text="nombre"
                          item-value="idRole">
                </v-select>
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
import usersServices from '../../../services/UsersServices'
import rolesService from '../../../services/RolesService'

export default {
  data() {
    return {
      users: [],
      roles: [],
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
        roles: {
          idRol: ''
        }
      },
      usuarioEditado: {
        nombres: '',
        primerApellido: '',
        segundoApellido: '',
        telefono: '',
        correo: '',
        contrasena: "",
        active: '',
        roles: [
          {
            idRol: "",
          }
        ]
      },
      headers: [
        {text: 'Nombres', align: 'start', sortable: true, value: 'nombres'},
        {text: 'Primer Apellido', align: 'start', sortable: true, value: 'primerApellido'},
        {text: 'Segundo Apellido', align: 'start', sortable: true, value: 'segundoApellido'},
        {text: 'Teléfono', align: 'start', sortable: false, value: 'telefono'},
        {text: 'Correo', align: 'start', sortable: false, value: 'correo'},
        {text: 'Última Modificación', align: 'start', sortable: true, value: 'ultimaModificacion'},
        {text: 'Estado', align: 'start', sortable: false, value: 'active'},
        {text: 'Nombre del Rol', align: 'start', sortable: false, value: 'rolNombre'},
        {text: 'Acciones', value: 'actions', sortable: false}
      ],
    }
  },
  mounted() {
    this.getUsers();
    this.getRoles();
  },
  methods: {
    async getUsers() {
      try {
        const response = await usersServices.getUsers();
        console.log(response)
        this.users = response;
      } catch (error) {
        console.log(error)
      }
    },
    async getRoles() {
      try {
        const response = await rolesService.getRoles();
        console.log(response)
        this.roles = response;
      } catch (error) {
        console.log(error)
      }
    },
    //NOT FOUND, THIS METHOD NOT EXIST IN THE API
    async changeStatus(idUsuario) {
      try {
        await usersServices.changeStatus(idUsuario);
        await this.getUsers();
      } catch (error) {
        console.log(error)
      }
    },
    closeModalAddUsuario() {
      this.dialog = false;

    },

    async addUsuario() {
      try {
        await usersServices.insert(this.nuevoUsuario);
        await this.getUsers();
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
    },
    editItem(item) {
      this.usuarioEditado = {...item};
      this.editDialog = true;
    },
    cancelEdit() {
      this.editDialog = false;
      this.usuarioEditado = {
        nombres: '',
        primerApellido: '',
        segundoApellido: '',
        telefono: '',
        correo: '',
        contrasena: "",
        active: '',
        roles: [
          {
            idRol: "",
          }
        ]
      }
    },
    async saveEdit() {
      try {
        await usersServices.update(this.usuarioEditado);
        await this.getUsers();
      } catch (error) {
        console.log(error);
      } finally {
        this.editDialog = false;
        this.usuarioEditado = {
          nombres: '',
          primerApellido: '',
          segundoApellido: '',
          telefono: '',
          correo: '',
          contrasena: "",
          active: '1',
          roles: [
            {
              idRol: "",
            }
          ]
        }
      }
    },
    async deleteUser(idUsuario) {
      try {
        await usersServices.deleteUser(idUsuario);
        await this.getUsers();
      } catch (error) {
        console.log(error);
      }
    },


    closeModalUpdateUsuario() {
      this.editDialog = false;
      this.usuarioEditado = {};
    }
  }
}
</script>
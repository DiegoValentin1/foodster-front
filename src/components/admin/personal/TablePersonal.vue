<template>

  <v-card>
    <v-breadcrumbs :items="items" large> </v-breadcrumbs>
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
                  <v-text-field v-model="nuevoUsuario.nombres" label="Nombre"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoUsuario.primerApellido" label="Primer Apellido"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoUsuario.segundoApellido" label="Segundo Apellido"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoUsuario.telefono" label="Telefono"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoUsuario.correo" :rules="emailRules" label="Correo"
                    required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="nuevoUsuario.contrasena" label="Contraseña" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Confirmar contraseña"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select label="Cargo" v-model="nuevoUsuario.categoria.idCategoria" :items="categoriasPersonal"
                    item-text="nombre" item-value="idCategoria">
                  </v-select>
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
    <v-data-table class="mx-auto" style="height: auto; max-height: 500px; overflow-y: auto" :headers="headers" :items="personal" :search="search">
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-start">{{ item.usuarios.nombres }}</td>
          <td class="text-start">{{ item.usuarios.primerApellido }}</td>
          <td class="text-start">{{ item.usuarios.segundoApellido }}</td>
          <td class="text-start">{{ item.usuarios.telefono }}</td>
          <td class="text-start">{{ item.usuarios.correo }}</td>
          <td class="text-start">{{ item.usuarios.roles[0].nombre }}</td>
          <td class="text-start">{{ item.categoria.nombre }}</td>
          <td class="text-start">{{ new Date(item.ultimaModificacion).toLocaleString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }) }}</td>
          <td class="text-start">
            <v-chip @click="changeStatus(item.idPersonal)" :color="item.active === true ? 'green' : 'red'" outlined
              small>{{ item.active === true ? 'Activo' :
      "Inactivo" }}</v-chip>
          </td>
          <td class="text-center">
            <v-icon color="blue" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon color="red" @click="deleteItem(item.idPersonal)">mdi-delete</v-icon>
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
                <v-text-field v-model="editedItem.usuarios.nombres" label="Nombre"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.usuarios.primerApellido" label="Primer Apellido"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.usuarios.segundoApellido" label="Segundo Apellido"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.usuarios.telefono" label="Telefono"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select label="Cargo" v-model="editedItem.categoria.idCategoria" :items="categoriasPersonal"
                  item-text="nombre" item-value="idCategoria">
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
import personalServices from '../../../services/PersonalServices'
import {getCategoriasPersonales} from "@/services/CategoryServices";
import swalService from "@/services/SwalService";
export default {
  data() {
    return {
      personal: [],
      categoriasPersonal: [],
      search: '',
      dialog: false,
      editDialog: false,
      valid: false,
      items: [
        { text: 'Personal', disabled: false, href: '/admin/personal' },
        { text: 'Direcciones', disabled: false, href: '/admin/direcciones' },
        
      ],
      nuevoUsuario: {
        nombres: '',
        primerApellido: '',
        segundoApellido: '',
        telefono: '',
        correo: '',
        contrasena: '',
        idRol: "3ab228ec-a90d-496c-811b-d404347f1d24",
        categoria: {
          idCategoria: ''
        },
      },
      editedItem: {
        idPersonal: "",
        usuarios: {
          idUsuario: "",
          nombres: "",
          primerApellido: "",
          segundoApellido: "",
          telefono: "",
          correo: "",
          contrasena: "",
          active: '',
          roles: [
            {
              idRol: "",
            }
          ]
        },
        categoria: {
          idCategoria: "",
        },
        active: ''
      },
      headers: [

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
    this.getCategoriasPersonal();
  },
  methods: {
    async getCategoriasPersonal() {
      try {
        const response = await getCategoriasPersonales();
        console.log(response)
        this.categoriasPersonal = response;
      } catch (error) {
        console.log(error)
      }
    },
    async getPersonal() {
      try {
        const response = await personalServices.getPersonal();
        console.log(response)
        this.personal = response;
      } catch (error) {
        console.error(error);
      }
    },
    editItem(item) {
      console.log(item)
      this.editedItem = { ...item };
      this.editDialog = true;
    },
    cancelEdit() {
      // Cerrar el modal de edición
      this.editDialog = false;
      // Restablecer los datos de la persona en edición
      this.editedItem = {
        idPersonal: "",
        usuarios: {
          idUsuario: "",
          nombres: "",
          primerApellido: "",
          segundoApellido: "",
          telefono: "",
          correo: "",
          contrasena: "",
          active: '',
          roles: [
            {
              idRol: "",
            }
          ]
        },
        categoria: {
          idCategoria: "",
        },
        active: ''
      };
    },
    async saveEdit() {
      try {
        await personalServices.update(this.editedItem);
      } catch (error) {
      } finally {
        this.editDialog = false;
        this.editedItem = {
          idPersonal: "",
          usuarios: {
            idUsuario: "",
            nombres: "",
            primerApellido: "",
            segundoApellido: "",
            telefono: "",
            correo: "",
            contrasena: "",
            active: '',
            roles: [
              {
                idRol: "",
              }
            ]
          },
          categoria: {
            idCategoria: "",
          },
          active: ''
        };
        await this.getPersonal();
      }

    },
    async deleteItem(idPersonal)
    {
      let proceder = await swalService.confirmationWarning(
          "¿Estás seguro de eliminar este personal?",
      );
      if (proceder) {
        await personalServices.delete_(idPersonal);
        await this.getPersonal();
      }
    }
,
    async changeStatus(idPersonal)
    {
      await personalServices.changeStatus(idPersonal);
      await this.getPersonal();
    }
,
    closeModalAddPersonal() {
      this.dialog = false;
    },
    resetNuevoPersona() {
      this.nuevoUsuario = {
        nombres: '',
        primerApellido: '',
        segundoApellido: '',
        telefono: '',
        correo: '',
        contrasena: '',
        idRol: "3ab228ec-a90d-496c-811b-d404347f1d24",
        categoria: {
          idCategoria: ''
        },
      }
    },
    async addPersonal() {
      try {
        await personalServices.insert(this.nuevoUsuario);
      } catch (error) {
        console.log(error)
      } finally {
        this.resetNuevoPersona();
        this.closeModalAddPersonal();
        await this.getPersonal()
      }
    }


  }
}
</script>
<template>
  <div>
    <div class="v-sheet-container">
      <v-sheet :elevation="5" border rounded class="half-sheet" color="#F1F1F1">
        <div class="title flex justify-end text-2xl font-bold py-4">
          <h1 class="flex-grow text-center">Mi perfil</h1>
          <button
              @click="signOut"
              class="block px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-700 rounded"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-1"
          >
            <v-icon dark left color="white"> mdi-logout</v-icon>
            Cerrar sesion
          </button>
        </div>
        <v-divider
            :thickness="2"
            class="border-black border-opacity-50 my-4"
        ></v-divider>
        <div class="InfoCont">
          <br/>
          <v-form
              class="space-y-4 margin"
              v-model="validUpdateUser"
              ref="formUpdateUser"
              @submit.prevent="updateUser"
          >
            <v-text-field
                class="value"
                v-model="usuario.nombres"
                outlined
                dense
                label="Nombres"
                required
                :rules="[
                (v) => !!v || 'Nombre es requerido',
                (v) => /^[a-zA-Z ]+$/.test(v) || 'Nombre no es válido',
              ]"
            ></v-text-field>
            <v-divider
                :thickness="7"
                color="black"
                class="border-opacity-75"
            ></v-divider>
            <v-text-field
                class="value"
                v-model="usuario.primerApellido"
                outlined
                dense
                label="Primer apellido"
                required
                :rules="[
                (v) => !!v || 'Primer apellido es requerido',
                (v) => /^[a-zA-Z ]+$/.test(v) || 'Apellido no es válido',
              ]"
            ></v-text-field>
            <v-divider
                :thickness="7"
                color="black"
                class="border-opacity-75"
            ></v-divider>
            <v-text-field
                class="value"
                v-model="usuario.segundoApellido"
                outlined
                dense
                label="Segundo apellido"
                required
                :rules="[
                (v) => !!v || 'Segundo apellido es requerido',
                (v) => /^[a-zA-Z ]+$/.test(v) || 'Apellido no es válido',
              ]"
            ></v-text-field>
            <v-divider
                :thickness="7"
                color="black"
                class="border-opacity-75"
            ></v-divider>
            <v-text-field
                class="value"
                v-model="usuario.telefono"
                outlined
                dense
                label="Teléfono"
                required
                :rules="[
                (v) => !!v || 'Teléfono es requerido',
                (v) => /^[0-9]{10}$/.test(v) || 'Teléfono no es válido',
              ]"
            ></v-text-field>
            <v-divider
                :thickness="7"
                color="black"
                class="border-opacity-75"
            ></v-divider>
            <div class="actions">
              <v-btn icon color="blue" type="submit">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </div>
          </v-form>
        </div>
      </v-sheet>
      <v-sheet :elevation="5" border rounded class="half-sheet" color="#F1F1F1">
        <div class="title">
          <h1>Mis direcciones</h1>
          <v-divider
              :thickness="7"
              color="black"
              class="border-opacity-75"
          ></v-divider>
        </div>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="green" dark v-bind="attrs" v-on="on">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="text-h5">Nueva Dirección</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                        label="Nombre de la calle"
                        outlined
                        dense
                        required
                        v-model="nuevaDireccion.calle"
                        :rules="[
                        (v) => !!v || 'Nombre de la calle es requerido',
                        (v) =>
                          /^[a-zA-Z0-9 ]+$/.test(v) ||
                          'Nombre de la calle no es válido',
                      ]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                        label="Nombre de la colonia"
                        outlined
                        dense
                        required
                        v-model="nuevaDireccion.colonia"
                        :rules="[
                        (v) => !!v || 'Nombre de la colonia es requerido',
                        (v) =>
                          /^[a-zA-Z0-9 ]+$/.test(v) ||
                          'Nombre de la colonia no es válido',
                      ]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                        label="Número de casa"
                        outlined
                        dense
                        required
                        v-model="nuevaDireccion.numero"
                        :rules="[(v) => !!v || 'Número de casa es requerido']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                        label="Municipio"
                        outlined
                        dense
                        required
                        v-model="nuevaDireccion.municipio"
                        :rules="[
                        (v) => !!v || 'Municipio es requerido',
                        (v) =>
                          /^[a-zA-Z ]+$/.test(v) || 'Municipio no es válido',
                      ]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                        label="Estado"
                        outlined
                        dense
                        required
                        v-model="nuevaDireccion.estado"
                        :rules="[
                        (v) => !!v || 'Estado es requerido',
                        (v) => /^[a-zA-Z ]+$/.test(v) || 'Estado no es válido',
                      ]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                        label="Código postal"
                        outlined
                        dense
                        required
                        v-model="nuevaDireccion.codigoPostal"
                        :rules="[
                        (v) => !!v || 'Código postal es requerido',
                        (v) =>
                          /^[0-9]{5}$/.test(v) || 'Código postal no es válido',
                      ]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                        label="Referencia"
                        outlined
                        dense
                        required
                        v-model="nuevaDireccion.referencias"
                        :rules="[
                        (v) => !!v || 'Referencia es requerida',
                        (v) =>
                          /^[a-zA-Z0-9 ]+$/.test(v) ||
                          'Referencia no es válida',
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="dialog = false"> Cancelar</v-btn>
              <v-btn
                  color="green"
                  text
                  @click="(dialog = false), addDireccion(nuevaDireccion)"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <div class="InfoCont">
          <v-expansion-panels :value="0">
            <v-expansion-panel
                v-for="(address, index) in direcciones"
                :key="index"
            >
              <v-expansion-panel-header
              >Calle: {{ address.calle }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <h1>Dirección número {{ index + 1 }}:</h1>
                <v-divider
                    :thickness="7"
                    color="black"
                    class="border-opacity-75"
                ></v-divider>
                <v-text-field
                    class="value"
                    v-model="address.calle"
                    label="Nombre de la calle"
                    outlined
                    dense
                    required
                    :rules="[
                    (v) => !!v || 'Nombre de la calle es requerido',
                    (v) =>
                      /^[a-zA-Z0-9 ]+$/.test(v) ||
                      'Nombre de la calle no es válido',
                  ]"
                ></v-text-field>
                <v-divider
                    :thickness="7"
                    color="black"
                    class="border-opacity-75"
                ></v-divider>
                <v-text-field
                    class="value"
                    v-model="address.colonia"
                    outlined
                    dense
                    label="Nombre de la colonia"
                    required
                    :rules="[
                    (v) => !!v || 'Nombre de la colonia es requerido',
                    (v) =>
                      /^[a-zA-Z0-9 ]+$/.test(v) ||
                      'Nombre de la colonia no es válido',
                  ]"
                ></v-text-field>
                <v-divider
                    :thickness="7"
                    color="black"
                    class="border-opacity-75"
                ></v-divider>
                <v-text-field
                    class="value"
                    v-model="address.numero"
                    outlined
                    label="Número de casa"
                    dense
                    required
                    :rules="[(v) => !!v || 'Número de casa es requerido']"
                ></v-text-field>
                <v-divider
                    :thickness="7"
                    color="black"
                    class="border-opacity-75"
                ></v-divider>
                <v-text-field
                    class="value"
                    v-model="address.municipio"
                    outlined
                    dense
                    label="Municipio"
                    required
                    :rules="[
                    (v) => !!v || 'Municipio es requerido',
                    (v) => /^[a-zA-Z ]+$/.test(v) || 'Municipio no es válido',
                  ]"
                ></v-text-field>
                <v-divider
                    :thickness="7"
                    color="black"
                    class="border-opacity-75"
                ></v-divider>
                <v-text-field
                    class="value"
                    v-model="address.estado"
                    outlined
                    dense
                    label="Estado"
                    required
                    :rules="[
                    (v) => !!v || 'Estado es requerido',
                    (v) => /^[a-zA-Z ]+$/.test(v) || 'Estado no es válido',
                  ]"
                ></v-text-field>
                <v-divider
                    :thickness="7"
                    color="black"
                    class="border-opacity-75"
                ></v-divider>
                <v-text-field
                    class="value"
                    v-model="address.codigoPostal"
                    outlined
                    dense
                    label="Código postal"
                    required
                    :rules="[
                    (v) => !!v || 'Código postal es requerido',
                    (v) => /^[0-9]{5}$/.test(v) || 'Código postal no es válido',
                  ]"
                ></v-text-field>
                <v-divider
                    :thickness="7"
                    color="black"
                    class="border-opacity-75"
                ></v-divider>
                <v-text-field
                    class="value"
                    v-model="address.referencias"
                    outlined
                    label="Referencia"
                    dense
                    required
                    :rules="[
                    (v) => !!v || 'Referencia es requerida',
                    (v) =>
                      /^[a-zA-Z0-9 ]+$/.test(v) || 'Referencia no es válida',
                  ]"
                ></v-text-field>
                <v-divider
                    :thickness="7"
                    color="black"
                    class="border-opacity-75"
                ></v-divider>
                <div class="actions">
                  <v-btn
                      icon
                      color="red"
                      @click="deleteDireccion(address.idDireccion)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  <v-btn icon color="blue" @click="updateDireccion(address)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-sheet>
      <v-sheet :elevation="5" border rounded class="half-sheet" color="#F1F1F1">
        <div class="title">
          <h1>Mis eventos</h1>
          <v-divider
              :thickness="7"
              color="black"
              class="border-opacity-75"
          ></v-divider>
        </div>
        <div class="InfoCont">
          <v-expansion-panels :value="0">
            <v-expansion-panel v-for="(evento, index) in eventos" :key="index">
              <v-expansion-panel-header
                  @click="loadServiciosEvento(evento.idEvento)"
              >
                {{ formatDateTime(evento.fechaHoraFin) }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <h1>Evento número {{ index + 1 }}:</h1>
                <v-divider
                    :thickness="7"
                    color="black"
                    class="border-opacity-75"
                ></v-divider>
                <span class="value">
                  <v-icon>mdi-clock-outline</v-icon>
                  Fecha y hora de inicio:
                  {{ formatDateTime(evento.fechaHoraInicio) }}
                </span>
                <v-divider
                    :thickness="7"
                    color="black"
                    class="border-opacity-75"
                ></v-divider>
                <span class="value">
                  <v-icon>mdi-clock-end</v-icon>
                  Fecha y hora de fin: {{ formatDateTime(evento.fechaHoraFin) }}
                </span>
                <v-divider
                    :thickness="7"
                    color="black"
                    class="border-opacity-75"
                ></v-divider>
                <span class="value">
                  <v-icon>mdi-currency-usd</v-icon>
                  Costo total: {{ evento.costoTotal.toFixed(2) }}
                </span>
                <v-divider
                    :thickness="7"
                    color="black"
                    class="border-opacity-75"
                ></v-divider>
                <span class="value">
                  <v-icon>mdi-account-group</v-icon>
                  Invitados: {{ evento.numeroPersonas }}
                </span>
                <v-divider
                    :thickness="7"
                    color="black"
                    class="border-opacity-75"
                ></v-divider>
                <span class="value">
                  <v-icon>mdi-clock-end</v-icon>
                  Estado: {{ evento.estado }}
                </span>
                <v-divider
                    :thickness="7"
                    color="black"
                    class="border-opacity-75"
                ></v-divider>
                <span class="value">
                  <v-icon>mdi-map-marker</v-icon>
                  Dirección:
                  <span>
                    Calle: {{ evento.direccion.calle }}, Col:
                    {{ evento.direccion.colonia }}, No°:
                    {{ evento.direccion.numero }}, CP:
                    {{ evento.direccion.codigoPostal }}, Municipio:
                    {{ evento.direccion.municipio }}, Estado:
                    {{ evento.direccion.estado }}
                  </span>
                </span>
                <span class="value">
                  Referencias: {{ evento.direccion.referencias }}
                </span>
                <v-divider
                    :thickness="7"
                    color="black"
                    class="border-opacity-75"
                ></v-divider>
                <h1>Servicios del evento:</h1>
                <v-divider
                    :thickness="7"
                    color="black"
                    class="border-opacity-75"
                ></v-divider>
                <v-expansion-panels :value="0">
                  <v-expansion-panel
                      v-for="(servicio, index) in evento.servicios"
                      :key="index"
                  >
                    <v-expansion-panel-header>
                      {{ servicio.servicio.nombre }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div class="flex justify-center items-center">
                        <img
                            :src="servicio.servicio.imagen"
                            alt="Servicio"
                            class="w-1/2"
                        />
                      </div>
                      <p><v-icon small class="mr-2">mdi-cube-outline</v-icon> Cantidad: {{ servicio.cantidad }}</p>
                      <p><v-icon small class="mr-2">mdi-information-outline</v-icon> Descripción: {{ servicio.servicio.descripcion }}</p>
                      <p><v-icon small class="mr-2">mdi-cash</v-icon> Precio: {{ servicio.servicio.precio.toFixed(2) }}</p>
                      <p><v-icon small class="mr-2">mdi-tag-outline</v-icon> Precio con descuento: {{ servicio.servicio.precioDescuento }}</p>
                      <p><v-icon small class="mr-2">mdi-archive-outline</v-icon> Existencias: {{ servicio.servicio.existencias }}</p>
                      <p><v-icon small class="mr-2">mdi-folder-outline</v-icon> Categoría: {{ servicio.servicio.categoria.nombre }}</p>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>

                <h1>Personal del evento:</h1>
                <v-divider
                    :thickness="7"
                    color="black"
                    class="border-opacity-75"
                ></v-divider>
                <v-expansion-panels :value="0">
                  <v-expansion-panel
                      v-for="(personal, index) in evento.personal"
                      :key="index"
                  >
                    <v-expansion-panel-header>
                      {{ personal.personal.usuarios.nombres }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <p><v-icon small class="mr-2">mdi-account-outline</v-icon> Nombre: {{ personal.personal.usuarios.nombres }} {{ personal.personal.usuarios.primerApellido }} {{ personal.personal.usuarios.segundoApellido }}</p>
                      <p><v-icon small class="mr-2">mdi-account-outline</v-icon> Teléfono: {{ personal.personal.usuarios.telefono }}</p>
                      <p><v-icon small class="mr-2">mdi-account-outline</v-icon> Correo: {{ personal.personal.usuarios.correo }}</p>
                      <p><v-icon small class="mr-2">mdi-account-outline</v-icon> Cargo: {{ personal.personal.categoria.nombre }}</p>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-sheet>
    </div>

    <footer class="footer">
      <p>
        Tus datos en Foodster son completamente privados y seguros. Respetamos
        tu privacidad en todo momento.
      </p>
      <p>© 2024 Foodster. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script>
import {useAuthStore} from "@/stores";
import UsersServices from "@/services/UsersServices";
import DireccionesService from "@/services/DireccionesService";
import {
  getEventosByUsuario,
} from "@/services/EventosServices";
import ServicioEventoService from "@/services/ServicioEventoService";
import moment from "moment";
import PersonalServices from "@/services/PersonalServices";

export default {
  data() {
    return {
      validUpdateUser: true,
      validUpdateDireccion: true,
      dialog: false,
      usuario: {},
      direcciones: [],
      eventos: [],
      loading: false,
      servicios: [],
      nuevaDireccion: {
        calle: "", //
        colonia: "", //
        numero: "", //
        municipio: "",
        estado: "",
        codigoPostal: "",
        referencias: "", ///
      },
    };
  },
  methods: {
    formatDateTime(dateTimeString) {
      return moment
          .utc(dateTimeString, "YYYY-MM-DD HH:mm:ss")
          .format("YYYY-MM-DD HH:mm:ss");
    },

    signOut() {
      this.loading = true;
      const authStore = useAuthStore();
      authStore.logout();
      this.loading = false;
    },
    async getUserAndDirecciones() {
      this.loading = true;
      this.usuario = await UsersServices.getMyUser();
      this.direcciones = await DireccionesService.getMyDirecciones();
      await this.getMisEventos();
      this.loading = false;
    },
    async updateUser() {
      if (this.$refs.formUpdateUser.validate()) {
        this.loading = true;
        await UsersServices.update(this.usuario);
        await this.getUserAndDirecciones();
        this.loading = false;
      }
    },
    async updateDireccion(direccion) {
      this.loading = true;
      await DireccionesService.updateDireccion(direccion);
      await this.getUserAndDirecciones();
      this.loading = false;
    },
    async deleteDireccion(id) {
      this.loading = true;
      await DireccionesService.deleteDireccion(id);
      await this.getUserAndDirecciones();
      this.loading = false;
    },

    async addDireccion(direccion) {
      this.loading = true;
      const authStore = useAuthStore();
      direccion.idUsuario = authStore.user.usuarios.idUsuario;
      await DireccionesService.createDireccion(direccion);
      this.getUserAndDirecciones();
      this.loading = false;
    },

    async getMisEventos() {
      this.loading = true;
      try {
        const eventos = await getEventosByUsuario();
        for (const evento of eventos) {
          evento.servicios = await ServicioEventoService.getServiciosEventoByEvento(evento.idEvento);
          evento.personal = await PersonalServices.getPersonalEvento(evento.idEvento);
          console.log(evento.personal);
          console.log(evento.servicios);
        }

        // Asignar los eventos actualizados con los servicios al data binding
        this.eventos = eventos;
      } catch (error) {
        console.error("Error al obtener eventos:", error);
      } finally {
        this.loading = false;
      }
    },
  },

  watch: {
    dialog(val) {
      if (!val) {
        this.nuevaDireccion = {
          calle: "",
          colonia: "",
          numero: "",
          municipio: "",
          estado: "",
          codigoPostal: "",
          referencias: "",
        };
      }
    },
  },

  mounted() {
    this.getUserAndDirecciones();
  },
};
</script>

<style>
.v-sheet-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
}

.half-sheet {
  padding: 20px;
  width: 85%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
}

.footer {
  margin-top: 20px;
  padding: 10px;
  text-align: center;
}

.InfoCont {
  align-items: center;
  margin-top: 5vh;
  width: 70%;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
  "Lucida Sans", Arial, sans-serif;
}

.label {
  width: 300px;
  display: inline-block;
  vertical-align: top;
  font-weight: bold;
  color: #121212;
  font-size: 1.2em;
  margin-top: 10px;
  margin-left: 10px;
}

.value {
  width: 95%;
  display: inline-block;
  vertical-align: top;
  color: #424242;
  font-size: 1.2em;
  margin-top: 10px;
  margin-left: 10px;
}

.title {
  width: 100%;
  align-items: center;
  color: #000000;
  margin-bottom: 10px;
}

.v-divider {
  opacity: 0.1;
  margin-bottom: 10px;
}

.actions {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .v-sheet-container {
    flex-direction: column;
  }

  .half-sheet {
    width: 90%;
    height: auto;
    margin-bottom: 20px;
  }
}

/* END: Custom Styles */
</style>

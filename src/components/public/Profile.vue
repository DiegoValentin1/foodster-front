<template>
  <div>

    <div class="v-sheet-container">
      <v-sheet :elevation="2" border rounded class="half-sheet">
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
          <v-avatar size="150">
            <v-img
                alt="John"
                src="https://cdn-icons-png.flaticon.com/512/1946/1946392.png"
            ></v-img>
          </v-avatar>
          <br/>
          <v-form class="space-y-4" v-model="validUpdateUser" ref="formUpdateUser" @submit.prevent="updateUser">
            <div class="pair-container">
              <p class="label">Nombre:</p>
              <v-text-field
                  class="value"
                  v-model="usuario.nombres"
                  outlined
                  dense
                  required
                  :rules="[
                  (v) => !!v || 'Nombre es requerido',
                  (v) => /^[a-zA-Z ]+$/.test(v) || 'Nombre no es válido',
                ]"
              ></v-text-field>
            </div>
            <v-divider
                :thickness="7"
                color="black"
                class="border-opacity-75"
            ></v-divider>
            <div class="pair-container">
              <p class="label">Primer apellido:</p>
              <v-text-field
                  class="value"
                  v-model="usuario.primerApellido"
                  outlined
                  dense
                  required
                  :rules="[
                  (v) => !!v || 'Primer apellido es requerido',
                  (v) => /^[a-zA-Z ]+$/.test(v) || 'Apellido no es válido',
                ]"
              ></v-text-field>
            </div>
            <v-divider
                :thickness="7"
                color="black"
                class="border-opacity-75"
            ></v-divider>
            <div class="pair-container">
              <p class="label">Segundo apellido:</p>
              <v-text-field
                  class="value"
                  v-model="usuario.segundoApellido"
                  outlined
                  dense
                  required
                  :rules="[
                  (v) => !!v || 'Segundo apellido es requerido',
                  (v) => /^[a-zA-Z ]+$/.test(v) || 'Apellido no es válido',
                ]"
              ></v-text-field>
            </div>
            <v-divider
                :thickness="7"
                color="black"
                class="border-opacity-75"
            ></v-divider>
            <div class="pair-container">
              <p class="label">Teléfono:</p>
              <v-text-field
                  class="value"
                  v-model="usuario.telefono"
                  outlined
                  dense
                  required
                  :rules="[
                  (v) => !!v || 'Teléfono es requerido',
                  (v) => /^[0-9]{10}$/.test(v) || 'Teléfono no es válido',
                ]"
              ></v-text-field>
            </div>
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

export default {
  data() {
    return {
      validUpdateUser: true,
      validUpdateDireccion: true,
      dialog: false,
      usuario: {},
      loading: false,

    };
  },
  methods: {
    validateEmail(email) {
      // Expresión regular para validar el correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    signOut() {
      this.loading = true;
      const authStore = useAuthStore();
      authStore.logout();
      this.loading = false;
    },
    async getUser() {
      this.loading = true;
      const authStore = useAuthStore();
      const idUsuario = authStore.user.usuarios.idUsuario;
      this.usuario = await UsersServices.getUser(idUsuario);
      this.loading = false;
    },
    async updateUser() {
      if (this.$refs.formUpdateUser.validate()) {
        this.loading = true;
        await UsersServices.update(this.usuario);
        await this.getUser();
        this.loading = false;
      }
    },
    async updateDireccion(direccion) {
      this.loading = true;
      await DireccionesService.updateDireccion(direccion);
      await this.getUser();
      this.loading = false;
    },
    async deleteDireccion(id) {
      this.loading = true;
      await DireccionesService.deleteDireccion(id);
      await this.getUser();
      this.loading = false;
    },

    async addDireccion(direccion) {
      this.loading = true;
      const authStore = useAuthStore();
      direccion.idUsuario = authStore.user.usuarios.idUsuario;
      await DireccionesService.createDireccion(direccion);
      this.getUser();
      this.loading = false;
    },
  },


  mounted() {
    this.getUser();
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

.pair-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start; /* Ajusta la alineación vertical según sea necesario */
  margin-top: 10px;
}

.value {
  width: auto;
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

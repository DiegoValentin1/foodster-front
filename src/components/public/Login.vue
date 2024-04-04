<template>
  <div class="flex h-screen">
    <div class="hidden lg:flex w-1/2 items-center justify-center bg-fdoscuro text-fdoscuro">

      <div class="max-w-md text-center">
        <img class="fixed left-[7%] top-[15%] logo" src="../../assets/images/logorealista.png" alt="" srcset="" />
        <section class="rotate left-[7%] top-[15%]">
          <svg viewBox="0 0 100 100" class="">
            <path id="circlePath" fill="none" stroke-width="5" stroke="none" d="
          M 10, 50
          a 40,40 0 1,1 80,0
          a 40,40 0 1,1 -80,0
        " />
            <text stroke="black" stroke-width="0.45" id="text" font-family="monospace" font-size="12.7"
              font-weight="bolder" fill="#e2e2e2">
              <textPath id="textPath" href="#circlePath">
                🍱 Foodster 🍚 Foodster 🥗 Foodster
              </textPath>
            </text>
          </svg>
        </section>
      </div>
    </div>
    <!-- Right Pane -->
    <div class="w-full bg-gray-200 lg:w-1/2 flex items-center justify-center">

      <div class="max-w-md w-full p-6">
        <h1 class="text-3xl font-bold mb-6 text-black text-center lg:hidden">
          Foodster
        </h1>
        <h2 class="text-3xl font-semibold mb-6 text-black text-center sm:text-2xl lg:text-3xl">
          Inicia sesión
        </h2>
        <h1 class="text-sm font-semibold mb-6 text-gray-500 text-center">
          Bienvenido a Foodster, inicia sesión para continuar
        </h1>
        <form class="space-y-4" @submit.prevent="onSubmit">
          <div>
            <v-text-field for="email" id="correo" name="correo" v-model="correo" :rules="emailRules"
              label="Correo electonico" required></v-text-field>

          </div>

          <div>
            <v-text-field v-model="contrasenia" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
              label="Contraseña" hint="La contraseña es requerida" counter
              @click:append="show1 = !show1"></v-text-field>

          </div>
          <div>
            <button type="submit"
              class="w-full bg-fdoscuro text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">
              Iniciar Sesión
            </button>
          </div>
        </form>
        <div class="mt-4 text-sm text-gray-600 text-center">
          <p>
            ¿Aun no eres parte de Foodster?
            <a href="/registrarse" class="text-black hover:underline">Registrate Aqui..!</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores";

export default {

  data() {
    return {
      correo: '',
      contrasenia: '',

      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'El correo electronico es necesario',
      ],
      show1: false,

      password: 'Password',
      rules: {
        required: value => !!value || 'la contraseña es requerida',
        emailMatch: () => (`The email and password you entered don't match`),
      },
    };
  },
  methods: {
    onSubmit() {
      const authStore = useAuthStore();
      return authStore.login(this.correo, this.contrasenia);

    },
  },

  mounted() {
  },
};
</script>

<style scoped>
.rotate {
  position: fixed;
  width: 30rem;
  animation: spin 50s linear infinite;
  padding: 20px;
}

.logo {
  height: 30rem;
  width: 30rem;
}


@keyframes spin {
  0% {
    transform: rotate(0deg);
    /* Rotación inicial */
  }

  100% {
    transform: rotate(360deg);
    /* Rotación completa */
  }
}
</style>
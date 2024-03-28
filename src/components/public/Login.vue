<template>
  <div class="flex h-screen">
    <!-- Left Pane -->
    <div class="hidden lg:flex w-1/2 items-center justify-center bg-fdoscuro text-fdoscuro"
    >
      <!-- <div
        id="glowcircle"
        class="absolute w-[300px] h-[400px] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 rounded-[100%] fixed z-10 left-[20%] translate-x-[-40%] translate-y-[0%] blur-[100px]"
      ></div> -->
      <div class="max-w-md text-center">
        <img
            class="fixed left-[7%] top-[15%] logo"
            src="../../assets/images/logorealista.png"
            alt=""
            srcset=""
        />
        <section class="rotate left-[7%] top-[15%]">
          <svg viewBox="0 0 100 100" class="">
            <path
                id="circlePath"
                fill="none"
                stroke-width="5"
                stroke="none"
                d="
          M 10, 50
          a 40,40 0 1,1 80,0
          a 40,40 0 1,1 -80,0
        "
            />
            <text
                stroke="black"
                stroke-width="0.45"
                id="text"
                font-family="monospace"
                font-size="12.7"
                font-weight="bolder"
                fill="#e2e2e2"
            >
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
          Registrate
        </h2>
        <h1 class="text-sm font-semibold mb-6 text-gray-500 text-center">
          Unete a la comunidad Foodster
        </h1>
        <ValidationObserver v-slot="{ invalid }" ref="observer">
          <form class="space-y-4" @submit.prevent="onSubmit">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700"
              >Correo</label
              >
              <ValidationProvider rules="required|email" v-slot="{ errors }" name="Correo">
                <input
                    :class="{ 'border-red-500': errors[0] }"
                    type="text"
                    id="correo"
                    name="correo"
                    v-model="correo"
                    class="mt-1 p-2 w-full bg-gray-100 border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
                <div v-if="errors[0]" class="text-red-500 text-sm">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
            </div>

            <div>
              <label
                  for="password"
                  class="block text-sm font-medium text-gray-700"
              >Contraseña</label
              >
              <validation-provider rules="required" v-slot="{ errors }" name="Contraseña">
                <input
                    :class="{ 'border-red-500': errors[0] }"
                    type="password"
                    id="contrasenia"
                    name="contrasenia"
                    v-model="contrasenia"
                    class="mt-1 p-2 w-full bg-gray-100 border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
                <div v-if="errors[0]" class="text-red-500 text-sm">
                  {{ errors[0] }}
                </div>
              </validation-provider>

            </div>
            <div>
              <button
                  type="submit"
                  class="w-full bg-fdoscuro text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Registrate
              </button>
            </div>
          </form>
        </ValidationObserver>
        <div class="mt-4 text-sm text-gray-600 text-center">
          <p>
            Ya eres parte de Foodster?
            <a href="#" class="text-black hover:underline">Inicia sesión</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {extend, ValidationObserver, ValidationProvider,} from 'vee-validate';
import {useAuthStore} from "@/stores";

extend('email', {
  validate: value => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  },
  message: 'Correo no válido',
});

extend('required', {
  validate: value => {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1,
    };
  },
  computesRequired: true,
  message: 'Campo requerido',
});

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      correo: '',
      contrasenia: '',
    };
  },
  methods: {
    onSubmit() {
      this.$refs.observer.validate().then(valid => {
        if (!valid) {
          return;
        }
        const authStore = useAuthStore();
        return authStore.login(this.correo, this.contrasenia)
      });
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
    transform: rotate(0deg); /* Rotación inicial */
  }
  100% {
    transform: rotate(360deg); /* Rotación completa */
  }
}
</style>
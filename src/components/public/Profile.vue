<template>
  <div>
    <div class="v-sheet-container">
      <v-sheet
        :elevation="10"
        border
        rounded
        class="half-sheet"
        color="#141518"
      >
        <div class="title">
          <h1>Mi perfil</h1>
          <v-divider :thickness="20" color="white"></v-divider>
        </div>
        <v-avatar size="150">
          <v-img
            alt="John"
            src="https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg"
          ></v-img>
        </v-avatar>
        <div class="InfoCont">
          <p class="label">Nombres:</p>
          <input class="value" v-model="personalDetails.nombres" />
          <v-divider
            :thickness="7"
            color="white"
            class="border-opacity-75"
          ></v-divider>
          <p class="label">Primer apellido:</p>
          <input class="value" v-model="personalDetails.primer_apellido" />
          <v-divider
            :thickness="7"
            color="white"
            class="border-opacity-75"
          ></v-divider>
          <p class="label">Segundo apellido:</p>
          <input class="value" v-model="personalDetails.segundo_apellido" />
          <v-divider
            :thickness="7"
            color="white"
            class="border-opacity-75"
          ></v-divider>
          <p class="label">Teléfono:</p>
          <input class="value" v-model="personalDetails.telefono" />
          <v-divider
            :thickness="7"
            color="white"
            class="border-opacity-75"
          ></v-divider>
          <p class="label">Correo:</p>
          <input class="value" v-model="personalDetails.correo" />
          <v-divider
            :thickness="7"
            color="white"
            class="border-opacity-75"
          ></v-divider>
          <p class="label">Última modificación:</p>
          <p class="value">{{ personalDetails.ultima_modf }}</p>
          <v-divider
            :thickness="7"
            color="white"
            class="border-opacity-75"
          ></v-divider>
          <p class="label">Activo:</p>
          <p class="value">{{ personalDetails.active }}</p>
          <v-divider
            :thickness="7"
            color="white"
            class="border-opacity-75"
          ></v-divider>
        </div>
        <v-btn icon color="green">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-sheet>
      <v-sheet
        :elevation="10"
        border
        rounded
        class="half-sheet"
        color="#141518"
      >
        <div class="title">
          <h1>Mi dirección</h1>
          <v-divider
            :thickness="7"
            color="white"
            class="border-opacity-75"
          ></v-divider>
        </div>
        <div class="InfoCont">
          <p class="label">Nombre de la calle:</p>
          <input class="value" v-model="address.nombre_calle" />
          <v-divider
            :thickness="7"
            color="white"
            class="border-opacity-75"
          ></v-divider>
          <p class="label">Nombre de la colonia:</p>
          <input class="value" v-model="address.nombre_colomia" />
          <v-divider
            :thickness="7"
            color="white"
            class="border-opacity-75"
          ></v-divider>
          <p class="label">Número de casa:</p>
          <input class="value" v-model="address.numero_casa" />
          <v-divider
            :thickness="7"
            color="white"
            class="border-opacity-75"
          ></v-divider>
          <p class="label">Municipio:</p>
          <input class="value" v-model="address.municio" />
          <v-divider
            :thickness="7"
            color="white"
            class="border-opacity-75"
          ></v-divider>
          <p class="label">Estado:</p>
          <input class="value" v-model="address.estado" />
          <v-divider
            :thickness="7"
            color="white"
            class="border-opacity-75"
          ></v-divider>
          <p class="label">Código postal:</p>
          <input class="value" v-model="address.codigo_postal" />
          <v-divider
            :thickness="7"
            color="white"
            class="border-opacity-75"
          ></v-divider>
          <p class="label">Referencia:</p>
          <input class="value" v-model="address.referencia" />
          <v-divider
            :thickness="7"
            color="white"
            class="border-opacity-75"
          ></v-divider>

          <p class="label">Última modificación:</p>
          <p class="value">{{ address.ultima_modf }}</p>
          <v-divider
            :thickness="7"
            color="white"
            class="border-opacity-75"
          ></v-divider>
          <p class="label">Activo:</p>
          <p class="value">{{ address.active }}</p>
          <v-divider
            :thickness="7"
            color="white"
            class="border-opacity-75"
          ></v-divider>
        </div>
        <v-btn icon color="green">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
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
export default {
  data() {
    return {
      personalDetails: {
        nombres: "John Doe",
        primer_apellido: "Dunder",
        segundo_apellido: "Mifflin",
        telefono: "777256952",
        correo: "john@gmail.com",
        ultima_modf: "2024-01-01",
        active: true,
        // Agrega más campos según sea necesario
      },
      address: {
        nombre_calle: "Calle 123",
        nombre_colomia: "Colonia 456",
        numero_casa: "123",
        municio: "xochitepec",
        estado: "Morelos",
        codigo_postal: "62790",
        referencia:
          "Cerca de la tienda llamada 'La esquina' y que es color verde. ademas de que tiene un letrero que dice 'La esquina'",
        ultima_modf: "2024-01-01",
        active: true,
      },
    };
  },
};
</script>

<style>
.v-sheet-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
}

.half-sheet {
  padding: 20px;
  width: 45%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer {
  margin-top: 20px;
  padding: 10px;
  text-align: center;
}
.InfoCont {
  margin-top: 5vh;
  width: 95%;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
.label {
  width: 200px;
  display: inline-block;
  vertical-align: top;
  font-weight: bold;
  color: #ffffff;
}

.value {
  width: 350px;
  display: inline-block;
  vertical-align: top;
  color: #b5b5b5;
}
.title {
  width: 100%;
  align-items: center;
  color: #ffffff;
  margin-bottom: 10px;
}

/* BEGIN: Custom Styles */
.v-divider {
  opacity: 0.5;
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

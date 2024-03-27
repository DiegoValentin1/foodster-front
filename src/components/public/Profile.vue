<template>
  <div>
    <div class="v-sheet-container">
      <v-sheet :elevation="2" border rounded class="half-sheet" color="#F1F1F1">
        <div class="title">
          <h1>Mi perfil</h1>
          <v-divider :thickness="2" color="black"></v-divider>
        </div>
        <div class="InfoCont">
          <v-avatar size="150">
            <v-img
              alt="John"
              src="https://cdn-icons-png.flaticon.com/512/1946/1946392.png"
            ></v-img>
          </v-avatar>
          <br />
          <p class="label">Nombres:</p>
          <input class="value" v-model="personalDetails.nombres" />
          <v-divider
            :thickness="7"
            color="black"
            class="border-opacity-75"
          ></v-divider>
          <p class="label">Primer apellido:</p>
          <input class="value" v-model="personalDetails.primer_apellido" />
          <v-divider
            :thickness="7"
            color="black"
            class="border-opacity-75"
          ></v-divider>
          <p class="label">Segundo apellido:</p>
          <input class="value" v-model="personalDetails.segundo_apellido" />
          <v-divider
            :thickness="7"
            color="black"
            class="border-opacity-75"
          ></v-divider>
          <p class="label">Teléfono:</p>
          <input class="value" v-model="personalDetails.telefono" />
          <v-divider
            :thickness="7"
            color="black"
            class="border-opacity-75"
          ></v-divider>
          <p class="label">Correo:</p>
          <input class="value" v-model="personalDetails.correo" />
          <v-divider
            :thickness="7"
            color="black"
            class="border-opacity-75"
          ></v-divider>
          <p class="label">Última modificación:</p>
          <p class="value">{{ personalDetails.ultima_modf }}</p>
          <v-divider
            :thickness="7"
            color="black"
            class="border-opacity-75"
          ></v-divider>
          <p class="label">Activo:</p>
          <p class="value">{{ personalDetails.active }}</p>
          <v-divider
            :thickness="7"
            color="black"
            class="border-opacity-75"
          ></v-divider>
        </div>
        <div class="actions">
          <v-btn icon color="blue">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
      </v-sheet>
      <v-sheet
        :elevation="10"
        border
        rounded
        class="half-sheet"
        color="#F1F1F1"
      >
        <div class="title">
          <h1>Mis direcciones</h1>
          <v-divider
            :thickness="7"
            color="black"
            class="border-opacity-75"
          ></v-divider>
        </div>
        <div class="InfoCont">
          <v-expansion-panels :value="0">
            <v-expansion-panel
              v-for="(address, index) in addresses"
              :key="index"
            >
              <v-expansion-panel-header>{{
                address.nombre_calle
              }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <h1>Dirección número {{ index + 1 }}:</h1>
                <p class="label">Nombre de la calle</p>
                <input class="value" v-model="address.nombre_calle" />
                <v-divider
                  :thickness="7"
                  color="black"
                  class="border-opacity-75"
                ></v-divider>
                <p class="label">Nombre de la colonia</p>
                <input class="value" v-model="address.nombre_colonia" />
                <v-divider
                  :thickness="7"
                  color="black"
                  class="border-opacity-75"
                ></v-divider>
                <p class="label">Número de casa</p>
                <input class="value" v-model="address.numero_casa" />
                <v-divider
                  :thickness="7"
                  color="black"
                  class="border-opacity-75"
                ></v-divider>
                <p class="label">Municipio</p>
                <input class="value" v-model="address.municipio" />
                <v-divider
                  :thickness="7"
                  color="black"
                  class="border-opacity-75"
                ></v-divider>
                <p class="label">Estado</p>
                <input class="value" v-model="address.estado" />
                <v-divider
                  :thickness="7"
                  color="black"
                  class="border-opacity-75"
                ></v-divider>
                <p class="label">Código postal</p>
                <input class="value" v-model="address.codigo_postal" />
                <v-divider
                  :thickness="7"
                  color="black"
                  class="border-opacity-75"
                ></v-divider>
                <p class="label">Referencia</p>
                <input class="value" v-model="address.referencia" />
                <v-divider
                  :thickness="7"
                  color="black"
                  class="border-opacity-75"
                ></v-divider>
                <p class="label">Última modificación</p>
                <p class="value">{{ address.ultima_modf }}</p>
                <v-divider
                  :thickness="7"
                  color="black"
                  class="border-opacity-75"
                ></v-divider>
                <p class="label">Activo</p>
                <p class="value">{{ address.active }}</p>
                <v-divider
                  :thickness="7"
                  color="black"
                  class="border-opacity-75"
                ></v-divider>
                <div class="actions">
                  <v-btn icon color="blue">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon color="red">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
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
      addresses: [
        {
          nombre_calle: "Calle 1",
          nombre_colonia: "Colonia 1",
          numero_casa: "1",
          municipio: "Municipio 1",
          estado: "Estado 1",
          codigo_postal: "11111",
          referencia: "Referencia 1",
          ultima_modf: "2024-01-01",
          active: true,
        },
        {
          nombre_calle: "Calle 2",
          nombre_colonia: "Colonia 2",
          numero_casa: "2",
          municipio: "Municipio 2",
          estado: "Estado 2",
          codigo_postal: "22222",
          referencia: "Referencia 2",
          ultima_modf: "2024-01-01",
          active: true,
        },
        {
          nombre_calle: "Calle 3",
          nombre_colonia: "Colonia 3",
          numero_casa: "3",
          municipio: "Municipio 3",
          estado: "Estado 3",
          codigo_postal: "33333",
          referencia: "Referencia 3",
          ultima_modf: "2024-01-01",
          active: true,
        },
      ],
    };
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
  width: 350px;
  display: inline-block;
  vertical-align: top;
  color: #2c2c2c;
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
  opacity: 0.2;
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

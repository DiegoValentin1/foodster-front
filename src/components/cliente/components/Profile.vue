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
          <div class="pair-container">
            <p class="label">Nombre:</p>
            <v-text-field
              class="value"
              v-model="personalDetails.nombres"
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
              v-model="personalDetails.primer_apellido"
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
              v-model="personalDetails.segundo_apellido"
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
              v-model="personalDetails.telefono"
              outlined
              dense
              required
              :rules="[
                (v) => !!v || 'Teléfono es requerido',
                (v) => /^[0-9]{9}$/.test(v) || 'Teléfono no es válido',
              ]"
            ></v-text-field>
          </div>
          <v-divider
            :thickness="7"
            color="black"
            class="border-opacity-75"
          ></v-divider>
          <div class="pair-container">
            <p class="label">Correo:</p>
            <v-text-field
              class="value"
              v-model="personalDetails.correo"
              outlined
              dense
              required
              :rules="[
                (v) => !!v || 'Correo es requerido',
                (v) => validateEmail(v) || 'Correo no es válido',
              ]"
            ></v-text-field>
          </div>
          <v-divider
            :thickness="7"
            color="black"
            class="border-opacity-75"
          ></v-divider>
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
                      :rules="[
                      (v) => !!v || 'Número de casa es requerido'
                    ]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="Municipio"
                      outlined
                      dense
                      required
                      :rules="[
                      (v) => !!v || 'Municipio es requerido',
                      (v) =>
                        /^[a-zA-Z ]+$/.test(v) ||
                        'Municipio no es válido',
                    ]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="Estado"
                      outlined
                      dense
                      required
                      :rules="[
                      (v) => !!v || 'Estado es requerido',
                      (v) =>
                        /^[a-zA-Z ]+$/.test(v) ||
                        'Estado no es válido',
                    ]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="Código postal"
                      outlined
                      dense
                      required
                      :rules="[
                      (v) => !!v || 'Código postal es requerido',
                      (v) =>
                        /^[0-9]{5}$/.test(v) ||
                        'Código postal no es válido',
                    ]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Referencia"
                      outlined
                      dense
                      required
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
              <v-btn color="red" text @click="dialog = false">
                Cancelar
              </v-btn>
              <v-btn color="green" text @click="dialog = false">
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
                <div class="pair-container">
                  <p class="label">Nombre de la calle:</p>
                  <v-text-field
                    class="value"
                    v-model="address.nombre_calle"
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
                </div>
                <v-divider
                  :thickness="7"
                  color="black"
                  class="border-opacity-75"
                ></v-divider>
                <div class="pair-container">
                  <p class="label">Nombre de la colonia:</p>
                  <v-text-field
                    class="value"
                    v-model="address.nombre_colonia"
                    outlined
                    dense
                    required
                    :rules="[
                      (v) => !!v || 'Nombre de la colonia es requerido',
                      (v) =>
                        /^[a-zA-Z0-9 ]+$/.test(v) ||
                        'Nombre de la colonia no es válido',
                    ]"
                  ></v-text-field>
                </div>
                <v-divider
                  :thickness="7"
                  color="black"
                  class="border-opacity-75"
                ></v-divider>
                <div class="pair-container">
                  <p class="label">Número de casa:</p>
                  <v-text-field
                    class="value"
                    v-model="address.numero_casa"
                    outlined
                    dense
                    required
                    :rules="[
                      (v) => !!v || 'Número de casa es requerido']"
                  ></v-text-field>
                </div>
                <v-divider
                  :thickness="7"
                  color="black"
                  class="border-opacity-75"
                ></v-divider>
                <div class="pair-container">
                  <p class="label">Municipio:</p>
                  <v-text-field
                    class="value"
                    v-model="address.municipio"
                    outlined
                    dense
                    required
                    :rules="[
                      (v) => !!v || 'Municipio es requerido',
                      (v) => /^[a-zA-Z ]+$/.test(v) || 'Municipio no es válido',
                    ]"
                  ></v-text-field>
                </div>
                <v-divider
                  :thickness="7"
                  color="black"
                  class="border-opacity-75"
                ></v-divider>
                <div class="pair-container">
                  <p class="label">Estado:</p>
                  <v-text-field
                    class="value"
                    v-model="address.estado"
                    outlined
                    dense
                    required
                    :rules="[
                      (v) => !!v || 'Estado es requerido',
                      (v) => /^[a-zA-Z ]+$/.test(v) || 'Estado no es válido',
                    ]"
                  ></v-text-field>
                </div>
                <v-divider
                  :thickness="7"
                  color="black"
                  class="border-opacity-75"
                ></v-divider>
                <div class="pair-container">
                  <p class="label">Código postal:</p>
                  <v-text-field
                    class="value"
                    v-model="address.codigo_postal"
                    outlined
                    dense
                    required
                    :rules="[
                      (v) => !!v || 'Código postal es requerido',
                      (v) =>
                        /^[0-9]{5}$/.test(v) || 'Código postal no es válido',
                    ]"
                  ></v-text-field>
                </div>
                <v-divider
                  :thickness="7"
                  color="black"
                  class="border-opacity-75"
                ></v-divider>
                <div class="pair-container">
                  <p class="label">Referencia:</p>
                  <v-text-field
                    class="value"
                    v-model="address.referencia"
                    outlined
                    dense
                    required
                    :rules="[
                      (v) => !!v || 'Referencia es requerida',
                      (v) =>
                        /^[a-zA-Z0-9 ]+$/.test(v) || 'Referencia no es válida',
                    ]"
                  ></v-text-field>
                </div>
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
      dialog: false,
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
        municipio: "xochitepec",
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
  methods: {
    validateEmail(email) {
      // Expresión regular para validar el correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
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

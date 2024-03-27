<template>
    <v-card
      :loading="loading"
      class="mx-auto my-4" 
      max-width="300"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
  
      <v-img
        height="150" 
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      ></v-img>
  
      <v-card-title class="text-h6">Cafe Badilico</v-card-title> <!-- Reduce el tamaño del título -->
      
      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="12" 
          ></v-rating>
  
          <div class="grey--text ms-2"> <!-- Reduce el espacio entre el rating y el texto -->
            4.5 (413)
          </div>
        </v-row>
  
        <div class="my-2 text-caption"> <!-- Reduce el tamaño del texto y el espacio entre elementos -->
          $ • Italian, Cafe
        </div>
  
        <div class="text-caption"> <!-- Reduce el tamaño del texto -->
          Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.
        </div>
      </v-card-text>
  
      <v-divider class="mx-2"></v-divider> <!-- Reduce el espacio entre la línea divisoria y los elementos -->
  
  
      <v-card-actions>
        <v-btn
          color="orange lighten-2"
          text
        >
          Explore
        </v-btn>
  
        <v-spacer></v-spacer>
  
        <v-btn
          icon
          @click="show = !show"
        >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>
  
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
      <v-card-title class="text-subtitle-2">Tonight's availability</v-card-title> <!-- Reduce el tamaño del título -->
            
          <v-card-text>
            <v-chip-group
              v-model="selection"
              active-class="deep-purple accent-4 white--text"
              column
            >
              <v-chip>5:30PM</v-chip>
      
              <v-chip>7:30PM</v-chip>
      
              <v-chip>8:00PM</v-chip>
      
              <v-chip>9:00PM</v-chip>
            </v-chip-group>
          </v-card-text>
      
        </div>
      </v-expand-transition>
  

     
      <v-card-actions>
        <v-btn
          color="deep-purple lighten-2"
          text
          @click="reserve"
        >
          Reserve
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    data: () => ({
      loading: false,
      selection: 1,
      show: false,
    }),
  
    methods: {
      reserve () {
        this.loading = true
  
        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
  </script>
  
<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
            flat
        >
          <v-btn
              class="me-4"
              color="grey-darken-2"
              variant="outlined"
              @click="setToday"
          >
            Hoy
          </v-btn>
          <v-btn
              color="grey-darken-2"
              size="small"
              variant="text"
              fab
              @click="prev"
          >
            <v-icon size="small">
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
              color="grey-darken-2"
              size="small"
              variant="text"
              fab
              @click="next"
          >
            <v-icon size="small">
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="calendar">
            {{ calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu location="bottom end">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="grey-darken-2"
                  variant="outlined"
                  v-bind="attrs"
                  v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon end>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Dia</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semana</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mes</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
            ref="calendar"
            v-model="focus"
            :events="eventos"
            :type="type"
            color="primary"
            @click:date="viewDay"
            @click:event="showEvent"
            @click:more="viewDay"
        ></v-calendar>
        <v-menu
            v-model="selectedOpen"
            :activator="selectedElement"
            :close-on-content-click="false"
            offset-x
        >
          <v-card
              color="grey-lighten-4"
              min-width="350px"
              flat
          >
            <v-toolbar
                :color="selectedEvent.color"
                dark
            >
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                  color="secondary"
                  variant="text"
                  @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import {onMounted, ref} from 'vue'

const calendar = ref()

const typeToLabel = {
  month: 'Mes',
  week: 'Semana',
  day: 'Dia',

}
const colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
const names = ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']

const focus = ref('')
const type = ref('month')
const selectedEvent = ref({})
const selectedElement = ref(null)
const selectedOpen = ref(false)
const events = ref([])

onMounted(() => {
  calendar.value.checkChange()
})

function viewDay({date}) {
  focus.value = date
  type.value = 'day'
}

function getEventColor(event) {
  return event.color
}

function setToday() {
  focus.value = ''
}

function prev() {
  calendar.value.prev()
}

function next() {
  calendar.value.next()
}

function showEvent({nativeEvent, event}) {
  const open = () => {
    selectedEvent.value = event
    selectedElement.value = nativeEvent.target
    requestAnimationFrame(() => requestAnimationFrame(() => selectedOpen.value = true))
  }
  if (selectedOpen.value) {
    selectedOpen.value = false
    requestAnimationFrame(() => requestAnimationFrame(() => open()))
  } else {
    open()
  }
  nativeEvent.stopPropagation()
}
</script>

<script>
import {getEventosByPersonalIdUsuario} from "@/services/EventosServices";
import {useAuthStore} from "@/stores";

export default {
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Mes',
      week: 'Semana',
      day: 'Dia',

    },
    personal: {},
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    eventos: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
  }),
  mounted() {
    this.$refs.calendar.checkChange()
    this.loadPersonal()
  },
  methods: {
    viewDay({date}) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({nativeEvent, event}) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    convertToEvents(json) {
      return json.map(evento => ({
        name: evento.usuario.nombres,
        start: new Date(evento.fechaHoraInicio),
        end: new Date(evento.fechaHoraFin),
        color: 'black',
        timed: true,
      }));
    },
    loadPersonal() {
      let user = useAuthStore().user
      this.personal = user.personal ? user.personal : {}
      if (Object.keys(this.personal).length === 0) {
        useAuthStore().logout()
      } else {
        console.log(this.personal)
        this.fetchEvents(this.personal.usuarios.idUsuario)
      }
    },

    async fetchEvents(idUsuario) {
      try {
        let response = await getEventosByPersonalIdUsuario(idUsuario)
        this.eventos = this.convertToEvents(response)
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
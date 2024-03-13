<template>
  <form @submit.prevent>
    <button @click="toggleCreateEvent" class="create_Event">
      <span class="button-icon">+</span>
      <span class="button-text">Event hinzufügen</span>
      <span class="button-underline"></span>
    </button>

    <div v-if="showCreateEvent || updateMode">
      <input v-model="description" type="text" class="eventText" placeholder="Beschreibung" />
      <div class="dateText">Startdatum:</div>
      <input v-model="startDate" type="date" class="eventText" />
      <div class="dateText">Enddatum:</div>
      <input v-model="endDate" type="date" class="eventText" />
      <input type="file" class="fileButton" @change="handleFileUpload" />
      <button v-if="!updateMode" @click="addEvent" class="event-create-button">Event erstellen</button>
      <button v-if="updateMode" @click="updateCurrentEvent" class="event-create-button">Event bearbeiten</button>
    </div>

    <div class="events-list">
      <div v-for="event in events" :key="event.id" class="event-item">
        <h3>{{ event.event_beschreibung }}</h3>
        <p>Startdatum: {{ event.event_startdatum }}</p>
        <p>Enddatum: {{ event.event_enddatum }}</p>
        <a :href="getPdfUrl(event.event_pdf)" target="_blank">PDF anzeigen</a>
        <button @click="updateEvent(event)" class="edit-event-button">Bearbeiten</button>
        <button @click="deleteEvent(event.id)" class="delete-event-button">Löschen</button>
      </div>
    </div>
  </form>
</template>

<script>
import authService from "./authService.js";
import axios from 'axios';

export default {
   // eslint-disable-next-line vue/multi-word-component-names
  name: "myEvents",
  data() {
    return {
      showCreateEvent: false,
      selectedPDF: null,
      startDate: "",
      endDate: "",
      userInfo: null,
      isAdmin: '',
      events: [],
      description: '',
      updateMode: false,
      eventIdToUpdate: null,
    };
  },
  async mounted() {
    await this.fetchEvents();
    this.checkUserRoles();
    
  },

  
  methods: {
    async checkUserRoles() {
      this.isAdmin = await authService.checkIfUserHasRole("EventCreator");
    },
    createEvent() {
      if (this.$route.meta.requiresAuth) {
        if (this.isAdmin) {
          this.showCreateEvent = true;
        } else {
          console.error("Benutzer hat nicht die erforderliche Rolle für Event-Erstellung");
        }
      } else {
        this.showCreateEvent = true;
      }
    },

    handleFileUpload(event) {
      this.selectedPdf = event.target.files[0];
    },
    async addEvent() {
      const formData = new FormData();
      formData.append('description', this.description);
      formData.append('startDate', this.startDate);
      formData.append('endDate', this.endDate);
      formData.append('pdf', this.selectedPdf);

      try {
        await axios.post('http://localhost:8080/api/events', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Event erfolgreich hinzugefügt!');
        this.resetForm();
        await this.fetchEvents();
      } catch (error) {
        console.error('Fehler beim Hinzufügen des Events:', error);
        alert('Fehler beim Hinzufügen des Events.');
      }
    },

    updateEvent(event) {
      // Setze die Felder des Formulars mit den aktuellen Event-Daten
      this.description = event.event_beschreibung;
      this.startDate = event.event_startdatum;
      this.endDate = event.event_enddatum;
      // Setze den Modus für das Hinzufügen eines neuen Events auf false
      this.updateMode = true;
      this.eventIdToUpdate = event.id;
      this.showCreateEvent = true;
    },

    async updateCurrentEvent() {
      // Logik zum Aktualisieren des aktuellen Events hier einfügen
      const formData = new FormData();
      formData.append('description', this.description);
      formData.append('startDate', this.startDate);
      formData.append('endDate', this.endDate);
      formData.append('pdf', this.selectedPdf);

      try {
        await axios.put(`http://localhost:8080/api/events/${this.eventIdToUpdate}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Event erfolgreich aktualisiert!');
        this.resetForm();
        this.updateMode = false; // Zurücksetzen auf den Erstellungsmodus
        await this.fetchEvents();
      } catch (error) {
        console.error('Fehler beim Aktualisieren des Events:', error);
        alert('Fehler beim Aktualisieren des Events.');
      }
    },
    
    async fetchEvents() {
      try {
        const response = await axios.get('http://localhost:8080/api/events');
        this.events = response.data;
      } catch (error) {
        console.error('Fehler beim Laden der Events:', error);
      }
    },
    resetForm() {
      this.description = '';
      this.startDate = '';
      this.endDate = '';
      this.selectedPdf = null;
    },
    getPdfUrl(pdfPath) {
  // Überprüfe, ob pdfPath null oder undefined ist
  if (!pdfPath) {
    // Gib einen leeren String oder einen Platzhalter-Pfad zurück, wenn kein PDF vorhanden ist
    return '';
  }
  // Entferne doppelte '/uploads/', falls vorhanden
  const normalizedPath = pdfPath.replace(/^uploads\/uploads\//, 'uploads/');
  return `http://localhost:8080/${normalizedPath}`;
},


    toggleCreateEvent() {
      this.showCreateEvent = !this.showCreateEvent;
    },
  },
    // Weitere Methoden...
};
</script>

<style scoped>
.button-icon {
  position: absolute;
  left: 0;
  color: #ffdb00;
  margin-right: 5px;
}
.fileButton {
  position: relative;
  z-index: 2;
  margin-top: 50px;
  margin-left: 550px;
  background-color: #ffdb00;
  border: none;
  color: #428f4a;
  height: 50px;
  width: 250px;
  font-size: 15px;
  border-radius: 10px;
  display: block;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  font-family: "Brandon Grotesque Black";

}

.button-text {
  padding-left: 20px;
}

.button-underline {
  position: absolute;
  height: 2px;
  background-color: #005851;
  transition: width 0.3s ease-in-out;
  bottom: 0;
  left: 0;
  width: 0;
  z-index: -1;
}

button {
  position: relative;
}

.eventText {
  position: relative;
  z-index: 3;
  margin-top: 230px;
  margin-left: 550px;
  background-color: #ffdb00;
  border: none;
  color: #428f4a;
  height: 50px;
  width: 250px;
  font-size: 18px;
  border-radius: 10px;
  display: block;
  font-family: "Brandon Grotesque Black";
}

.eventText + .eventText {
  margin-top: 30px;
}

.eventText[type="date"] {
  width: 250px;
  margin-top: 30px;
}


::placeholder {
  color: #428f4a;
  font-size: 18px;
  font-weight: bold;
}
button .button-underline {
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -3px;
  left: 0;
  background-color: #005851;
  transition: width 0.3s ease-in-out;
  z-index: -1;
}

button:hover .button-underline {
  width: 100%;
}


.button-underline {
  position: absolute;
  height: 2px;
  background-color: #005851;
  transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
  bottom: 0;
  left: 0;
  width: 0;
  z-index: -1;
}

.create_Event {
  color: #005851;
  font-family: "Brandon Grotesque Black";
  border: none;
  background-color: white;
  font-size: 24px;
  margin-top: 100px;
  justify-content:left;
  position: relative;
}

.create_Event .button-underline {
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -3px;
  left: 0;
  background-color: #005851;
  transition: width 0.3s ease-in-out;
  z-index: -1;
}

.create_Event:hover .button-underline {
  width: 100%;
}

.button-text{
  margin-left:40px;
}

.button-icon{
  margin-left:40px;
}
.event {
  margin-top: 140px;
  margin-left: 820px;
  position: absolute;
  width: 100%;
  color: #4a4b39;
  font-family: "Brandon Grotesque Black";
  font-size: 20px;
}
  .dateText {
    margin-top: 2vw;
    color: #428f4a;
    font-size: 1vw;
    font-weight: bold;
    margin-left: 550px;
}

.event-create-button {
  margin-top: 30px; 
  background-color: #ffdb00; 
  color: #428f4a;
  height: 50px;
  width: 250px;
  font-size: 18px;
  border-radius: 10px;
  border: none;
  display: block;
  margin-left: 550px;
  font-family: "Brandon Grotesque Black";
  cursor: pointer;
}

.events-list {
  margin-top: 20px;
}

.event-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>

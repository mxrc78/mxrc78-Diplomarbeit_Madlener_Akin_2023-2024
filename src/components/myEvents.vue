<template>
  <form @submit.prevent>
    <button class="create_Event" v-if="isAdmin" @click="createEvent">
      Event erstellen
      <span class="button-icon">+</span>
      <span class="button-underline"></span>
    </button>

    <div v-if="showCreateEvent">
      <input class="eventText" type="text" placeholder="Beschreibung" />
      <div class="dateText">Startdatum:</div>
      <input class="eventText" type="date" v-model="startDate" placeholder="Datum" />

      <div class="dateText">Enddatum:</div>
      <input class="eventText" type="date" v-model="endDate" placeholder="Datum" />

      <label for="pdfInput" class="fileButton"> PDF Auswählen </label>
      <input class="eventText" type="file" id="pdfInput" accept=".pdf" @change="handlePDFUpload" style="display: none" />
      <span v-if="selectedPDF">{{ selectedPDF.name }}</span>
    </div>
  </form>
</template>

<script>
import authService from "./authService.js";

export default {
  name: "myEvents",
  data() {
    return {
      showCreateEvent: false,
      selectedPDF: null,
      startDate: "",
      endDate: "",
      userInfo: null,
      isAdmin: '',
    };
  },
  async mounted() {
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
    // Weitere Methoden...
  },
};
</script>

<style scoped>
.button-icon {
  position: absolute;

  color: #ffdb00;
  margin-left: -160px;
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
  width: 200px;
  font-size: 18px;
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
  margin-left: 100px;
  margin-top: 500px;
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
  width: 200px;
  font-size: 18px;
  border-radius: 10px;
  display: block;
  font-family: "Brandon Grotesque Black";
}

.eventText + .eventText {
  margin-top: 30px;
}

.eventText[type="date"] {
  width: 200px;
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
  justify-content: left;
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

.event {
  margin-top: 140px; /* Adjusted margin-top value */
  margin-left: 820px;
  position: absolute;
  width: 100%;
  color: #4a4b39;
  font-family: "Brandon Grotesque Black";
  font-size: 20px;
}
.dateText {
  margin-top: 2vw; /* Abstand über und unter dem Datum-Eingabefeld anpassen */
  color: #428f4a;
  font-size: 1vw;
  font-weight: bold;
  margin-left: 550px;
}
</style>

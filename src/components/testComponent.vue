<template>
  <form @submit.prevent>
    <div class="navBar">
      <img :src="require('@/assets/rauch-logo2.png')" @click="toggleStartseite" class="logo" />

      <button class="Startseite" @click="toggleStartseite">
        Startseite
        <span class="button-underline"></span>
      </button>
      <button class="Events" @click="toggleEvents">
        Events
        <span class="button-underline"></span>
      </button>
      <button class="Meine_Tickets" @click="toggleTickets">
        Meine Tickets
        <span class="button-underline"></span>
      </button>
      <button class="myAccount" @click="toggleAccount">
        Account
        <span class="button-underline"></span>
      </button>

      
    </div>

    <div class="welcomeContainer" v-if="showStartseite">
      <img :src="require('@/assets/rauch-baum.jpg')" class="rauchtree" />
      <div class="welcomeText">
        <h1>Herzlich willkommen im RAUCH-Tal</h1>
      </div>
    </div>

    <div class="ticketsContainer" v-if="showTickets">
      <h2>Aktuelle Tickets</h2>
      <h2>Aktuell keine Tickets vorhanden</h2>
      <!-- Hier kannst du den Inhalt für "Meine Tickets" einfügen -->
    </div>

    <div class="event" v-if="showEvents">
      <!-- Der Button mit der Klasse "create_Event" -->

      <button class="create_Event" @click="toggleCreateEvent">
        <span class="button-icon">+</span>
        <!-- Plus-Symbol -->
        <span class="button-text">Event hinzufügen</span>
        <span class="button-underline"></span>
        <!-- Hier sollte der Unterstrich sein -->
      </button>
    </div>

    <div v-if="showCreateEvent">
      <input class="eventText" type="text" placeholder="Beschreibung" />
      
      <!-- Startdatum-Text -->
      <div class="dateText">Startdatum:</div>
      <!-- Startdatum-Eingabefeld -->
      <input class="eventText" type="date" v-model="startDate" placeholder="Datum" />

      <!-- Enddatum-Text -->
      <div class="dateText">Enddatum:</div>
      <!-- Enddatum-Eingabefeld -->
      <input class="eventText" type="date" v-model="endDate" placeholder="Datum" />

      <label for="imageInput" class="fileButton"> PDF Auswählen </label>
      <input
        class="eventText"
        type="file"
        id="imageInput"
        @change="handleImageUpload"
        style="display: none"
      />
      <!-- Anzeige des ausgewählten Bildes -->
      <img v-if="selectedImage" :src="selectedImage" alt="Selected Image" />
    </div>

    <div class="accountContainer" v-if="showAccount">
      <input class="accountUsername" type="text" v-model="accUsername" placeholder="Benutzername" />
      <input class="accountPassword" type="text" v-model="accPassword" placeholder="Passwort" />
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      showTickets: false,
      showStartseite: true,
      showEvents: false,
      showCreateEvent: false,
      showAccount: false,
      selectedImage: null,
    };
  },
  methods: {
    toggleTickets() {
      this.showTickets = true;
      this.showStartseite = false;
      this.showEvents = false;
      this.showCreateEvent = false;
      this.showAccount = false;
      this.selectedImage = null;
    },
    toggleEvents() {
      this.showStartseite = false;
      this.showEvents = true;
      this.showTickets = false;
      this.showCreateEvent = false;
      this.showAccount = false;
      this.selectedImage = null;
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedImage = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },

    toggleStartseite() {
      // Füge die Logik ein, um die Startseite zu steuern
      this.showTickets = false;
      this.showStartseite = true;
      this.showEvents = false;
      this.showCreateEvent = false;
      this.showAccount = false;
    },

    toggleAccount() {
      // Füge die Logik ein, um die Startseite zu steuern
      this.showTickets = false;
      this.showStartseite = false;
      this.showEvents = false;
      this.showCreateEvent = false;
      this.showAccount = true;
    },

    toggleCreateEvent() {
      this.showTickets = false;
      this.showStartseite = false;
      this.showEvents = false;
      this.showCreateEvent = !this.showCreateEvent;
      this.showAccount = false;
    },
  },
};
</script>

<style scoped>
.button-icon {
  position: absolute; /* Absolute Positionierung für das Plus-Symbol */
  left: 0;
  color: #ffdb00;
  margin-right: 5px; /* Abstand zwischen Symbol und Text anpassen */
}
.fileButton {
  position: relative;
  z-index: 2;
  margin-top: 50px;
  margin-left: 450px; /* Adjusted margin-left value */
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

.logo {
  width: 180px;
  margin-right: 80px;
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
  margin-left: 450px;
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

.accountUsername,
.accountPassword {
  position: relative;
  z-index: 3;
  margin-top: 50px;
  margin-left: 450px;
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

.navBar {
  position: fixed;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
  top: 0;
  left:0;
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

.Startseite,
.myAccount,
.Meine_Tickets,
.Events {
  color: #005851;
  font-family: "Brandon Grotesque Black";
  border: none;
  background-color: white;
  font-size: 24px;
  margin-right: 40px;
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



.welcomeText {
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #005851;
  background-color: #ffdb00;
  z-index: 1;
  padding: 10px;
}

.welcomeText h1 {
  font-size: 2vw;
  margin: 0;
  font-family: "Brandon Grotesque Black";
}

.welcomeContainer {
  position: relative;
  height: 480px;
  overflow: hidden;
  width: 100%;
  margin: 0; /* Reset margin */
  padding: 0; /* Reset padding */
}

.rauchtree {
  width: 100vw;
 
  object-fit: cover;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  z-index: 0;
  border-bottom-left-radius: 70% 30px;
  border-bottom-right-radius: 50% 30px;
}
.ticketsContainer {
  margin-top: 140px; /* Adjusted margin-top value */
  margin-left: 820px;
  position: absolute;
  width: 100%;
  color: #4a4b39;
  font-family: "Brandon Grotesque Black";
  font-size: 20px;
}

.accountContainer {
  margin-top: 140px; /* Adjusted margin-top value */
  margin-left: 100px;
  position: absolute;
  width: 100%;
  color: #4a4b39;
  font-family: "Brandon Grotesque Black";
  font-size: 20px;
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
    margin-left: 23.5vw;
}
</style>
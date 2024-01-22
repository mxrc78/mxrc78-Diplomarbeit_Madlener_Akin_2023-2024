<template>
  <div class="accountContainer">
    <button @click="login">Anmelden</button>
  </div>
</template>

<script>
import msalInstance from "./msal-instance.js";
import authService from "./authService.js";

export default {
  name: "myAccount",
  data() {
    return {
      error: null,
      username: null,
      userInfo: null,
      isAdmin: '',
    };
  },
  async mounted() {
    this.loginOnRedirect();
  },
 
  methods: {
    async loginOnRedirect() {
      try {
        await msalInstance.handleRedirectPromise();
        // Nach dem erfolgreichen Redirect die Benutzerrolle überprüfen
        this.checkUserRoles();
      } catch (error) {
        console.error("Fehler bei der MSAL-Redirect-Verarbeitung:", error);
        this.error = "Fehler bei der Anmeldung";
      }
    },

    async checkUserRoles() {
      this.isAdmin = await authService.checkIfUserHasRole("EventCreator");
    },

    async login() {
      try {
        await msalInstance.loginRedirect({
          scopes: ["openid", "profile", "User.Read"],
        });

        // Nach dem erfolgreichen Login die Benutzerrolle überprüfen
        this.checkUserRoles();
      } catch (error) {
        console.error("Fehler bei der Anmeldung:", error);
        this.error = "Fehler bei der Anmeldung";
      }
    },

    
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #333;
  color: white;
  z-index: 100;
}

.userInfo {
  margin-top: 400px;

  z-index: 1000;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

button {
  position: relative;
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
::placeholder {
  color: #428f4a;
  font-size: 18px;
  font-weight: bold;
}
.accountContainer {
  margin-top: 140px;
  margin-left: 100px;
  position: absolute;
  width: 100%;
  color: #4a4b39;
  font-family: "Brandon Grotesque Black";
  font-size: 20px;
  
}
</style>

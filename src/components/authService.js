import msalInstance from "./msal-instance.js";


const authService = {
  async checkIfUserHasRole(role) {
    try {
      const allAccounts = msalInstance.getAllAccounts();

      if (allAccounts.length > 0) {
        const account = allAccounts[0];
        const roles = account.idTokenClaims.roles;

        console.log("Token Claims:", account.idTokenClaims);

        // Hier kannst du weitere Logik hinzufügen, wenn erforderlich

        // Den ursprünglichen Zustand aus der sessionStorage abrufen
        const originalState = JSON.parse(sessionStorage.getItem('originalState'));

        // Sichere den ursprünglichen Zustand in history.state, falls er nicht bereits vorhanden ist
        if (!history.state) {
          history.replaceState(originalState, '', window.location.href);
        }

        return roles && roles.includes(role);
      } else {
        return false; // Kein Benutzer angemeldet, daher auch keine Rolle
      }
    } catch (error) {
      console.error("Fehler bei der Überprüfung der Benutzerrolle:", error);
      return false;
    }
  },
};

export default authService;
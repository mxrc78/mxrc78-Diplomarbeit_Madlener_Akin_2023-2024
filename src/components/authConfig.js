/* eslint-disable no-unused-vars */

const msalConfig = {
  auth: {
    clientId: "ac568947-e281-4991-b104-627fc82d460c",
    authority:
      "https://login.microsoftonline.com/673474f6-cca3-4b72-a547-c19bd70e77cd",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};
export default msalConfig;

import msalConfig from "./authConfig.js";
import { PublicClientApplication } from "@azure/msal-browser";

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize();

export default msalInstance;

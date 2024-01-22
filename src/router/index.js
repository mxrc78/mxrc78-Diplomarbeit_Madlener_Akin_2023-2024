// router/index.js

import { createRouter, createWebHistory } from "vue-router";
import myAccount from "../components/myAccount.vue";
import MeineTickets from "../components/MeineTickets.vue";
import myEvents from "../components/myEvents.vue";
import msalInstance from "../components/msal-instance";

async function authenticateUser() {
  const accounts = msalInstance.getAllAccounts();
  return accounts.length > 0;
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "myAccount",
      component: myAccount,
    },
    {
      path: "/meine-tickets",
      name: "MeineTickets",
      component: MeineTickets,
    },
    {
      path: "/events",
      name: "events",
      component: myEvents,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const authenticated = await authenticateUser();
    if (authenticated) {
      next();
    } else {
      

      // Nutze next('/myAccount') und lasse Vue Router den richtigen Übergang durchführen
      next('');
    }
  } else {
    next();
  }
});


export default router;

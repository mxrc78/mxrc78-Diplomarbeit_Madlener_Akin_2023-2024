<template>
  <div class="ticketsContainer">
    <h2>Aktuelle Tickets</h2>
    <h2>Aktuell keine Tickets vorhanden</h2>
  </div>
</template>

<script>
export default {
  name: "MeineTickets",
  data() {
    return {};
  },
};
</script>

<style scoped>
button {
  position: relative;
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
</style>

<template>
      <div class="navbar">
        <router-link to="/">
  <img :src="require('@/assets/rauch-logo2.png')" class="logo" />
</router-link>

  
        
        <button class="Events"><router-link to="/events">Events</router-link><span class="button-underline"></span></button>
        <button class="Meine_Tickets"><router-link to="/meine-tickets">Meine Tickets</router-link><span class="button-underline"></span></button>
      </div>
  </template>

<script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Navbar',
  }
</script>

<style scoped>
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
  .navbar a {
    color: #005851;
    text-decoration: none;
    font-family: "Brandon Grotesque Black";
    font-size: 24px;
    margin-right: 40px;
    transition: color 0.3s ease-in-out; /* Add a transition for a smooth color change */
  }

 

  .navbar a .button-underline {
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -3px;
    left: 0;
    background-color: #005851;
    transition: width 0.3s ease-in-out;
    z-index: -1;
  }

  .navbar a:hover .button-underline {
    width: 100%;
  }
  .navbar {
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
    text-decoration: none;
    
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
  .Account,
  .Meine_Tickets,
  .Events {
    color: #005851;
    font-family: "Brandon Grotesque Black";
    border: none;
    background-color: white;
    font-size: 24px;
    margin-right: 40px;
    text-decoration: none;
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
</style>
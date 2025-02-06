<template>
  <!-- <navbar-com></navbar-com> -->
  <!-- <h1>eslam</h1> -->
  <router-view />
  <!-- <footer-com></footer-com> -->
</template>

<script>
// import NavbarCom from "./components/layout/NavbarCom.vue";
// import FooterCom from "./components/layout/FooterCom.vue";
export default {
  // components: {
  //   NavbarCom,
  //   FooterCom,
  // },
  // mounted() {
  //   console.log(this.$router.currentRoute.value);
  // },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.sitepad {
  padding: 0 15px;
}
</style>

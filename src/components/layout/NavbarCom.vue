<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="/home">vue_ecomm</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/home" class="nav-link">Home</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/orders" class="nav-link">orders</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/contacts" class="nav-link">contacts</router-link>
          </li>
        </ul>
        <div class="user_thing">
          <div class="cart">
            <router-link to="/cart">cart {{ cartLen }}</router-link>
          </div>
          <div class="fave">
            <span>fave {{ favLen }}</span>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
// import router from '@/router';

export default {
  name: "NavbarCom",
  setup() {},
  data() {
    return {
      cartLen: 0,
      favLen: 0,
    };
  },
  methods: {
    getnumbercart() {
      let items = localStorage.getItem("user_cart");
      this.cartLen = JSON.parse(items) ? JSON.parse(items).length : 0;
    },
    getnumberfav() {
      let items = localStorage.getItem("user_fav");
      this.favLen = JSON.parse(items) ? JSON.parse(items).length : 0;
    },
  },
  created() {
    this.getnumbercart();
    this.getnumberfav();
  },
};
</script>

<style scoped></style>

<template>
  <div class="d-flex justify-content-between align-items-center p-3">
    <h1 class="text-black">
      <slot></slot>
    </h1>
    <router-link to="/home" class="btn btn-primary">view website</router-link>
  </div>
</template>

<script>
export default {
  name: "AdminNav",
  setup() {},
};
</script>

<style scoped>
div {
  border-bottom: 2px solid #aaa;
  /* margin-bottom: 10px; */
  background: #fdf9f9;
}

div h1 {
  font-size: 26px;
  margin: 0;
}
</style>

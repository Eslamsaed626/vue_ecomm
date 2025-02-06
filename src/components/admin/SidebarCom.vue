<template>
  <div id="dashSide">
    <div>
      <h1>DashBoadr</h1>
      <div class="admin-info">
        <div>
          <span>admin</span>
          <br />
          <span>admin@gmail.com</span>
        </div>
      </div>
      <hr />
    </div>

    <ul class="nav flex-column">
      <li class="nav-item mb-2">
        <router-link to="/admin" class="nav-link">overview</router-link>
      </li>
      <li class="nav-item mb-2">
        <router-link to="/admin/adminproducts" class="nav-link"
          >products</router-link
        >
      </li>
      <li class="nav-item mb-2">
        <router-link to="/admin/adminorders" class="nav-link"
          >orders</router-link
        >
      </li>

      <li class="nav-item mb-2">
        <router-link to="/admin/contacts" class="nav-link"
          >contacts</router-link
        >
      </li>
    </ul>

    <span>admin</span>
  </div>
</template>
<script>
export default {
  name: "SidebarCom",
  setup() {},
};
</script>

<style scoped>
#dashSide {
  height: 100vh;
  padding: 10px;
  background: #3c6e71;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
}
.admin-info img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
}

/* .nav-item a {
  color: #fff;
} */
a,
a:hover {
  color: #fff;
  font-size: 17px;
  font-weight: bold;
  border-radius: 10px;
}
a.router-link-active {
  color: #359679;
  background: #fff;
  border-radius: 10px;
}
</style>

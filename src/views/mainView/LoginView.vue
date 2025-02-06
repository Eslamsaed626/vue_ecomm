<template>
  <div id="login">
    <form class="w-50 m-auto">
      <h1>Login</h1>
      <p v-if="isSigned" class="text-danger">sign up first</p>
      <div class="mb-3 d-flex justify-content-around align-items-center">
        <div>
          <input type="radio" id="user" value="user" v-model="permition" />
          <label for="user">User</label>
        </div>
        <div>
          <input type="radio" id="admin" value="admin" v-model="permition" />
          <label for="admin">Admin</label>
        </div>
      </div>
      <div class="mb-3">
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Email Address"
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div class="btns-nav">
        <button type="submit" class="btn btn-primary" @click.prevent="login">
          Login
        </button>
        <span>
          <router-link to="/">Sign Up</router-link>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      permition: "",
      usersandAdmin: [],
      isSigned: false,
    };
  },
  methods: {
    async login() {
      if (this.permition == "") {
        alert(" admin ro user");
      } else {
        if (this.permition == "admin") {
          let result = await axios.get("http://localhost:3000/admin");
          this.usersandAdmin = result.data;
          this.usersandAdmin.forEach((data) => {
            if (this.email == data.email && this.password == data.password) {
              this.$router.push("/admin");
              // console.log("yeeeees");
            } else {
              alert("you dont admin");
            }
          });
        } else {
          let result = await axios.get("http://localhost:3000/users");
          this.usersandAdmin = result.data;
          this.usersandAdmin.forEach((data) => {
            if (this.email == data.email && this.password == data.password) {
              this.$router.push("/home");
              // console.log("yeeeees");
            } else {
              this.isSigned = true;
            }
          });
        }
      }
    },
  },
};
</script>

<style scoped>
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background: #d9d9d9;
}

form {
  background: #3c6e71;
  padding: 22px;
  color: #fff;
  border-radius: 23px;
}

.btns-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btns-nav span a {
  color: #fff;
  font-size: 22px;
}
</style>

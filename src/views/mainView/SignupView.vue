<template>
  <div id="sign-up">
    <form class="w-50 m-auto">
      <h1>Sign-Up</h1>
      <div class="mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="User Name"
          v-model="user.name"
        />
      </div>

      <div class="mb-3">
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Email Address"
          v-model="user.email"
        />
      </div>
      <div class="mb-3">
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-model="user.password"
        />
      </div>
      <div class="btns-nav">
        <button type="submit" class="btn btn-primary" @click.prevent="signup">
          Sign Up
        </button>
        <span>
          <router-link to="/login">login</router-link>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SignupView",

  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async signup() {
      let result = await axios.post("http://localhost:3000/users", {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
      });

      if (result.status == 201) {
        localStorage.setItem("user_info", JSON.stringify(result.data));
        // console.log(result.data);

        this.$router.push("/home");
      }
    },
  },
};
</script>

<style scoped>
#sign-up {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background: #d9d9d9;
}
#sign-up h1 {
  margin-bottom: 15px;
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

<template>
  <navbar-com></navbar-com>
  <div class="page_content">
    <div class="container">
      <form>
        <div class="mb-3">
          <label for="username" class="form-label">user name</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="contact_form.username"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="contact_form.email"
          />
        </div>

        <div class="mb-3">
          <label for="phone" class="form-label">phone number</label>
          <input
            type="text"
            class="form-control"
            id="phone"
            v-model="contact_form.phonenum"
          />
        </div>

        <div class="mb-3">
          <label for="phone" class="form-label">message</label>
          <textarea
            class="form-control"
            v-model="contact_form.message"
          ></textarea>
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          @click.prevent="addContact"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import NavbarCom from "@/components/layout/NavbarCom.vue";
import axios from "axios";
export default {
  name: "ContactView",
  components: {
    NavbarCom,
  },
  setup() {},
  data() {
    return {
      contact_form: {
        username: "",
        email: "",
        phonenum: "",
        message: "",
      },
    };
  },
  methods: {
    async addContact() {
      await axios.post("http://localhost:3000/contacts", {
        username: this.contact_form.username,
        phonenum: this.contact_form.phonenum,
        useremail: this.contact_form.useremail,
        masseg: this.contact_form.message,
      });

      this.contact_form = {
        username: "",
        email: "",
        phonenum: "",
        message: "",
      };
    },
  },
};
</script>

<style scoped>
.page_content {
  margin-top: 100px;
}
form {
  background: #aaa;
  padding: 20px;
  border-radius: 10px;
}
</style>

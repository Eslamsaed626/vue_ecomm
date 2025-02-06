<template>
  <admin-nav> admin contacts </admin-nav>
  <div class="all_contacts sitepad">
    <div class="contact" v-for="contact in all_contacts" :key="contact.id">
      <!-- <div>
        <span>order id</span>
        <p>{{ contact.id }}</p>
      </div> -->
      <div>
        <span>user name</span>
        <p>{{ contact.name }}</p>
      </div>
      <div>
        <span>email</span>
        <p>{{ contact.useremail }}</p>
      </div>

      <div>
        <span>phone number</span>
        <p>{{ contact.phonenum }}</p>
      </div>
      <div>
        <span>message</span>
        <p>{{ contact.masseg }}</p>
      </div>
      <div>
        <button class="btn btn-danger">delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from "@/components/admin/AdminNav.vue";
import axios from "axios";

export default {
  name: "AdminContact",
  components: {
    AdminNav,
  },
  data() {
    return {
      all_contacts: [],
    };
  },
  async mounted() {
    let result = await axios.get("http://localhost:3000/contacts");
    this.all_contacts = result.data;
  },
  // setup() {},
};
</script>

<style scoped>
.all_contacts .contact {
  padding: 5px 0;
  margin: 20px 0;
  color: #000;
}
.all_contacts .contact {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #aaa;
  border-radius: 41px;
}

.all_contacts .contact p {
  margin-bottom: 0;
}
</style>

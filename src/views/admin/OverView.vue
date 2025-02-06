<template>
  <div id="overview">
    <admin-nav> admin overview </admin-nav>
    <div class="row site_info">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-6 info">{{ productsNum }} product</div>
          <div class="col-md-6 info">{{ ordersNum }} orders</div>
          <div class="col-md-6 info">{{ usersNum }} users</div>
          <div class="col-md-6 info">{{ contactsNum }} contacts</div>
        </div>
      </div>
      <div class="col-md-6">
        <img src="https://placehold.co/500x400/png" />
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from "@/components/admin/AdminNav.vue";
import axios from "axios";
export default {
  name: "OverView",
  components: {
    AdminNav,
  },
  data() {
    return {
      productsNum: "",
      contactsNum: "",
      ordersNum: "",
      usersNum: "",
    };
  },
  setup() {},
  methods: {
    async getProductsNum() {
      let result = await axios.get("http://localhost:3000/products");
      this.productsNum = result.data.length;
    },

    async getOrdersNum() {
      let result = await axios.get("http://localhost:3000/orders");
      this.ordersNum = result.data.length;
    },

    async getContactsNum() {
      let result = await axios.get("http://localhost:3000/contacts");
      this.contactsNum = result.data.length;
    },

    async getUsersNum() {
      let result = await axios.get("http://localhost:3000/users");
      this.usersNum = result.data.length;
    },
  },
  mounted() {
    this.getProductsNum();
    this.getOrdersNum();
    this.getContactsNum();
    this.getUsersNum();
  },
};
</script>

<style scoped>
#overview .site_info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  padding: 0 15px;
}
.info {
  background: #111828;
  height: 100px;
  color: #fff;
  line-height: 100px;
  border-radius: 5px;
  width: 48%;
  margin: 5px;
}
img {
  border-radius: 10px;
}
</style>

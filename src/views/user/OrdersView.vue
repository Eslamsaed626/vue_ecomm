<template>
  <navbar-com></navbar-com>
  <div class="page">
    <h1>orders</h1>

    <div class="all_orders sitepad">
      <div class="order" v-for="order in allOrders" :key="order.id">
        <div>
          <span>order id</span>
          <p>{{ order.id }}</p>
        </div>
        <div>
          <span>ordered by</span>
          <p>{{ order.orderedBy }}</p>
        </div>
        <div>
          <span>email</span>
          <p>{{ order.orderemail }}</p>
        </div>
        <div>
          <span>
            products in
            <p>e</p>
          </span>
        </div>
        <div>
          <span>status</span>
          <p
            class="status"
            :style="[
              order.status == 'instoke' ? { color: 'red' } : { color: 'green' },
            ]"
          >
            {{ order.status }}
          </p>
        </div>
        <div>
          <button class="btn btn-danger" @click="detetedOrder(order.id)">
            delete
          </button>
        </div>

        <div class="products">
          <div
            class="product"
            v-for="product in order.products"
            :key="product.id"
          >
            <div class="pro_details">
              <img
                v-bind:src="
                  require('../../assets/images/' + product.productImage)
                "
                alt=""
                v-if="product.productImage"
              />
              <img src="https://placehold.co/400" alt="" v-else />
              <div>
                <span class="mb-4">{{ product.productName }}</span>
                <p>{{ product.productPrice }} $</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarCom from "@/components/layout/NavbarCom.vue";
import axios from "axios";
export default {
  name: "OrdersView",
  components: {
    NavbarCom,
  },
  setup() {},
  data() {
    return {
      allOrders: [],
    };
  },
  methods: {
    async getAllOrders() {
      let result = await axios.get("http://localhost:3000/orders");
      this.allOrders = result.data;
      console.log(result.data);
      console.log(this.allOrders[0].id);
    },
  },
  mounted() {
    this.getAllOrders();
  },
};
</script>

<style scoped>
.page {
  margin-top: 100px;
}
.all_orders .order {
  padding: 5px 0;
  margin: 20px 0;
  color: #000;
}
.all_orders .order {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #aaa;
  border-radius: 41px;
  position: relative;
}

.all_orders .order p {
  margin-bottom: 0;
}

.products {
  background: #ada1a1;
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  z-index: 1;
  top: 100%;
  height: 0px;
  overflow: hidden;
  padding: 0;
  border-radius: 10px;
  transition: all 0.4s ease;
}

.order:hover .products {
  height: auto;
  overflow: visible;
  padding: 10px;
}
.product .pro_details {
  display: flex;
}

.product .pro_details img {
  width: 80px;
  height: 80px;
}

.product .pro_details div {
  text-align: left;
  margin-left: 10px;
}
</style>

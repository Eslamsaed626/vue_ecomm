<template>
  <admin-nav> admin orders </admin-nav>
  <div class="all_orders sitepad">
    <div class="order" v-for="order in all_orders" :key="order.id">
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
        <span>products in</span>
        <p>{{ order.products }}</p>
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
    </div>
  </div>
</template>

<script>
import AdminNav from "@/components/admin/AdminNav.vue";
import axios from "axios";
export default {
  name: "AdminOrders",
  components: {
    AdminNav,
  },
  data() {
    return {
      all_orders: [],
    };
  },
  methods: {
    async detetedOrder(id) {
      // console.log(id);
      await axios.delete("http://localhost:3000/orders/" + id);
      // console.log(result);
    },

    async getAllOrders() {
      let result = await axios.get("http://localhost:3000/orders");
      this.all_orders = result.data;
    },
  },
  async mounted() {
    this.getAllOrders();
  },
};
</script>

<style scoped>
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
}

.all_orders .order p {
  margin-bottom: 0;
}
/* .status{

} */
</style>

<template>
  <navbar-com></navbar-com>
  <header>
    <h1>header</h1>
  </header>
  <div class="services">
    <div class="container">
      <h3>some services</h3>
      <div class="all_services">
        <div class="service">
          <h4>phones</h4>
        </div>

        <div class="service">
          <h4>phones</h4>
        </div>

        <div class="service">
          <h4>phones</h4>
        </div>

        <div class="service">
          <h4>phones</h4>
        </div>

        <div class="service">
          <h4>phones</h4>
        </div>

        <div class="service">
          <h4>phones</h4>
        </div>
      </div>
    </div>
  </div>

  <section class="all-products">
    <div class="container">
      <div>
        <h1>All products</h1>
        <router-link to="/products">view all</router-link>
      </div>
      <div class="row products">
        <product-com
          :user="user"
          v-for="product in allProduct"
          :key="product.id"
          :product="product"
        >
          <button class="btn btn-primary" @click="add_to_cart(product.id)">
            add to cart
          </button>
          <button
            class="btn btn-success fav-btn"
            @click="add_to_fav(product.id)"
          >
            add to fave
          </button>
        </product-com>
      </div>
    </div>
  </section>

  <section class="best-products">
    <div class="container">
      <div>
        <h1>best products</h1>
      </div>
      <div class="row products">
        <product-com
          v-for="product in best_product"
          :key="product.id"
          :product="product"
        >
          <button class="btn btn-primary" @click="add_to_cart(product.id)">
            add to cart
          </button>
          <button
            class="btn btn-success fav-btn"
            @click="add_to_fav(product.id)"
          >
            add to fave
          </button>
        </product-com>
      </div>
    </div>
  </section>

  <section class="new-products">
    <div class="container">
      <div>
        <h1>new products</h1>
      </div>
      <div class="row products">
        <product-com
          v-for="product in new_product"
          :key="product.id"
          :product="product"
        >
          <button class="btn btn-primary" @click="add_to_cart(product.id)">
            add to cart
          </button>
          <button
            class="btn btn-success fav-btn"
            @click="add_to_fave(product.id)"
          >
            add to fave
          </button>
        </product-com>
      </div>
    </div>
  </section>

  <footer-com></footer-com>
</template>

<script>
import NavbarCom from "@/components/layout/NavbarCom.vue";
import ProductCom from "@/components/layout/ProductCom.vue";
import FooterCom from "@/components/layout/FooterCom.vue";
import axios from "axios";
export default {
  name: "HomeView",
  components: {
    NavbarCom,
    ProductCom,
    FooterCom,
  },
  setup() {},

  data() {
    return {
      allProduct: [],
      local_cart: [],
      local_fav: [],
      best_product: [],
      new_product: [],
      user: {
        name: "eslam",
      },
    };
  },

  methods: {
    async getAllProduct() {
      let result = await axios.get("http://localhost:3000/products");
      // console.log(result.data);

      this.allProduct = result.data;
      this.best_product = this.allProduct.filter((product) => {
        return product.sectionsName == "best";
      });
      this.new_product = this.allProduct.filter((product) => {
        return product.sectionsName == "new";
      });
    },

    async add_to_cart(id) {
      if (localStorage.getItem("user_cart") == null) {
        localStorage.setItem("user_cart", "[]");
      }
      let result = await axios.get("http://localhost:3000/products/" + id);
      this.local_cart = JSON.parse(localStorage.getItem("user_cart"));
      this.local_cart.push(result.data);
      localStorage.setItem("user_cart", JSON.stringify(this.local_cart));
    },

    async add_to_fav(id) {
      if (localStorage.getItem("user_fav") == null) {
        localStorage.setItem("user_fav", "[]");
      }
      let result = await axios.get("http://localhost:3000/products/" + id);
      this.local_fav = JSON.parse(localStorage.getItem("user_fav"));
      this.local_fav.push(result.data);
      localStorage.setItem("user_fav", JSON.stringify(this.local_fav));
    },
  },

  mounted() {
    this.getAllProduct();
  },
};
</script>

<style scoped>
header {
  height: 80vh;
  background: #333;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.services {
  background: #aaa;
  padding: 35px;
}
.all_services {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.service {
  margin: 0;
  background: #fff;
  padding: 27px;
  width: 15%;
  border: 2px solid #444;
  border-radius: 13px;
}
.best-products {
  background: #aaa;
  padding: 20px 0;
}

.best-products h1,
.new-products h1 {
  margin-bottom: 20px;
}
.new-products {
  background: #807f7f;
  padding: 20px 0;
}
.fav-btn {
  position: absolute;
  top: 10px;
  right: 15px;
}
</style>

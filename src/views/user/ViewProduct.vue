<template>
  <navbar-com></navbar-com>
  <div id="viewproduct">
    <div class="product_info">
      <div class="container">
        <div class="row">
          <div class="col-md-6 pro_image">
            <img src="../../assets/images/hedphone_1.jpeg" />
            <!-- <img
              v-bind:src="require('../../assets/images/' + product.productImage)"
              class="card-img-top"
              alt="..."
            /> -->
          </div>
          <div class="col-md-6 pro_details">
            <h3>{{ product.productName }}</h3>
            <span>{{ product.category_name }}</span>
            <div>
              {{ product.productDescription }}
            </div>
            <div>
              <span
                :style="[
                  product.priceInSale
                    ? { 'text-decoration': 'line-through' }
                    : '',
                ]"
                >price: {{ product.productPrice }}</span
              >
              <br />
              <span v-if="product.priceInSale"
                >price in sale: {{ product.priceInSale }}</span
              >
            </div>
            <button class="btn btn-primary" @click="add_to_cart(product.id)">
              add to cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="best_product">
      <div class="container">
        <div class="row">
          <product-com
            v-for="product in best_product"
            :key="product.id"
            :product="product"
          >
          </product-com>
        </div>
      </div>
    </div>
  </div>
  <footer-com></footer-com>
</template>

<script>
import axios from "axios";
import NavbarCom from "@/components/layout/NavbarCom.vue";
import FooterCom from "@/components/layout/FooterCom.vue";
import ProductCom from "@/components/layout/ProductCom.vue";
export default {
  name: "ViewProduct",
  setup() {},
  components: {
    NavbarCom,
    FooterCom,
    ProductCom,
  },
  data() {
    return {
      theId: "",
      product: {},
      imaggeee: "",
      best_product: [],
      allProduct: [],
      local_cart: [],
    };
  },
  methods: {
    async getProduct() {
      let result = await axios.get(
        "http://localhost:3000/products/" + this.theId
      );
      this.product = result.data;
      console.log(this.product);
    },

    async getBestProduct() {
      let result = await axios.get("http://localhost:3000/products");
      // console.log(result.data);

      this.allProduct = result.data;
      this.best_product = this.allProduct.filter((product) => {
        return product.sectionsName == "best";
      });
      console.log(this.best_product);

      // this.new_product = this.allProduct.filter((product) => {
      //   return product.sectionsName == "new";
      // });
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
  },

  mounted() {
    this.theId = this.$route.params.id;
    console.log(this.theId);
    this.getProduct();
    this.getBestProduct();
  },
};
</script>

<style scoped>
#viewproduct {
  background: #ddd;
}
.pro_image img {
  width: 100%;
  height: 365px;
}
.pro_details {
  text-align: left;
}
.best_product {
  background: #686767;
  padding: 55px 0;
}
.product_info {
  padding: 70px 0 40px 0;
}
</style>

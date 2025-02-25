<template>
  <navbar-com></navbar-com>
  <div class="cart_div">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4">
          <div class="check_out_form">
            <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label"
                  >Email address</label
                >
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  v-model="check_out_form.email"
                />
              </div>
              <div class="mb-3">
                <label for="nameuser" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="nameuser"
                  v-model="check_out_form.userName"
                />
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100"
                @click.prevent="check_out"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div class="col-md-8">
          <div class="cart_products" v-if="cartProducts.length > 0">
            <!-- <div class="container"> -->

            <div
              class="cart_product"
              v-for="product in cartProducts"
              :key="product.id"
            >
              <div>
                <span>product id</span>
                <p>{{ product.id }}</p>
              </div>
              <div>
                <span>product name</span>
                <p>{{ product.productName }}</p>
              </div>
              <div>
                <span>product descriprion</span>
                <p class="desc">{{ product.productDescription }}</p>
              </div>
              <div>
                <span>product price</span>
                <p>{{ product.productPrice }}</p>
              </div>
              <div>
                <img
                  v-bind:src="
                    require('../../assets/images/' + product.productImage)
                  "
                  alt=""
                  v-if="product.productImage"
                />
                <img src="https://placehold.co/400" alt="" v-else />
              </div>
              <div>
                <button
                  class="btn btn-danger"
                  @click="deleteproduct(product.id)"
                >
                  delete
                </button>
              </div>
            </div>

            <div>{{ totalPrice }}</div>
            <!-- </div> -->
          </div>
          <div v-else>the cart is empty</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarCom from "@/components/layout/NavbarCom.vue";
import axios from "axios";
export default {
  name: "CartView",
  components: {
    NavbarCom,
  },
  setup() {},
  data() {
    return {
      cartProducts: [],
      result: [],
      totalPrice: 0,
      check_out_form: {
        userName: "",
        email: "",
        status: "first",
      },
    };
  },
  methods: {
    getCartProduct() {
      this.cartProducts = localStorage.getItem("user_cart")
        ? JSON.parse(localStorage.getItem("user_cart"))
        : [];
      this.totalPrice =
        this.cartProducts.length > 0
          ? this.cartProducts
              .map((item) => {
                return item.productPrice;
              })
              .reduce((cur, acc) => {
                return +cur + +acc;
              }, 0)
          : 0;
    },

    deleteproduct(id) {
      let indexx = this.cartProducts.findIndex((item) => item.id == id);
      this.cartProducts.splice(indexx, 1);
      localStorage.setItem("user_cart", JSON.stringify(this.cartProducts));
      this.totalPrice = this.cartProducts
        .map((item) => {
          return item.productPrice;
        })
        .reduce((cur, acc) => {
          return +cur + +acc;
        }, 0);
    },

    async check_out() {
      let result = await axios.post("http://localhost:3000/orders", {
        orderedBy: this.check_out_form.userName,
        orderemail: this.check_out_form.email,
        products: this.cartProducts.length > 0 ? [...this.cartProducts] : [],
        totalPrice: this.totalPrice,
        status: "first",
      });

      // console.log(this.check_out_form);
      console.log(result.data);

      this.cartProducts = [];
      localStorage.removeItem("user_cart");
      console.log(this.cartProducts);
    },
  },
  mounted() {
    this.getCartProduct();
  },
};
</script>

<style scoped>
.cart_div {
  margin-top: 100px;
}
.cart_product {
  background: #aaa;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  border-radius: 41px;
  border: 2px solid #333;
  margin: 20px 0;
}

.cart_product img {
  width: 100px;
  height: 100px;
  border-radius: 14px;
}

.desc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
}
.check_out_form {
  background: #aaa;
  padding: 10px;
  border-radius: 10px;
  text-align: left;
}
</style>

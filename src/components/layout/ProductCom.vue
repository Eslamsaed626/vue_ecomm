<template>
  <div class="product col-md-3 mb-4">
    <div class="card">
      <router-link :to="'/products/' + product.id">
        <img
          v-bind:src="require('../../assets/images/' + product.productImage)"
          class="card-img-top"
          alt="..."
        />
      </router-link>
      <div class="card-body">
        <h5 class="card-title">{{ product.productName }}</h5>
        <p class="card-text">
          {{ product.productDescription }}
        </p>
        <div>
          <span
            >price:<span
              :style="[
                product.priceInSale
                  ? { 'text-decoration': 'line-through', color: 'red' }
                  : '',
              ]"
            >
              {{ product.productPrice }}</span
            ></span
          >

          <!-- <br /> -->
          <span
            v-if="product.priceInSale && product.inSale"
            class="mx-2 text-success text-bold"
          >
            {{ product.priceInSale }}</span
          >
        </div>
        <!-- <slot></slot> -->
        <!-- <div class="btns"> -->
        <!-- <button class="btn btn-primary" @click="addToCart(product.id)">
          add to cart
        </button>
        <button class="btn btn-success" @click="addToFav(product.id)">
          add to fave
        </button> -->
        <span v-if="product.inSale == 'yes'" class="insale">sale</span>
        <!-- </div> -->

        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCom",
  setup() {},

  props: ["product"],
  data() {
    return {};
  },
  // methods: {
  //   addToCart(id) {
  //     this.$emit("addToCart", id);
  //   },

  //   addToFav(id) {
  //     this.$emit("addToFav", id);
  //   },
  // },
  mounted() {
    // console.log(this.product);
  },
};
</script>
<style scoped>
.card-img-top {
  height: 215px;
}
.product {
  position: relative;
}
/* .btn-success {
  position: absolute;
  top: 10px;
  right: 15px;
} */
.insale {
  background: #aaa;
  padding: 5px 14px;
  border-radius: 13px;
  position: absolute;
  top: 6px;
  left: 4px;
}
.card-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

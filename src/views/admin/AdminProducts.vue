<template>
  <!-- <img src="../../assets/images/hedphone_1.jpeg" /> -->
  <div id="adminproducts">
    <admin-nav> admin products </admin-nav>
    <pagination :records="500" @paginate="myCallback"></pagination>
    <div class="pro_search">
      <div>
        <select v-model="category" @change="getproducts">
          <option v-for="category in allCategories" :key="category.id" selected>
            {{ category.category_name }}
          </option>
        </select>
      </div>

      <div class="add_btn">
        <button class="btn btn-primary mx-3" @click="getallproducts">
          all products
        </button>
        <button
          class="btn btn-primary mx-3"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          add product
        </button>
        <button
          class="btn btn-success"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal_1"
        >
          add category
        </button>
      </div>
    </div>

    <div class="all_products">
      <div class="row">
        <product-com
          v-for="product in all_products"
          :key="product.id"
          :product="product"
        >
          <div class="pro_action">
            <button
              class="btn btn-success"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="updateProduct(product.id)"
            >
              update
            </button>
            <button class="btn btn-primary" @click="deleteProduct(product.id)">
              delete
            </button>
          </div>
        </product-com>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">add product</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="product name"
                  v-model="productCrete.name"
                />
              </div>

              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="product price"
                  v-model="productCrete.price"
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="product description"
                  v-model="productCrete.description"
                />
              </div>
              <div class="mb-3">
                <label>category</label>
                <select v-model="productCrete.procategory">
                  <option
                    v-for="category in allCategories"
                    :key="category.id"
                    :value="category.category_name"
                  >
                    {{ category.category_name }}
                  </option>
                </select>
              </div>
              <div class="bm-3">
                <label>section</label>
                <select v-model="productCrete.sectionsName">
                  <option value="new">new</option>
                  <option value="best">best</option>
                </select>
              </div>

              <div class="bm-3">
                <label>in sale</label>
                <select v-model="productCrete.inSale" @change="changeSale">
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                </select>
              </div>

              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="new price"
                  v-if="sale"
                  v-model="productCrete.priceInSale"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="createProduct"
              v-if="!productCrete.id"
            >
              add product
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="updatetheProduct(productCrete.id)"
              v-if="productCrete.id"
            >
              update product{{ productCrete.id }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>

  <Teleport to="body">
    <div
      class="modal fade"
      id="exampleModal_1"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              add category
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="category name"
                  v-model="categoreAdd"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="createCategory"
            >
              Add and Cloce
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import AdminNav from "@/components/admin/AdminNav.vue";
import ProductCom from "@/components/layout/ProductCom.vue";
// import Pagination from "vue-pagination-2";
import axios from "axios";
export default {
  name: "AdminProducts",
  components: {
    AdminNav,
    ProductCom,
    // Pagination,
  },
  data() {
    return {
      categoreAdd: "",
      theupdatePro: [],
      // all_sections: [],
      productCrete: {
        name: "",
        price: "",
        description: "",
        procategory: "",
        productImage: "",
        sectionsName: "",
        inSale: "no",
        priceInSale: "",
      },
      allCategories: [],
      all_products: [],
      all: [],
      category: "",
      sale: false,
    };
  },
  methods: {
    changeSale() {
      if (this.productCrete.inSale == "yes") {
        this.sale = true;
      } else {
        this.sale = false;
        this.productCrete.priceInSale = "";
      }
    },

    // reset inputs
    resetinput() {
      this.productCrete.id = "";
      this.productCrete.name = "";
      this.productCrete.price = "";
      this.productCrete.image = "";
      this.productCrete.description = "";
      this.productCrete.procategory = "";
    },
    // get all products
    async getallproducts() {
      let result = await axios.get("http://localhost:3000/products");
      this.all_products = result.data;
    },

    // get all category
    async getallcategory() {
      let result = await axios.get("http://localhost:3000/categoryies");
      this.allCategories = result.data;
    },

    // get product in change category
    async getproducts() {
      let result = await axios.get("http://localhost:3000/products");
      this.all_products = result.data;
      this.all_products = this.all_products.filter((element) => {
        return element.category_name == this.category;
      });
    },

    // create product
    async createProduct() {
      console.log(this.productCrete);

      if (
        this.productCrete.description &&
        this.productCrete.name &&
        this.productCrete.price &&
        this.productCrete.procategory
      ) {
        let result = axios.post("http://localhost:3000/products", {
          productName: this.productCrete.name,
          productPrice: this.productCrete.price,
          productImage: "",
          sectionsName: this.productCrete.sectionsName,
          inSale: this.productCrete.inSale,
          productDescription: this.productCrete.description,
          category_name: this.productCrete.procategory,
          priceInSale: this.productCrete.priceInSale,
        });
        console.log(result);

        this.getallproducts();
      }
      this.resetinput();
    },

    // create category
    createCategory() {
      if (this.categoreAdd) {
        axios.post("http://localhost:3000/categoryies", {
          category_name: this.categoreAdd,
        });
      }
    },

    // delete products
    deleteProduct(id) {
      axios.delete("http://localhost:3000/products/" + id);
      this.getallproducts();
    },

    // get update product
    async updateProduct(id) {
      let result = await axios.get("http://localhost:3000/products/" + id);
      this.theupdatePro = result.data;
      this.productCrete.id = this.theupdatePro.id;
      this.productCrete.name = this.theupdatePro.productName;
      this.productCrete.price = this.theupdatePro.productPrice;
      this.productCrete.description = this.theupdatePro.productDescription;
      this.productCrete.procategory = this.theupdatePro.category_name;
      this.productCrete.productImage = this.theupdatePro.productImage;
      this.productCrete.inSale = this.theupdatePro.inSale;
      this.productCrete.sectionsName = this.theupdatePro.sectionsName;
      this.productCrete.priceInSale = this.theupdatePro.priceInSale;
      if (this.theupdatePro.inSale == "yes") {
        this.sale = true;
      } else {
        this.sale = false;
        this.productCrete.priceInSale = "";
      }
    },

    // /update the product
    updatetheProduct(id) {
      axios.put("http://localhost:3000/products/" + id, {
        productName: this.productCrete.name,
        productPrice: this.productCrete.price,
        productImage: this.productCrete.productImage,
        productDescription: this.productCrete.description,
        category_name: this.productCrete.procategory,
        inSale: this.productCrete.inSale,
        sectionsName: this.productCrete.sectionsName,
        priceInSale: this.productCrete.priceInSale,
      });
      this.resetinput();
      this.getallproducts();
    },
  },
  async mounted() {
    this.getallproducts();
    this.getallcategory();
  },
};
</script>

<style scoped>
.card img {
  height: 170px;
}

.pro_search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #335c67;
  padding: 12px;
  margin-bottom: 30px;
}
.pro_search select {
  width: 178px;
  border-radius: 5px;
  padding: 10px;
  outline: none;
  border: none;
}
.pro_search input {
  padding: 10px;
  border-radius: 10px;
  outline: none;
  border: none;
  width: 332px;
}
.all_products .row {
  padding: 0 15px;
}
.pro_action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
</style>

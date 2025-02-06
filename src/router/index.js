// import AdminCart from "@/views/admin/AdminCart.vue";
import AdminContact from "@/views/admin/AdminContact.vue";
import AdminOrders from "@/views/admin/AdminOrders.vue";
import AdminProducts from "@/views/admin/AdminProducts.vue";
import DashBoard from "@/views/admin/DashBoard.vue";
import OverView from "@/views/admin/OverView.vue";
import LoginView from "@/views/mainView/LoginView.vue";
import NotFound from "@/views/mainView/NotFound.vue";
import SignupView from "@/views/mainView/SignupView.vue";
import AboutView from "@/views/user/AboutView.vue";
import CartView from "@/views/user/CartView.vue";
import ContactView from "@/views/user/ContactView.vue";
import HomeView from "@/views/user/HomeView.vue";
import OrdersView from "@/views/user/OrdersView.vue";
import ProductsView from "@/views/user/ProductsView.vue";
import ViewProduct from "@/views/user/ViewProduct.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // user
  { path: "/", component: SignupView, name: "SignupView" },
  { path: "/login", component: LoginView, name: "LoginView" },
  { path: "/home", component: HomeView, name: "HomeView" },
  { path: "/about", component: AboutView, name: "AboutView" },
  { path: "/cart", component: CartView, name: "CartView" },
  { path: "/contacts", component: ContactView, name: "ContactView" },
  { path: "/orders", component: OrdersView, name: "OrdersView" },
  { path: "/products", component: ProductsView, name: "ProductsView" },
  { path: "/products/:id", component: ViewProduct, name: "ViewProducts" },

  // admin
  {
    path: "/admin",
    component: DashBoard,
    // name: "OverView",
    children: [
      { path: "/admin", component: OverView },
      { path: "adminorders", component: AdminOrders, name: "AdminOrders" },
      {
        path: "adminproducts",
        component: AdminProducts,
        name: "AdminProducts",
      },
      { path: "contacts", component: AdminContact, name: "AdminContact" },
    ],
  },

  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

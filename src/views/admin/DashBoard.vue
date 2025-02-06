<template>
  <div id="dashboard">
    <sidebar-com></sidebar-com>
    <div class="views">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SidebarCom from "@/components/admin/SidebarCom.vue";
export default {
  name: "DashBoard",
  components: {
    SidebarCom,
  },
  setup() {},
};
</script>

<style scoped>
#dashboard {
  display: flex;
  overflow-x: hidden;
  min-height: 100vh;
  color: #fff;
}
#dashboard .views {
  flex-grow: 1;
  /* height: 300vh; */
  /* background: #4; */
  box-sizing: border-box;
  padding-left: 221px;
}
</style>

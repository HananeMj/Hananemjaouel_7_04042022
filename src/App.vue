<template>
  <headerNav />

  <div class="auth-wrapper">
    <div class="auth-inner">
      hello
      <router-view />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import headerNav from "@/components/headerNav.vue";

export default {
  name: "App",
  components: {
    headerNav,
  },

  async created() {
    const response = await axios.get("user", {
      headers: {
        Authorization: "Bearer" + localStorage.getItem("token"),
      },
    });
    this.$store.dispatch("user", response.data);
  },
};
</script>

<style>
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.router-link-exact-active {
  color: #f0391d;
}

@media all and (max-width: 480px) {
  .navbar {
    display: flex;
    align-items: flex-start;
    position: relative;
    flex-direction: column;
  }
  .menu {
    display: block;
    position: absolute;
    right: 15px;
    top: 15px;
  }
  .nav-list {
    display: flex;
    margin: 0;
    list-style-type: none;
    width: 90%;
    text-align: center;
    padding-top: 0;
  }
  .primary-icon {
    height: 50px;
    margin-right: 10px;
    margin-top: 10px;
    margin-top: 0;
    width: 100%;
  }
}
</style>

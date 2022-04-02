<template>
  <nav class="navbar navbar-expand navbar-light">
    <div class="container">
      <router-link to="/">
        <img
          src="../assets/images/logo.png"
          class="primary-icon"
          alt="logo de Groupomania"
      /></router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto" v-if="!user">
          <li class="nav-item">
            <router-link to="/connect" class="nav-link"
              ><font-awesome-icon icon="sign-in-alt" />Se connecter
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link"
              ><font-awesome-icon icon="user-plus" />Créer un compte
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto" v-if="!user">
          <li class="nav-item">
            <a href="javascript:void(0)" @click="handleclick" class="nav-link"
              ><font-awesome-icon icon="sign-in-alt" />Se déconnecter
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "headerNav",
  methods: {
    handleclick() {
      localStorage.removeItem("token");
      this.$store.dispatch("user", null);
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style>
.navbar-expand {
  display: flex;
  justify-content: space-between;
}
.primary-icon {
  height: 50px;
}
.nav-link {
  padding: 20px 10px;
}
</style>

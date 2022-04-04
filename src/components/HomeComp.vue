<template>
  <div class="container">
    <header class="jumbotron">
      <div>
        <h3 v-if="user">Hi, {{ user.username }}</h3>
        <h3 v-if="!user">Vous n'êtes pas connecté !</h3>
      </div>
    </header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HomeComp",
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style></style>

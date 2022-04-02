<template>
  <HomeComp />
  <div class="home">
    <HomeLink msg="Bienvenue sur votre réseau social Groupomania" />
  </div>
</template>

<script>
// @ is an alias to /src

import HomeLink from "@/components/HomeLink.vue";
import HomeComp from "@/components/HomeComp.vue";

export default {
  name: "HomeView",
  components: {
    HomeLink,
    HomeComp,
  },
};
</script>
<style scoped>
img {
  height: 350px;
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>

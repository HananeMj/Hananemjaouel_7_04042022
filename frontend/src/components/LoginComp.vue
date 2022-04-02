<template>
  <div class="col-md-12">
    <div class="card card-container">
      <form @submit.prevent="login()">
        <div class="form-group">
          <label for="email">E-mail</label><br />
          <input
            type="text"
            class="form-control"
            v-model="email"
            name="email"
            placeholder="E-mail"
            required
          />
        </div>
        <br />
        <div class="form-group">
          <label for="password">Mot de passe</label><br />
          <input
            type="password"
            class="form-control"
            name="password"
            v-model="password"
            placeholder="Mot de passe"
            required
          />
        </div>
        <br />
        <div class="form-group">
          <button
            class="btn btn-primary btn-block"
            type="submit"
            aria-label="Se connecter"
          >
            Se connecter
          </button>
        </div>
        <div class="form-group">
          {{ errorMess }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//import store from "@/store";

export default {
  name: "LoginComp",
  components: {},

  data() {
    return {
      email: "",
      password: "",
      errorMess: "",
    };
  },

  methods: {
    async login() {
      if (!this.inputEmail || !this.inputPassword) {
        return (this.errorMess = "Veuillez remplir les champs requis !");
      }

      const response = await axios.post("login", {
        email: this.email,
        password: this.password,
      });
      console.log(response);

      localStorage.setItem("token", response.data.token);
      this.$store.dispatch("user", response.data.user);
      this.$router.push(`/`);

      //.then((res) => {
      //store.state.userLogged = true;
      //localStorage.setItem("token", JSON.stringify(res.data));
      //locationbar.setItem("userId", JSON.stringify(res.data));
      //alert("Vous êtes conneté !");
      //this.$router.push(`/allPosts`); })

      //.catch((err) => {
      //console.log(err);
      //});
      //if (localStorage.getItem("token") !== null) {
      //this.$router.push(`/allPosts`);
      // } else {
      //this.errorMess = "Echec de connexion !";}
    },
  },
};
</script>

<style>
form {
  margin-top: 70px;
}
.btn-primary {
  background-color: #f0391d;
  border: none;
}
.card {
  border: none;
}
.form-group {
  color: #e02103;
}
</style>

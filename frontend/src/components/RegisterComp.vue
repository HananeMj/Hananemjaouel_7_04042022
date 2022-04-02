<template>
  <div class="col-md-12">
    <div class="card card-container">
      <form @submit.prevent="signup()">
        <div class="form-group">
          <label for="username">Pseudo</label><br />
          <input
            type="text"
            v-model="username"
            class="form-control"
            name="username"
            placeholder="Pseudo"
          />
        </div>
        <br />
        <div class="form-group">
          <label for="email">E-mail</label><br />
          <input
            type="text"
            v-model="email"
            class="form-control"
            name="email"
            placeholder="E-mail"
          />
        </div>
        <br />
        <div class="form-group">
          <label for="password">Mot de passe</label><br />
          <input
            type="password"
            v-model="password"
            name="password"
            placeholder="Mot de passe"
            class="form-control"
          />
        </div>
        <br />
        <div class="form-group">
          <button
            class="btn btn-primary btn-block"
            type="submit"
            aria-label="Créer un compte"
          >
            Créer un compte
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

export default {
  name: "RegisterComp",
  components: {},
  data() {
    return {
      username: "",
      email: "",
      password: "",
      errorMess: "",
    };
  },
  methods: {
    async signup() {
      console.log("submitted");
      console.log(this.username);
      /*if (!this.username || !this.email || !this.password) {
        return (this.errorMess = "Veuillez remplir tous les champs requis !");
      }
      const regexText = /^[A-Za-z,.'-]+$/i;
      const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const regexPassword = /^([a-zA-Z0-9@*#]{8,15})$/;

      if (
        regexText.test(this.username) == false &&
        regexEmail.test(this.email) == false &&
        regexPassword.test(this.password) == false
      ) {
        return (this.errorMess =
          "Veuillez remplir correctement les champs requis !");
      } else if (
        regexText.test(this.username) === true &&
        regexEmail.test(this.email) === true &&
        regexPassword.test(this.password) === true
      ) {*/
      const response = await axios.post("signup", {
        username: this.username,
        email: this.email,
        password: this.password,
      });
      console.log(response);

      this.$router.push("/connect");
    },
  },
  //},
};
</script>

<style>
.card {
  width: 70%;
  margin-top: 50px;
  align-items: center;
}
label {
  color: #212529;
  margin-top: 0.5rem;
}
#profile-img {
  border-radius: 50%;
  margin-top: 5px;
}
.form-group {
  width: 300px;
}
.col-md-12 {
  display: flex;
  justify-content: center;
}
</style>

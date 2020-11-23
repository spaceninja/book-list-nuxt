<template>
  <div>
    <h1>Authentication</h1>
    <form v-if="!isLoggedIn">
      <div>
        <label for="email">Email</label>
        <input v-model="formData.email" type="email" autocomplete="username" />
      </div>
      <div>
        <label for="email">Password</label>
        <input
          v-model="formData.password"
          type="password"
          autocomplete="current-password"
        />
      </div>
      <div>
        <button type="button" @click="createUser">Register</button>
        <button type="button" @click="signInUser">Sign In</button>
      </div>
    </form>
    <div v-else>
      <p>You are logged in with {{ authUser.email }}.</p>
      <button type="button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    ...mapState(['authUser']),
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    async createUser() {
      try {
        const user = await this.$fire.auth.createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        );
        console.log('CREATED USER', user);
      } catch (e) {
        alert(e);
      }
    },
    async signInUser() {
      try {
        const user = await this.$fire.auth.signInWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        );
        console.log('LOGGED IN', user);
      } catch (e) {
        alert(e);
      }
    },
    async logout() {
      try {
        await this.$fire.auth.signOut();
        console.log('LOGGED OUT');
      } catch (e) {
        alert(e);
      }
    },
  },
};
</script>

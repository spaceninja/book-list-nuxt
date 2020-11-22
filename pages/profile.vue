<template>
  <div>
    <h1>User Profile</h1>
    <p>This page is only for you.</p>
    <p>Your e-mail is {{ authUser.email }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'basic',
  middleware: 'auth',
  components: {},
  computed: {
    ...mapState(['authUser']),
  },
  methods: {
    async logout() {
      await this.$fire.auth.signOut()
      this.$router.push('/login')
    },
  },
}
</script>

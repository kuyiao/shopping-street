<template>
  <div>
    <login></login>
    <money></money>
    <profile-list></profile-list>
  </div>
</template>

<script>
import Login from "./chidComps/Login";
import Money from "./chidComps/Money";
import profileList from './chidComps/profileList'
export default {
  name: "Profile",
  components: {
    Login,
    Money,
    profileList
  },
};
</script>

<style scoped>
</style>
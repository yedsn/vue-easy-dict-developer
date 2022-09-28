<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted() {
    console.log(this.$dict.getDict('status'))
    console.log(this.$dict.getDictLabel('status', 1))
    console.log(this.$dict.getDictItem('status', 1))
    console.log(this.$dict.getDict('company'))
    console.log(this.$dict.getDictLabel('company', 59))
    console.log(this.$dict.getDictItem('company', 59))
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

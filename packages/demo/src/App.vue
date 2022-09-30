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
  async mounted() {
    await this.$dict.ready
    console.log("获取到字典", this.$dict.getDictData('status'))
    console.log("1", this.$dict.getDict('status', 1))
    console.log("2", this.$dict.getDict('status', 1).raw)
    console.log("3", this.$dict.getDictRaw('status', 1))
    console.log("4", this.$dict.getDictLabel('status', 1))
    await this.$dict.loadDict('company')
    console.log("获取到字典", this.$dict.getDictData('company'))
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

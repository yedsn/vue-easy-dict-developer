<template>
  <div>
    <div v-for="item in company" :key="item.value">
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      company: []
    }
  },
  async created() {
    await this.$dict.loadType('company')
    this.company = this.$dict.getType('company')
  }
}
</script>
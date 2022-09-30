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
    await this.$dict.loadDict('company')
    this.company = this.$dict.getDictData('company')
  }
}
</script>
<template>
  <div>
      <div class="item" v-for="(item, index) in list" :key="index"> 
          <div>姓名：{{ item.name }}</div>
          <div>部门：{{ item.deptName }}</div>
          <div :style="{color: item.statusColor}">状态：{{ item.statusStr }}</div>
    </div>
  </div>
</template>
<script>
  // import { getUserList } from '@/api/user' 
  function getUserList() {
    return {
      data: [
        {
            name: "张三",
            deptId: 1,
            status: 0
        },
        {
            name: "李四",
            deptId: 2,
            status: 1
        }
      ]
    }
  }
  export default {
      data() {
          return {
              list: []
          }
      },
      async mounted() {
          await this.$dict.loadDict('dept') // 等待部门数据加载到字典
          this.getList()
      },
      methods: {
          async getList() {
              let res = getUserList({})
              // 解析并转义字典数据赋值
              this.list = res.data.map(item => {
                   let statusRaw = this.$dict.getDictRaw("status", item.status) // 获取状态对应字典原始对象
                  return {
                      ...item,
                      statusStr: statusRaw.label,
                      statusColor: statusRaw.color,
                      deptName: this.$dict.getDictLabel("dept", item.deptId) // 翻译字典值
                  }
              })
              
          }
      }
  }
</script>
<style scoped>
  .item {
      margin-bottom: 20px;
  }
</style>
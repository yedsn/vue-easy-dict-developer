<template>
  <div>
    <div v-for="item in $dict.getDictData('status')" :key="item.value">
      {{ item.label }}
    </div>
  </div>
</template>

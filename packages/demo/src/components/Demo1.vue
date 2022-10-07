<template>
  <div>
    <div v-for="item in $dict.getType('status')" :key="item.value">
      {{ item.label }}
    </div>
  </div>
</template>

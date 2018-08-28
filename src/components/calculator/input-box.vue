<template>
  <input id="input-box" type="text" size="21" maxlength="21" v-model="value" readonly="readonly">
</template>

<script>
  export default {
    name: 'input-box',
    props: ['inputShow'],
    computed: {
      value: function() {
        return this.inputShow.value
      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <div>home</div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.$emit("title", this.$route.meta);
  },
  methods: {},
};
</script>

<style lang='less' scoped>
</style>
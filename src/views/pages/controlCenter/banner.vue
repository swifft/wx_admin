<template>
  <div>
      <div>
          {{Data[0].create_time}}
      </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
        Data:null
    };
  },
  mounted() {
    this.$emit("title", this.$route.meta);
    this.getData()
  },
  methods: {
      getData(){
          this.$axios.get('https://wxbsapi.gxnudsl.xyz/api/v1/scenery/getList').then(res => {
              console.log(res)
              this.Data = res.data.data
              console.log(this.Data)
          })
      }
  },
};
</script>

<style lang='less' scoped>
</style>
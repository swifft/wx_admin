<template>
    <div class="container">
        <div class="welcome">欢迎使用小程序后台管理系统</div>
        <div class="part_a">
            <div class="left">
                <div class="total">
                    <div class="title">
                        历史合计
                    </div>
                    <div class="content_card">
                        <div class="content_card_item">
                            请求总数：1111
                        </div>
                        <div class="content_card_item">
                            POST请求：1111
                        </div>
                        <div class="content_card_item">
                            GET请求：1111
                        </div>
                        <div class="content_card_item">
                            访客合计：1111
                        </div>
                    </div>
                </div>
                <div class="today">
                    <div class="title">
                        今日合计
                    </div>
                    <div class="content_card">
                        <div class="content_card_item">
                            请求总数：1111
                        </div>
                        <div class="content_card_item">
                            POST请求：1111
                        </div>
                        <div class="content_card_item">
                            GET请求：1111
                        </div>
                        <div class="content_card_item">
                            访客合计：1111
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">

            </div>
        </div>

    </div>
</template>

<script>
  import config from '../../untils/base'

export default {
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.$emit("title", this.$route.meta);
    this.getLogger();
    this.getData()
  },
  methods: {
    getLogger(){
      this.$axios.get(`${config.address}/api/v1/welcome`).then((res)=>{
        console.log(res)
      })
    },
    getData(){
        this.$axios.get(`${config.address}/api/v1/system/getVisitTotalAll`).then((res)=>{
            console.log('/system',res)
        })
    }
  },
};
</script>

<style lang='less' scoped>
    .welcome{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
        font-weight: bold;
        font-size: 24px;
        font-family: "楷体";
    }

    .part_a{
        display: flex;

        .left{
            .today{
                display: flex;
                padding: 0 30px;
                height: 100px;
                margin-top: 20px;

                .title{
                    line-height: 100px;
                    padding: 0 10px;
                    background-color: #F56C6C;
                    border-radius: 24px 0 0 24px;
                }

                .content_card{
                    padding: 0 20px;
                    display: flex;
                    align-items: center;
                    background-color: #ffffff;
                    border-radius: 0 24px 24px 0;

                    .content_card_item{
                        margin: 10px;
                        padding: 10px 20px;
                        border-radius: 24px;
                        background-color: #C0C4CC;
                        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
                    }
                }
            }

            .total{
                display: flex;
                padding: 0 30px;
                height: 100px;

                .title{
                    line-height: 100px;
                    padding: 0 10px;
                    background-color: #F56C6C;
                    border-radius: 24px 0 0 24px;
                }

                .content_card{
                    padding: 0 20px;
                    display: flex;
                    align-items: center;
                    background-color: #ffffff;
                    border-radius: 0 24px 24px 0;

                    .content_card_item{
                        margin: 10px;
                        padding: 10px 20px;
                        border-radius: 24px;
                        background-color: #C0C4CC;
                        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
                    }
                }
            }
        }

        .right{

        }
    }


</style>
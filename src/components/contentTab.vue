<template>
    <div class="box">
        <div class="box_card">
          <div class="left">
              <div>
                  <strong>当前位置：</strong><el-link :underline="false" href="/">首页</el-link>
              </div>
              <div v-for="item in meta">
                  /<el-link :underline="false" :href="item.url" v-if="item.url">{{item.name}}</el-link>
                  <span v-else>{{item.name}}</span>
              </div>
          </div>
            <div class="right" v-if="nowTime"><strong>当前时间：</strong>{{nowTime}}</div>
            <div class="right" v-else>
                <i class="el-icon-loading"></i>
            </div>
        </div>
        <div class="content">
            <router-view @title="getTitle"></router-view>
        </div>
    </div>
</template>

<script>
    import loadsh from 'loadsh'

    export default {
        components: {},
        data() {
            return {
                nowTime: "",
                meta:{}
            };
        },
        mounted() {
            setInterval(() => {
                this.nowTime = this.$moment().format("YYYY-MM-DD HH:mm:ss");
            }, 1000);
        },
        methods:{
            getTitle(val){
                this.meta = val.opinions ? val.opinions : val[0].opinions
                if (loadsh.includes(this.meta,'actionType')){
                    switch (val[1].actionType) {
                        case "add":this.meta[2].name = '添加' + this.meta[2].name;break;
                        case "edit":this.meta[2].name = '编辑' + this.meta[2].name;break;
                        default:break;
                    }
                }
            }
        }
    };
</script>

<style lang='less' scoped>
    .el-link{
        margin: 0 5px;
    }
    .box {
        height: 100%;

        .box_card {
            height: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 50px;
            background-color: white;

            .left{
                display: flex;
                strong{
                    font-size: 14px;
                }
                span{
                    color: #606266;
                    font-weight: 500;
                    font-size: 14px;
                    margin: 0 5px;
                }
            }

            .right {
                font-size: 12px;
                color: rgba(0, 0, 0, 0.65);
                strong{
                    font-size: 14px;
                }
            }
        }
        .content{
            padding: 10px 0;
        }
    }
</style>
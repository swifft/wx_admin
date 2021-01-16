<template>
    <div>
        <el-card style="height: 735px;overflow: auto">
            <div slot="header">
                <span class="top_title">前后端应用接口信息（毕业设计） <strong style="font-size: 12px;color: #F56C6C">Tips:基地址（https://wxbsapi.gxnudsl.xyz）</strong></span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="getAction" v-if="user.authority === 1">添加接口</el-button>
            </div>
            <div class="content_title_0">
                PC端
            </div>
            <el-collapse accordion style="padding: 0 15px" v-if="dataPC">
                <el-collapse-item v-for="(item, index) in dataPC" :key="index">
                    <template slot="title" v-if="item.sort">
                        <div style="font-size: 16px;">{{item.sort}} <span style="font-weight: bold;margin-left: 30px;font-size: 14px;color: #909399">统一前缀：{{item.data[0].prefix}}</span></div>
                    </template>
                    <div class="apiMain" v-for="(i_item, i_index) in item.data" :key="i_index">
                        <div class="left">
                            <div class="type">{{i_item.methods}}</div>
                        </div>
                        <div class="right">
                            <div class="url">
                                {{i_item.url}}
                                <el-button icon="el-icon-document-copy" type="text" @click="copy(i_item.url)"
                                           class="copy" size="mini"></el-button>
                            </div>
                            <div class="desc">{{i_item.desc}}</div>
                            <el-button @click="edit(i_item._id)" size="mini" v-if="user.authority === 1">编辑</el-button>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <div class="content_title_1">
                小程序端
            </div>
            <el-collapse accordion style="padding: 0 15px" v-if="dataMiniApp">
                <el-collapse-item v-for="(item, index) in dataMiniApp" :key="index">
                    <template slot="title" v-if="item.sort">
                        <div style="font-size: 16px;">{{item.sort}} <span style="font-weight: bold;margin-left: 20px;font-size: 14px">统一前缀：{{item.data[0].prefix}}</span></div>
                    </template>
                    <div class="apiMain" v-for="(i_item, i_index) in item.data" :key="i_index">
                        <div class="left">
                            <div class="type">{{i_item.methods}}</div>
                        </div>
                        <div class="right">
                            <div class="url">
                                {{i_item.url}}
                                <el-button icon="el-icon-document-copy" type="text" @click="copy(i_item.url)"
                                           class="copy" size="mini"></el-button>
                            </div>
                            <div class="desc">{{i_item.desc}}</div>
                            <el-button @click="edit(i_item._id)" size="mini" v-show="user.authority === 1">编辑</el-button>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <div class="content_title_1 showEcharts">
                <div id="myChart" style="height:300px;width: 500px"></div>
                <div class="bottom_total" v-if="totalData">
                    总计：{{totalData.total}} 个接口
                    <div style="margin-top: 30px">
                        更多接口详情，请转至接口的文档
                        <el-button style="margin-left: 5px" type="text" icon="el-icon-s-promotion"
                                   @click="getApiArticle"></el-button>
                    </div>
                </div>

            </div>
        </el-card>
    </div>
</template>

<script>
    import Clipboard from 'clipboard'
    import base from '@/untils/base'

    export default {
        data() {
            return {
                dataPC: [],
                dataMiniApp: [],
                totalData: null,
                user: null
            }
        },
        created() {
            this.user = this.$cookie.getJSON('user').userInfo
            this.$emit("title", this.$route.meta);
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                this.$axios.all([
                    this.$axios.get(`${base.address}/api/v1/getAPI/PC`),
                    this.$axios.get(`${base.address}/api/v1/getAPI/miniApp`),
                    this.$axios.get(`${base.address}/api/v1/getAPI/total`)
                ]).then(this.$axios.spread((PC, miniApp, total) => {
                    if (PC.data.code === 200 && miniApp.data.code === 200 && total.data.code === 200) {
                        this.totalData = total.data.data
                        this.getAllBySort(PC.data.data,miniApp.data.data)
                    }
                }))

            },
            getAllBySort(list_pc,list_miniApp){
                list_pc.forEach(item =>{
                    this.$axios.get(`${base.address}/api/v1/getAPI/allApiBySort?sort=${item}`).then(res =>{
                        if (res.data.code === 200){
                            let newData = {
                                sort:item,
                                data:res.data.data
                            }
                            this.dataPC.push(newData)
                        }else {
                            this.$message.error('网络请求异常，请联系管理员')
                        }
                    })
                })
                list_miniApp.forEach(item =>{
                    this.$axios.get(`${base.address}/api/v1/getAPI/allApiBySort?sort=${item}`).then(res =>{
                        if (res.data.code === 200){
                            let newData = {
                                sort:item,
                                data:res.data.data
                            }
                            this.dataMiniApp.push(newData)
                        }else {
                            this.$message.error('网络请求异常，请联系管理员')
                        }
                    })
                })
                this.drawLine()
            },
            copy(text) {
                let clipboard = new Clipboard('.copy', {
                    text: function () {
                        return text
                    }
                })
                clipboard.on('success', e => {
                    this.$message({message: '复制成功', showClose: true, type: 'success'})
                    // 释放内存
                    clipboard.destroy()
                })
                clipboard.on('error', e => {
                    this.$message({message: '复制失败,', showClose: true, type: 'error'})
                    clipboard.destroy()
                })
            },
            drawLine() {
                let myChart = this.$echarts.init(document.getElementById('myChart'), "myTheme")
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '接口类型统计',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['GET类型接口', 'POST类型接口']
                    },
                    series: [
                        {
                            name: '接口类型统计',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                {value: this.totalData.post, name: 'POST类型接口'},
                                {value: this.totalData.get, name: 'GET类型接口'},
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            getApiArticle() {
                window.open("https://wxbsapi.gxnudsl.xyz", '_blank')
            },
            getAction() {
                this.$router.push({path: '/dataCenter/interfaceTotal/interfaceAction',query:{type:'add'}})
            },
            edit(id) {
                this.$router.push({path: '/dataCenter/interfaceTotal/interfaceAction',query:{id:id,type:'edit'}})
            }
        }
    }
</script>

<style scoped lang="less">
    .top_title {
        font-size: 22px;
        font-weight: bold;
        font-family: "楷体";
    }

    .content_title_0 {
        margin: 0 15px 15px 15px;
        font-size: 18px;
        font-weight: bold;
        font-family: "楷体";
    }

    .content_title_1 {
        margin: 15px;
        font-size: 18px;
        font-weight: bold;
        font-family: "楷体";
    }

    .apiMain {
        display: flex;
        height: 30px;
        margin: 10px 0;

        .left {
            height: 100%;
            width: 50px;

            .type {
                text-align: center;
                line-height: 30px;
                height: 100%;
                background-color: #10a54a;
                color: #ffffff;
            }
        }

        .right {
            height: 100%;
            flex: 1;
            display: flex;
            justify-content: space-between;
            line-height: 30px;
            background-color: #e7f6ec;

            .url {
                margin-left: 20px;
                font-size: 18px;
                display: flex;

                .copy {
                    margin-left: 20px;
                }
            }

            .desc {
                color: #10a54a;
                margin-right: 20px;
            }
        }
    }

    .showEcharts {
        display: flex;
        margin-left: 30px;

        .bottom_total {
            flex: 1;
            margin-top: 20px;
        }
    }


</style>
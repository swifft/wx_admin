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
                            请求总数：{{total.sum}}
                        </div>
                        <div class="content_card_item">
                            POST请求：{{total.post}}
                        </div>
                        <div class="content_card_item">
                            GET请求：{{total.get}}
                        </div>
                        <div class="content_card_item">
                            访客合计：{{getVisitTotalAll}}
                        </div>
                    </div>
                </div>
                <div class="today">
                    <div class="title">
                        今日合计
                    </div>
                    <div class="content_card">
                        <div class="content_card_item">
                            请求总数：{{today.sum}}
                        </div>
                        <div class="content_card_item">
                            POST请求：{{today.post}}
                        </div>
                        <div class="content_card_item">
                            GET请求：{{today.get}}
                        </div>
                        <div class="content_card_item">
                            访客合计：{{getVisitTotal}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <el-card style="height: 220px;">
                    <div slot="header" class="header">
                        服务器信息
                    </div>
                    <div class="content">
                        <div class="left">
                            <div class="runTime">
                                网站已安全运行<strong style="color: #F56C6C;margin: 0 2px">{{getRunTime}}</strong>天
                            </div>
                            <div class="runTime" v-if="systemInfo">
                                操作系统：{{systemInfo.platform}}
                            </div>
                        </div>
                        <div class="right">
                            <div class="runTime" v-if="systemInfo">
                                可用内存：{{systemInfo.freemem}}
                            </div>
                            <div class="runTime" v-if="systemInfo">
                                总内存：{{systemInfo.totalmem}}
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="part_b" >
            <div id="myChart" :style="{width: '100%', height: '450px'}"></div>
        </div>
    </div>
</template>

<script>
    import config from '../../untils/base'

    export default {

        components: {},
        data() {
            return {
                getVisitTotalAll: null,
                getVisitTotal: null,
                total: {
                    post: null,
                    get: null,
                    sum: null
                },
                today: {
                    post: null,
                    get: null,
                    sum: null
                },
                getRunTime: null,
                systemInfo: null
            };
        },
        mounted() {
            this.$emit("title", this.$route.meta);
            this.getLogger();
            this.getData();
        },
        methods: {
            getLogger() {
                this.$axios.get(`${config.address}/api/v1/welcome`)
            },
            getData() {
                this.$axios.all([
                    this.$axios.get(`${config.address}/api/v1/system/getVisitTotalAll`),
                    this.$axios.get(`${config.address}/api/v1/system/getVisitTotal`),
                    this.$axios.get(`${config.address}/api/v1/system/getSystem`),
                    this.$axios.get(`${config.address}/api/v1/system/getSystemAll`),
                    this.$axios.get(`${config.address}/api/v1/system/getRunTime`),
                    this.$axios.get(`${config.address}/api/v1/system/getSystemInfo`),
                    this.$axios.get(`${config.address}/api/v1/system/getVitalInfo`)
                ]).then(this.$axios.spread((getVisitTotalAll, getVisitTotal, getSystem, getSystemAll, getRunTime, getSystemInfo, getVitalInfo) => {
                    if (getVisitTotalAll.data.code === 200 && getVisitTotal.data.code === 200 & getSystem.data.code === 200 & getSystemAll.data.code === 200 & getRunTime.data.code === 200 & getSystemInfo.data.code === 200 & getVitalInfo.data.code === 200) {
                        getVisitTotalAll.data.data.forEach(item => {
                            this.getVisitTotalAll = this.getVisitTotalAll + item.visitTotal.length
                        })
                        getSystemAll.data.data.result.forEach(item => {
                            this.total.get = this.total.get + item.getCount
                            this.total.post = this.total.post + item.postCount
                            this.total.sum = this.total.sum + item.getCount + item.postCount
                        })
                        this.today.sum = getSystem.data.data.total
                        this.today.get = getSystem.data.data.result.getCount
                        this.today.post = getSystem.data.data.result.postCount
                        this.getVisitTotal = getVisitTotal.data.data.count
                        this.getRunTime = getRunTime.data.data
                        this.systemInfo = getSystemInfo.data.data
                        let params_1 = []
                        let params_2 = []
                        let params_3 = []
                        let params_4 = []
                        getVitalInfo.data.data.forEach(item =>{
                            params_1.push(item.date)
                            params_2.push(item.visitTotal.length)
                            params_3.push(item.getCount)
                            params_4.push(item.postCount)
                        })
                        this.drawLine(params_1,params_2,params_3,params_4);
                    } else {
                        this.$message.error("服务器错误，请联系管理员！！！")
                    }
                }))
            },
            drawLine(params_1,params_2,params_3,params_4){
                console.log(params_4,params_3,params_2,params_1)
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'), "myTheme")
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '网站数据统计',
                        textStyle:{
                            fontFamily:"楷体",
                            fontSize:22
                        }
                    },
                    dataZoom : [
                        {
                            type: 'slider',
                            show: true,
                            start: 0,
                            end: 100,
                            handleSize: 8
                        },
                        {
                            type: 'inside',
                            start: 0,
                            end: 100
                        }
                    ],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['访问量', 'get请求','post请求']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: params_1,
                        axisLabel: {
                            margin: 15,//距离
                            interval: 0,
                            rotate: 30,//倾斜度
                        },
                        triggerEvent: true
                    },
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '访问量',
                            type: 'bar',
                            data: params_2
                        },
                        {
                            name: 'get请求',
                            type: 'bar',
                            data: params_3
                        },
                        {
                            name: 'post请求',
                            type: 'bar',
                            data: params_4
                        }
                    ]
                });
            }
        },
    };
</script>

<style lang='less' scoped>
    .welcome {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
        font-weight: bold;
        font-size: 24px;
        font-family: "楷体";
    }

    .part_a {
        display: flex;
        padding: 0 30px;
        height: 220px;

        .left {
            .today {
                display: flex;
                height: 100px;
                margin-top: 20px;

                .title {
                    line-height: 100px;
                    padding: 0 10px;
                    background-color: #F56C6C;
                    border-radius: 24px 0 0 24px;
                }

                .content_card {
                    padding: 0 20px;
                    display: flex;
                    align-items: center;
                    background-color: #ffffff;
                    border-radius: 0 24px 24px 0;

                    .content_card_item {
                        margin: 10px;
                        padding: 10px 20px;
                        border-radius: 24px;
                        background-color: #C0C4CC;
                        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
                    }
                }
            }

            .total {
                display: flex;
                height: 100px;

                .title {
                    line-height: 100px;
                    padding: 0 10px;
                    background-color: #F56C6C;
                    border-radius: 24px 0 0 24px;
                }

                .content_card {
                    padding: 0 20px;
                    display: flex;
                    align-items: center;
                    background-color: #ffffff;
                    border-radius: 0 24px 24px 0;

                    .content_card_item {
                        margin: 10px;
                        padding: 10px 20px;
                        border-radius: 24px;
                        background-color: #C0C4CC;
                        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
                    }
                }
            }
        }

        .right {
            flex: 1;
            margin-left: 20px;

            .header {
                font-family: "楷体";
                font-size: 20px;
                font-weight: bold;
            }

            .content {
                display: flex;
                justify-content: space-between;

                .right {
                    margin-left: 150px;
                }

                .runTime {
                    margin: 20px 0;
                    font-size: 17px;
                    font-family: "微软雅黑";
                    font-style: italic;
                }
            }


        }
    }

    .part_b{
        margin-top: 10px;
    }
</style>
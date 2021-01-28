<template>
    <div class="container">
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>景点信息列表</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="addScenery">添加景点</el-button>
            </div>
            <el-table
                    :data="tableData"
                    v-loading="tableLoading"
                    element-loading-text="拼命加载中"
            >
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <div class="box">
                            <div class="box_list">
                                <div class="box_title">
                                    景点英文名称：
                                </div>
                                <div class="box_content">
                                    {{ props.row.name_en }}
                                </div>
                            </div>
                            <div class="box_list">
                                <div class="box_title">
                                    景点官方网站：
                                </div>
                                <div class="box_content">
                                    {{ props.row.official_website }}
                                </div>
                            </div>
                            <div class="box_list">
                                <div class="box_title">
                                    景点官方电话：
                                </div>
                                <div class="box_content">
                                    <div v-for="(item,index) in props.row.official_phone" :key="index">
                                        {{ item }}
                                    </div>
                                </div>
                            </div>
                            <div class="box_list">
                                <div class="box_title">
                                    景点排名：
                                </div>
                                <div class="box_content">
                                    {{ props.row.survey_sort }}
                                </div>
                            </div>
                            <div class="box_list">
                                <div class="box_title">
                                    景点概述：
                                </div>
                                <div class="box_content">
                                    {{ props.row.survey[0] }}
                                </div>
                            </div>
                            <div class="box_list">
                                <div class="box_title">
                                    景点用时建议：
                                </div>
                                <div class="box_content">
                                    {{ props.row.time_propose }}
                                </div>
                            </div>
                            <div class="box_list">
                                <div class="box_title">
                                    景点游玩贴士：
                                </div>
                                <div class="box_content">
                                    {{ props.row.play_tips[0] }}
                                </div>
                            </div>
                            <div class="box_list">
                                <div class="box_title">
                                    景点服务设施：
                                </div>
                                <div class="box_content">
                                    {{ props.row.service_facilities[0] }}
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="景点ID"
                        prop="_id"
                        width="250"
                >
                </el-table-column>
                <el-table-column
                        label="景点名称"
                        prop="name"
                        width="130"
                >
                </el-table-column>
                <el-table-column
                        label="景点人气"
                        prop="popularity"
                        width="200"
                >
                </el-table-column>
                <el-table-column
                        label="景点官方网站"
                        prop="official_website"
                        width="200"
                >
                </el-table-column>
                <el-table-column
                        label="景点开放时间"
                        prop="open_time"
                        width="500"
                >
                </el-table-column>
                <el-table-column
                        label="景点用时建议"
                        prop="time_propose"
                        width="150"
                >
                </el-table-column>
                <el-table-column
                        label="景点评分"
                        prop="score"
                        width="100"
                >
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editData(scope.row._id)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    import base from "@/untils/base";
    import loadsh from 'loadsh';
    import isPower from "../../../untils/userPower";

    export default {
        data() {
            return {
                tableLoading:false,
                tableData: []
            }
        },
        mounted() {
            this.$emit("title", this.$route.meta);
            this.getData()
        },
        methods: {
            getData() {
                this.tableLoading = true
                this.$axios.get(base.address + '/api/v1/scenery/getList_PC').then(res => {
                    console.log(res)
                    if (res.data.code === 200) {
                        this.tableData = res.data.data
                        this.tableData.forEach(item => {
                            item.official_phone = loadsh.split(item.official_phone, '&')
                            item.play_tips = loadsh.split(item.play_tips, '&')
                            item.survey = loadsh.split(item.survey, '&')
                            item.travel_season = loadsh.split(item.travel_season, '&')
                            item.service_facilities = loadsh.split(item.service_facilities, '&')
                            item.traffic_propose = JSON.parse(item.traffic_propose)
                        })
                    }
                    this.tableLoading = false
                })
            },
            addScenery() {
                if (isPower()){
                    this.$router.push({
                        path: '/controlCenter/scenery/sceneryAction',
                        query: {
                            actionType: 'add'
                        }
                    })
                }
            },
            editData(id){
                if (isPower()){
                    this.$router.push({
                        path: '/controlCenter/scenery/sceneryAction',
                        query: {
                            actionType: 'edit',
                            id:id
                        }
                    })
                }
            }
        }
    }
</script>

<style lang='less' scoped>
    .container {
        width: 100%;

        .el-card {

            .title {
                font-size: 16px;
                font-weight: bold;
            }

            .box {
                margin-top: 10px;
                display: flex;
                flex-wrap: wrap;
                padding: 0 5px;
                justify-content: space-between;
                box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

                .box_list {
                    width: 50%;
                    display: flex;
                    align-items: center;
                    margin: 10px 0;

                    .box_title {
                        font-size: 16px;
                        color: #99a9bf;
                    }

                    .box_content {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }

    }
</style>
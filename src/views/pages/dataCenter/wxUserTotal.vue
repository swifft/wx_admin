<template>
    <div>
        <el-card style="height: 735px;overflow: auto">
            <div slot="header">
                <span class="top_title">微信小程序用户列表</span>
            </div>
            <el-table
                    :data="tableData"
            >
                <el-table-column
                        label="日期"
                        width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.create_time}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="账号"
                        width="200">
                    <template slot-scope="scope">
                        <span>{{ scope.row.account ? scope.row.account : '暂无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="nickName"
                        label="昵称"
                        width="260">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="性别"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="userId"
                        label="userId"
                        width="200">
                </el-table-column>
                <el-table-column
                        label="openId"
                        width="300">
                    <template slot-scope="scope">
                        <span>{{ scope.row.openId ? scope.row.openId : '暂无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="头像">
                    <template slot-scope="scope">
                        <el-image
                                style="width: 50px; height: 50px"
                                :src="scope.row.avatarUrl"
                                :preview-src-list="[scope.row.avatarUrl]">
                        </el-image>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    style="padding-top: 10px"
                    background
                    layout="prev, pager, next, jumper"
                    :page-size="6"
                    :total="total"
                    @current-change="getCurrentPage"
            >
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    import base from '../../../untils/base'

    export default {
        data(){
            return{
                total:0,
                tableData:null
            }
        },
        mounted() {
            this.$emit("title", this.$route.meta);
            this.getData()
        },
        methods:{
            getData(page = 1){
                this.tableData = []
                this.$axios.get(`${base.address}/api/v1/wxUser/PC/getAll?pageSize=6&page=${page}`).then(res => {
                    if (res.data.code === 200) {
                        this.tableData = res.data.data.list
                        this.total = res.data.data.total
                        this.tableData.forEach(item => {
                            item.create_time = this.$moment(item.create_time).format("YYYY-MM-DD HH:mm:ss");
                        })
                        console.log(res.data.data,this.total)
                    }
                })
            },
            getCurrentPage(e){
                this.getData(e)
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
</style>
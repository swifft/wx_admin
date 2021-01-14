<template>
    <div class="container">
        <el-tabs type="border-card">
            <el-tab-pane label="未审核">
                <el-table
                        :data="tableData"
                        height="650"
                >
                    <el-table-column
                            label="日期"
                            width="180">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.create_time}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="文章插图"
                            width="180">
                        <template slot-scope="scope">
                            <el-link :underline="false"  type="primary" @click="previewImg(scope.row.imagesURL)">预览</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="昵称"
                            width="180">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>昵称: {{ scope.row.wxUser_id.nickName }}</p>
                                <p>openId: {{ scope.row.wxUser_id.openId }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.wxUser_id.nickName }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="已审核">消息中心</el-tab-pane>
            <el-tab-pane label="审核中">角色管理</el-tab-pane>
            <el-tab-pane label="审核不通过">定时任务补偿</el-tab-pane>
        </el-tabs>
        <image-viewer :z-index="zIndex" :initial-index="imageIndex" v-if="showViewer" :on-close="closeViewer" :url-list="previewSrcList"/>
    </div>
</template>

<script>
    import base from '../../../untils/base'
    import ImageViewer from 'element-ui/packages/image/src/image-viewer'

    let prevOverflow = '';

    export default {
        data() {
            return {
                tableData: [],
                previewSrcList:[],
                showViewer:false,
                zIndex: {
                    type: Number,
                    default: 2000
                }
            }
        },
        components: {
            ImageViewer
        },
        mounted() {
            this.$emit("title", this.$route.meta);
            this.getData()
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            getData(status = 0){
                this.$axios.get(`${base.address}/api/v1/records/PC/getAll?status=${status}`).then(res =>{
                    if (res.data.code === 200){
                        console.log(res.data.data)
                        this.tableData = res.data.data
                        this.tableData.forEach(item =>{
                            item.create_time = this.$moment(item.create_time).format("YYYY-MM-DD");
                        })
                    }
                })
            },
            previewImg(imagesURL){
                console.log(imagesURL)
                this.previewSrcList = imagesURL
                prevOverflow = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
                this.showViewer = true;
            },
            closeViewer() {
                document.body.style.overflow = prevOverflow;
                this.showViewer = false;
            },
            imageIndex() {
                let previewIndex = 0;
                const srcIndex = this.previewSrcList.indexOf(this.src);
                if (srcIndex >= 0) {
                    previewIndex = srcIndex;
                }
                return previewIndex;
            }
        }
    }
</script>

<style scoped lang="less">
    .container {
        height: 100%;
        padding: 0 30px;
    }
</style>
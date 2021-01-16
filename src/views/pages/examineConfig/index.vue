<template>
    <div class="container">
        <el-tabs type="border-card" @tab-click="tabsChange">
            <el-tab-pane label="未审核">
                <el-table
                        :data="tableData"
                        height="650"
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
                            prop="wxUser_id.openId"
                            label="openId"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="wxUser_id.nickName"
                            label="昵称"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="发布地址"
                            width="260">
                    </el-table-column>
                    <el-table-column
                            label="文章内容"
                            width="150">
                        <template slot-scope="scope">
                            <el-link :underline="false" type="primary" @click="previewArticle(scope.row.contentHtml)">
                                查看
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="文章插图"
                            width="150">
                        <template slot-scope="scope">
                            <el-link :underline="false" type="primary" @click="previewImg(scope.row.imagesURL)">预览
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="success"
                                    @click="getExamine(scope.row._id,1)">发起审核
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="审核中">
                <el-table
                        :data="tableData"
                        height="650"
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
                            prop="wxUser_id.openId"
                            label="openId"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="wxUser_id.nickName"
                            label="昵称"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="发布地址"
                            width="260">
                    </el-table-column>
                    <el-table-column
                            label="文章内容"
                            width="150">
                        <template slot-scope="scope">
                            <el-link :underline="false" type="primary" @click="previewArticle(scope.row.contentHtml)">
                                查看
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="文章插图"
                            width="150">
                        <template slot-scope="scope">
                            <el-link :underline="false" type="primary" @click="previewImg(scope.row.imagesURL)">预览
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="success"
                                    @click="getExamine(scope.row._id,2)">通过
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="getNoExamine(scope.row._id)">不通过
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="审核通过">
                <el-table
                        :data="tableData"
                        height="650"
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
                            prop="wxUser_id.openId"
                            label="openId"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="wxUser_id.nickName"
                            label="昵称"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="发布地址"
                            width="260">
                    </el-table-column>
                    <el-table-column
                            label="文章内容"
                            width="150">
                        <template slot-scope="scope">
                            <el-link :underline="false" type="primary" @click="previewArticle(scope.row.contentHtml)">
                                查看
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="文章插图">
                        <template slot-scope="scope">
                            <el-link :underline="false" type="primary" @click="previewImg(scope.row.imagesURL)">预览
                            </el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="审核不通过">
                <el-table
                        :data="tableData"
                        height="650"
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
                            prop="wxUser_id.openId"
                            label="openId"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="wxUser_id.nickName"
                            label="昵称"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="发布地址"
                            width="260">
                    </el-table-column>
                    <el-table-column
                            label="文章内容"
                            width="150">
                        <template slot-scope="scope">
                            <el-link :underline="false" type="primary" @click="previewArticle(scope.row.contentHtml)">
                                查看
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="文章插图"
                            width="150">
                        <template slot-scope="scope">
                            <el-link :underline="false" type="primary" @click="previewImg(scope.row.imagesURL)">预览
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="statusTips"
                            label="原因">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <photo-swiper :images="imgPreviewList" @close="imgPreviewClose" :pageIndex="{ position: 'center' }"
                      :visible="isShowImgPreview"></photo-swiper>
        <el-dialog
                title="文章内容"
                :center="true"
                :visible="isShowDialog"
                :close-on-click-modal="false"
                @close="dialogClose">
            <div v-html="previewArticleContent"></div>
        </el-dialog>
        <el-dialog
                title="请输入不通过的理由"
                :center="true"
                width="30%"
                :visible="isShowNoExamine"
                :close-on-click-modal="false">
            <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    :autosize="{ minRows: 3 }"
                    v-model="form.statusTips">
            </el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="isShowNoExamine = false">取 消</el-button>
              <el-button type="primary" @click="noExamineSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import base from '../../../untils/base'

    export default {
        data() {
            return {
                tableData: [],
                isShowImgPreview: false,
                imgPreviewList: [],
                isShowDialog:false,
                isShowNoExamine:false,
                previewArticleContent:null,
                form:{
                    id:null,
                    statusTips:null
                }
            }
        },
        mounted() {
            this.$emit("title", this.$route.meta);
            this.getData()
        },
        methods: {
            tabsChange(tab) {
                this.getData(tab.index)
            },
            getData(status = 0) {
                this.tableData = []
                this.$axios.get(`${base.address}/api/v1/records/PC/getAll?status=${status}`).then(res => {
                    if (res.data.code === 200) {
                        this.tableData = res.data.data
                        this.tableData.forEach(item => {
                            item.create_time = this.$moment(item.create_time).format("YYYY-MM-DD HH:mm:ss");
                        })
                    }
                })
            },
            previewImg(imagesURL) {
                this.imgPreviewList = []
                let newImagesURL = {}
                let newImagesURLList = []
                imagesURL.forEach(item => {
                    newImagesURL.src = item
                    newImagesURL.w = 1920
                    newImagesURL.h = 1080
                    newImagesURLList.push(newImagesURL)
                })
                this.imgPreviewList = newImagesURLList
                this.isShowImgPreview = true
            },
            imgPreviewClose() {
                this.isShowImgPreview = false
            },
            previewArticle(article) {
                this.previewArticleContent = article
                this.isShowDialog = true
            },
            dialogClose(){
                this.isShowNoExamine = false,
                this.isShowDialog = false
            },
            getExamine(id,status){
                this.$confirm( status === 1 ? '发起文章审核, 是否继续?' : '文章审核通过, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(id)
                    const params = {
                        id : id,
                        status: status
                    }
                    this.$axios.post(`${base.address}/api/v1/records/PC/editStatus`,params).then(res => {
                        if (res.data.code === 200) {
                            this.$notify.success({
                                title: '提示',
                                showClose: false,
                                message: '请求成功,正在刷新列表。。。',
                                duration: 1000,
                                onClose:()=>{
                                    this.getData(status - 1)
                                }
                            });
                        }
                    })
                }).catch(()=>{})
            },
            getNoExamine(id){
                this.isShowNoExamine = true
                this.form.id = id

            },
            noExamineSubmit(){
                this.isShowNoExamine = false
                this.form.status = 3
                this.$axios.post(`${base.address}/api/v1/records/PC/editStatus`,this.form).then(res => {
                    if (res.data.code === 200) {
                        this.$notify.success({
                            title: '提示',
                            showClose: false,
                            message: '请求成功,正在刷新列表。。。',
                            duration: 1000,
                            onClose:()=>{
                                this.getData(1)
                            }
                        });
                    }
                })
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
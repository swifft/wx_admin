<template>
    <div class="container">
        <el-card v-loading="pageLoading"
                 element-loading-text="拼命加载中"
        >
            <div slot="header">
                <span>{{actionType === 'add' ? '添加景点' : '编辑景点' }}</span>
            </div>
            <el-form label-width="300px" :model="form" :rules="rules" ref="form">
                <el-form-item label="景点名称：" prop="name">
                    <el-input placeholder="请输入景点名称(中英文请用“ & ”分割)" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="景点官方网站：">
                    <el-input placeholder="请输入景点官方网站(多个网站请用“ & ”分割)" v-model="form.official_website"></el-input>
                </el-form-item>
                <el-form-item label="景点官方电话：">
                    <el-input placeholder="请输入景点官方电话(多个号码请用“ & ”分割)" v-model="form.official_phone"></el-input>
                </el-form-item>
                <el-form-item label="景点排名：">
                    <el-input-number v-model="form.survey_sort" controls-position="right" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="景点星级：">
                    <el-rate v-model="form.survey_start" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                             style="line-height: 50px"></el-rate>
                </el-form-item>
                <el-form-item label="景点人气：">
                    <el-input placeholder="请输入景点人气" v-model="form.popularity"></el-input>
                </el-form-item>
                <el-form-item label="景点评分：">
                    <el-input-number v-model="form.score" controls-position="right" :min="1" :max="5" :precision="1"
                                     :step="0.1"></el-input-number>
                </el-form-item>
                <el-form-item label="景点用时建议：">
                    <el-input placeholder="请输入景点用时建议(分段请用“ & ”分割)" v-model="form.time_propose"></el-input>
                </el-form-item>
                <el-form-item label="景点概述：" prop="survey" style="width: 90%;">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 2}"
                            placeholder="请输入景点概述(分段请用“ & ”分割)"
                            v-model="form.survey"
                    ></el-input>
                </el-form-item>
                <el-form-item label="景点交通建议：" style="width: 90%;">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 2}"
                            placeholder="请输入景点交通(json字符串)"
                            v-model="form.traffic_propose"
                    ></el-input>
                </el-form-item>
                <el-form-item label="景点优惠政策：" style="width: 90%;">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 2}"
                            placeholder="请输入景点优惠政策(分段请用“ & ”分割)"
                            v-model="form.favoured_policy"
                    ></el-input>
                </el-form-item>
                <el-form-item label="景点开放时间：">
                    <el-input placeholder="请输入景点开放时间" v-model="form.open_time"></el-input>
                </el-form-item>
                <el-form-item label="景点信息更新时间：">
                    <el-date-picker type="date" placeholder="请选择景点信息更新时间" v-model="form.survey_update_time"
                                    style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="景点服务设施：" style="width: 90%;">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 2}"
                            placeholder="请输入景点服务设施(分段请用“ & ”分割)"
                            v-model="form.service_facilities"
                    ></el-input>
                </el-form-item>
                <el-form-item label="景点旅游时节：">
                    <el-input placeholder="请输入景点旅游时节" v-model="form.travel_season"></el-input>
                </el-form-item>
                <el-form-item label="景点游玩贴士：" style="width: 90%;">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 2}"
                            placeholder="请输入景点游玩贴士(分段请用“ & ”分割)"
                            v-model="form.play_tips"
                    ></el-input>
                </el-form-item>
                <el-form-item label="已上传景点图片：" style="width: 100%" v-if="actionType === 'edit'">
                    <el-image
                            v-for="item in form.imagesURL"
                            style="width: 100px; height: 100px;margin: 0 5px"
                            :src="item"
                            :preview-src-list="form.imagesURL"
                    >
                        <div slot="placeholder" class="image-slot">
                            <i class="el-icon-loading"></i>加载中
                        </div>
                    </el-image>
                    <span style="margin-left: 20px;color: #F56C6C"><strong>Tips:</strong>点击即可查看大图</span>
                    <span style="margin-left: 20px;color: #F56C6C">暂不支持已上传图片撤回操作</span>
                </el-form-item>
                <el-form-item label="景点图片：" style="width: 100%">
                    <el-upload
                            :action="uploadURL"
                            list-type="picture-card"
                            :multiple="true"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :limit="10"
                            :on-success="handleSuccess"
                            :on-exceed="handleExceed"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <span style="margin-left: 20px;color: #F56C6C"><strong>Tips:</strong>最大支持一次性上传10张图片</span>
                </el-form-item>
                <!--                <el-form-item label="文章内容">-->
                <!--                    <div id="editorElem" class="editor"></div>-->
                <!--                </el-form-item>-->
            </el-form>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <div style="display:flex;justify-content: center;margin-top: 10px">
                <el-button @click="getContent" type="primary" round style="width: 200px;" :loading="loading">提交
                </el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    import base from "@/untils/base";
    import loadsh from 'loadsh';
    // import Editor from 'wangeditor'

    export default {
        components: {},
        data() {
            return {
                // editor: null,
                // emotions: [],
                // value: [],
                dialogImageUrl: '',
                dialogVisible: false,
                uploadURL: base.uploadAddress + '/wxSceneryUpload',
                actionType: null,
                loading: false,
                pageLoading: false,
                //景点表单变量
                form: {
                    // 景点名字
                    name: null,
                    // 景点概述
                    survey: null,
                    // 景点图片集合
                    imagesURL: [],
                    // 景点用时建议
                    time_propose: null,
                    // 景点交通建议
                    traffic_propose: null,
                    // 景点优惠政策
                    favoured_policy: null,
                    // 景点开放时间
                    open_time: null,
                    // 景点信息更新时间
                    survey_update_time: null,
                    // 景点评分
                    score: null,
                    // 景点人气
                    popularity: null,
                    // 景点官方网站
                    official_website: null,
                    // 景点官方电话
                    official_phone: null,
                    // 景点服务设施
                    service_facilities: null,
                    // 景点游玩贴士
                    play_tips: null,
                    // 景点排名
                    survey_sort: null,
                    // 景点星级
                    survey_start: null,
                    // 景点旅游时节
                    travel_season: null,
                },
                rules: {
                    name: [
                        {required: true, message: '请输入景点名称', trigger: 'blur'},
                    ],
                    survey: [
                        {required: true, message: '请输入景点概要', trigger: 'blur'},
                    ],
                }
            };
        },
        mounted() {
            this.$emit("title", [this.$route.meta, this.$route.query]);
            this.actionType = this.$route.query.actionType
            if (this.actionType === 'edit') {
                this.getData(this.$route.query.id)
            }
            // this.getExpression();
        },
        methods: {
            // getExpression() {
            //     this.fullscreenLoading = true;
            //     this.$axios
            //         .get(`${base.address}/api/v1/scenery/getExpression`)
            //         .then((res) => {
            //             let obj = {};  //创建一个临时对象
            //             res.data.data.forEach((item,index) => {
            //                 if (index <= 75){
            //                     obj = item;
            //                     obj['alt'] = item['value'];  //替换键
            //                     obj['src'] = item['url'];  //替换键
            //                     this.emotions.push(obj)     //将替换后的对象重新放入新的数组中
            //                 }
            //             })
            //             this.initEditor()
            //         });
            // },
            // initEditor() {
            //     this.editor = new Editor('#editorElem')
            //     this.editor.customConfig.pasteFilterStyle = false
            //     this.editor.customConfig.showLinkImg = false
            //     this.editor.customConfig.zIndex = 0
            //     this.editor.customConfig.uploadImgServer = `${base.uploadAddress}/wangeditorFileUpload`
            //     this.editor.customConfig.uploadImgMaxLength = 10
            //     this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024
            //     this.editor.customConfig.uploadFileName = 'file'
            //     this.editor.customConfig.emotions = [{
            //         title: '默认',
            //         type: 'image',
            //         content: this.emotions
            //     }]
            //     this.fullscreenLoading = false;
            //     this.editor.customConfig.uploadImgHooks = {
            //         success: (xhr, editor, result) =>{
            //             if (result.errno === '0'){
            //                 this.$notify({
            //                     title: '提示信息',
            //                     message:'上传成功，共上传' + result.data.length + '张图片',
            //                     type: 'success'
            //                 });
            //             }
            //         }
            //     }
            //     this.editor.create()
            // },
            getContent() {
                // console.log(this.editor.txt.html())
                this.loading = true
                if (this.actionType === 'add'){
                    this.$refs.form.validate((valid) => {
                        if (valid) {
                            this.$axios.post(base.address + '/api/v1/scenery/save', {...this.form}).then(res => {
                                if (res.data.code === 200) {
                                    this.loading = false
                                    this.$notify({
                                        title: '成功',
                                        message: '景点信息录入成功,跳转中...',
                                        type: 'success'
                                    });
                                    setTimeout(() => {
                                        this.$router.push('/controlCenter/scenery')
                                    }, 500)
                                }
                            })
                        } else {
                            this.$message.warning('表单数据不规范，请仔细填写')
                        }
                    })
                }else{
                    this.$refs.form.validate((valid) => {
                        if (valid) {
                            this.$axios.post(base.address + '/api/v1/scenery/edit', {...this.form}).then(res => {
                                if (res.data.code === 200) {
                                    this.loading = false
                                    this.$notify({
                                        title: '成功',
                                        message: '景点信息编辑成功,跳转中...',
                                        type: 'success'
                                    });
                                    setTimeout(() => {
                                        this.$router.push('/controlCenter/scenery')
                                    }, 500)
                                }
                            })
                        } else {
                            this.$message.warning('表单数据不规范，请仔细填写')
                        }
                    })
                }
            },
            handleRemove(file, fileList) {
                this.form.imagesURL = loadsh.without(this.form.imagesURL, file.response.data[0])
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleSuccess(res, file, fileList) {
                this.form.imagesURL = this.form.imagesURL.concat(res.data)
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            getData(id) {
                this.pageLoading = true
                this.$axios.get(base.address + `/api/v1/scenery/getList?id=${id}`).then(res => {
                    if (res.data.code === 200) {
                        this.form = res.data.data
                        this.pageLoading = false
                    }
                })
            }
        },
    };
</script>

<style lang='less' scoped>
    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        .el-card {
            width: 90%;

            .el-form {
                display: flex;
                flex-wrap: wrap;

                .el-form-item {
                    width: 45%;
                }
            }
        }

        .editor {
            width: 900px;
        }
    }
</style>
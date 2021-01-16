<template>
    <div>
        <el-card style="height: 735px;">
            <el-form label-width="150px" ref="form" :model="form" style="margin-top: 30px" :rules="rules">
                <el-form-item label="接口路径:" prop="url">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="接口描述:" prop="desc">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="接口前缀:" prop="prefix">
                    <el-select v-model="form.prefix" placeholder="请选择接口前缀">
                        <el-option label="/api/v1/user" value="/api/v1/user"></el-option>
                        <el-option label="/api/v1/system" value="/api/v1/system"></el-option>
                        <el-option label="/api/v1/welcome" value="/api/v1/welcome"></el-option>
                        <el-option label="/api/v1/getAPI" value="/api/v1/getAPI"></el-option>
                        <el-option label="/api/v1/scenery" value="/api/v1/scenery"></el-option>
                        <el-option label="/api/v1/wxUser" value="/api/v1/wxUser"></el-option>
                        <el-option label="/api/v1/records" value="/api/v1/records"></el-option>
                        <el-option label="/api/v1/common" value="/api/v1/common"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接口分类:" prop="sort">
                    <el-select v-model="form.sort" placeholder="请选择接口分类">
                        <el-option label="用户管理(PC)" value="用户管理(PC)"></el-option>
                        <el-option label="用户管理(小程序)" value="用户管理(小程序)"></el-option>
                        <el-option label="系统管理" value="系统管理"></el-option>
                        <el-option label="访客与日志管理" value="访客与日志管理"></el-option>
                        <el-option label="接口管理" value="接口管理"></el-option>
                        <el-option label="景点信息管理" value="景点信息管理"></el-option>
                        <el-option label="旅拍管理" value="小程序旅拍管理"></el-option>
                        <el-option label="公共管理" value="公共管理"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接口请求方法" prop="methods">
                    <el-select v-model="form.methods" placeholder="请选择接口请求方法">
                        <el-option label="POST" value="POST"></el-option>
                        <el-option label="GET" value="GET"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接口是否需要认证">
                    <el-switch v-model="form.isAuthorization"></el-switch>
                </el-form-item>
                <el-form-item label="接口类型" prop="type">
                    <el-select v-model="form.type" placeholder="请选择接口请求方法">
                        <el-option label="PC端" :value=0 ></el-option>
                        <el-option label="小程序端" :value=1 ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接口额外信息:">
                    <el-input type="textarea" v-model="form.extraInfo"></el-input>
                </el-form-item>
            </el-form>
            <div style="display: flex;justify-content: center;margin-top: 150px">
                <el-button type="primary" @click="submitForm" style="width: 200px">提交</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    import base from '@/untils/base'

    export default {
        data() {
            return {
                actionType:null,
                form: {
                    url: null,
                    sort: null,
                    methods: null,
                    prefix: null,
                    desc: null,
                    isAuthorization: null,
                    type: null,
                    extraInfo: null
                },
                rules: {
                    url: [
                        {required: true, message: '请输入接口路径', trigger: 'blur'},
                    ],
                    prefix: [
                        {required: true, message: '请输入接口路径', trigger: 'blur'},
                    ],
                    sort: [
                        {required: true, message: '请输入接口分类', trigger: 'blur'},
                    ],
                    methods: [
                        {required: true, message: '请输入接口请求方法', trigger: 'blur'},
                    ],
                    desc: [
                        {required: true, message: '请输入接口描述', trigger: 'blur'},
                    ],
                    type: [
                        {required: true, message: '请输入接口类型', trigger: 'blur'},
                    ],
                }
            }
        },
        mounted() {
            this.$emit("title", this.$route.meta);
            this.actionType = this.$route.query.type
            if (this.actionType === 'edit'){
                this.getData(this.$route.query.id)
            }
        },
        methods:{
            submitForm(){
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if (this.actionType === 'add'){
                            this.$axios.post(`${base.address}/api/v1/getAPI/add`,this.form).then(res =>{
                                if (res.data.code === 200) {
                                    this.$notify({
                                        title: '成功',
                                        message: '接口信息添加成功,跳转中...',
                                        type: 'success'
                                    });
                                    setTimeout(() => {
                                        this.$router.push('/dataCenter/interfaceTotal')
                                    }, 500)
                                }
                            })
                        }else {
                            this.$axios.post(`${base.address}/api/v1/getAPI/edit`,this.form).then(res =>{
                                if (res.data.code === 200) {
                                    this.$notify({
                                        title: '成功',
                                        message: '接口信息编辑成功,跳转中...',
                                        type: 'success'
                                    });
                                    setTimeout(() => {
                                        this.$router.push('/dataCenter/interfaceTotal')
                                    }, 500)
                                }
                            })
                        }
                    } else {
                        this.$message.error("您有未填写的必填项！")
                        return false;
                    }
                });
            },
            getData(id){
                this.$axios.get(`${base.address}/api/v1/getAPI/getDetailById?id=${id}`).then(res =>{
                    if (res.data.code === 200){
                        this.form = res.data.data
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .el-form {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;

        .el-form-item {
            width: 45%;
        }
    }
</style>
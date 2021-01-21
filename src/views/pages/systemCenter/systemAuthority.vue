<template>
    <div>
        <el-card style="height: 720px;">
            <div slot="header" class="clearfix">
                <span>用户列表</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="addUserDialog = true">增加用户
                </el-button>
            </div>
            <el-table
                    :data="tableData"
                    height="650"
            >
                <el-table-column
                        label="创建日期"
                        width="250">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.create_time}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="account"
                        label="账号"
                        width="180">
                </el-table-column>
                <el-table-column
                        label="状态"
                        width="150">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{scope.row.status === 1 ? '启用' :
                            '禁用'}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="权限"
                        width="180">
                    <template slot-scope="scope">
                        {{scope.row.authority === 1 ? '超级管理员' : '管理员'}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                @click="editContent.id = scope.row._id;editContent.authority = scope.row.authority === 0 ? '管理员' : '超级管理员';editContent.status = scope.row.status === 1 ? true : false; editUserDialog = true">
                            修改用户信息
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                v-if="scope.row.authority !== 1"
                                @click="deleteUser(scope.row._id)">删除用户
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog
                title="提示"
                :visible.sync="addUserDialog"
                :close-on-click-modal="false"
                :show-close="false"
                center>
            <div class="container_addUser">
                <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                    <el-form-item label="账号" prop="account">
                        <el-input v-model="form.account"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="form.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="权限" prop="authority">
                        <el-select v-model="form.authority" placeholder="请选择用户权限">
                            <el-option label="管理员" value="0"></el-option>
                            <el-option label="超级管理员" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-switch v-model="form.status" active-color="#13ce66"></el-switch>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogClose">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="提示"
                :visible.sync="editUserDialog"
                :close-on-click-modal="false"
                :show-close="false"
                center>
            <div class="container_addUser">
                <el-form ref="editForm" :model="editContent" label-width="100px">
                    <el-form-item label="id" prop="id">
                        <el-input v-model="editContent.id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="请输入新密码" prop="password">
                        <el-input v-model="editContent.password"></el-input>
                    </el-form-item>
                    <el-form-item label="更改权限" prop="authority">
                        <el-select v-model="editContent.authority" placeholder="请选择用户权限">
                            <el-option label="管理员" value="0"></el-option>
                            <el-option label="超级管理员" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="更改状态">
                        <el-switch v-model="editContent.status" active-color="#13ce66"></el-switch>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogEditClose">取 消</el-button>
                <el-button type="primary" @click="editUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import base from '../../../untils/base'

    export default {
        data() {
            return {
                tableData: null,
                addUserDialog: false,
                form: {
                    account: null,
                    password: null,
                    authority: null,
                    status: null
                },
                rules: {
                    account: [
                        {required: true, message: '请输入账号名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    authority: [
                        {required: true, message: '请输入用户权限', trigger: 'blur'}
                    ]
                },
                editUserDialog: false,
                editContent: {
                    id: null,
                    password: null,
                    authority: null,
                    status: null
                }
            }
        },
        mounted() {
            this.$emit("title", this.$route.meta);
            this.getData()
        },
        methods: {
            getData() {
                this.$axios.get(`${base.address}/api/v1/user/getUser`).then(res => {
                    if (res.data.code === 200) {
                        console.log(res.data.data)
                        this.tableData = res.data.data
                        this.tableData.forEach(item => {
                            item.create_time = this.$moment(item.create_time).format("YYYY-MM-DD HH:mm:ss");
                        })
                    }
                })
            },
            editUser() {
                let params = this.editContent
                if (params.authority === '管理员'){
                    params.authority = '0'
                }else {
                    params.authority = '1'
                }
                if (!params.password){
                    delete params.password
                }
                params.authority = parseInt(params.authority)
                params.status = params.status === true ? 1 : 0
                console.log(params)
                this.editUserDialog = false
                this.$axios.post(`${base.address}/api/v1/user/editAuthority`, params).then(res => {
                    if (res.data.code === 200) {
                        console.log(res.data.data)
                        this.$notify({
                            title: '提示信息',
                            message: '修改用户成功',
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.$refs.editForm.resetFields()
                                this.getData()
                            }
                        });
                    }else {
                        this.$message.error(res.data.msg)
                        this.$refs.editForm.resetFields()
                    }
                })
            },
            deleteUser(id) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal:false
                }).then(() => {
                    let user = this.$cookie.getJSON('user').userInfo
                    if (user.authority === 0) {
                        this.$message.error('您还不具备删除用户的权限！')
                    } else {
                        this.$axios.get(`${base.address}/api/v1/user/delete?id=${id}`).then(res => {
                            if (res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功！',
                                    duration: 1000,
                                    onClose: () => {
                                        this.getData()
                                    }
                                })
                            }
                        })
                    }
                }).catch(() => {});
            },
            addUser() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.form.status = this.form.status === true ? 1 : 0
                        this.form.authority = parseInt(this.form.authority)
                        this.addUserDialog = false
                        this.$axios.post(`${base.address}/api/v1/user/register`, this.form).then(res => {
                            if (res.data.code === 200) {
                                console.log(res.data.data)
                                this.$notify({
                                    title: '提示信息',
                                    message: '增加用户成功',
                                    type: 'success',
                                    duration: 1000,
                                    onClose: () => {
                                        this.$refs.form.resetFields()
                                        this.getData()
                                    }
                                });
                            } else {
                                this.$message.error(res.data.msg)
                                this.$refs.form.resetFields()
                            }
                        })
                    } else {
                        this.$message.error("您有未填写的必填项！")
                        return false;
                    }
                })
            },
            dialogClose() {
                this.$refs.form.resetFields();
                this.addUserDialog = false
            },
            dialogEditClose() {
                this.$refs.editForm.resetFields();
                this.editUserDialog = false
            }
        }
    }
</script>

<style scoped>
    .container_addUser {
        width: 90%;
    }
</style>
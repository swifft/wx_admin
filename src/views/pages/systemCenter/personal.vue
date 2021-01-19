<template>
    <div>
        <el-card style="height: 720px;">
            <el-timeline>
                <el-timeline-item :timestamp="'该账号创建于 ' + user.create_time" placement="top" style="margin: 20px 0">
                    <el-card style="margin: 20px 0;width: 40%;">
                        <h3 style="margin: 50px 0">账号名： {{user.account}}</h3>
                        <h3 style="margin: 50px 0">权限： {{user.authority === 1 ? '超级管理员' : '管理员'}}</h3>
                        <div style="color: #F56C6C">
                            注：超级管理员具有修改用户密码，权限等级，部分页面的增删改查等功能，管理员不具备修改数据的能力
                        </div>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </el-card>
    </div>
</template>

<script>
    export default {
        data(){
          return{
              user:null
          }
        },
        created() {
            this.$emit("title", this.$route.meta);
            this.user = this.$cookie.getJSON('user').userInfo
            this.user.create_time = this.$moment(this.user.create_time).format("YYYY-MM-DD HH:mm:ss");
        },
        mounted() {

            console.log(this.user)
        }
    }
</script>

<style scoped>

</style>
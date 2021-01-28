<template>
    <div>
        <el-card style="height: 735px;overflow: auto">
            <div class="top">
                <div>
                    <strong>景点ID：</strong><span style="color: #909399">{{scenery_id}}</span>
                </div>

                <div>
                    <el-button @click="addForm" type="primary">增加表单</el-button>
                    <el-button @click="submit" type="primary">提交表单</el-button>
                </div>
            </div>
            <div class="container">
                <div v-for="(item, index) in ticketData" :key="index" class="box">
                    <el-form :model="item.form" class="form" label-width="100px">
                        <el-form-item label="门票类型" class="form_item">
                            <el-input v-model="item.form.ticket_type" placeholder="请输入门票类型"></el-input>
                        </el-form-item>
                        <div v-for="(item_i, index_i) in item.form.price_type" :key="index_i" style="margin: 20px 0">
                            <div style="display: flex;justify-content: space-around;margin-bottom: 10px">
                                <el-button @click="addFormPriceType(index)" type="primary" size="mini">增加票价类型</el-button>
                                <el-button @click="deleteFormPriceType(index)" type="danger" size="mini">删除当前票价类型</el-button>
                            </div>
                            <el-form-item label="票价类型" class="form_item">
                                <el-input v-model="item_i.name" placeholder="请输入票价类型"></el-input>
                            </el-form-item>
                            <div style="display: flex;justify-content: space-around">
                                <el-button @click="addFormPriceTypeData(index,index_i)" type="primary" size="mini">
                                    增加当前所属票价类型的票务数据
                                </el-button>
                                <el-button @click="deleteFormPriceTypeData(index,index_i)" type="danger" size="mini">
                                    删除当前所属票价类型的票务数据
                                </el-button>
                            </div>
                            <div v-for="(item_x, index_x) in item_i.data" :key="index_x" style="margin: 20px 0">
                                <el-form-item label="票价类型" class="form_item">
                                    <el-input v-model="item_x.price_kind" placeholder="请输入已售数"></el-input>
                                </el-form-item>
                                <el-form-item label="票务小提示" class="form_item">
                                    <el-select v-model="item_x.tips" multiple placeholder="请选择" style="width: 100%;">
                                        <el-option
                                                v-for="(item,select_index) in options_1"
                                                :key="select_index"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="票价" class="form_item">
                                    <el-input v-model="item_x.price" placeholder="请输入票价"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import base from "../../../untils/base";

    export default {
        data() {
            return {
                actionType: null,
                scenery_id: null,
                id: null,
                ticketData: [
                    {
                        form: {
                            //门票类型 （例如：全日票）
                            ticket_type: "",
                            //票价类型 （例如：成人票，学生票）
                            price_type: [
                                //成人票，学生票
                                {
                                    name: "",
                                    data: [
                                        {
                                            //票务小提示（例如：需取票、有条件）
                                            tips: "",
                                            //票价
                                            price: "",
                                            //票价类型
                                            price_kind: ""
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ],
                options_1: [{
                    value: '可订明日',
                    label: '可订明日'
                }, {
                    value: '有条件退',
                    label: '有条件退'
                }, {
                    value: '需取票',
                    label: '需取票'
                }, {
                    value: '随买随用',
                    label: '随买随用'
                }, {
                    value: '随时退',
                    label: '随时退'
                }, {
                    value: '7天有效期',
                    label: '7天有效期'
                }, {
                    value: '随时退',
                    label: '随时退'
                }, {
                    value: '随时退',
                    label: '随时退'
                }]
            }
        },
        mounted() {
            this.$emit("title", this.$route.meta);
            this.actionType = this.$route.query.actionType
            this.scenery_id = this.$route.query.scenery_id || null
            this.id = this.$route.query.id || null
            if (this.actionType === 'edit'){
                this.getDetail(this.$route.query.id)
            }
        },
        methods: {
            getDetail(id){
                this.$axios.get(`${base.address}/api/v1/ticket/detail?id=${id}`).then(res => {
                    if (res.data.code === 200) {
                        this.ticketData = res.data.data.ticket_info
                        console.log(res.data.data)
                    }
                })
            },
            addForm() {
                const newForm = {
                    form: {
                        //门票类型 （例如：全日票）
                        ticket_type: "",
                        //票价类型 （例如：成人票，学生票）
                        price_type: [
                            //成人票，学生票
                            {
                                name: "",
                                data: [
                                    {
                                        //票务小提示（例如：需取票、有条件）
                                        tips: "",
                                        //已售数
                                        sold_counts: "",
                                        //票价
                                        price: "",
                                        //票价类型
                                        price_kind: ""
                                    }
                                ]
                            }
                        ]
                    }

                }
                this.ticketData.push(newForm)
            },
            addFormPriceType(index) {
                const newData = {
                    name: "",
                    data: [
                        {
                            //票务小提示（例如：需取票、有条件）
                            tips: "",
                            //已售数
                            sold_counts: "",
                            //票价
                            price: "",
                            //票价类型
                            price_kind: ""
                        }
                    ]
                }
                this.ticketData[index].form.price_type.push(newData)
            },
            deleteFormPriceType(index){
                this.ticketData[index].form.price_type.splice(-1,1)
            },
            addFormPriceTypeData(index,index_i) {
                const newData = {
                    //票务小提示（例如：需取票、有条件）
                    tips: "",
                    //已售数
                    sold_counts: "",
                    //票价
                    price: "",
                    //票价类型
                    price_kind: ""
                }
                this.ticketData[index].form.price_type[index_i].data.push(newData)
            },
            deleteFormPriceTypeData(index,index_i) {
                this.ticketData[index].form.price_type[index_i].data.splice(-1,1)
            },
            submit() {
                if (this.actionType === 'add'){
                    const params = {
                        ticket_info:this.ticketData,
                        sceneryId:this.scenery_id
                    }
                    this.$axios.post(`${base.address}/api/v1/ticket/add`,params).then(res => {
                        if (res.data.code === 200) {
                            this.$notify({
                                title: '成功',
                                message: '景点门票信息录入成功！',
                                type: 'success'
                            });
                            setTimeout(() => {
                                this.$router.push('/controlCenter/ticket')
                            }, 500)
                        }else {
                            this.$message.error(res.data.data)
                        }
                    })
                }else {
                    const params = {
                        ticket_info:this.ticketData,
                        _id:this.id
                    }
                    this.$axios.post(`${base.address}/api/v1/ticket/edit`,params).then(res => {
                        if (res.data.code === 200) {
                            this.$notify({
                                title: '成功',
                                message: '景点门票信息编辑成功！',
                                type: 'success'
                            });
                            setTimeout(() => {
                                this.$router.push('/controlCenter/ticket')
                            }, 500)
                        }else {
                            this.$message.error(res.data.data)
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 20px;
    }

    .container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        .box {
            width: 25%;
            margin: 10px 50px;

            .form {
                width: 100%;
                padding: 30px;
                background-color: #EBEEF5;
                border-radius: 24px;

                .form_item {
                }
            }
        }
    }


</style>
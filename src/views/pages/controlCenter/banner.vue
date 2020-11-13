<template>
    <div class="container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>页面轮播配置</span>
                <div style="float: right;height: 100%">
                    <el-button style="padding: 3px 0" type="text" @click="save">保存</el-button>
                    <el-button style="padding: 3px 0" type="text" @click="add">添加轮播图</el-button>
                </div>
            </div>
            <div class="box-style">
                <el-card class="box-img" shadow="never" v-for="(item, index) in list" :key="index">
                    <el-popconfirm
                            title="确定要删除该轮播图吗？"
                            @onConfirm="deleteBanner(index)"
                    >
                        <img src="../../../assets/close.png" class="box-close" slot="reference">
                    </el-popconfirm>
                    <div class="box-image">
                        <el-image :src="item.src"
                                  :style="{display:index === item.indexNow ? 'none' : 'block'}">
                            <div slot="placeholder" class="image-slot">
                                加载中<i class="el-icon-loading"></i>
                            </div>
                        </el-image>
                        <el-upload
                                style="width: 350px;height: 200px;display: flex;justify-content: center;align-items: center"
                                :action="uploadURL"
                                list-type="picture-card"
                                :on-success="(value) => handleSuccess(index,value)"
                                v-show="index === item.indexNow"
                                :show-file-list="false"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-popconfirm
                                title="确定要删除该图片吗？"
                                @onConfirm="deleteImage(index)"
                                :style="{display:index === item.indexNow ? 'none' : 'block'}"
                        >
                            <img src="../../../assets/close_red.png" class="box-close-red" slot="reference">
                        </el-popconfirm>
                    </div>
                    <div class="box-action">排序：
                        <el-input v-model="item.sort" style="width: 50px;" size="mini"></el-input>
                    </div>
                    <div class="box-action">点击跳转页面：
                        <el-select v-model="item.aboutPage" placeholder="请选择" size="mini">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-card>
            </div>
        </el-card>
    </div>
</template>

<script>
    import base from "@/untils/base";

    export default {
        components: {},
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }],
                uploadURL: base.uploadBaseAddress + base.uploadBanner,
                list: [
                    {
                        indexNow: null,
                        src: 'https://file.gxnudsl.xyz/websiteResource/backgroundImage/7.jpg',
                        sort: 0,
                        aboutPage: "选项一"
                    },
                    {
                        indexNow: null,
                        src: 'https://file.gxnudsl.xyz/websiteResource/backgroundImage/9.jpg',
                        sort: 0,
                        aboutPage: "选项一"
                    }
                ]
            };
        },
        mounted() {
            this.$emit("title", this.$route.meta);
            this.getData()
        },
        methods: {
            getData() {

            },
            deleteImage(index) {
                this.list[index].indexNow = index
                // console.log(index)
            },
            deleteBanner(index) {
                console.log(index)
            },
            handleSuccess(index, value) {
                this.list[index].indexNow = null
                this.list[index].src = value.data.url
                console.log(index, value)
            },
            save() {
                // console.log(this.sort,this.aboutPage)
            },
            add() {
                const newBanner = {
                    indexNow: this.list.length,
                    src: '',
                    sort: null,
                    aboutPage: null
                }
                this.list.push(newBanner)
            }
        },
    };
</script>

<style lang='less' scoped>
    .el-image {
        width: 350px;
        height: 200px;

        .image-slot {
            text-align: center;
            line-height: 200px;
        }
    }

    .container {
        height: 100%;

        .box-card {
            height: 735px;
            overflow: auto;

            .box-style {
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;

                .box-img {
                    width: 390px;
                    padding: 10px;
                    margin: 5px;
                    position: relative;

                    .box-close {
                        position: absolute;
                        right: 5px;
                        top: 5px;
                        width: 20px;
                        height: 20px;
                        cursor: pointer;
                    }

                    .box-image {
                        position: relative;

                        .box-close-red {
                            position: absolute;
                            top: -5px;
                            left: -5px;
                            width: 20px;
                            height: 20px;
                            cursor: pointer;
                        }
                    }

                    .box-action {
                        margin: 5px 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 16px;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="container">
        <div class="header">
            <Header/>
        </div>
        <div class="content">
            <div class="content_left">
                <Sider/>
            </div>
            <div class="content_right">
                <div class="top">
                    <ContentTab/>
                </div>
                <div class="footer">Mr.D Design ©2020 Power by Element UED</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/Header";
    import Sider from "@/components/Sider";
    import ContentTab from "@/components/contentTab";

    export default {
        components: {
            Header,
            Sider,
            ContentTab,
        },
    };
</script>

<style lang='less' scoped>
    .container {
        .header {
            height: 70px;
            width: 100%;
        }

        .content {
            display: flex;
            width: 100%;

            .content_left {
                background-color: rgb(0, 21, 41);
            }

            .content_right {
                height: calc(100vh - 70px);
                flex: 1;
                display: flex;
                flex-direction: column;
                background-color: #f0f2f5;

                .top {
                    flex: 1;
                    overflow: auto;
                }

                .top::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                    background-color: rgba(240, 240, 240, 1);
                }

                .top::-webkit-scrollbar-thumb {
                    border-radius: 10px;
                    box-shadow: inset 0 0 0px rgba(130, 138, 134, 0.5);
                    background-color: rgba(148, 137, 137, 0.836);
                }

                .top::-webkit-scrollbar-track {
                    box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
                    border-radius: 10px;
                    background-color: rgba(240, 240, 240, 0.5);
                }

                .footer {
                    height: 50px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    line-height: 50px;
                    color: #999999;
                    font-size: 14px;
                    box-shadow: 4px 4px 40px 0 rgba(0, 0, 0, 0.05);
                    border-top: 1px solid #D8DFEA;
                }
            }
        }
    }
</style>
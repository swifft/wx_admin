<template>
  <div>
    <el-card style="height: 735px;">
      <div slot="header">
        <span>景点门票信息列表</span>
        <el-link type="primary" style="float: right; padding: 3px 0" :underline="false" @click="showPopup">添加门票</el-link>
      </div>
      <el-table
              :data="tableData"
              style="width: 100%">
        <el-table-column
                label="景点ID"
                width="280">
          <template slot-scope="scope">
            {{scope.row.sceneryId._id}}
          </template>
        </el-table-column>
        <el-table-column
                label="景点名称"
                width="280">
          <template slot-scope="scope">
            {{scope.row.sceneryId.name}}
          </template>
        </el-table-column>
        <el-table-column
                label="门票详情"
                width="200">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" @click="previewTicket(scope.$index)">
              点击查看
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                    size="mini"
                    type="primary"
                    @click="addTicket(scope.row.sceneryId._id,scope.row._id)">添加门票信息</el-button>
            <el-button
                    size="mini"
                    type="warning"
                    @click="editTicket(scope.row.sceneryId._id,scope.row._id)">编辑门票信息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
            title="门票信息"
            :visible.sync="previewVisible"
            :close-on-click-modal="false"
            center
    >
      <div class="box">
        <div class="box_loop" v-for="(item,index) in previewData" :key="index">
          <div class="title">
            {{item.form.ticket_type}}
          </div>
          <div class="content">
            <el-collapse accordion>
              <el-collapse-item v-for="(item_x,index_x) in item.form.price_type" :key="index_x">
                <template slot="title">
                  <div class="content_title">
                    {{item_x.name}}
                  </div>
                </template>
                <div class="content_main" v-for="(item_y,index_y) in item_x.data" :key="index_y">
                  <div class="left">
                    <div class="price_kind">
                      {{item_y.price_kind}}
                    </div>
                    <div class="tips" v-for="(item_z,index_z) in item_y.tips" :key="index_z">
                      <span>{{item_z}}</span>
                    </div>
                  </div>
                  <div class="right">
                    <div class="price">
                      ¥{{item_y.price}}
                    </div>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
            title="请点击要添加信息的景点"
            :visible.sync="isShowPopup"
            :close-on-click-modal="false"
            center
            width="25%"
    >
      <div class="popup_scenery">
        <div v-for="(item,index) in sceneryList" :key="index" >
          <ul>
            <li @click="addTicket(item._id)">
              {{item.name}}
            </li>
          </ul>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import base from '../../../untils/base'
  import isPower from "../../../untils/userPower";

export default {
  components: {},
  data() {
    return {
      tableData: [],
      sceneryList:[],
      previewVisible:false,
      previewData:null,
      isShowPopup:false
    };
  },
  mounted() {
    this.$emit("title", this.$route.meta);
    this.getData()
  },
  methods: {
    getData(){
      this.$axios.get(`${base.address}/api/v1/ticket/list`).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data
          this.$axios.get(`${base.address}/api/v1/scenery/getList_PC`).then(result => {
            if (result.data.code === 200) {
              let newData = result.data.data
              newData.forEach((item,index) =>{
                this.tableData.forEach((item_x,index_x) =>{
                  if (item.name === item_x.sceneryId.name){
                    newData.splice(index,1)
                  }
                })
              })
              this.sceneryList = newData
            }
          })
        }
      })
    },
    addTicket(scenery_id,id){
      if (isPower()){
        this.$router.push({
          path: '/controlCenter/ticket/ticketAction',
          query: {
            actionType: 'add',
            scenery_id:scenery_id,
            id:id
          }
        })
      }
    },
    editTicket(scenery_id,id){
      if (isPower()){
        this.$router.push({
          path: '/controlCenter/ticket/ticketAction',
          query: {
            actionType: 'edit',
            scenery_id:scenery_id,
            id:id
          }
        })
      }
    },
    previewTicket(index){
      this.previewVisible = true
      this.previewData = this.tableData[index].ticket_info
      console.log(this.previewData)
    },
    showPopup(){
      this.isShowPopup = true
    }
  },
};
</script>

<style lang='less' scoped>
  .box{
    padding: 15px;
    height: 60vh;
    overflow: auto;

    .box_loop{
      margin-bottom: 20px;

      .title{
        font-size: 26px;
        font-family: '楷体';
        font-weight: bolder;
      }

      .content{
        padding: 15px 0;

        .content_title{
          font-size: 20px;
          font-family: '楷体';
          font-weight: bold;
        }

        .content_main{
          padding: 5px 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .left{
            display: flex;

            .price_kind{
              font-size: 16px;
            }

            .tips{
              margin-left: 10px;
              line-height: 25px;

              span{
                color: #2681ff;
                border: 1px solid #2681ff;
                font-size: 10px;
                padding: 1px 3px;
                margin-right: 5px;
              }

            }
          }

          .right{
            margin-right: 20px;

            .price{
              font-size: 24px;
              font-weight: bold;
              color: #ff6600;
            }
          }
        }
      }
    }
  }

  .popup_scenery{
    height: 60vh;
    overflow: auto;

    ul{
      padding: 5px 35px;

      li{
        list-style-type :none;
        border-radius: 14px;
        padding: 20px 10px;
        height: 15px;
        line-height: 15px;
        text-align: center;
        background-color: #C0C4CC;
        cursor: pointer;
      }
    }
  }


  .box::-webkit-scrollbar {/*滚动条整体样式*/
    width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #535353;
  }
  .box::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 10px;
    background: #EDEDED;
  }

  .popup_scenery::-webkit-scrollbar {/*滚动条整体样式*/
    width: 3px;     /*高宽分别对应横竖滚动条的尺寸*/
  }
  .popup_scenery::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #dddee0;
  }
  .popup_scenery::-webkit-scrollbar-track {/*滚动条里面轨道*/
    /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
    border-radius: 10px;
    background: #ffffff;
  }
</style>
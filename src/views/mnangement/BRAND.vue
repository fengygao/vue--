<template>
<div>
    <header class="monheader">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-select v-model="filters.auditStatus" filterable placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        	<el-form-item>
          	<el-button type="primary" @click="Search">查询</el-button>
        </el-form-item>
      </el-form>

			</header>

		<el-col :span="24" class="main">
  <aside>
    <h4>{{dataNav.nodeName}}</h4>
    <el-tree :data="dataNav.children" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
	</aside>
	<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
              <v-brandlist :name='itemID'></v-brandlist>
						</transition>
					</el-col>
				</div>
			</section>
  		</el-col>
</div>
</template>
<script>
import axios from "axios";
import brandlist from './brandlist'
export default {
	data() {
    return {
      filters: {
        auditStatus: "所有审核状态",
        brand:''      
	  },
	   options1: [
        {
          value: "所有审核状态",
          label: "所有审核状态"
        },
        {
          value: "草稿",
          label: "草稿"
        },
        {
          value: "已发起",
          label: "已发起"
		},
		{
          value: "审批中",
          label: "审批中"
        },
        {
          value: "已入库",
          label: "已入库"
		},
		{
          value: "已驳回",
          label: "已驳回"
        },
        {
          value: "已作废",
          label: "已作废"
		},
		{
          value: "已撤回",
          label: "已撤回"
    }],	
    itemID:{},
    dataNav: {
      
    },
    defaultProps: {
          children: 'children',
          label: 'nodeName'
        }
	}
	},
	 methods: {
		Search() {
      // if (this.filters.object !== "所有项目") {      
      //   var searcharr = [];
      //   this.datalist.map(item => {
      //     console.log(item);
      //     console.log(this.filters.buildName);
      //     if (item.buildName == this.filters.buildName) {
      //       console.log(item);
      //       searcharr.push(item);
      //     }
      //   });   
      //   this.datalist = searcharr;
      //   return;
      // } else {  
      //   this.getUsers();
      // }
      if (this.filters.auditStatus) {
        var searchlist = [];
        this.datalist.map(item => {
          if (this.filters.auditStatus == item.auditStatus) {
            searchlist.push(item);
          }
        });
        this.datalist = searchlist;
      }
    } ,
    //  handleOpen(key, keyPath) {
    //     console.log(key, keyPath);
    //   },
    //   handleClose(key, keyPath) {
    //     console.log(key, keyPath);
    //   },
      handleNodeClick(data) {
        console.log(data.nodeId);
        this.itemID=data
      },
      getNav(){
        let _this=this;
        axios.get('../../../static/nav.json').then(response => {               
                  console.log(response.data)//对象
                  console.log(JSON.stringify(response.data))
                  _this.dataNav=response.data
                  console.log(_this.dataNav)
               }, response => {
                    console.log("error");
                });
                // console.log(this.dataNav)//
      }
   },
    mounted(){
      this.getNav()
    },
   components:{
      'v-brandlist':brandlist
   }
}
</script>
<style scoped lang="scss">
 .monheader{
        padding: 10px;
        margin: 10px 0px;
        width:100%;
        height: 40px;      
      }
.main {
			display: flex;
			// background: #324057;    
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
          border-right: 0;
				}
				.collapsed{
					// width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
		
	.content-container {
		// background: #f1f2f7; 
		flex:1;
		//   position: absolute;
		//  right: 0px;
		//  top: 0px;
		//  bottom: 0px;
		// left: 230px; 
		padding: 20px;
	
		.content-wrapper {
			background-color: #fff;
			box-sizing: border-box;
		}
	}
}
</style>
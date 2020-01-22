<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input suffix-icon="el-icon-search" v-model="filters.name" placeholder="名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Search">查询</el-button>
        </el-form-item>
		<el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <template>
      <el-table :data="datalist" highlight-current-row v-loading="loading" @row-dblclick="dbclick" style="width: 100%;" height="80vh">
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="name" label="名称" ></el-table-column>
        <el-table-column prop="abbreviation" label="简称" >
			<template slot-scope="scope">
					<span class="abbreviation">{{scope.row.abbreviation}}</span>
        </template>
		</el-table-column>
        <el-table-column prop="number" label="编号" sortable></el-table-column>
        <el-table-column prop="addr" label="地址" ></el-table-column>
      </el-table>
    </template>
	 <!-- 查看界面 -->
	 <el-dialog title="查看" :visible.sync="dialogFormVisible1">
      <el-form :model="editForm" label-width="120px" ref="editForm">
        <el-form-item label="公司名称">
          <el-input v-model="editForm.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="公司编号">
          <el-input v-model="editForm.number" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="公司简称">
          <el-input v-model="editForm.abbreviation" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="公司地址">
          <el-input type="textarea" v-model="editForm.addr" :disabled="true"></el-input>
        </el-form-item>
        <!-- <el-form-item label="活动区域" >
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">关闭</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
	// import { getUserList } from '../../api/api';
	//import NProgress from 'nprogress'
	import axios from "axios";
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				loading: false,
				datalist: [
				],
				 dialogFormVisible1: false, //查看界面是否显示
				 //查看界面数据
				editForm: {
					id: 0,
					abbreviation: "",
					addr: "",
					name: "",
					number: null
				},
			}
		},
		methods: {
			dbclick(v) {
				this.dialogFormVisible1 = true;
				this.editForm = Object.assign({}, v);
			},
			//获取用户列表
			getUser() {
				// let para = {
				// 	name: this.filters.name
				// };
				// this.loading = true;
				// //NProgress.start();
				// getUserList(para).then((res) => {
				// 	this.users = res.data.users;
				// 	this.loading = false;
				// 	//NProgress.done();
				// });
				var _this = this;
				axios.get("/getarr").then(res=>{
					console.log(res)
					_this.datalist = res.data;
				})
			},
			Search(){
			if(this.filters.name){				
				var searchlist=[]
				this.datalist.map(item=>{
					if(this.filters.name==item.name){
						searchlist.push(item)
						
					}
				})
				this.datalist=searchlist
				}else{
					this.getUser()
				}
			},
			//显示新增界面
			handleAdd: function() {
			this.dialogFormVisible2=true
				this.addForm = {};
			},
			//新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
            this.addLoading = true;
            //NProgress.start();
            // let para = Object.assign({}, this.addForm);
            // para.birth =
            // addUser(para).then(res => {
            //   this.addLoading = false;
            //   //NProgress.done();
            //   this.$message({
            //     message: "提交成功",
            //     type: "success"
            //   });
            //   this.$refs["addForm"].resetFields();
            //   this.addFormVisible = false;
            //   this.getUsers();
            // });
            let _this = this;
            axios.post("/addarr",_this.addForm).then(res=>{
              console.log(res)
                _this.addLoading = false;
                _this.dialogFormVisible2 = false;
                _this.$message({
                  message: "添加成功",
                  type: "success"
                });
                _this.getUser()
            })
        }
      });
    },
		},
		
		mounted() {
			this.getUser();
		}
	};

</script>

<style scoped>
@import '../../common/css/table.css';
</style>
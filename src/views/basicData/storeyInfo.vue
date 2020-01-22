<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-select v-model="filters.city" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item>
           <el-select v-model="filters.operating" filterable placeholder="请选择" @change="Search">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            suffix-icon="el-icon-search"
            v-model="filters.name"
            placeholder="请输入项目名称"
            clearable
          ></el-input>
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
    <el-table
      :data="datalist"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      @row-dblclick="dbclick"
      style="width: 100%;"
    >
      <!-- <el-table-column type="selection" width="60"></el-table-column> -->
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="name" label="项目名称" width="200">
        <!-- <template slot-scope="scope">
					<span>{{scope.row.name}}</span>
        </template>-->
      </el-table-column>
       <el-table-column prop="abbreviation" label="项目简称">
        <template slot-scope="scope">
					<span class="abbreviation">{{scope.row.abbreviation}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="city" label="所属城市"  ></el-table-column>
      <el-table-column prop="area" label="建筑面积(m²)"></el-table-column>
      <el-table-column prop="operating" label="运营状态"></el-table-column>
      <el-table-column prop="data" label="开业日期"></el-table-column>
      <el-table-column prop="addr" label="地址"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
      <el-pagination
        background
        style="float:right;"
        :page-size="pagesize"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="datalist.length"
      ></el-pagination>
    </el-col>

    <!-- 编辑界面 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible1">
      <el-form :model="editForm" label-width="120px" ref="editForm">
        <el-form-item label="项目名称">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="所属城市">
          <el-input v-model="editForm.city"></el-input>
        </el-form-item>
        <el-form-item label="项目简称">
          <el-input v-model="editForm.abbreviation"></el-input>
        </el-form-item>
         <el-form-item label="建筑面积(m²)">
          <el-input v-model="editForm.area"></el-input>         
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="editForm.addr"></el-input>
        </el-form-item>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="运营状态" >    
                <el-select v-model="editForm.operating" placeholder="请选择营业状态">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>     
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开业日期">
              <el-date-picker
                v-model="editForm.data"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click.native="editSubmit(editForm)" :loading="addLoading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增界面 -->
    <el-dialog title="新增" :visible.sync="dialogFormVisible2">
      <el-form :model="addForm" label-width="120px" ref="addForm">
         <el-form-item label="项目名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="所属城市">
          <el-input v-model="addForm.city"></el-input>
        </el-form-item>
        <el-form-item label="项目简称">
          <el-input v-model="addForm.abbreviation"></el-input>
        </el-form-item>
         <el-form-item label="建筑面积(m²)">
          <el-input v-model="addForm.area"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="addForm.addr"></el-input>
        </el-form-item>
         <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="运营状态" >    
                <el-select v-model="addForm.operating" placeholder="请选择营业状态">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>     
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开业日期">
              <el-date-picker
                v-model="addForm.data"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
// import util from '../../common/js/util'
//import NProgress from 'nprogress'
// import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
import axios from 'axios'
export default {
  data() {
    return {
      filters: {
        name: "",
        city: '所有区域',
        operating: '所有运营状态',
      },
      datalist: [],
      total: null,
      currentPage: 1,
      listLoading: false,
      sels: [], //列表选中列
      dialogFormVisible1: false, //编辑界面是否显示
      editLoading: false,
      //编辑界面数据
      editForm: {
        id: 0,
        abbreviation: "",
        addr: "",
        name: "",
        number: null
      },

      //新增界面是否显示
      dialogFormVisible2: false,
      addLoading: false,

      //新增界面数据
      addForm: {
        abbreviation: "",
        addr: "",
        name: "",
        data:'',
        area: null,
        operating:'',
        city:'',
      },
      pagesize: 20,
      options: [{
          value: '选项1',
          label: '所有区域'
        }, {
          value: '选项2',
          label: '静安'
        }, {
          value: '选项3',
          label: '闵行'
        }, {
          value: '选项4',
          label: '黄埔'
        }, {
          value: '选项5',
          label: '浦东'
        }],
        options1: [{
          value: '所有运营状态',
          label: '所有运营状态'
        }, {
          value: '筹备项目',
          label: '筹备项目'
        }, {
          value: '在营项目',
          label: '在营项目'
        }],
        options2: [ {
          value: '筹备项目',
          label: '筹备项目'
        }, {
          value: '在营项目',
          label: '在营项目'
        }],
    };
  },
  methods: {
    dbclick(v) {
      this.dialogFormVisible1 = true;
      this.editForm = Object.assign({}, v);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers() {
      // let para = {
      // 	page: this.page,
      // 	name: this.filters.name
      //  city:this.filters.city
      //  operating:this.filters.operating
      // };
      // this.listLoading = true;
      // //NProgress.start();
      // getUserListPage(para).then((res) => {
      // 	this.total = res.data.total;
      // 	this.users = res.data.users;
      // 	this.listLoading = false;
      // 	//NProgress.done();
      // });
      var _this = this;
      axios.get("/getlist").then(res=>{
		    console.log(res)
		    _this.datalist = res.data;
        _this.listLoading = false;
	    })
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          var _this = this;
          //NProgress.start();
          // let para = { id: row.id };
          // removeUser(para).then(res => {
          //   this.listLoading = false;
            //NProgress.done();
            // this.$message({
            //   message: "删除成功",
            //   type: "success"
            // });
            // this.getUsers();
          axios.post("/deleteuser",{           	
              id: row.id			
            }).then(res=>{
              console.log(res)
              _this.listLoading = false;
              _this.$message({
                      message: "删除成功",
                      type: "success"
                    });
              _this.getUsers()
            })
          });
    },
    //显示编辑界面
    handleEdit(index, row) {
      this.dialogFormVisible1 = true;
      this.editForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function() {
     this.dialogFormVisible2=true
	  	this.addForm = {};
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
            this.editLoading = true;
            //NProgress.start();
            // let para = Object.assign({}, this.editForm);
            // editUser(para).then(res => {
            //   this.editLoading = false;
            //   //NProgress.done();
            //   this.$message({
            //     message: "提交成功",
            //     type: "success"
            //   });
            //   this.$refs["editForm"].resetFields();
            //   this.editFormVisible = false;
            //   this.getUsers();
            // });
            let _this = this;
              axios.post("/updateuser",_this.editForm).then(res=>{
                console.log(res)
                _this.editLoading = false;
                _this.dialogFormVisible1 = false;
                _this.$message({
                    message: "修改成功",
                    type: "success"
                  });
                _this.getUsers()
              })
        }
      });
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
            this.addLoading = true;
            //NProgress.start();
            // let para = Object.assign({}, this.addForm);
            // para.birth =
            //   !para.birth || para.birth == ""
            //     ? ""
            //     : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
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
            axios.post("/adduser",_this.addForm).then(res=>{
              console.log(res)
                _this.addLoading = false;
                _this.dialogFormVisible2 = false;
                _this.$message({
                  message: "添加成功",
                  type: "success"
                });
                _this.getUsers()
            })
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    //批量删除
    // batchRemove: function() {
    //   var ids = this.sels.map(item => item.id).toString();
    //   this.$confirm("确认删除选中记录吗？", "提示", {
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.listLoading = true;
    //       //NProgress.start();
    //       let para = { ids: ids };
    //       batchRemoveUser(para).then(res => {
    //         this.listLoading = false;
    //         //NProgress.done();
    //         this.$message({
    //           message: "删除成功",
    //           type: "success"
    //         });
    //         this.getUsers();
    //       });
    //     })
    //     .catch(() => {});
    // },
    Search(){
      if(this.filters.operating!=='所有运营状态'){
        debugger
        var searcharr=[]
        this.datalist.map(item=>{
          debugger
          console.log(item)
          console.log(this.filters.operating)
          if(item.operating==this.filters.operating){
            console.log(item)
            searcharr.push(item)         
          }
        })
        debugger
        this.datalist=searcharr
        return
      }else{
        debugger
        this.getUsers()
      }
    
      if(this.filters.name){
        var searchlist=[]
        this.datalist.map(item=>{
          if(this.filters.name==item.name){
            searchlist.push(item)         
          }
        })
        this.datalist=searchlist
      }else{
        this.getUsers()
      }
		
	  },
  },
  mounted() {
    this.getUsers();
  }
};
</script>
<style scoped>
@import '../../common/css/table.css'
</style>
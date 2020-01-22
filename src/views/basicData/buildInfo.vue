<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-select v-model="filters.object" filterable placeholder="请选择" @change="Search">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            suffix-icon="el-icon-search"
            v-model="filters.buildName"
            placeholder="请输入楼栋名称"
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
      height="600px"
    >
      <!-- <el-table-column type="selection" width="60"></el-table-column> -->
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="name" label="所属项目" ></el-table-column>
      <el-table-column prop="buildName" label="楼栋名称">
        <template slot-scope="scope">
          <span class="abbreviation">{{scope.row.buildName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="storey" label="实际楼层数"></el-table-column>
      <el-table-column prop="elevator" label="电梯楼层数"></el-table-column>
      <el-table-column prop="area" label="建筑面积(m²)"></el-table-column>
      <el-table-column prop="cover" label="楼栋图">
        <template slot-scope="scope">
          <el-popover
            ref="popover4"
            placement="bottom"
            width="300"
            trigger="click">
            <!-- <img style="width:300px" :src="scope.row.cover"/> -->
            <img style="height:300px" src="../../assets/images/storeytu6.jpg"/>
          </el-popover>
          <el-button type="text" v-popover:popover4 icon="el-icon-picture" style="font-size:22px"></el-button>
        </template>
      </el-table-column>
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
      <pagination :total="page_total" @pageChange="pageChange"></pagination>
    </el-col>
    <!-- 新增编辑公用弹窗 -->
    <el-dialog :title="Popup==true?'编辑':'新增'" :visible.sync="Popup==true?dialogFormVisible1:dialogFormVisible2" :before-close="handleClose">
      <el-form :model="Popup==true?editForm:addForm" label-width="120px" :ref="Popup==true?editForm:addForm">
        <el-form-item label="所属项目">
          <el-input v-model="(Popup==true?editForm:addForm).name"></el-input>
        </el-form-item>
        <el-form-item label="楼栋名称">
          <el-input v-model="(Popup==true?editForm:addForm).buildName"></el-input>
        </el-form-item>
        <el-form-item label="实际楼层数">
          <el-input v-model="(Popup==true?editForm:addForm).storey"></el-input>
        </el-form-item>
        <el-form-item label="电梯楼层数">
          <el-input v-model="(Popup==true?editForm:addForm).elevator"></el-input>
        </el-form-item>
        <el-form-item label="建筑面积(m²)">
          <el-input v-model="(Popup==true?editForm:addForm).area"></el-input>
        </el-form-item>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="楼栋图">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-success="uploadImg"
                :file-list="fileList2"
                list-type="picture"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">* 最多只能上传一张jpg/png格式的图片</div>
              </el-upload>
              <img v-if="Popup" style="width:80px" :src="(Popup==true?editForm:addForm).cover" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="Popup">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button  type="primary" @click.native="editSubmit(editForm)" :loading="addLoading">确 定</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-else>
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增界面 -->
    <!-- <el-dialog title="新增" :visible.sync="dialogFormVisible2">
      <el-form :model="addForm" label-width="120px" ref="addForm">
         <el-form-item label="所属项目">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="楼栋名称">
          <el-input v-model="addForm.buildName"></el-input>
        </el-form-item>
        <el-form-item label="实际楼层数">
          <el-input v-model="addForm.abbreviation"></el-input>
        </el-form-item>
        <el-form-item label="电梯楼层数">
          <el-input v-model="addForm.abbreviation"></el-input>
        </el-form-item>
        <el-form-item label="建筑面积(m²)">
          <el-input v-model="addForm.area"></el-input>
        </el-form-item>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="楼栋图">
              <el-upload
              v-if='isshow'
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-success="uploadImg"
                :file-list="fileList2"
                list-type="picture"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">* 最多只能上传一张jpg/png格式的图片</div>
              </el-upload>
              <img v-if="!isshow" src="../../assets/images/portrait.jpg" />
            </el-form-item>
            
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">确 定</el-button>
      </div>
    </el-dialog> -->
  </section>
</template>

<script>
// import util from '../../common/js/util'
//import NProgress from 'nprogress'
// import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
import pagination from '../../components/pagination'
import axios from "axios";
export default {
  data() {
    return {
      filters: {
        buildName: "",
        // city: "所有区域",
        object: "所有项目"
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
        buildName: "",
        storey: null,
        name: "",
        elevator: null,
        area:null,
        cover:''
      },

      //新增界面是否显示
      dialogFormVisible2: false,
      addLoading: false,

      //新增界面数据
      addForm: {
        buildName: "",
        storey: null,
        name: "",
        elevator: null,
        area:null,
        cover:''
      },
      pagesize: 20,
      options: [
        {
          value: "选项1",
          label: "所有区域"
        },
        {
          value: "选项2",
          label: "静安"
        },
        {
          value: "选项3",
          label: "闵行"
        },
        {
          value: "选项4",
          label: "黄埔"
        },
        {
          value: "选项5",
          label: "浦东"
        }
      ],
      options1: [
        {
          value: "所有项目",
          label: "所有项目"
        },
        // {
        //   value: "筹备项目",
        //   label: "筹备项目"
        // },
        // {
        //   value: "在营项目",
        //   label: "在营项目"
        // }
      ],
      // options2: [
      //   {
      //     value: "筹备项目",
      //     label: "筹备项目"
      //   },
      //   {
      //     value: "在营项目",
      //     label: "在营项目"
      //   }
      // ],
      fileList2: [],
      isshow:true,
      Popup:true,
      page_index: 1, // 页数
      page_total:null, // 总页数
      page_size: 10,
    };
  },
  methods: {
    dbclick(v) {
      this.dialogFormVisible1 = true;
      this.editForm = Object.assign({}, v);
    },
    
    uploadImg(response, file, fileList) {
      console.log(response, file, fileList);
    },
    handlePreview(file, fileList) {
      console.log(file, fileList);
    },
    //弹窗差掉
    handleClose() {       
      this.dialogFormVisible1 = false;
      this.dialogFormVisible2 = false;    
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
      axios.get("/getarrlist").then(res => {
        console.log(res);
        _this.datalist = res.data;
        _this.listLoading = false;
        _this.page_total=this.datalist.length
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      }).then(() => {
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
        axios
          .post("/deletearrlistr", {
            id: row.id
          })
          .then(res => {
            console.log(res);
            _this.listLoading = false;
            _this.$message({
              message: "删除成功",
              type: "success"
            });
            _this.getUsers();
          });
      });
    },
    //显示编辑界面
    handleEdit(index, row) {
      this.Popup=true;
      this.dialogFormVisible1 = true;
      this.editForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function() {
      this.Popup=false;
      this.dialogFormVisible2 = true;
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
          axios.post("/updatearrlist", _this.editForm).then(res => {
            console.log(res);
            _this.editLoading = false;
            _this.dialogFormVisible1 = false;
            _this.$message({
              message: "修改成功",
              type: "success"
            });
            _this.getUsers();
          });
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
          axios.post("/addarrlist", _this.addForm).then(res => {
            console.log(res);
            _this.addLoading = false;
            _this.dialogFormVisible2 = false;
            _this.$message({
              message: "添加成功",
              type: "success"
            });
            _this.getUsers();
          });
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
      if (this.filters.buildName) {
        var searchlist = [];
        this.datalist.map(item => {
          if (this.filters.buildName == item.buildName) {
            searchlist.push(item);
          }
        });
        this.datalist = searchlist;
      } else {
        this.getUsers();
      }
    },
    //分页
    pageChange (item) {
	      console.log(item)
	      this.page_index = item.page_index;
	      this.page_size = item.page_limit;
    },
  },
  mounted() {
    this.getUsers();
  },
   components: {
    pagination
  },
};
</script>
<style scoped>
@import "../../common/css/table.css";
</style>
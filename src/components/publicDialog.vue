<template>
  <el-dialog
    :title="titInfo.headerTit"
    :visible.sync="visible"
    @close="$emit('update:isshow', false)"
    :show="isshow"
    width="40%"
  >
    <div class="dialog-con">
      <div style="width: 50%;">
        <el-input :placeholder="titInfo.message" prefix-icon="el-icon-search" v-model="SelecteItem"></el-input>
        <p class="tree-tit">{{titInfo.leftTit}}</p>
        <el-tree
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
          ref="tree"
        ></el-tree>
      </div>
      <div class="tree-right">
        <p class="tree-tit">{{titInfo.rightTit}}</p>
        <ul v-if="titInfo.rightTit=='已选品牌'">
          <li v-for="(item,index) in business" :key="index">{{item}}</li>
        </ul>
        <p v-if="titInfo.rightTit=='已选商家'">{{business}}</p>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确 定</el-button>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="Delete" plain>重置</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    data2: {
      type: Array,
      required: true // 必传
    },
    infoTit: Object,
    isshow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      placeholders: "",
      titInfo: {
        headerTit: "",
        leftTit: "",
        rightTit: "",
        message:''
      },
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      visible: this.isshow,
      SelecteItem: "",
      business: '',
      secondarr:[]
    };
  },
  watch: {
    SelecteItem(val) {
      this.$refs.tree.filter(val);
    },
    isshow() {
      this.visible = this.isshow;
      console.log(this.isshow);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(val) {
      console.log(val);
      console.log(val.children);
      console.log(this.titInfo.leftTit)
      if(this.titInfo.leftTit=='商家列表'){
        this.business=''
        this.business = val.label;
      }else if(val.children==undefined){
        this.secondarr.push(val.label)
        this.business=this.secondarr
      }     
      // this.business = val.label;
    },
    Delete() {
      this.business = []
    },
    submit() {
      this.secondarr=[]
      if (this.business) {
        this.visible = false;
        this.$emit("chooseTree", this.business);
      } else {
        return;
      }
    },
    close() {
      this.visible = false;
    }
  },
  mounted() {
    this.titInfo = this.infoTit;
    this.data = this.data2;   
    this.visible = this.isshow;
    console.log(this.isshow);
  }
};
</script>
<style lang="scss" scoped>
.dialog-con {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .filter-tree {
    height: 200px;
    overflow: hidden;
  }
  .tree-right {
    border-left: 1px solid #ccc;
    width: 50%;
    padding: 0 20px;
    margin-top: 42px;
  }
  .tree-tit {
    font-size: 14px;
    padding-left: 10px;
    border-left: solid 3px #1faeff;
  }
}
</style>
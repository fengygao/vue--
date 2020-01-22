<template>
  <div class="scroll">
    <div class="header">
      <el-button type="primary" plain>暂存</el-button>
      <el-button type="primary" plain>附件</el-button>
      <el-button type="primary">保存合同</el-button>
      <el-button type="primary">发起审批</el-button>
    </div>
    <el-form
      ref="form"
      :model="form"
      label-width="150px"
      @submit.prevent="onSubmit"
      style="margin:20px;width:98%;min-width:600px;margin-top:80px;max-height:82vh;overflow-y: scroll;"
    >
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="1.租约基本信息" name="1">
          <el-row :gutter="24" class="borbot">
            <el-col :span="12">
              <el-form-item label="项目名称">
                <el-input v-model="form.aa"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="经营状态">
                <el-input v-model="form.bb"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="borbot">
            <el-col :span="12">
              <el-form-item label="租赁主体">
                <el-input type="text" v-model="form.cc" @click.native="aa"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="品牌">
                <el-input v-model="form.dd"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="borbot">
            <el-col :span="12">
              <el-form-item>
                <template slot="label">
                  铺位号
                  <el-tooltip content="排位第一的铺位决定收入类型" placement="top">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </template>
                <el-input v-model="form.ee"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="经营范围">
                <el-input v-model="form.ff"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="borbot">
            <el-col :span="12">
              <el-form-item label="规划业态">
                <el-input v-model="form.gg"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="品牌业态">
                <el-input v-model="form.hh"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="borbot">
            <el-col :span="12">
              <el-form-item label="建筑面积(m²)">
                <el-input v-model="form.ii"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="计租面积(m²)">
                <el-input v-model="form.jj"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="borbot">
            <el-col :span="12">
              <el-form-item label="预估交付日期">
                <el-date-picker v-model="form.kk" type="date" placeholder="选择预估交付日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同约定开业日期">
                <el-date-picker v-model="form.ll" type="date" placeholder="选择合同约定开业日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="borbot">
            <el-col :span="12">
              <el-form-item label="租赁开始日期">
                <el-date-picker v-model="form.mm" type="date" placeholder="选择租赁开始日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="租赁结束日期">
                <el-date-picker v-model="form.nn" type="date" placeholder="选择租赁结束日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="租期">
                <el-input v-model="form.oo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签约日期">
                <el-date-picker v-model="form.pp" type="date" placeholder="选择签约日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="2.租金" name="2">
          <el-row :gutter="24" class="borbot">
            <el-col :span="3">
              <el-form-item label="计租方式"></el-form-item>
            </el-col>
            <el-col :span="21">
              <el-radio-group v-model="radio">
                <el-radio :label="1">固定租金</el-radio>
                <el-radio :label="2">纯扣租金</el-radio>
                <el-radio :label="3">两者取高</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="3">
              <el-form-item></el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="支付周期">
                <el-select v-model="form.date1" placeholder="请选择">
                  <el-option label="月付" value="月"></el-option>
                  <el-option label="两月付" value="两月"></el-option>
                  <el-option label="季付" value="季"></el-option>
                  <el-option label="半年付" value="半年"></el-option>
                  <el-option label="年付" value="年"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="应收形式">
                <el-select v-model="form.date2" placeholder="请选择">
                  <el-option label="预收" value="月"></el-option>
                  <el-option label="当前收" value="两月"></el-option>
                  <el-option label="后收" value="季"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="最后缴费日">
                <el-input v-model="form.number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="3">
              <el-form-item label="固定租金"></el-form-item>
            </el-col>
            <el-col :span="21">
              <el-form-item label="租金单价">
                <el-radio-group v-model="radio">
                  <el-radio :label="1">日单价</el-radio>
                  <el-radio :label="2">月总价</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="3">
              <el-form-item></el-form-item>
            </el-col>
            <el-col :span="21">
              <el-table :data="Data" class="wisthrow">
                <el-table-column prop="date" label="序号" width="80" align="center"></el-table-column>
                <el-table-column label="期间" width="400" align="center">
                  <el-table-column prop="address" v-if="address"></el-table-column>
                  <el-table-column prop="address" v-if="address" width="40">~</el-table-column>
                  <el-table-column prop="address" v-if="address"></el-table-column>
                </el-table-column>
                <el-table-column prop="address" label="申请租金(元/m²/天)" align="center"></el-table-column>
                <el-table-column prop="address" label="每月租金总额(元)" align="center"></el-table-column>
                <el-table-column prop="address" label="租赁预算" align="center"></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="3.物业管理费" name="3">
          <el-row :gutter="24" class="borbot">
            <el-col :span="8">
              <el-form-item label="支付周期">
                <el-select v-model="form.date1" placeholder="请选择">
                  <el-option label="月付" value="月"></el-option>
                  <el-option label="两月付" value="两月"></el-option>
                  <el-option label="季付" value="季"></el-option>
                  <el-option label="半年付" value="半年"></el-option>
                  <el-option label="年付" value="年"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收形式">
                <el-select v-model="form.date2" placeholder="请选择">
                  <el-option label="预收" value="月"></el-option>
                  <el-option label="当前收" value="两月"></el-option>
                  <el-option label="后收" value="季"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="最后缴费日">
                <el-input v-model="form.number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="borbot">
            <el-col :span="24">
              <el-form-item label="物管单价">
                <el-radio-group v-model="radio">
                  <el-radio :label="1">月单价</el-radio>
                  <el-radio :label="2">月总价</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="borbot">
            <el-col :span="3">
              <el-form-item label="物业管理费"></el-form-item>
            </el-col>
            <el-col :span="21">
              <el-table :data="Data">
                <el-table-column prop="date" label="序号" width="80" align="center"></el-table-column>
                <el-table-column label="期间" width="400" align="center">
                  <el-table-column prop="address" v-if="address"></el-table-column>
                  <el-table-column prop="address" v-if="address" width="40">~</el-table-column>
                  <el-table-column prop="address" v-if="address"></el-table-column>
                </el-table-column>
                <el-table-column prop="address" label="申请租金(元/m²/天)" align="center"></el-table-column>
                <el-table-column prop="address" label="每月租金总额(元)" align="center"></el-table-column>
                <el-table-column prop="address" label="租赁预算" align="center"></el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="电费单价">
                <el-input v-model="form.number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="水费单价">
                <el-input v-model="form.number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="4.首期及装修期" name="4">
          <el-row :gutter="24" class="borbot">
            <el-col :span="12">
              <el-form-item label="首期租金单价(元/日/m²)">
                <el-input v-model="form.number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <template slot="label">
                  首期租金
                  <el-tooltip content="首年月两倍租金" placement="top">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </template>
                <el-input v-model="form.ee" placeholder="自动计算"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="borbot">
            <el-col :span="12">
              <el-form-item label="首期物管费单价(元/月/m²)">
                <el-input v-model="form.number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <template slot="label">
                  首期物管费(元)
                  <el-tooltip content="首年月两倍物管费" placement="top">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </template>
                <el-input v-model="form.ee" placeholder="自动计算"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="borbot">
            <el-col :span="12">
              <el-form-item>
                <template slot="label">
                  是否教育类商户
                  <el-tooltip content="教育类3倍保证金" placement="top">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </template>
                <el-radio-group v-model="radio">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <template slot="label">
                  租赁保证金
                  <el-tooltip content="教育类：(末年月租金+物管)*3；非教育类：(末年月租金+物管)*2" placement="top">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </template>
                <el-input v-model="form.ee"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="borbot">
            <el-col :span="12">
              <el-form-item label="是否装修">
                <el-radio-group v-model="radio">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否有装修免租期">
                <el-radio-group v-model="radio">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="borbot">
            <el-col :span="12">
              <el-form-item label="装修开始时间">
                <el-date-picker v-model="form.mm" type="date" placeholder="选择装修开始时间"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="装修结束时间">
                <el-date-picker v-model="form.nn" type="date" placeholder="选择装修结束时间"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="费用最迟缴纳日">
                <el-date-picker v-model="form.mm" type="date" placeholder="费用最迟缴纳日"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12"></el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="5.其他收费" name="5">
          <el-row :gutter="24">
            <el-col :span="1">
              <el-form-item></el-form-item>
            </el-col>
            <el-col :span="23">
              <el-table :data="tablelist">
                <el-table-column prop="bookname" label="费用项" align="center">
                  <template slot-scope="scope">
                    <el-autocomplete
                      v-model="scope.row.bookname"
                      :fetch-suggestions="querySearchAsync"
                      placeholder="请输入费项"
                      @select="handleSelect"
                    ></el-autocomplete>
                  </template>
                </el-table-column>
                <el-table-column prop="bookvolume" label="费用类型" align="center">
                  <template slot-scope="scope">
                    <el-select
                      v-model="scope.row.bookvolume"
                      placeholder="请选择"
                      @change="inputhidden"
                    >
                      <el-option
                        v-for="item in reslist"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="bookborrower" label="支付周期" align="center">
                  <template slot-scope="scope" v-if="xiaoshi">
                    <el-select v-model="scope.row.bookborrower" placeholder="请选择">
                      <el-option
                        v-for="item in resdata"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="应收形式" align="center">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.bookaa" placeholder="请选择">
                      <el-option label="预收" value="月"></el-option>
                      <el-option label="当前收" value="两月"></el-option>
                      <el-option label="后收" value="季"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="开始时间和结束时间" align="center" width="390">
                  <template slot-scope="scope">
                    <el-date-picker
                      v-model="scope.row.booktime"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column  label="应收日期" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.bookdata"></el-input>
                  </template>
                </el-table-column>
                <el-table-column  label="应收金额" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.booknum"></el-input>
                  </template>
                </el-table-column>
                <el-table-column  label="税率" align="center">
                  <template slot-scope="scope">
                    <el-input type="text" readonly v-model="scope.row.bookkis"></el-input>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <button
                      @click="addLine"
                      class="addBtn"
                      v-if="scope.$index == tablelist.length - 1"
                    >
                      <i class="el-icon-circle-plus-outline"></i>
                    </button>
                    <button
                      v-if="tablelist.length > 1"
                      @click="handleDelete(scope.$index, scope.row)"
                      class="del-btn"
                    >
                      <i class="el-icon-minus"></i>
                    </button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="6.滞纳金规则" name="6">
          <el-row :gutter="24">
            <el-col :span="1">
            </el-col>
            <el-col :span="23">
              <el-table :data="tableaa">
                <el-table-column prop="bookname" label="费用项" align="center" width="300">
                  <template slot-scope="scope">
                    <el-input type="text" readonly v-model="scope.row.bookname"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="bookvolume" label="滞纳金" width="400">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.bookvolume"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="7.特殊条款" name="7">
          <el-row :gutter="24">
            <el-col :span="1">
              <el-form-item></el-form-item>
            </el-col>
            <el-col :span="23">
              <el-table :data="tablelist" class="wisthrow">
                <el-table-column prop="bookname" label="条目" width="100" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.bookname"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="bookvolume" label="内容">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.bookvolume"></el-input>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <button
                      @click="addLine"
                      class="addBtn"
                      v-if="scope.$index == tablelist.length - 1"
                    >
                      <i class="el-icon-circle-plus-outline"></i>
                    </button>
                    <button
                      v-if="tablelist.length > 1"
                      @click="handleDelete(scope.$index, scope.row)"
                      class="del-btn"
                    >
                      <i class="el-icon-minus"></i>
                    </button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>

    <el-dialog title="请选择" :visible.sync="dialogVisible" width="40%">
      <div class="dialog-con">
        <div style="width: 50%;">
          <el-input placeholder="输入商家进行搜索" prefix-icon="el-icon-search" v-model="filterText"></el-input>
          <p class="tree-tit">商家列表</p>
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
          <p class="tree-tit">已选商家</p>
          <p>{{business}}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Delete" plain>重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textinput: "滞纳金比例(%)",
      form: {
        aa: "",
        bb: "",
        cc: "",
        dd: "",
        ee: "",
        ff: "",
        gg: "",
        hh: "",
        ii: "",
        jj: "",
        kk: "",
        ll: "",
        mm: "",
        nn: ""
      },
      activeNames: [],
      tableData: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15
        }
      ],
      dialogVisible: false,
      filterText: "",
      data: [
        {
          id: 1,
          label: "一级1"
        },
        {
          id: 2,
          label: "一级2"
        },
        {
          id: 3,
          label: "一级3"
        }
      ],
      defaultProps: {
        label: "label"
      },
      business: "",
      value1: "",
      radio: "",
      Data: [],
      address: "",
      tablelist: [
        {
          bookname: "",
          bookborrower: "",
          bookvolume: "",
          bookaa: "",
          booktime: "",
          bookdata:'',
          booknum:'',
          bookkis:''
        }
      ],
      tableaa: [
        {
          bookname: "滞纳金",
          bookvolume: ""
        }
      ],
      restaurants: [
        { value: "预收租金", label: "1" },
        { value: "预收物管", label: "2" }
      ],
      resdata: [
        {
          value: "选项1",
          label: "月付"
        },
        {
          value: "选项2",
          label: "两月付"
        },
        {
          value: "选项3",
          label: "季付"
        },
        {
          value: "选项4",
          label: "半年付"
        },
        {
          value: "选项5",
          label: "年付"
        }
      ],
      reslist: [
        {
          value: "选项1",
          label: "一次性"
        },
        {
          value: "选项2",
          label: "周期"
        }
      ],
      state: "",
      timeout: null,
      value1: "",
      value2: "",
      xiaoshi: true,
      number: ""
    };
  },
  methods: {
    inputhidden(val) {
      if (val == "选项2") {
        this.xiaoshi = false;
      } else {
        this.xiaoshi = true;
      }
    },
    onSubmit() {
      console.log("submit!");
    },
    handleChange(val) {
      console.log(val);
    },
    aa() {
      this.dialogVisible = true;
      this.business = "";
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      console.log(data);
      this.business = data.label;
    },
    submit() {
      this.form.cc = "";
      this.form.cc = this.business;
      this.dialogVisible = false;
      // this.timer()
    },
    // timer(){
    //   setTimeout(()=>{
    //     console.log(this.dialogVisible)
    //     this.dialogVisible = false;
    //   },3000)
    // },
    Delete() {
      this.business = "";
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 2) {
        if (columnIndex === 2) {
          return [1, 3];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },
    addLine() {
      //添加行数
      var newValue = {
         
          bookname: "",
          bookborrower: "",
          bookvolume: "",
          bookaa: "",
          booktime: "",
          bookdata:'',
          booknum:'',
          bookkis:''
        
      };
      //添加新的行数
      this.tablelist.push(newValue);
    },
    handleDelete(index) {
      //删除行数
      this.tablelist.splice(index, 1);
    },
    // save() {
    //   //这部分应该是保存提交你添加的内容
    //   console.log(JSON.stringify(this.tablelist));
    // },
    //其他收费
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  }
};
</script>
<style lang="scss" scoped>
.scroll {
  .header {
    position: fixed;
    top: 100px;
    right: 54px;
    text-align: right;
    height: 80px;
    line-height: 80px;
    z-index: 99;
    width: 84.6%;
  }
  .el-form-item {
    margin: 6px 0;
  }
  .el-icon-info {
    color: #e96d04;
    cursor: pointer;
    font-size: 19px;
  }

  .dialog-con {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .filter-tree {
      height: 200px;
      overflow: hidden;
    }
    .tree-right {
      border-left: 1px solid #1faeff;
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
  .el-collapse-item {
    margin-bottom: 10px;
  }
  .wisthrow {
    width: 100%;
    margin: 4px 0;
    border-top: 1px solid #e5eef5;
  }
  .borbot {
    line-height: 52px;
    border-bottom: 1px solid #f2f2f2;
  }

}

.el-form-item__content {
  margin-left: 200px !important;
}
.el-collapse {
  border: 0;
}
.el-collapse-item__header {
  height: 50px;
  background: rgba(227, 246, 255, 0.8);
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
   width: 100%; 
}

.el-collapse-item__wrap {
  padding: 0 10px;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 0;
}
</style>
<style >
 .el-form-item__label {
  text-align: left !important;
  /* width: 180px !important; */
}

/* .el-form-item__content {
  margin-left: 200px !important;
} */
.el-collapse-item__header {
  height: 50px;
  background: rgba(227, 246, 255, 0.8);
}
.el-collapse-item__wrap {
  padding: 0 10px;
}
/*
.el-collapse {
  border: 0;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
   width: 100%; 
}


.el-table td,
.el-table th.is-leaf {
  border-bottom: 0;
} */
</style>
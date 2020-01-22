
import Mock from 'mockjs'

const Random = Mock.Random
// 设置全局延时，没有延时的话，有时候会检测不到数据变化
Mock.setup({
  timeout: '300-600'
})
// 创建一个数组用来接收模拟的数据
const arr = []
arr.push(Mock.mock({
  "data|10-20": [
    {
      "id|+1": 1,
      'name|1':['乐虹坊','虹桥晶座'] , 
      "users":"@cname()",
      "number":'@integer(10011900000,10011900999)',
      "brand":'@ctitle(3,9)',
      'type|1': ['租赁合同','多经合同','终止合同','变更合同'],
      "admin":"@first()",
      "standard|1":['标准','非标准'],
      "dataTime":'',
      "state|1":['可修改','已提交','审批中','已驳回'],
    }
  ]
}));

// 实现增删改查的各个数据接口只使用一次模拟数据，后面使用 localStorage 来进行存储数据。
// 获取列表
function getList() {
    console.log(arr[0].data)
  // 若 localStorage 没有数据，则将 Mock 的数据存入
  if (!localStorage.getItem('array')) {
    localStorage.setItem('array',JSON.stringify(arr[0].data))
  }
  // 每次获取数据时，再从 localStorage 中拉取数据
  var array = JSON.parse(localStorage.getItem('array'))
  return array
}



// 制作各个接口
Mock.mock('/getcon', 'get', getList)

export default Mock;
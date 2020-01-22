
import Mock from 'mockjs'

const Random = Mock.Random
// 设置全局延时，没有延时的话，有时候会检测不到数据变化
Mock.setup({
  timeout: '300-600'
})
// 创建一个数组用来接收模拟的数据
const listarr = []
listarr.push(Mock.mock({
  "data|10-20": [
    {
      "id|+1": 1,
      'name': "@cword(4, 9)", //项目
      "buildName":"@ctitle()",
      "storey":'@integer(1,30)',
      "elevator":'@integer(1,30)',
      'area': "@float(20, 10000, 1, 2)",
      "cover":""
    }
  ]
}));

// 实现增删改查的各个数据接口只使用一次模拟数据，后面使用 localStorage 来进行存储数据。
// 获取列表
function getList() {
    console.log(listarr[0].data)
  // 若 localStorage 没有数据，则将 Mock 的数据存入
  if (!localStorage.getItem('arrlist')) {
    localStorage.setItem('arrlist',JSON.stringify(listarr[0].data))
  }
  // 每次获取数据时，再从 localStorage 中拉取数据
  var arrlist = JSON.parse(localStorage.getItem('arrlist'))
  return arrlist
}

// 删除
function deleteUser(options) {
  // 先从 localStorage 中拉取数据
  let obj=JSON.parse(options.body);
  var arrlist = JSON.parse(localStorage.getItem('arrlist'))
  // 根据传递的 id 删除 用户
  for( let index in arrlist ) {
    if (arrlist[index].id === obj.id) {
      arrlist.splice(index,1)
      localStorage.setItem('arrlist', JSON.stringify(arrlist))
    }
  }
  return {
    data: '删除成功'
  }
}

// 添加
function addUser(options) {
  // 先从 localStorage 中拉取数据
  var arrlist = JSON.parse(localStorage.getItem('arrlist'))
  // 获取传入用户信息对象，是一个字符串，需要转化为对象
  var user = JSON.parse(options.body)
  // 使用 mock 随机生成一个 id
  user.id = Random.id()
  // 将 user 插入到 arrlist 中
  arrlist.unshift(user)
  // 重新将 arrlist 存入 localStorage 中
  localStorage.setItem('arrlist', JSON.stringify(arrlist))
  return {
    data: '添加成功'
  }
}
// 更新
function updateUser(options) {
  // 先从 localStorage 中拉取数据
  var arrlist = JSON.parse(localStorage.getItem('arrlist'))
  var user = JSON.parse(options.body)
  // 遍历 arrlist 根据传入对象的 id 更新用户信息
  for ( let index in arrlist ) {

    if ( arrlist[index].id === user.id ) {
      arrlist[index] = user
    }
  }
  localStorage.setItem('arrlist', JSON.stringify(arrlist))
  return {
    data: '更新成功'
  }
}

// 制作各个接口
Mock.mock('/getarrlist', 'get', getList)
Mock.mock('/deletearrlistr', 'post', deleteUser)
Mock.mock('/addarrlist', 'post', addUser)
Mock.mock('/updatearrlist', 'post', updateUser)

export default Mock;
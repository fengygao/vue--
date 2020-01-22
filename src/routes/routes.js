// ES 提出的import方法实现路由懒加载
const Home = () => import("../views/Home")

const NotFound = () => import("../views/404")
// 登录
const Login = () => import("../views/login/Login")
// 基础数据
const cityInfo = () => import("../views/basicData/cityInfo")
const projectInfo = () => import("../views/basicData/projectInfo")
const buildInfo = () => import("../views/basicData/buildInfo")
const storeyInfo = () => import("../views/basicData/storeyInfo")
const shopInfo = () => import("../views/basicData/shopInfo")
const diversification = () => import("../views/basicData/diversification")
// 企划管理
const Form = () => import("../views/multi/Form")
// 个人首页
const Page = () => import("../views/homePage/Page")
// 运营管理
const Page4 = () => import("../views/operation/Page4")
// 财务管理
const Page5 = () => import("../views/financial/Page5")
// 招商管理
const BRAND = () => import("../views/mnangement/BRAND")
const brandlist = () => import("../views/mnangement/brandlist")
const lease = () => import("../views/mnangement/lease")
const lease1 = () => import("../views/mnangement/lease1")
const leaseitem = () => import("../views/mnangement/leaseitem")
//合同管理
const contracts = () => import("../views/contract/contracts")
const contractsAa = () => import("../views/contract/contractsAa")
const contractsBb = () => import("../views/contract/contractsBb")
const contractsIndex = () => import("../views/contract/contractsIndex")
const planning = () => import("../views/contract/planning")
// const contractsAa = () => import("../views/contract/contractsAa")
// const contractsBb = () => import("../views/contract/contractsBb")
// const contractsIndex = () => import("../views/contract/contractsIndex")
//svg
const svgcover = () => import("../views/svg/svgcover")
const svgmanage = () => import("../views/svg/svgmanage")
//收费管理
const bill = () => import("../views/charge/bill")
const collection = () => import("../views/charge/collection")
const receivable = () => import("../views/charge/receivable")
//财务管理
const echarts = () => import("../views/service/echarts")
//
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
    routes:routes
})

let routes = [{
    path: '/login',
    component: Login,
    name: '登录',
    hidden: true,
  },
  {
    path: '/',
    component: Home,
    meta: {
      requireAuth: true
    }, //添加该字段，表示进入这个路由是需要登录的
    iconTu: 'el-icon-news',
    name: '个人',
    // leaf: true, //只有一个节点
    children: [{
      path: '/homePage/page',
      component: Page,
      name: '首页'
    }, ]
  },
  {
    path: '/',
    component: Home,
    name: '平面图',
    iconTu: 'el-icon-s-marketing',
    children: [{
        path: '/svg/svgcover',
        component: svgcover,
        name: 'SVG平面图'
      },
      {
        path: '/svg/svgmanage',
        component: svgmanage,
        name: 'SVG管理'
      },
    ]
  },
  {
    path: '/',
    component: Home,
    name: '基础数据',
    iconTu: 'el-icon-s-data',
    children: [{
        path: '/basicData/cityInfo',
        component: cityInfo,
        name: '城市信息'
      },
      {
        path: '/basicData/projectInfo',
        component: projectInfo,
        name: '项目信息'
      },
      {
        path: '/basicData/buildInfo',
        component: buildInfo,
        name: '楼栋信息'
      },
      {
        path: '/basicData/storeyInfo',
        component: storeyInfo,
        name: '楼层信息'
      },
      {
        path: '/basicData/shopInfo',
        component: shopInfo,
        name: '铺位信息'
      },
      {
        path: '/basicData/diversification',
        component: diversification,
        name: '多经点位'
      },
    ]
  },

  {
    path: '/',
    component: Home,
    name: '招商管理',
    iconTu: 'el-icon-money',
    children: [{
        path: '/mnangement/BRAND',
        component: BRAND,
        name: '品牌库',
        children: [{
          path: '/mnangement/brandlist/:id',
          component: brandlist,
        }, ]
      },
      {
        path: '/mnangement/cityInfo',
        component: cityInfo,
        name: '租户库'
      },

      {
        path: '/mnangement/lease',
        component: lease,
        name: '租赁条件',
        redirect: '/mnangement/lease1',
        children: [{
            path: '/mnangement/lease1',
            component: lease1,
          },
          {
            path: '/mnangement/leaseitem',
            component: leaseitem,
            name: '租赁意向详情'
          },
        ]
      }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '合同管理',
    iconTu: 'el-icon-s-check',
    children: [{
        path: '/contract/contracts',
        component: contracts,
        redirect: '/contract/contractsAa',
        name: '文本合同',
        children: [{
            path: '/contract/contractsAa',
            component: contractsAa,
            name: '电子合同',
          },
          {
            path: '/contract/contractsIndex',
            component: contractsIndex,
            name: '电子合同详情',
          },
          {
            path: '/contract/contractsBb',
            component: contractsBb,
            name: '合同模板库',
          },

        ]
      },
      {
        path: '/contract/planning',
        component: planning,
        name: '企划合同'
      },
    ]
  },
  {
    path: '/',
    component: Home,
    name: '运营管理',
    iconTu: 'el-icon-refresh',
    children: [{
      path: '/operation/page4',
      component: Page4,
      name: 'Vuex'
    }, ]
  },
  {
    path: '/',
    component: Home,
    name: '企划管理',
    iconTu: 'el-icon-document',
    children: [{
      path: '/multi/form',
      component: Form,
      name: '数据表单'
    }, ]
  },

  {
    path: '/',
    component: Home,
    name: '服务管理',
    iconTu: 'el-icon-user',
    children: [{
      path: '/echarts',
      component: echarts,
      name: 'echarts'
    }]
  },
  {
    path: '/',
    component: Home,
    name: '收费管理',
    iconTu: 'el-icon-data-line',
    children: [{
      path: '/charge/bill',
      component: bill,
      name: '账单管理'
    }, {
      path: '/charge/collection',
      component: collection,
      name: '收款管理'
    }, {
      path: '/charge/receivable',
      component: receivable,
      name: '应收管理'
    }, ]
  },
  {
    path: '/',
    component: Home,
    name: '财务管理',
    iconTu: 'el-icon-printer',
    children: [{
      path: '/service/echarts',
      component: echarts,
      name: 'echarts'
    }]
  },
  //   {
  //     path: '/',
  //     component: Home,
  //     name: '物业管理',
  //     iconTu: 'el-icon-office-building',
  //     children: [{
  //       path: '/financial/page5',
  //       component: Page5,
  //       name: 'cc'
  //     }]
  //   },
  // {
  //     path: '/',
  //     component: Home,
  //     name: '实时报表',
  //     iconTu: 'el-icon-date',
  //     children: [
  //         { path: '/page5', component: Page5, name: 'bb' }
  //     ]
  // },
  // {
  //     path: '/',
  //     component: Home,
  //     name: '日报快照',
  //     iconTu: 'el-icon-notebook-1',
  //     children: [
  //         { path: '/page5', component: Page5, name: 'aa' }
  //     ]
  // },
  // {
  //     path: '/',
  //     component: Home,
  //     name: '月报快照',
  //     iconTu: 'el-icon-notebook-2',
  //     children: [
  //         { path: '/page5', component: Page5, name: 'newpage' }
  //     ]
  // },

  {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
  },
  {
    path: '*',
    hidden: true,
    redirect: {
      path: '/404'
    }
  }
]

export default routes;

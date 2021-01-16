import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/index'
import home from '@/views/pages/home'
import login from '@/views/pages/login'
import notFound from '@/views/pages/notFound'
import banner from '@/views/pages/controlCenter/banner'
import scenery from '@/views/pages/controlCenter/scenery'
import ticket from '@/views/pages/controlCenter/ticket'
import sceneryAction from "@/views/pages/controlCenter/sceneryAction";
import examineConfig from "@/views/pages/examineConfig";
import interfaceTotal from "@/views/pages/dataCenter/interfaceTotal";
import interfaceAction from "@/views/pages/dataCenter/interfaceAction";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '*',
      component: notFound,
      meta: {
        title: '404-对不起！您访问的页面不存在'
      }
    },
    {
      path: '/login',
      component: login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/home',
      component: index,
      children: [
        {
          path: '/',
          component: home,
          meta: {
            title: '首页',
            opinions: []
          }
        },
        {
          path: '/controlCenter/banner',
          component: banner,
          meta: {
            title: '页面轮播配置',
            opinions: [{ name: '控制中心', url: null }, { name: '页面轮播配置', url: '/controlCenter/banner' }]
          }
        },
        {
          path: '/controlCenter/scenery',
          component: scenery,
          meta: {
            title: '页面景点配置',
            opinions: [{ name: '控制中心', url: null }, { name: '页面景点配置', url: '/controlCenter/scenery' }]
          }
        },
        {
          path: '/controlCenter/scenery/sceneryAction',
          component: sceneryAction,
          meta: {
            title: '景点',
            opinions: [{ name: '控制中心', url: null }, { name: '页面景点配置', url: '/controlCenter/scenery' }, { name: '景点信息操作', url: '/controlCenter/scenery/sceneryAction' }]
          }
        },
        {
          path: '/controlCenter/ticket',
          component: ticket,
          meta: {
            title: '页面门票配置',
            opinions: [{ name: '控制中心', url: null }, { name: '页面门票配置', url: '/controlCenter/ticket' }]
          }
        },
        {
          path: '/dataCenter/interfaceTotal',
          component: interfaceTotal,
          meta: {
            title: '接口数据统计',
            opinions: [{ name: '数据中心', url: null }, { name: '接口数据统计', url: '/dataCenter/interfaceTotal' }]
          }
        },
        {
          path: '/dataCenter/interfaceTotal/interfaceAction',
          component: interfaceAction,
          meta: {
            title: '接口数据操作',
            opinions: [{ name: '数据中心', url: null }, { name: '接口数据统计', url: '/dataCenter/interfaceTotal' }, { name: '接口数据操作', url: '/dataCenter/interfaceTotal/interfaceAction' }]
          }
        },
        {
          path: '/examineConfig',
          component: examineConfig,
          meta: {
            title: '审核管理',
            opinions: [{ name: '审核管理', url: '/examineConfig' }]
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
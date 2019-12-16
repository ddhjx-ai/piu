import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/Login/HelloWorld'
import WorkIndex from '@/components/Workbench/WorkIndex'
import WorkManage from '@/components/Workbench/WorkManage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/WorkIndex',
      name: 'WorkIndex',
      component: WorkIndex
    },
    {
      path: '/WorkManage',
      name: 'WorkManage',
      component: WorkManage
    }
  ]
})

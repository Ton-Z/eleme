import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import index from '@/components/index'
// import faxian from '@/components/faxian'
import dingdan from '@/components/dingdan'
import us from '@/components/us'
import login from '@/components/login'
import register from '@/components/register'
import search from '@/components/search'
import datails from '@/components/datails'
import change from '@/components/change'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main', component: main,
      children: [
        {
          path: '/index',
          component: index
        },
        {
          path: '/dingdan',
          component: dingdan
        },
        {
          path: '/us',
          component: us,
        },
        { path: '/login', component: login ,
        children:[
          { path: '/change', name: change, components: change }
        ]
      },
        { path: '/register', component: register },
        { path: '/search', component: search },
        { path: '/datails', name: datails, component: datails },
      ]
    }, { path: "*", redirect: "/index" }


  ]
})

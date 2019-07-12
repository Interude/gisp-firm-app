import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'tagActive/productList',
    },


    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/user/login')
    },
    {
      path: '/antifake',
      name: 'antifake',
      component: () => import('@/views/layout/layout'),
      children:[
        {
          path: 'mainMenu',
          name: 'antifakeMainMenu',
          component: () => import('@/views/antifake/antifakeMainMenu')
        },
          {
              path:'news',
              name:'news',
              component:()=>import('../views/news/news')
          }
        ,{
              path:'/lifeService',
              name:'lifeService',
              component:()=> import('../views/user/lifeService'),

          },
          {
              path:'/complaintSer',
              name:'complaint',
              component:()=>import('../views/businessService/complaint')
          },
          {
            path:'/my',
            name:'my',
            component:()=>import('../views/my/my')
          },
          {
            path:'/complainDetails',
            name:'complainDetails',
            component:()=>import('../views/businessService/complainDetails')
          },
          {
            path:'/createComplain',
            name:'createComplain',
            component:()=>import('../views/businessService/createComplain')
          },
          {
              path: 'nfcverify',
              name: 'nfcverify',
              component: () => import('@/views/antifake/nfcverify')
          },
      ]
    },
      {
          path: '/userinfo',
          name: 'userinfo',
          component: () => import('@/views/layout/layout'),
          children:[
              {
                  path: 'usersetting',
                  name: 'usersetting',
                  component: () => import('@/views/my/my')
              }
          ]
      },
      {
          path:'/tagActive',
          name:'tagActive',
          component: () => import('@/views/layout/layout'),
          children:[
              {
                  path: 'nfcactive',
                  name: 'nfcactive',
                  component: () => import('@/views/tagActive/nfcActive')
              },
              {
                  path: 'productList',
                  name: 'productList',
                  component: () => import('@/views/tagActive/productList')
              },
              {
                  path: 'activeTagList',
                  name: 'activeTagList',
                  component: () => import('@/views/tagActive/activeTagList')
              },
              {
                  path: 'batch_info',
                  name: 'batch_info',
                  component: () => import('../views/tagActive/batchInfo')
              },
              {
                  path: 'batch_detail',
                  name: 'batch_detail',
                  component: () => import('../views/tagActive/goodsDetail')
              },
              {
                  path: 'create_new_batch',
                  name: 'create_new_batch',
                  component: () => import('../views/tagActive/createNewBatch')
              },
              {
                  path: 'out_goingDesc',
                  name: 'out_goingDesc',
                  component: () => import('../views/tagActive/outGoingDesc')
              },
              {
                  path: 'back_going',
                  name: 'back_going',
                  component: () => import('../views/tagActive/backGoingHander')
              }
          ]
    }

  ]
})

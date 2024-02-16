import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import loginView from '../views/login/index.vue'
import userView from '../views/user/index.vue'
import advertiseView from '../views/advertise/index.vue'
import errorView from '../views/errorView.vue'
import { useLoginStore,useUserStore,useLoadingStore } from '@/stores/index'
// import { checkToken } from '@/api/api'
import { loginInformation } from '@/api/login'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    { 
      path: '/loginView',
      name: 'loginView',
      component: loginView 
    },
    { 
      path: '/userView',
      name: 'userView',
      component: userView 
    },
    { 
      path: '/advertiseView',
      name: 'advertiseView',
      component: advertiseView 
    },
    { 
      path: '/:pathMatch(.*)*',
      component: errorView 
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

//可在未登入時進入
const allow = ['loginView']
//需權限進入
const authorityList = ['userView']

router.beforeEach(async(to, from) => {
  // console.log('to',to.name)
  const loginStore = useLoginStore()
  const userStore = useUserStore()
  const loadingStore = useLoadingStore()
  if(!(allow.includes(to.name) || loginStore?.status)){
    return '/loginView'
  }

  if(loginStore?.status){
    // console.log('userStore.information',userStore.information,userStore.information?.state)
    if(!userStore.information?.state && (userStore.information?.state != 0)){
      // console.log('get')
      loadingStore.openLoad()
      await loginInformation().then((res) => {
        // console.log('loginInformation',res)
        if(res.data.status){
          userStore.setUserInformation(res.data.data)
          // console.log('userStore',userStore.information)
        }
        loadingStore.closeLoad()
      })
    }

    if(authorityList.includes(to.name) && (userStore.information.state !== 2)){
      return '/'
    }

    // checkToken().then((res) => {
    //   // console.log('checkToken api',res)
    //   if(res.data.status){
    //     userStore.setUserInformation(res.data.data)
    //   }else{
    //     loginStore.clearToken()
    //     userStore.clearUserInformation()
    //     return '/loginView'
    //   }
    // })
  }
  // explicitly return false to cancel the navigation
  // return false
})
export default router

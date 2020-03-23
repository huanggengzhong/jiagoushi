import Home from '../views/Home'
import Profile from '../views/Profile'
import User from '../views/User'
export default [
    {
        path:'/',
        name:'home',
        components:{
            default:Home,
            logo:()=>import('../views/Logo.vue')
        },
        beforeEnter(to,from,next){
            console.log('to');
            next();
        },
        meta:{
            keepAlive:true
        }
    },
    {
        path:'/profile',
        name:'profile',
        component:Profile,
        meta:{
            needLogin:true 
        }
    },
    {
        path:'/user',
        name:'user',
        component:User,
        children:[
            {
                path:'',
                component:()=>import('../views/UserAdd.vue')
            },
            {
                path:'add',
                component:()=>import('../views/UserAdd.vue')
            },
            {
                path:'list',
                component:()=>import('../views/UserList.vue')
            },
            {
                path:'detail/:id',
                component:()=>import('../views/UserDetail.vue')
            }
            // {
            //     path:'',
            //     redirect:{path:'/user/add'}
            // }
        ]
    },
    {
        path:'*',
        redirect:{path:'/'}
    }
]
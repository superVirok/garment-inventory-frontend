<template>
    <div class="main">
        <div class="ui attached container" style="width: 100%;height: 113px;">
            <div class="ui grid" style="background-color: rgb(18, 151, 151);margin: 0;height: 70px;">
                <div class="six wide column" style="font-size: 35px;color: rgb(7, 244, 252);padding: 0;">
                    <p style="display: inline-block;margin-top: 6px;">服装库存管理系统</p> 
                </div>

              
                <div class="ten wide column" style="text-align: right;padding: 0;">
                    <i class="large circular teal inverted user icon"></i>
                        <p style="display: inline-block; font-size: 27px;margin-top: 8px;">
                            {{userInfo.user.userName}}
                        </p>
                   
                    
                    <div id="logout" class="ui animated image meddium button"  @click="logout()">
                        <div class="visible content"><font style="font-size: x-large;">登出</font></div>
                        <div class="hidden content"><img src="../assets/spongebob.webp" class="ui avatar image"></div>
                    </div>

                    <a class="ui hidden"></a>
                </div>

            </div>

            <div class="ui inverted tabular menu" style="background-color: rgb(12, 133, 133); margin-top: 0px;text-align: center;">
                <router-link v-for="menubar in menubars" :class="barClass"  
                            style="margin:0px 10px 0px 0px;width: 120px;display: inline-block;" 
                            :key="menubar.id" 
                            :to="{
                                path:menubar.path,
                                query:{
                                    bid:menubar.id,
                                }
                            }" >{{menubar.title}}</router-link>
            </div>
        </div>

        <router-view></router-view>
            
       
    </div>

</template>

<script>
import data from '../api/barData'
export default {
    name:'Main',
    methods:{
        logout(){
            if(confirm('确认退出吗?')){
                this.$http.get('http://localhost:8080/logout').then(
                    response=>{
                        alert(response.data.message)
                        if(response.data.success === true){
                            // this.store.commit('logout')
                            sessionStorage.removeItem('userInfo')
                            window.location.href = 'http://localhost:8080'
                        }
                            
                    },
                    error=>{
                        console.log(error)
                    }
                )
            }
        },
    },
    
    setup(){
        let userInfo = sessionStorage.getItem('userInfo')
        userInfo = JSON.parse(userInfo)
        
        let barClass = data.barClass
        barClass = JSON.parse(JSON.stringify(barClass))
        let menubars = data.menubars 
        menubars = JSON.parse(JSON.stringify(menubars))
        return{
            userInfo,barClass,menubars
        }
    },
}
</script>
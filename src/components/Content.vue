<template>
    <div class="content">
        <div class="ui grid" style="margin: 0;">
            <div class="three wide column" style="padding: 0;" >
                <div class="ui vertical inverted fluid tabular  menu"  style="height: 838.06px;background-color:rgb(18, 151, 151);">
                        <div v-for="m in menu" :key="m.id">
                            <router-link  :class="menuclass"  
                                style="height: 72px;border: 2px solid skyblue;text-align: center;"
                                :key="key" 
                                :to="{
                                    path:m.path,
                                    query:{
                                        id:m.id,
                                        bid:$route.query.bid
                                    }
                                }">
                            <font style="font-size: x-large; font-weight: 800;color: aquamarine;">{{m.title}}</font>
                            <i :class="m.iclass"></i>
                            </router-link>
                        </div>
                        
                </div>
            </div>


       
            

           
            <div class="thirteen wide stretched column" style="padding: 0;">
                <div class="ui  segment" style="background-color: aquamarine;">         
                    <router-view></router-view>
                </div>
            </div>

        </div>
    </div>
</template>


<script>
import data from '../api/menuData'
export default {
    name:'Content',
    computed: {
        key() {
        // 只要保证 key 唯一性就可以了，保证不同页面的 key 不相同
            // console.log(this.$route.fullPath);
            return this.$route.fullPath
        },

   },
    watch:{
          "$route.query.bid":{
             handler(newValue,oldValue){
				this.menu = this.menus[newValue]
			}
        }
    },
    mounted(){
        this.menu = this.menus[this.$route.query.bid]
    },
    created(){
        this.menu = this.menus[this.$route.query.bid]
    },
    setup(){
         let menuclass = data.menuclass       //每一次刷新页面都运行一次
         menuclass = JSON.parse(JSON.stringify(menuclass))
         let menus = data.menus
         menus = JSON.parse(JSON.stringify(menus))
         let menu = null

        return{
            menuclass,menus,menu
        }
    }
}
</script>



<style >
 #ts_table{
        font-weight: 800;
        text-align: center;
    }

    #ts_table thead{
        font-size: medium;
    }


    #ts_table tbody{
        color: aquamarine;
    }

    #ts_table td{
        height: 59px;
    }

</style>
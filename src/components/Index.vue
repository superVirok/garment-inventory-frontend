<template>
   <div class="Index" id="Index">
       <Main/>
       <div class="pic"><img src="../assets/login.jpg" style="width: 100%;height: 100%;background-size: cover;background-repeat: no-repeat center;"></div>
     <!-- <div class="pic"></div> -->
   </div>
</template>

<script>
import Main from '../components/Main.vue'
export default {
    name:'index',
    components:{
        Main,
    }
}
</script>

<style scoped>
#Index{
     position: absolute;
     width: 100%;
     height: 100%;
     bottom: 0;
}

.pic{
    width: 100%;
    height: 663px;
}
/* img{
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat center;
} */
</style>


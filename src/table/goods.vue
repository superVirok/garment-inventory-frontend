<template>
    <div>
        <div class="ui three column centered grid" style="text-align: center;margin-right: 5px;">
            <div class="row" >
                <div class="column">
                    <div class="ui labeled input">
                        <label for="clothType" class="ui label">产品类型</label>
                        <select v-model="goods.typeId" style="padding: 0; margin:0px;width:208.82px;height: 37.95px;">
                            <option value="0" selected="selected">所有类型</option>
                            <option :value="type.typeId" v-for="type in type_list" :key="type.typeId"> 
                                 {{type.typeName}}
                            </option>
                        </select>
                    </div>
                </div>


                <div class="column">
                    <div class="ui labeled icon input">
                        <label for="clothCode" class="ui label">产品编号</label>
                        <input type="text"  id="clothCode" v-model="goods.goodsCode">
                        <i class="ui file alternate outline icon"></i>
                    </div>
                </div>

                <div class="column">
                    <div class="ui labeled icon input">
                        <label for="clothName" class="ui label">产品名字</label>
                        <input type="text"  id="clothName" v-model="goods.goodsName">
                        <i class="ui tshirt icon"></i>
                    </div>
                </div>
            </div>


            <div class="row" >

                <div class="column" >
                    <div class="ui labeled input">
                        <label for="clothType" class="ui label">价格区间</label>
                        <input id="select1" type="number" style="width: 88px;height: 37.95px;" v-model="goods.lowPrice"/>
                    </div>
                    -----
                    <div class="ui labeled input">
                        <input id="select2" type="number" style="width: 88px;height: 37.95px;" v-model="goods.highPrice"/>
                    </div>
                </div>

                <div class="column">
                    <div class="ui labeled input">
                        <label for="clothType" class="ui label">有无库存</label>
                        <select id="select" v-model="goods.status" style="width:208.82px;height: 37.95px;">
                            <option value="0" selected>全部</option>
                            <option value="1">有库存</option>
                            <option value="2">无库存</option>
                        </select>
                    </div>
                </div>

                <div class="column" style="padding: 0;">
                    <div id="goods_search" class="ui teal animated button" @click="search_goods(1)">
                        <div class="visible content">查询</div>
                        <div class="hidden content"><img src="../assets/spongebob.webp" class="ui avatar image"></div>
                    </div>


                    <div id="goods_add" class="ui blue animated button" @click="showModel('add',null)">
                        <div class="visible content">新增</div>
                        <div class="hidden content"><img src="../assets/spongebob1.webp" class="ui avatar image"></div>
                    </div>
                </div>

            </div>
        </div>



         <table id="new_table" class="ui inverted teal celled structured table" style="height:517.685px ;" >
                <thead >
                <tr>
                    <th>序号</th>
                    <th>产品编号</th>
                    <th>产品类型</th>
                    <th>产品库存</th>
                    <th>产品名字</th>
                    <th>产品尺寸</th>
                    <th>产品颜色</th>
                    <th>产品价格</th>
                    <th>产品公司</th>
                    <th>操作</th>

                </tr>
                </thead>
                <tbody >
                    <tr v-for="(goods,index) in goods_list.rows" :key="goods.goodsId">
                        <td>{{(index % page.pageSize) +1}}</td>
                        <td>{{goods.goodsCode}}</td>
                        <td>{{goods.typeName}}</td>
                        <td>{{goods.goodsStock}}</td>
                        <td>
                            {{goods.goodsName}}
                        </td>
                        <td>{{goods.goodsSize}}</td>
                        <td>{{goods.goodsColor}}</td>
                        <td>{{goods.goodsPrice}}</td>
                        <td>{{goods.goodsCompany}}</td>
                        <td>
                            <div class="ui blue animated button"  @click="remove( goods.goodsId)" >
                                <div class="visible content">删除</div>
                                <div class="hidden content">delete</div>
                            </div>
                            <div class="ui blue animated button"   @click="showModel('edit',goods)"  >
                                <div class="visible content">编辑</div>
                                <div class="hidden content">edit</div>
                            </div>
                        </td>
                    </tr>

                </tbody>
              
         </table>


        <div>
            <button class="ui blue button" :disabled="page.pageNum ===1" 
                    @click="search_goods(page.pageNum -1)">上一页</button>
            <span>当前第{{page.pageNum}}页</span>
            <button class="ui blue button" :disabled="goods_list.total < page.pageNum * page.pageSize" 
                    @click="search_goods(page.pageNum +1)">下一页</button>
        </div>


         <div id="goods_model" class="ui modal ">
            <div class="ui icon header" style="background-color: aqua;">
                <i class="product hunt icon"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                        {{isEditModel === false? "添加商品信息":"编辑商品信息"}}
                    </font></font></div>
            <div class="content" style="background-color: aqua;" >
                <div class="ui two column grid" style="text-align: center;">
                    <!-- <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p> -->

                    <div class="row">

                        <div class="column">
                            <div class="ui large icon labeled transparent input">
                                <label for="goodsType" class="ui label">商品类型</label>
                                <select  id="select" v-model="goods_model.typeId" style="border: 1.111px;width: 250.43px;padding-right: 36px; ">
                                  <option  :value="type.typeId" v-for="type in type_list" :key="type.typeId">
                                        {{type.typeName}}
                                </option>
                                </select>
                                <i class="archive icon"></i>
                            </div>
                        </div>

                        <div class="column">
                            <div class="ui large icon labeled transparent input">
                                <label for="goodsPrice" class="ui label">商品价格</label>
                                <input id = "goodsPrice"  v-model="goods_model.goodsPrice" 
                                       type="number" style="font-size: large;font-weight: 800;color: blue;">
                                <i class="dollar sign icon"></i>
                            </div>
                        </div>

                    </div>

                    <div class="row">
                        <div class="column" >
                            <div class="ui large icon labeled transparent input">
                                <label for="goodsStock" class="ui label">商品库存</label>
                                <input id = "goodsStock" v-model="goods_model.goodsStock" type="number" 
                                        style="font-size: large;font-weight: 800;color: blue;">
                                <i class="warehouse icon"></i>
                            </div>
                        </div>

                        <div class="column" >
                            <div class="ui large icon labeled transparent input">
                                <label for="goodsName" class="ui label">商品名字</label>
                                <input id ="goodsName" v-model="goods_model.goodsName" type="text" 
                                       style="font-size: large;font-weight: 800;color: blue;">
                                <i class="product hunt icon"></i>
                            </div>
                        </div>

                    </div>


                    <div class="row">
                        <div class="column">
                            <div class="ui large icon labeled transparent input">
                                <label for="goodsSize" class="ui label">商品尺寸</label>
                                <input id = "goodsSize" v-model="goods_model.goodsSize" type="text" 
                                       style="font-size: large;font-weight: 800;color: blue;">
                                <i class="map marker icon"></i>
                            </div>
                        </div>


                        <div class="column">
                            <div class="ui large icon labeled transparent input">
                                <label for="goodsColor" class="ui label">商品颜色</label>
                                <input id = "goodsColor" v-model="goods_model.goodsColor" type="text" 
                                       style="font-size: large;font-weight: 800;color: blue;">
                                <i class="paint brush icon"></i>
                            </div>
                        </div>
                    </div>


                    <div class="row">

                        <div class="column">
                            <div class="ui large icon labeled transparent input">
                                <label for="company" class="ui label">商品公司</label>
                                <input id = "company"  v-model="goods_model.goodsCompany" type="text" 
                                       style="font-size: large;font-weight: 800;color: blue;">
                                <i class="file outline icon"></i>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="actions" style="background-color: aqua;">
                <div class="ui purple inverted animated button" @click="submit(isEditModel)">
                    <div class="visible content"><i class="checkmark icon"></i>确定</div>
                    <div class="hidden content">保存信息</div>
                </div>

                <div class="ui red cancel inverted animated button">
                    <div class="visible content"><i class="remove icon"></i>取消</div>
                    <div class="hidden content">取消操作</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import beanData from '@/api/beanData';
import modelData from '@/api/modelData'
import getList from '@/api/getList';
export default {
    name:'goods',
    inject:['reload'],
    data(){
        return{
            isEditModel:false,
            goods:beanData.goods,
            page:getList.page,
            goods_list:getList.list,
            type_list:null,
            goods_model:modelData.goods_model

        }
    },
    methods:{
         showModel(operation,bean){
            this.goods_model={...bean}
            this.isEditModel = operation === 'add'? false:true
            window.$("#goods_model").modal("show");

        },
        hideModel(){        
            window.$("#goods_model").modal("hide");
        },
        remove(id){
            if(confirm('确定删除吗?')){
                this.axios.get('http://localhost:8080/deleteGoods',{
                    params:{goodsId:id}
                }).then(
                    response=>{
                        alert(response.data.message)
                    }
                )
            }
        },

        search_goods(pageNum){
            let goods_search = this.goods
            this.page.pageNum = pageNum
            let page_search = this.page

            this.axios.get('http://localhost:8080/findGoods',{
                params:{
                    typeId:goods_search.typeId,
                    goodsCode:goods_search.goodsCode,
                    goodsName:goods_search.goodsName,
                    lowPrice: goods_search.lowPrice,
                    highPrice: goods_search.highPrice,
                    status: goods_search.status,
                    pageNum:page_search.pageNum,
                    pageSize:page_search.pageSize
                }
            }).then(
                response=>{
                    this.goods_list.rows = response.data.rows
                    this.goods_list.total = response.data.total
                },
            )
        },

        submit(isEdit){
            if (confirm("确定提交信息吗?")){
                let goods = this.goods_model
                if (isEdit === true){
                    //修改商品
                    this.axios.get('http://localhost:8080/editGoods',{
                        params:{
                            goodsId:goods.goodsId,
                            goodsCode:goods.goodsCode,
                            goodsName:goods.goodsName,
                            goodsColor:goods.goodsColor,
                            goodsCompany:goods.goodsCompany,
                            goodsStock:goods.goodsStock,
                            goodsSize:goods.goodsSize,
                            goodsPrice:goods.goodsPrice,
                            typeId:goods.typeId
                        }
                    }).then(
                        response=>{alert(response.data.message)
                            if (response.data.success)
                                this.reload()
                                this.hideModel()
                            },
                    )
                }else{
                    //增加商品
                    this.axios.get('http://localhost:8080/addGoods',{
                        params:{
                            goodsId:goods.goodsId,
                            goodsCode:goods.goodsCode,
                            goodsName:goods.goodsName,
                            goodsColor:goods.goodsColor,
                            goodsCompany:goods.goodsCompany,
                            goodsStock:goods.goodsStock,
                            goodsSize:goods.goodsSize,
                            goodsPrice:goods.goodsPrice,
                            typeId:goods.typeId
                        }
                    }).then(
                        response=>{
                            alert(response.data.message)
                            if (response.data.success)
                                this.reload()
                                this.hideModel()
                        },
                    )
                }
            }
        },
    },
    mounted(){
        this.axios.get('http://localhost:8080/searchTypes').then(
            response=>{
                this.type_list = response.data.data
                console.log(response.data.data)
            },
        )
        this.axios.get('http://localhost:8080/findGoods',{
            params:{
                typeId:null,
                goodsCode:null,
                goodsName:null,
                lowPrice: null,
                highPrice: null,
                status: null,
                pageNum:1,
                pageSize:10
            }
        }).then(
            response=>{
                this.goods_list.rows = response.data.rows
                this.goods_list.total = response.data.total
            },
        )

        
    },
}
</script>
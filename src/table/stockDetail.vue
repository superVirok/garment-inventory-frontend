<template>
    <div>
        <div class="ui three column centered grid" style="text-align: center;margin-right: 5px;">
            <div class="row" style="text-align: left;" >

                <div class="column" style="padding: 0;">
                    <div class="ui  right icon left labeled  input">
                        <label for="code" class="ui label">单据编号</label>
                        <input type="text" id = "code" v-model="recordItem.recordCode">
                        <i class="ui file alternate outline icon"></i>
                    </div>
                </div>

                <div class="column" style="padding: 0;">
                    <div id="item_search" class="ui teal animated button" @click="search_recorditem(1)">
                        <div class="visible content">查询</div>
                        <div class="hidden content"><img src="../assets/spongebob.webp" class="ui avatar image"></div>
                    </div>


                    <div id="item_add" class="ui blue animated button" @click="showModel('add',null)">
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
                <th>订单编号</th>
                <th>产品编号</th>
                <th>产品类型</th>
                <th>产品库存</th>
                <th>产品名字</th>
                <th>产品尺寸</th>
                <th>产品颜色</th>
                <th>产品价格</th>
                <th>产品公司</th>
                <th>明细数量</th>
                <th style="text-align:center;">操作</th>
            </tr>
            </thead>
            <tbody >
                 <tr v-for="(recordItem,index) in recordItem_list.rows" :key="recordItem.recordItemId">
                        <td>{{(index % page.pageSize) +1}}</td>
                        <td>{{recordItem.recordCode}}</td>
                        <td>{{recordItem.goods.goodsCode}}</td>
                        <td>{{recordItem.type.typeName}}</td>
                        <td>{{recordItem.goods.goodsStock}}</td>
                        <td>{{recordItem.goods.goodsName}}</td>
                        <td>{{recordItem.goods.goodsSize}}</td>
                        <td>{{recordItem.goods.goodsColor}}</td>
                        <td>{{recordItem.goods.goodsPrice}}</td>
                        <td>{{recordItem.goods.goodsCompany}}</td>
                        <td>{{recordItem.recordItemCount}}</td>
                        <td>
                            <div class="ui blue animated button" @click="remove(recordItem.recordItemId)" >
                                <div class="visible content">删除</div>
                                <div class="hidden content">delete</div>
                            </div>
                            <div class="ui blue animated button" @click="showModel('edit',recordItem)" >
                                <div class="visible content">编辑</div>
                                <div class="hidden content">edit</div>
                            </div>
                        </td>
                </tr>

            </tbody>
        
        </table>


        <div>
            <button class="ui blue button" :disabled="page.pageNum ===1" 
                    @click="search_recorditem(page.pageNum -1)">上一页</button>
            <span>当前第{{page.pageNum}}页</span>
            <button class="ui blue button" :disabled="recordItem_list.total < page.pageNum * page.pageSize" 
                    @click="search_recorditem(page.pageNum +1)">下一页</button>
        </div>


        <div id="recorditem_model" class="ui modal ">
            <div class="ui icon header" style="background-color: aqua;">
                <i class="product hunt icon"></i><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                         {{isEditModel === false? "添加出入库单明细信息":"编辑出入库明细信息"}}
                    </font></font></div>
            <div class="content" style="background-color: aqua;" >
                <div class="ui two column grid" style="text-align: center;">
                    <!-- <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p> -->

                    <div class="row" v-if="isEditModel === false">

                        <div class="column">
                            <div class="ui large icon labeled transparent input">
                                <label for="itemodeCode" class="ui label">库单编号</label>
                                <input id = "itemodeCode"  v-model="recordItem_model.recordCode" type="text" 
                                       style="font-size: large;font-weight: 800;color: blue;" required>
                                <i class="ui file alternate outline icon"></i>
                            </div>
                        </div>


                        <div class="column" >
                            <div class="ui large icon labeled transparent input">
                                <label for="itemCount" class="ui label">商品编号</label>
                                <input id = "itemCount" v-model="recordItem_model.goodsCode" type="text" 
                                       style="font-size: large;font-weight: 800;color: blue;" required>
                                <i class="warehouse icon"></i>
                            </div>
                        </div>
                    </div>

                <div class="row" v-if="isEditModel === false">

                        <div class="column" >
                            <div class="ui large icon labeled transparent input">
                                <label for="itemCount" class="ui label">明细数量</label>
                                <input id = "itemCount" v-model="recordItem_model.recordItemCount" type="number" 
                                       style="font-size: large;font-weight: 800;color: blue;" required>
                                <i class="warehouse icon"></i>
                            </div>
                        </div>
                    </div>


                    <div class="row" v-if="isEditModel === true">
                        <div class="column">
                            <div class="ui large icon labeled transparent input">
                                <label for="itemodeCode" class="ui label">商品编号</label>
                                <input id = "itemodeCode"  v-model="recordItem_model.goods.goodsCode" type="text" 
                                       style="font-size: large;font-weight: 800;color: blue;" required>
                                <i class="ui file alternate outline icon"></i>
                            </div>
                        </div>


                        <div class="column" >
                            <div class="ui large icon labeled transparent input">
                                <label for="itemCount" class="ui label">明细数量</label>
                                <input id = "itemCount" v-model="recordItem_model.recordItemCount" type="number" 
                                       style="font-size: large;font-weight: 800;color: blue;" required>
                                <i class="warehouse icon"></i>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="actions" style="background-color: aqua;">
                <div class="ui purple inverted animated button" @click="submit(isEditModel)" >
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
    name:'stockDetail',
    inject:['reload'],
    data(){
        return{
            isEditModel:false,
            recordItem:beanData.recordItem,
            page:{...getList.page},
            recordItem_list:{...getList.list},
            recordItem_model:modelData.recordItem_model
        }
    },
    methods:{
        showModel(operation,bean){
            this.recordItem_model={...bean}
            this.isEditModel=operation === 'add'? false:true
                window.$("#recorditem_model").modal("show");
            },
        
        hideModel(){        
            window.$("#recorditem_model").modal("hide");
        },
        remove(id){
            if(confirm('确定删除吗?')){
                this.axios.get('http://localhost:8080/deleteRecordItem',{
                    params:{recordItemId:id}
                }).then(
                    response=>{alert(response.data.message)
                        if (response.data.success)
                            this.reload()
                            this.hideModel()
                    }
                )   
            }
        },

        search_recorditem(pageNum){
            let recorditem_search = this.recordItem
            this.page.pageNum = pageNum
            let page_search = this.page
            let status=0//1代表出库 2代表入库
            if(this.$route.query.id == 2){
                status=2
            }else if(this.$route.query.id == 3){
                status=1
            }

            this.axios.get('http://localhost:8080/searchRecordItem',{
                params:{
                    recordCode:recorditem_search.recordCode,
                    recordStatus:status,
                    pageNum:page_search.pageNum,
                    pageSize:page_search.pageSize
                }
            }).then(
                response=>{
                    this.recordItem_list.rows = response.data.rows
                    this.recordItem_list.total = response.data.total
                    this.hideModel()

                },
            )
        },

        submit(isEdit){
            if (confirm("确定提交信息吗?")){
                let recorditem = this.recordItem_model
                let status=0//1代表出库 2代表入库
                if(this.$route.query.id == 2){
                    status=2
                }else if(this.$route.query.id == 3){
                    status=1
                }
                if (isEdit === true){
                    //修改出入库单
                    this.axios.get('http://localhost:8080/editRecordItem',{
                        params:{
                            recordItemId:recorditem.recordItemId,
                            recordItemCount:recorditem.recordItemCount,
                            recordCode:recorditem.recordCode,
                            recordId:recorditem.recordId,
                            goodsId:recorditem.goodsId,
                            goodsCode:recorditem.goods.goodsCode,
                            recordStatus:status
                        }
                    }).then(
                        response=>{
                            alert(response.data.message)
                            if (response.data.success)
                                    this.reload()
                                    this.hideModel()
                            },
                    )
                }else{
                    //增加出入库单
                    this.axios.get('http://localhost:8080/addRecordItem',{
                        params:{
                            recordItemCount:recorditem.recordItemCount,
                            recordCode:recorditem.recordCode,
                            goodsCode:recorditem.goodsCode,
                            recordStatus:status
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
    watch:{
        "$route.query.id":{
            handler(newValue,oldValue){

                let status=0//1代表出库 2代表入库
                if(newValue == 2){
                    status=2
                }else if(newValue == 3){
                    status=1
                }

                this.axios.get('http://localhost:8080/searchRecordItem',{
                    params:{
                        recordCode:null,
                        goodsId:null,
                        recordStatus:status,
                        pageNum:1,
                        pageSize:10
                    }
                }).then(
                    response=>{
                        this.recordItem_list.rows = response.data.rows
                        this.recordItem_list.total = response.data.total

                    },
                )

            }
        }

    },
    created(){          //此处用created 而不是mounted
        let status=0//1代表出库 2代表入库
        if(this.$route.query.id == 2){
            status=2
        }else if(this.$route.query.id == 3){
            status=1
        }

        this.axios.get('http://localhost:8080/searchRecordItem',{
            params:{
                recordCode:null,
                goodsId:null,
                recordStatus:status,
                pageNum:1,
                pageSize:10
            }
        }).then(
            response=>{
                this.recordItem_list.rows = JSON.parse(JSON.stringify(response.data.rows))    
                this.recordItem_list.total = response.data.total

            },
        )
    }
}
</script>
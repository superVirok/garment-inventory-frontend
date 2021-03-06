export default{
    user:{
        userAccount:null,
        userName:null,
        userPassword:null,
        userPhone:null,
        userEmail:null,
        userRole:null,
    }, 
    goods:{
        goodsId:null,
        goodsCode:null,
        typeId:null,
        goodsStock:null,
        goodsName:null,
        goodsSize:null,
        goodsColor:null,
        goodsPrice:null,
        goodsCompany:null,
        status:null  ,//1代表有库存 2代表没有库存
        lowPrice:null ,//表示最低价格
        highPrice:null//表示最高价格
      },
    record:{
        recordId:null,
        recordCode:null,
        recordWarehouse:null,
        recordTime:null,
        recordName:null,
        recordOrigin:null,
        recordStatus:null,
        startTime:null,
        endTime:null
        },
    recordItem:{
        recordItemId:null,
        recordItemCount:null,
        recordCode:null,
        recordId:null,
        recordStatus:null,
        goodsId:null,
        goods:null,
        type:null
        },
    authorization:{
        authenId:null,
        userId:null,
        userAuthorization:null,
        userAccount:null,
        userName:null,
        goodsAuthorization:null,
        wareAuthorization:null
        },
    type:{
        typeId:null,
        typeName:null,
    }
}
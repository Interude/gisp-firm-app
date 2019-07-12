const goods={
    state:{
        gooodsInfo:{},
        batchInfo:{},
    },
    mutations:{
      SET_GOODS:(state,goodsInfo)=>{
           state.goodsInfo = goodsInfo
        },
        SET_BATCH:(state,batchInfo)=>{
         // alert(batchInfo)
            state.batchInfo = batchInfo
        }

    }

}

export default  goods
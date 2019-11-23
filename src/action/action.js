function filterList(rangeQuery){
    return{
        "type":"filterList",
        "rangeQuery":rangeQuery
    }
}
var updateList=data=>({
    type:'updateList',
    data:data
})
var clearList=data=>({
    type:'clearList',
})
export {filterList,updateList,clearList}

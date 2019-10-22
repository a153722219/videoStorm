export function handleData(actionType,dispatch,storeName,data,pageSize) {
    let fixItems = [];
    if(data && data.data){
        if(Array.isArray(data.data))
            fixItems = data.data;
        else if(Array.isArray(data.data.items)){
            fixItems = data.data.items;
        }
        
    }
    dispatch({
        type:actionType,
        items:fixItems, //改回items
        storeName,
        projectModel:pageSize>fixItems.length?fixItems:fixItems.slice(0,pageSize),//第一次加载的数据
        pageIndex:1
    });
}

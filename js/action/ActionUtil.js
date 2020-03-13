// import ProjectModel from '../mo/ProjectModel'
import Utils from '../util/Utils'
// export function handleData(actionType,dispatch,storeName,data,pageSize,favoriteDao) {
//     let fixItems = [];
//     if(data && data.data){
//         if(Array.isArray(data.data))
//             fixItems = data.data;
//         else if(Array.isArray(data.data.items)){
//             fixItems = data.data.items;
//         }

        
//     }
//     let showItems = pageSize>fixItems.length?fixItems:fixItems.slice(0,pageSize)//第一次加载的数据
//     _projectModels(showItems,favoriteDao,projectModels=>{
//         dispatch({
//             type:actionType,
//             items:fixItems, //改回items
//             storeName,
//             projectModel:projectModels,
//             pageIndex:1
//         });
//     })

// }
// export async function _projectModels(showItems,favoriteDao,callback) {
//     let keys = [];
//     try{
//         //获取收藏keys
//         keys = await favoriteDao.getFavoriteKeys();
//     }catch (e){
//         console.log(e)
//     }
//     let projectModels=[];
//     for(let i=0,len=showItems.length;i<len;i++){
//         projectModels.push(new ProjectModel(showItems[i],Utils.checkFavorite(showItems[i],keys)))
//     }
//     if(typeof  callback === "function"){
//         callback(projectModels)
//     }

// }
export function _handleRefreshData(dispatch,PageSize,httpResult,dpLoadSType,dpLoadFType,items=[],userName,statusFlag){
    if(httpResult.code<0){
        //net error
        //获取老的数据
        const oldArr = items.slice(0,PageSize);
        dispatch({type:dpLoadSType,items:items,showItems:oldArr,Phone:userName,statusFlag});
        return 
    }else if(httpResult.code==600){
        //更新原始数据
        Utils.updateArr(0,PageSize,items,httpResult.data.Records);
        dispatch({
            type:dpLoadSType,
            items:items,
            showItems:httpResult.data.Records,
            Phone:userName,
            statusFlag
        });
    }else{
        dispatch({type:dpLoadFType});
        console.log(httpResult);
    }
}

export function _handleLoadMoreData(dispatch,PageSize,newPageIndex,httpResult,dpLoadSType,dpLoadFType,items=[],showItems=[],userName,statusFlag){
    if(httpResult.code<0){
        //获取老的数据
        const oldArr = items.slice((newPageIndex-1)*PageSize,newPageIndex*PageSize);
        Utils.updateArr((newPageIndex-1)*PageSize,PageSize,showItems,oldArr);
        setTimeout(()=>{
            dispatch({
                type:dpLoadSType,
                items:items,
                showItems:showItems,
                PageIndex:newPageIndex,
                Phone:userName,
                statusFlag
            });
        },500);
        return 
    }else if(httpResult.code==600){
        Utils.updateArr((newPageIndex-1)*PageSize,PageSize,items,httpResult.data.Records);
        Utils.updateArr((newPageIndex-1)*PageSize,PageSize,showItems,httpResult.data.Records);

        setTimeout(()=>{
            dispatch({
                type:dpLoadSType,
                items:items,
                showItems:showItems,
                PageIndex:newPageIndex,
                Phone:userName,
                statusFlag
            });
        },500);
    }else{
        dispatch({type:dpLoadFType});
        console.log(httpResult);
    }
}

export function _handleLoadDetails(dispatch,key,contents,dpLoadSType,httpResult,callback) {
    if(httpResult.code<0){
        //无网络 返回本地数据
        if(contents[key]){
            dispatch({
                type:dpLoadSType,
                contents
            });
            callback({
                code:600,
                data:contents[key]
            })
        }else{
            callback({
                code:-1,
                data:"网络错误"
            })
        }
    }else if(httpResult.code==600){
        //更新本地数据
        contents[key] = httpResult.data;

        dispatch({
            type:dpLoadSType,
            contents
        });

        callback({
            code:600,
            data:contents[key]
        })

    }else{
        callback({
            code:httpResult.code,
            data:httpResult.msg
        })
    }
}
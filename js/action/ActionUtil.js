// import ProjectModel from '../mo/ProjectModel'
import Utils from '../util/Utils'
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


export function _handleLineAction(dispatch,httpResult,details,PlanNo,LineID,showItems,items,dpType,userName,LoadCode,offLoadCode,callback){
    if(httpResult.code<0){

    }else if(httpResult.code==600){
        //操作成功
        const item  = details[PlanNo];
        //更新详情页item
        const index = item.LineList.findIndex(i=>i.LineID==LineID)
        if(index!=-1){
            if(item.LineList[index].LoadOrdCount>0){
                item.LineList[index].OpBtnCode = LoadCode;
            }else item.LineList[index].OpBtnCode = offLoadCode;

              //更新列表页的按钮状态
              for(let i in showItems){
                  if(showItems[i].PlanNO==PlanNo){
                    showItems[i].OpBtnCode = item.LineList[index].OpBtnCode;
                    break;
                  }
              }
              for(let i in items){
                if(items[i].PlanNO==PlanNo){
                    items[i].OpBtnCode = item.LineList[index].OpBtnCode;
                    items[i].ModifiedTime = new Date().toString();
                  break;
                }
            }

        }

    
        dispatch({
            type:dpType,
            details,
            items,
            showItems,
            Phone:userName
        });


        callback({
            code:httpResult.code,
            data:httpResult.data
        })
    }else{
        //系统错误
        callback({
            code:httpResult.code,
            data:httpResult.msg
        })
    }
}

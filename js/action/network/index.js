import Types from "../types"
export function onNetWorkChange(haveNet) {
    return {type:Types.NETWORK_CHANGE,haveNet:haveNet}
}


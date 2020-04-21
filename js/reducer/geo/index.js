import  Types from '../../action/types'

const defaultState = {
    location:{
        // Address: "中国广州市白云区粤溪大街",
        // Lat: 23.16320809372611,
        // Lon: 113.23860562035354,
        // date: "2020-03-21 18:10:30",
        // multiaccuracy: 30,
    }
};

export  default function onAction(state=defaultState,action) {
    switch (action.type){
        case Types.LOCATION_CHANGE:
            return {
                ...state,
                location:action.location
            };
        default: return state;
    }
}
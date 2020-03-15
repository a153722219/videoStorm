/**
 * Created by Administrator
 */
import Types from "../types"
export function onGeoChange(location) {
    return {type:Types.LOCATION_CHANGE,location:location}
}

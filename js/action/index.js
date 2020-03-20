/**
 * Created by Administrator on 2019/10/17.
 */
import {onThemeChange} from './theme'
import {onUserLogin,onUserLogout} from './user'
import {onRefreshCars,onLoadMoreCars,onLoadCarDetails} from './cars'
import {onLoadPOD} from './PODs'
import {onNetWorkChange} from './network'
import {
    onRefreshKaHang,
    onLoadMoreKaHang,
    onLoadKaHangPreView,
    onLoadKaHangDetail,
    onStartTranPort,
    onArrived
} from './kahang'
import {onGeoChange} from './geo'
export default {
    onThemeChange,
    onUserLogin,
    onUserLogout,
    onRefreshCars,
    onLoadMoreCars,
    onNetWorkChange,
    onLoadCarDetails,
    onRefreshKaHang,
    onLoadMoreKaHang,
    onLoadKaHangPreView,
    onGeoChange,
    onLoadKaHangDetail,
    onStartTranPort,
    onLoadPOD,
    onArrived
}
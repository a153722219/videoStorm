package com.googlegeo;



import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import top.madev.clocationlib.GetLocation;
import top.madev.clocationlib.bean.MyLocation;
import top.madev.clocationlib.bean.Point;
import top.madev.clocationlib.utils.BoundaryCheck;
import top.madev.clocationlib.utils.CoordinateConversion;


import javax.annotation.Nullable;

public class GoogleGeo  extends ReactContextBaseJavaModule {
    private   static ReactApplicationContext  mReactApplicationContext;
    public GoogleGeo(ReactApplicationContext reactContext) {
        super(reactContext);
//        GetLocation.getInstance().setNetworkLocationUrl(url);
        mReactApplicationContext = reactContext;

    }


    @Override
    public String getName() {
        return "GoogleGeo";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        //定义常量
        final Map<String, Object> constants = new HashMap<>();
        //constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        //constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }


    @ReactMethod
    public void startGetLocation(Promise promise) {
        GetLocation.getInstance().setMultiLocationListener(new GetLocation.OnMultiLocationListener() {
            @Override
            public void onMultiLocation(double multilatitude, double multilongitude, long multiupdateTime, float multiaccuracy, float multibearing) {
                Double latitude, longitude;
                MyLocation myLocation = new MyLocation(multilatitude, multilongitude);
                //由于坐标系差异，中国大陆坐标需要转换
                if(BoundaryCheck.getInstance().IsInsideChina(myLocation)) {
                    Point point = CoordinateConversion.wgs_gcj_encrypts(multilatitude, multilongitude);
                    latitude = point.getLat();
                    longitude = point.getLng();
                }else {
                    latitude = multilatitude;
                    longitude = multilongitude;
                }
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Date date = new Date(multiupdateTime);


                try {
                    WritableMap map = Arguments.createMap();
                    map.putDouble("latitude",latitude);
                    map.putDouble("longitude", longitude);
                    map.putDouble("multiaccuracy", multiaccuracy);
                    map.putString("date",simpleDateFormat.format(date));
                    promise.resolve(map);
                } catch (IllegalViewOperationException e) {
                    promise.reject(e);
                }


            }

            @Override
            public void onFailed(int errorCode, String msg) {
                try {
                    WritableMap map = Arguments.createMap();
                    map.putDouble("errorCode",errorCode);
                    map.putString("msg", msg);
                    promise.resolve(map);
                } catch (IllegalViewOperationException e) {
                    promise.reject(e);
                }

            }
        });
        GetLocation.getInstance().startMultiLocation(GoogleGeo.mReactApplicationContext.getCurrentActivity().getApplication(),GoogleGeo.mReactApplicationContext.getCurrentActivity(),true);
    }

    @ReactMethod
    public void stopGetLocation() {
        GetLocation.getInstance().onStop();
    }

    @ReactMethod
    public void setNetworkLocationUrl(String url) {
        GetLocation.getInstance().setNetworkLocationUrl(url);
    }





}

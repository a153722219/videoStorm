export default class ToastManager {

    static toast;

    /**
     * 显示toast
     * showToast
     * @param text
     * @param duration
     * @param callback
     */
    static show(text, duration, callback) {
        //判断toast对象是否有值才调用show方法
        this.toast && this.toast.show(text, duration, callback);
    }

    /**
     * 关闭toast
     * closeToast
     * @param duration
     */
    static close(duration) {
        //判断toast对象是否有值才调用close方法
        this.toast && this.toast.close(duration);
    }
}
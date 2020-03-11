export default class LoadingManager {

    static loading;

    /**
     * 显示
     */
    static show() {
        this.loading && this.loading.showLoading();
    }

    /**
     * 关闭
     */
    static close() {
        
        this.loading && this.loading.dismissLoading();
    }
}
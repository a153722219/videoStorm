export default class NavigationUtil{
    static resetToHomePage(params){
        const {navigation} = params;
        navigation.navigate("Main");
    }

    static goBack(navigation){
        navigation.goBack();
    }

}
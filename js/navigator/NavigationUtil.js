export default class NavigationUtil{
    static resetToHomePage(){
        const navigation = NavigationUtil.RootNavigation;
        if(!navigation){
            console.log("NavigationUtil.RootNavigation can not be null!");
            return
        }

        navigation.navigate("Main");
    }
    static goBack(navigation){
        navigation.goBack();
    }

    static goPage(params,page){
        const navigation = NavigationUtil.navigation;
        if(!navigation){
            console.log("NavigationUtil.navigation can not be null!");
            return
        }
        navigation.navigate(
            page,
            {
                ...params
            }
        )
    }

    // static replacePage(params,page){
    //     const navigation = NavigationUtil.navigation;
    //     if(!navigation){
    //         console.log("NavigationUtil.navigation can not be null!");
    //         return
    //     }
    //     navigation.replace(
    //         page,
    //         {
    //             ...params
    //         }
    //     )
    // }
}
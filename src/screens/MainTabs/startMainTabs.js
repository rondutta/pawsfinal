import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startMainTabs = () => {
    Promise.all([
      Icon.getImageSource("md-images",40),
      Icon.getImageSource("md-share-alt",40),
      Icon.getImageSource("ios-menu",40)
    ]).then((iconArray)=>{
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "paws.FindPostScreen",
                    label: "Find Post",
                    title : "Find Post",
                    icon: iconArray[0],
                    navigatorButtons: {
                        leftButtons: [{
                            icon: iconArray[2],
                            title: "Menu",
                            id: "sideDrawerToggle"
                        }]
                    }
                },
                {
                    screen: "paws.SharePostScreen",
                    label: "Share Post",
                    title : "Share Post",
                    icon: iconArray[1],
                    navigatorButtons: {
                        leftButtons: [{
                            icon: iconArray[2],
                            title: "Menu",
                            id: "sideDrawerToggle"
                            }]
                    }
        
                }
            ],
            drawer:{
                left:{
                    screen: "paws.SideDrawer"
                }
            }
        });
    });   
}

export default startMainTabs;

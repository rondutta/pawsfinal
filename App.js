import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import Auth from './src/screens/Auth/Auth';
import SharePost from './src/screens/SharePost/SharePost';
import FindPost from './src/screens/FindPost/FindPost';
import configureStore from './src/store/configureStore';
import PostDetails from './src/screens/PostDetails/PostDetails';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

const store=configureStore();

Navigation.registerComponent('paws.AuthScreen',() => Auth,store,Provider);
Navigation.registerComponent('paws.SharePostScreen',() => SharePost,store,Provider);
Navigation.registerComponent('paws.FindPostScreen',() => FindPost,store,Provider);
Navigation.registerComponent('paws.PostScreen',() => PostDetails,store,Provider);
Navigation.registerComponent('paws.SideDrawer',() => SideDrawer);

Navigation.startSingleScreenApp({
    screen:{
        screen: 'paws.AuthScreen',
        title: 'Login' 
    }
});
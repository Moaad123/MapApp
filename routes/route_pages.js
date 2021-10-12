import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Bienvenue from '../pages/bienvenue';
import Ajouter from '../pages/ajouter';
import Chercher from '../pages/chercher';
import Map from '../pages/carte_map';

const screens = {
     Bienvenue:{
        screen:Bienvenue,
        navigationOptions:{
          headerTransparent:true
        }
    },
    Ajouter:{
        screen:Ajouter,
        navigationOptions: {
            headerTransparent: true
        }
    },
    Chercher:{
        screen:Chercher,
        navigationOptions: {
            headerTransparent: true,
        }
    },
    Map:{
        screen:Map,
        navigationOptions: {
            headerTransparent: true
        }
        
    }
}
const Route_pages =  createStackNavigator(screens);
export default createAppContainer(Route_pages);
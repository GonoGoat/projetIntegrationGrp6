
import { createStackNavigator } from 'react-navigation-stack'
import Inscription from '../Components/Inscription'
import {createAppContainer} from "react-navigation";
import Connection from "../Components/Connection";

const SearchStackNavigator = createStackNavigator({
    Connection: {
        screen: Connection,
        navigationOptions: {
            title: 'Connexion',
            headerShown: false
        }
    },
    Inscription: {
        screen: Inscription,
        navigationOptions: {
            title: 'Inscription',
            headerShown: false
        }
    }
});

export default createAppContainer(SearchStackNavigator)

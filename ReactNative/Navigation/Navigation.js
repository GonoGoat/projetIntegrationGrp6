// Navigation/Navigation.js

import { createStackNavigator } from 'react-navigation-stack'
import Inscription from '../Components/Inscription'
import {createAppContainer} from "react-navigation";
import Connection from "../Components/Connection";

const SearchStackNavigator = createStackNavigator({
    Connection: {
        screen: Connection,
        navigationOptions: {
            title: 'Connexion'
        }
    },
    Inscription: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
        screen: Inscription,
        navigationOptions: {
            title: 'Inscription'
        }
    }
});

export default createAppContainer(SearchStackNavigator)

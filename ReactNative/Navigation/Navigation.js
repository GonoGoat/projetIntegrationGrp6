// Navigation/Navigation.js

import { createStackNavigator } from 'react-navigation-stack'
import Home from '../Function/Home'

const SearchStackNavigator = createStackNavigator({
  Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
    screen: Home,
    navigationOptions: {
      title: 'Rechercher'
    }
  }
})
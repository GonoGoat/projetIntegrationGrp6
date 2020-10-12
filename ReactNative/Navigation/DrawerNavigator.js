import React from "react";
import {Platform, Dimensions} from 'react-native';
import {createAppContainer} from 'react-navigation'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Page1 from '../Components/Page1'
import Page2 from '../Components/Page2'

const WIDTH = Dimensions.get('window').width;

const Drawer = createDrawerNavigator()
    

export default function DrawerNavigator() {
    return(
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Page1" component={Page1} />
        <Drawer.Screen name="Page2" component={Page2} />
      </Drawer.Navigator>
    </NavigationContainer>
    )
}


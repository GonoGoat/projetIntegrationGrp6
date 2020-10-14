import * as React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack'

import Icon from 'react-native-vector-icons/Ionicons';

import Page1 from './Components/Page1'
import Inscription from './Components/Inscription'
import Connection from './Components/Connection'

const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const Page2Stack = createStackNavigator();
const Page3Stack = createStackNavigator();

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator screenOptions={{
    headerStyle: {
      backgroundcolor: "blue",
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight:'bold'
    }
    }}>
    <HomeStack.Screen name="Page1" component={Page1} options={{
      title:"Overview",
      headerLeft: () => (
        <Icon.Button name="md-menu" size={25}
        onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }}></HomeStack.Screen>
    </HomeStack.Navigator>
)
const Page2StackScreen = ({navigation}) => (
  <Page2Stack.Navigator screenOptions={{
    headerStyle: {
      backgroundcolor: "blue",
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight:'bold'
    }
    }}>
    <Page2Stack.Screen name="Connexion" component={Connection} options={{
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25}
        onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }}></Page2Stack.Screen>
    </Page2Stack.Navigator>
)
const Page3StackScreen = ({navigation}) => (
  <Page3Stack.Navigator screenOptions={{
    headerStyle: {
      backgroundcolor: "blue",
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight:'bold'
    }
    }}>
    <Page3Stack.Screen name="Inscription" component={Inscription} options={{
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25}
        onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }}></Page3Stack.Screen>
    </Page3Stack.Navigator>
)
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Page1">
        <Drawer.Screen name="Accueil" component={HomeStackScreen} />
        <Drawer.Screen name="Connexion" component={Page2StackScreen} />
        <Drawer.Screen name="Inscription" component={Page3StackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

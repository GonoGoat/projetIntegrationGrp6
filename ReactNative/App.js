import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack'

import Icon from 'react-native-vector-icons/Ionicons';

import Page1 from './Components/Page1'
import Page2 from './Components/Page2'
import Page3 from './Components/Page3'

const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const Page2Stack = createStackNavigator();

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
    <HomeStack.Screen name="YOYO" component={Page1} options={{
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
    <Page2Stack.Screen name="Page2" component={Page2} options={{
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25}
        onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }}></Page2Stack.Screen>
    </Page2Stack.Navigator>
)
export default function App() {
  return (
    <Home/>
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

import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import PorteFavorite from './Components/PorteFavorite';
import Inscription from './Components/Inscription'
import Connection from './Components/Connection'
import AjoutPorte from './Components/AjoutPorte'
import listePortes from './Components/listePortes'
import Historique from './Components/Historique'
import PorteDetail from './Components/PorteDetail';
import Deconnection from './Components/Deconnection';
import AsyncStorage from '@react-native-community/async-storage'

const Drawer = createDrawerNavigator();
const FavoriteScreen= createStackNavigator();
const ConnexionScreen = createStackNavigator();
const InscriptionScreen = createStackNavigator();
const AjoutPorteScreen = createStackNavigator();
const listePortesScreen = createStackNavigator();
const DeconnectionScreen = createStackNavigator();

const FavoriteStackScreen = ({navigation}) => (
  <FavoriteScreen.Navigator screenOptions={{
    headerStyle: {
      //backgroundcolor: "blue",
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight:'bold'
    },
    headerShown : false
    }}>
    <FavoriteScreen.Screen name="Inscription" component={PorteFavorite} options={{
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25}
        onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }}></FavoriteScreen.Screen>
    </FavoriteScreen.Navigator>
)

const InscriptionStackScreen = ({navigation}) => (
  <InscriptionScreen.Navigator screenOptions={{
    headerStyle: {
      //backgroundcolor: "blue",
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight:'bold'
    }
    }}>
    <InscriptionScreen.Screen name="Inscription" component={Inscription} options={{
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25}
        onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }}></InscriptionScreen.Screen>
    </InscriptionScreen.Navigator>
)
const AjoutPorteStackScreen = ({navigation}) => (
  <AjoutPorteScreen.Navigator screenOptions={{
    headerStyle: {
      //backgroundcolor: "blue",
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight:'bold'
    },
    headerShown : false
    }}>
    <AjoutPorteScreen.Screen name="Ajouter une porte" component={AjoutPorte} options={{
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25}
        onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }}></AjoutPorteScreen.Screen>
    </AjoutPorteScreen.Navigator>
)
const listePortesStackScreen = ({navigation}) => (
  <listePortesScreen.Navigator screenOptions={{
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight:'bold'
    }
    }}>
    <listePortesScreen.Screen name="Accueil" component={listePortes} options={{
      headerLeft: () => (
        <Icon.Button name="md-menu" size={25}
        onPress={() => navigation.openDrawer()}></Icon.Button>
      ),
      headerShown : false
    }}></listePortesScreen.Screen>
    <listePortesScreen.Screen name="PorteDetail" component={PorteDetail} options={{
      doorIdParam: 0,
      nickname: "",
      tagName: "",
      headerLeft: () => (
        <Icon.Button name="md-menu" size={25}
        onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }}></listePortesScreen.Screen>
    <listePortesScreen.Screen name="Historique" component={Historique} options={{
      doorIdParam: 0,
      nickname: "",
      headerLeft: () => (
        <Icon.Button name="md-menu" size={25}
        onPress={ () => { navigation.openDrawer() }}></Icon.Button>
      )
    }}></listePortesScreen.Screen>
    </listePortesScreen.Navigator>
)

const DeconnectionStackScreen = ({navigation}) => (
  <DeconnectionScreen.Navigator screenOptions={{
  headerStyle: {
      // backgroundcolor: "blue",
  },
  headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight:'bold'
  }
}}>
<ConnexionScreen.Screen name="Connexion" component={Connection} options={{
    headerLeft: () => (
        <Icon.Button name="ios-menu" size={25}
    onPress={() => navigation.openDrawer()}></Icon.Button>
)
}}></ConnexionScreen.Screen>
</DeconnectionScreen.Navigator>
)

const Stack = createStackNavigator();

export default function App() {
  let user = null;
  AsyncStorage.getItem('user').then((result) => {user = result})
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Connexion">
        <Drawer.Screen name="Connexion" component={Connection}/>
        <Drawer.Screen name="Inscription" component={Inscription}/>
        <Drawer.Screen name="Portes favorites" component={FavoriteStackScreen} />
        <Drawer.Screen name="Ajouter une porte" component={AjoutPorteStackScreen} />
        <Drawer.Screen name="Afficher la liste de vos portes" component={listePortesStackScreen} />
        <Drawer.Screen name="Deconnexion" component={DeconnectionStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );  
}
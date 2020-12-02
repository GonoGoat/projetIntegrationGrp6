import {StyleSheet, AppState} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect } from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import PorteFavorite from './Components/PorteFavorite';
import Inscription from './Components/Inscription'
import Connection from './Components/Connection'
import AjoutPorte from './Components/AjoutPorte'
import listePortes from './Components/listePortes'
import Historique from './Components/Historique'
import PorteDetail from './Components/PorteDetail';
import Deconnection from './Components/Deconnection';
import MotDePasseOublie from './Components/MotDePasseOublie';
import MonCompte from './Components/MonCompte';

import AsyncStorage from '@react-native-community/async-storage'

const Drawer = createDrawerNavigator();
const FavoriteScreen= createStackNavigator();
const ConnexionScreen = createStackNavigator();
const InscriptionScreen = createStackNavigator();
const AjoutPorteScreen = createStackNavigator();
const listePortesScreen = createStackNavigator();
const DeconnectionScreen = createStackNavigator();
const MotDePasseOublieScreen = createStackNavigator();
const MonCompteScreen = createStackNavigator();

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

const ConnexionStackScreen = ({navigation}) => (
  <ConnexionScreen.Navigator screenOptions={{
  headerStyle: {
      //backgroundcolor: "blue",
  },
  headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight:'bold'
  },
  headerShown : false
}}>
</ConnexionScreen.Navigator>
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
    <ConnexionScreen.Screen name="Connexion" component={Connection} initialParams={{ inscriptionSubmitted: false }} options={{
      inscriptionSubmitted: false,
      headerLeft: () => (
          <Icon.Button name="ios-menu" size={25}
      onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }}>
    </ConnexionScreen.Screen>
    <MotDePasseOublieScreen.Screen name="MotDePasseOublie" component={MotDePasseOublie} options={{
      headerLeft: () => (
          <Icon.Button name="md-menu" size={25}
      onPress={ () => { navigation.openDrawer() }}></Icon.Button>
      ),
    }}>
    </MotDePasseOublieScreen.Screen>
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
    },
    headerShown : false
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
  },
  headerShown : false,
}}>
<DeconnectionScreen.Screen name="Deconnexion" component={Deconnection} options={{
  headerLeft: () => (
      <Icon.Button name="ios-menu" size={25}
  onPress={() => clearAllData}></Icon.Button>
),
  drawerLabel: () => null,
      title: null,
      drawerIcon: () => null
}}></DeconnectionScreen.Screen>
</DeconnectionScreen.Navigator>
)
const monCompteStackScreen = ({navigation}) => (
    <MonCompteScreen.Navigator screenOptions={{
        headerStyle: {
            // backgroundcolor: "blue",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight:'bold'
        },
        headerShown : false,
    }}>
        <MonCompteScreen.Screen name="MonCompte" component={MonCompte} options={{
    headerLeft: () => (
        <Icon.Button name="ios-menu" size={25}
                     onPress={() => navigation.openDrawer()}></Icon.Button>
    )
}}/>
    </MonCompteScreen.Navigator>
)
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={Connection}>
        <Drawer.Screen name="Mon compte" component={InscriptionStackScreen}/>
        <Drawer.Screen name="Portes favorites" component={FavoriteStackScreen} />
        <Drawer.Screen name="Ajouter une porte" component={AjoutPorteStackScreen} />
        <Drawer.Screen name="Afficher la liste de vos portes" component={listePortesStackScreen} />
        <Drawer.Screen name="Mon compte" component={monCompteStackScreen} />
        <Drawer.Screen name="Deconnexion" component={DeconnectionStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}



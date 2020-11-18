import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import Inscription from './Components/Inscription'
import Connection from './Components/Connection'
import AjoutPorte from './Components/AjoutPorte'
import listePortes from './Components/listePortes'
import Historique from './Components/Historique'
import OuvrirFermerPorte from './Components/OuvrirFermerPorte'
import PorteDetail from './Components/PorteDetail';
import PorteParametres from './Components/PorteParametres';
import Deconnection from './Components/Deconnection';
import axios from 'axios';
import { ScreenStackHeaderRightView } from 'react-native-screens';
import AsyncStorage from '@react-native-community/async-storage'

const Drawer = createDrawerNavigator();
const AccueilScreen= createStackNavigator();
const ConnexionScreen = createStackNavigator();
const InscriptionScreen = createStackNavigator();
const AjoutPorteScreen = createStackNavigator();
const listePortesScreen = createStackNavigator();
const HistoriqueScreen = createStackNavigator();
const OuvrirFermerPorteScreen = createStackNavigator();
const PorteParametresScreen = createStackNavigator();
const DeconnectionScreen = createStackNavigator();


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
    }
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
    headerStyle: {
      //backgroundcolor: "blue",
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight:'bold'
    }
    }}>
    <listePortesScreen.Screen name="Accueil" component={listePortes} options={{
      headerLeft: () => (
        <Icon.Button name="md-menu" size={25}
        onPress={() => navigation.openDrawer()}></Icon.Button>
      )
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
const HistoriqueStackScreen = ({navigation}) => (
  <HistoriqueScreen.Navigator screenOptions={{
    headerStyle: {
      //backgroundcolor: "blue",
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight:'bold'
    }
    }}>
    </HistoriqueScreen.Navigator>
)
const OuvrirFermerPorteStackScreen = ({navigation}) => (
  <OuvrirFermerPorteScreen.Navigator screenOptions={{
    headerStyle: {
      //backgroundcolor: "blue",
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight:'bold'
    }
    }}>
    <OuvrirFermerPorteScreen.Screen name="Connexion" component={OuvrirFermerPorte} options={{
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25}
        onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }}></OuvrirFermerPorteScreen.Screen>
    </OuvrirFermerPorteScreen.Navigator>
)

const PorteParametresStackScreen = ({navigation}) => (
    <PorteParametresScreen.Navigator screenOptions={{
    headerStyle: {
        // backgroundcolor: "blue",
    },
    headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight:'bold'
    }
}}>
<PorteParametresScreen.Screen name="PorteParametres" component={PorteParametres} options={{
    headerLeft: () => (
        <Icon.Button name="ios-menu" size={25}
    onPress={() => navigation.openDrawer()}></Icon.Button>
),
    drawerLabel: () => null,
        title: null,
        drawerIcon: () => null
}}></PorteParametresScreen.Screen>
</PorteParametresScreen.Navigator>
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
      <Drawer.Navigator initialRouteName="Page1">
        <Drawer.Screen name="Connexion" component={Connection}/>
        <Drawer.Screen name="Inscription" component={Inscription}/>
        <Drawer.Screen name="Ajouter une porte" component={AjoutPorte} />
        <Drawer.Screen name="Afficher la liste de vos portes" component={listePortes} />
        <Drawer.Screen name="Ouvrir/fermer porte" component={OuvrirFermerPorte} />
        <Drawer.Screen name="PorteParametres" component={PorteParametres} />
        <Drawer.Screen name="Deconnexion" component={Deconnection} />
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
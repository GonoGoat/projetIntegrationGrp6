import * as React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack'

import Icon from 'react-native-vector-icons/Ionicons';

import Accueil from './Components/Accueil'
import Inscription from './Components/Inscription'
import Connection from './Components/Connection'
import AjoutPorte from './Components/AjoutPorte'
import listePortes from './Components/listePortes'
import Historique from './Components/Historique'
import OuvrirFermerPorte from './Components/OuvrirFermerPorte'
import PorteDetail from './Components/PorteDetail';
import PorteParametres from './Components/PorteParametres';
import axios from 'axios';

const Drawer = createDrawerNavigator();
const AccueilScreen= createStackNavigator();
const ConnexionScreen = createStackNavigator();
const InscriptionScreen = createStackNavigator();
const AjoutPorteScreen = createStackNavigator();
const listePortesScreen = createStackNavigator();
const HistoriqueScreen = createStackNavigator();
const OuvrirFermerPorteScreen = createStackNavigator();
const PorteDetailScreen = createStackNavigator();
const PorteParametresScreen = createStackNavigator();

const AccueilStackScreen = ({navigation}) => (
  <AccueilScreen.Navigator screenOptions={{
    headerStyle: {
      //backgroundcolor: "blue",
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight:'bold'
    }
    }}>
    <AccueilScreen.Screen name="Accueil" component={Accueil} options={{
      title:"Overview",
      headerLeft: () => (
        <Icon.Button name="md-menu" size={25}
        onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }}></AccueilScreen.Screen>
    </AccueilScreen.Navigator>
)
const ConnexionStackScreen = ({navigation}) => (
  <ConnexionScreen.Navigator screenOptions={{
    headerStyle: {
      //backgroundcolor: "blue",
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
      headerLeft: () => (
        <Icon.Button name="md-menu" size={25}
        onPress={() => navigation.openDrawer()}></Icon.Button>
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
    <HistoriqueScreen.Screen name="Accueil" component={Historique} options={{
      headerLeft: () => (
        <Icon.Button name="md-menu" size={25}
        onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }}></HistoriqueScreen.Screen>
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
const PorteDetailStackScreen = ({navigation}) => (
  <PorteDetailScreen.Navigator screenOptions={{
    headerStyle: {
     // backgroundcolor: "blue",
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight:'bold'
    }
    }}>
    <PorteDetailScreen.Screen name="PorteDetail" component={PorteDetail} options={{
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25}
        onPress={() => navigation.openDrawer()}></Icon.Button>
      ),
      drawerLabel: () => null,
      title: null,
      drawerIcon: () => null
    }}></PorteDetailScreen.Screen>
    </PorteDetailScreen.Navigator>
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

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Page1">
        <Drawer.Screen name="Accueil" component={AccueilStackScreen} />
        <Drawer.Screen name="Connexion" component={ConnexionStackScreen} />
        <Drawer.Screen name="Inscription" component={InscriptionStackScreen} />
        <Drawer.Screen name="Ajouter une porte" component={AjoutPorteStackScreen} />
        <Drawer.Screen name="Afficher la liste de vos portes" component={listePortesStackScreen} />
        <Drawer.Screen name="Afficher l'historique des ouvertures" component={HistoriqueStackScreen} />
        <Drawer.Screen name="Ouvrir/fermer porte" component={OuvrirFermerPorteStackScreen} />
        <Drawer.Screen name="PorteDetail" component={PorteDetailStackScreen} />
        <Drawer.Screen name="PorteParametres" component={PorteParametresStackScreen} />
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

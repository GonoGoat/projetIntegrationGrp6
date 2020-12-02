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
const Stack = createStackNavigator();

const MonCompteStackScreen = ({navigation}) => (
    <Drawer.Navigator screenOptions={
        {headerShown: false}}>
<Drawer.Screen name="Connexion" component={Connection} options={{inscriptionSubmitted: false,
    headerLeft: () => (
    <Icon.Button name="md-menu" size={25} onPress={ () => { navigation.openDrawer()}}></Icon.Button>
)}}>
</Drawer.Screen>
<Drawer.Screen name="Inscription" component={Inscription}
options={{
    headerLeft: () => (
        <Icon.Button name="md-menu" size={25} onPress={ () => { navigation.openDrawer()}}></Icon.Button>
)}}>
</Drawer.Screen>

<Drawer.Screen name="MotDePasseOublie" component={MotDePasseOublie}
options={{
    headerLeft: () => (
        <Icon.Button name="md-menu" size={25} onPress={ () => { navigation.openDrawer()}}></Icon.Button>
)}}>
</Drawer.Screen>
</Drawer.Navigator>
)

const listePortesStackScreen = ({navigation}) => (
    <Drawer.Navigator screenOptions={{
        headerShown: true,
        headerTintColor: '#719ada',
        headerTitleStyle: {
        fontWeight:'bold',
            textAlign: 'center'
        },
        title:"Doorz"
    }}>
        <Drawer.Screen name="ListePortes" component={listePortes}
            options={{
                headerLeft: () => (
                <Icon.Button name="md-menu" size={25} onPress={ () => { navigation.openDrawer()}}></Icon.Button>
            )}}>
        </Drawer.Screen>

        <Drawer.Screen name="PorteDetail" component={PorteDetail}
            options={{doorIdParam: 0, nickname: "", tagName: "",
                headerLeft: () => (
                <Icon.Button name="md-menu" size={25} onPress={ () => { navigation.openDrawer()}}></Icon.Button>
                )}}>
        </Drawer.Screen>

        <Drawer.Screen name="Historique" component={Historique} options={{doorIdParam: 0,nickname: ""}}
            options={{
                headerLeft: () => (
                <Icon.Button name="md-menu" size={25} onPress={ () => { navigation.openDrawer()}}></Icon.Button>
                )}}>
        </Drawer.Screen>
    </Drawer.Navigator>
)

const FavoriteStackScreen = ({navigation}) => (
    <Drawer.Navigator screenOptions={{
        headerShown: true,
        headerTintColor: '#719ada',
        headerTitleStyle: {
        fontWeight:'bold',
            textAlign: 'center'
        },
        title:"Doorz"
    }}>
        <Drawer.Screen name="Portes favorites" component={PorteFavorite}
            options={{
                headerLeft: () => (
                <Icon.Button name="md-menu" size={25} onPress={ () => { navigation.openDrawer()}}></Icon.Button>
            )}}>
        </Drawer.Screen>
    </Drawer.Navigator>
)

const AjoutPorteStackScreen = ({navigation}) => (
    <Drawer.Navigator screenOptions={{
        headerShown: true,
        headerTintColor: '#719ada',
        headerTitleStyle: {
            fontWeight:'bold',
            textAlign: 'center'
        },
        title:"Doorz"
    }}>
        <Drawer.Screen name="Ajouter une porte" component={AjoutPorte}
            options={{
                headerLeft: () => (
                <Icon.Button name="md-menu" size={25} onPress={ () => { navigation.openDrawer()}}></Icon.Button>
            )}}>
        </Drawer.Screen>
    </Drawer.Navigator>
)

const DeconnectionStackScreen = ({navigation}) => (
    <Drawer.Navigator screenOptions={{
        headerShown: true,
        headerTintColor: '#719ada',
        headerTitleStyle: {
        fontWeight:'bold',
            textAlign: 'center'
        },
        title:"Doorz"
    }}>
        <Drawer.Screen name="Deconnexion" component={Deconnection}
            options={{
                headerLeft: () => (
                <Icon.Button name="md-menu" size={25} onPress={ () => { navigation.openDrawer()}}></Icon.Button>
            )}}>
        </Drawer.Screen>
    </Drawer.Navigator>
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
      <Drawer.Navigator initialRouteName="Connexion">
        <Stack.Screen name="Connexion" component={MonCompteStackScreen}/>
        <Stack.Screen name="Portes favorites" component={FavoriteStackScreen} />
        <Stack.Screen name="Ajouter une porte" component={AjoutPorteStackScreen} />
        <Stack.Screen name="Afficher la liste de vos portes" component={listePortesStackScreen} />
        <Stack.Screen name="Deconnexion" component={DeconnectionStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}



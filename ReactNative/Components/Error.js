import React from "react"
import {View} from "react-native"
import {Button,Text} from "react-native-paper"
import AsyncStorage from '@react-native-community/async-storage';

export default class Error extends React.Component {

    setUser() {
        AsyncStorage.setItem("user", 104);
        AsyncStorage.setItem("isAdmin", true);
    }

    render () {
        return (
            <View>
                <Text>Vous n'avez pas de compte adéquat pour accéder à cette fonctionnalité. Veuillez vous connecter avec un compte valide.</Text>
                <Button
                mode="contained"
                onPress={() => this.props.navigation.navigate('Connexion')}
                >
                    Se connecter
                </Button>
                <Button
                mode="contained"
                onPress={() => this.setUser()}
                >
                    Ajouter user
                </Button>
            </View>
        )
    }
}
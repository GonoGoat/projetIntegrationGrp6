import React from "react"
import {View} from "react-native"
import {Button,Text} from "react-native-paper"

export default class Error extends React.Component {

    render () {
        return (
            <View>
                <Text>Vous n'avez pas de compte adéquat pour accéder à cette fonctionnalité. Veuillez vous connecter avec un compte valide.</Text>
                <Button
                    mode="contained"
                    onPress={() => this.props.navigation.navigate('Connexion')}
                    testID='redirect'
                >
                    Se connecter
                </Button>
            </View>
        )
    }
}
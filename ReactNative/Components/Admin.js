import React from "react"
import {ActivityIndicator, View} from "react-native"
import { Modal, Text, Button} from 'react-native-paper';

async function newDoor() {
    return axios.post("http://localhost:8081/", );
}

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : "",
            password : "",
            isVisible : false,
            isLoading : false,
        }
    }

    async displayNewDoor() {
        this.setState({isVisible : false, isLoading : true});
        this.setState({id : "1", password : "cLjbcIXYkQ"});
        setTimeout(2000,() => {this.setState({isLoading : false})})
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator size="large"/>
                    <Text>Opération en cours ...</Text>
                </View>
            )
        }
        else if (this.state.id.length != 0 && this.state.password.length != 0) {
            return (
                <View>
                    <View>
                        <Text>Une nouvelle porte a bien été créée !</Text>
                        <Text>Voici les identifiants :</Text>
                    </View>
                    <View>
                        <Text>Numéro identifiant : {this.state.id}</Text>
                        <Text>Mot de passe : {this.state.password}</Text>
                    </View>
                    <Text>Revenir au menu principal</Text>
                </View>
            )
        }
        else {
            return (
                <View>
                    <View>
                        <Text>Vous êtes sur la page de création de porte.</Text>
                        <Text>En cliquant sur le bouton,je confirme vouloir générer un nouvelle porte.</Text>
                    </View>
                    <Modal
                        visible = {this.state.isVisible}
                    >
                        <Text>Vous vous apprêtez à ajouter une nouvelle porte.</Text>
                        <Text>Êtes-vous sûr de votre opération ?</Text>
                        <Button 
                            onPress = {() => this.setState({isVisible : false})}
                        >
                            Non
                        </Button>
                        <Button 
                            onPress = {() => this.setState({isVisible : false})}
                        >
                            Oui
                        </Button>
                    </Modal>
                    <Button onPress={()=> this.setState({isVisible : true})}>Créer une nouvelle porte</Button>
                </View>
            )
        }
    }
}
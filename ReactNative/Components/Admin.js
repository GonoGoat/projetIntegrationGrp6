import React from "react"
import {StyleSheet, View} from "react-native"
import { Modal, Text, Button,ActivityIndicator, TextInput,RadioButton} from 'react-native-paper';

const axios = require('axios')

async function newDoor(valeurs) {
    return axios.post("http://localhost:8081/newDoor", valeurs);
}

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : "",
            password : "",
            ipAddress :"",
            status : 0,
            isVisible : false,
            isLoading : "",
        }
    }

    async displayNewDoor() {
        this.setState({isVisible : false, isLoading : true});
        let valeur = {
            ipAdress : this.state.ipAddress,
            status : this.state.status
        }
        await newDoor(valeur).then(res => {
            this.setState({
                id : res.data.id,
                password : res.data.password,
                ipAddress : res.data.adresseip,
                status : res.data.status,
                isLoading: false
            })
        })
    }

    getText() {
        if (this.state.isLoading === true) {
            return (
                <React.Fragment>
                    <ActivityIndicator size="large"/>
                    <Text>Opération en cours ...</Text>
                </React.Fragment>
            )
        }
        else if (this.state.isLoading === false) {
            return (
                <React.Fragment>
                    <View>
                        <Text>Une nouvelle porte a bien été créée !</Text>
                        <Text>Voici les identifiants :</Text>
                    </View>
                    <View>
                        <Text>Numéro identifiant : {this.state.id}</Text>
                        <Text>Mot de passe : {this.state.password}</Text>
                        <Text>Etat de la porte : {this.state.status === 1 ? "Ouverte" : "Fermée"}</Text>
                        <Text>Adresse IP de la porte : {this.state.ipAdress}</Text>
                    </View>
                    <Text>Revenir au menu principal</Text>
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <View>
                        <Text>Vous êtes sur la page de création de porte.</Text>
                        <Text>Adresse IP de la porte sur le réseau : </Text>
                        <TextInput
                            placeholder="Veuillez introduire l'adresse IP"
                            onSubmitEditing={() => this.setState({isVisible : false})}
                            onChangeText={(text) =>this.setState({ipAddress : text})}
                            value={this.state.ipAddress}
                        />
                        <Text>En cliquant sur le bouton,je confirme vouloir générer une nouvelle porte.</Text>
                    </View>
                    <View>
                        <Text>La porte est-elle ouverte ou fermée ?</Text>
                        <RadioButton
                            value='Ouverte'
                            status={this.state.status === 1 ? "checked" : "unchecked"}
                            onPress={() => this.setState({status : 1})}
                        />
                        <Text>Ouverte</Text>
                        <RadioButton
                            value='Fermée'
                            status={this.state.status === 0 ? "checked" : "unchecked"}
                            onPress={() => this.setState({status : 0})}
                        />
                        <Text>Fermée</Text>
                    </View>
                    <Button onPress={()=> this.setState({isVisible : true})}>Créer une nouvelle porte</Button>
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
                            onPress = {() => this.displayNewDoor()}
                        >
                            Oui
                        </Button>
                    </Modal>
                </React.Fragment>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.getText()}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
});
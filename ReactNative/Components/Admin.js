import React from "react"
import {StyleSheet, View,TextInput} from "react-native"
import { Modal, Text, Button,ActivityIndicator,RadioButton,Snackbar} from 'react-native-paper';
import {checkIp,error} from '../Functions/functionsAdmin'
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-community/async-storage"
import Error from "./Error"

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
            isModalVisible : false,
            isSnackVisible : false,
            isLoading : true,
            message : {type: "fail"},
            user : ""
        }
    }

    checkUser() {
        AsyncStorage.getAllKeys().then(res => {
          if (res.indexOf('user') != -1 && res.indexOf('isAdmin') != -1) {
            AsyncStorage.getItem('isAdmin').then(res => {
                if (JSON.parse(res) === true) {
                    AsyncStorage.getItem('user').then(res => this.setState({user : parseInt(res),isLoading : ""}));
                }
            })
          }
          else {
            this.setState({user : false,isLoading : ""});
          }
        });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.checkUser(), 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    /**
     * Appel API et affichage final
     */
    async displayNewDoor() {
        this.setState({isModalVisible : false, isLoading : true});
        let valeur = {
            ipAddress : this.state.ipAddress,
            status : this.state.status
        }
        await newDoor(valeur).then(res => {
            if (res.data === false) {
                let message = {
                    type : "fail",
                    message : "L'opération n'a pas correctement été exécutée. Veuillez réessayer."
                }
                this.setState({message : message, isLoading : "",isSnackVisible : true})
            }
            this.setState({
                id : res.data.id,
                password : res.data.password,
                ipAddress : res.data.adresseip,
                status : res.data.status,
                isLoading: false
            })
        })
        .catch(err => {this.setState({message : error(err),isSnackVisible : true})}
        );
    }

    /**
     * Check
     */
    submit() {
        let valeurs = checkIp(this.state.ipAddress);
        if (valeurs === true) {
            this.setState({isModalVisible : true});
        }
        else {
            this.setState({message : valeurs,isSnackVisible : true});
        }
    }

    /**
     * Si en train de charger ; affiche chargement
     * Si fini de chargé : affiche données
     * Sinon, affiche accueil
     */
    getText() {
        if (this.state.id.length != 0) {
            return (
                <View style={styles.container}>
                    <View style={styles.final}>
                        <Text style={styles.finalDesc}>Une nouvelle porte a bien été créée !</Text>
                        <Text style={styles.finalDesc}>Voici les identifiants :</Text>
                    </View>
                    <View style={styles.final}>
                        <Text style={styles.finalText}>Numéro identifiant : {this.state.id}</Text>
                        <Text style={styles.finalText}>Mot de passe : {this.state.password}</Text>
                        <Text style={styles.finalText}>Etat de la porte : {this.state.status === 1 ? "Ouverte" : "Fermée"}</Text>
                        <Text style={styles.finalText}>Adresse IP de la porte : {this.state.ipAddress}</Text>
                    </View>
                    <Button
                        color="#D0D0D0"
                        onPress={() => this.setState({id : ""})}
                        mode="contained"
                    >
                        Revenir au menu principal
                    </Button>
                </View>
            )
        }
        else {
            return (
                <React.Fragment>
                    <View style={styles.sub}>
                        <Text style={styles.title}>Bienvenue sur la page de <Text style={styles.bold}>rajout de porte</Text></Text>
                    </View>
                    <View style={styles.sub}>
                        <Text style={styles.inputDesc}>Veuillez insérer une <Text style={styles.bold}>adresse ip :</Text></Text>
                        <TextInput
                            placeholder="Veuillez introduire l'adresse IP"
                            onSubmitEditing={() => this.submit()}
                            onChangeText={(text) =>this.setState({ipAddress : text})}
                            value={this.state.ipAddress}
                            style={styles.input}
                            selectionColor="#719ADA"
                        />
                    </View>
                
                    <View style={styles.radioContainer}>
                        <Text style={styles.radioDesc}>La porte est-elle <Text style={styles.bold}>ouverte</Text> ou <Text style={styles.bold}>fermée ?</Text></Text>
                        <View style={styles.radioDiv}>
                            <RadioButton
                                value='Ouverte'
                                status={this.state.status === 1 ? "checked" : "unchecked"}
                                onPress={() => this.setState({status : 1})}
                                color="#719ADA"
                            />
                            <Text style={styles.radio}>Ouverte</Text>
                        </View>
                        <View style={styles.radioDiv}>
                            <RadioButton
                                value='Fermée'
                                status={this.state.status === 0 ? "checked" : "unchecked"}
                                onPress={() => this.setState({status : 0})}
                                color="#719ADA"
                            />
                            <Text style={styles.radio}>Fermée</Text>
                        </View>
                    </View>
                    <Button
                        color="#719ADA"
                        mode="contained"
                        onPress={() => this.submit()}
                        contentStyle = {styles.buttonIn}
                        labelStyle= {styles.buttonText}
                        style={styles.button}
                        testID='button-ajout'
                        >
                        Enregistrer
                    </Button>
                </React.Fragment>
            )
        }
    }

    render() {
        if (this.state.isLoading === true) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large"/>
                    <Text>Opération en cours ...</Text>
                </View>
            )
        }
        else if (this.state.user === false) {
            return (            
                <View style={styles.container}>
                    <Error/>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    {this.getText()}
                    <Modal
                        visible = {this.state.isModalVisible}
                        style={styles.modal}
                    >   
                        <View style={styles.modalContent}>
                            <Text style={styles.modalDesc}>Êtes-vous sûr de vouloir rajouter la porte ayant l'addresse ip :</Text>
                            <Text style={styles.modalDesc,styles.value}>{this.state.ipAddress}</Text>
                            <Text style={styles.modalDesc}>et que celle-ci est :</Text>
                            <Text style={styles.modalDesc,styles.value}>{this.state.status === 1 ? "Ouverte" : "Fermée"}</Text>
                            <View style={styles.buttons}>
                                <Button
                                    color="#719ADA"
                                    onPress = {() => this.displayNewDoor()}
                                    contentStyle = {styles.modalButtonIn}
                                    labelStyle= {styles.buttonText}
                                    style={styles.modalButton}
                                    mode="contained"
                                >
                                    Oui
                                </Button>    
                                <Button
                                    color="#D0D0D0"
                                    onPress = {() => this.setState({isModalVisible : false})}
                                    contentStyle = {styles.modalButtonIn}
                                    labelStyle= {styles.buttonText,styles.modalButtonText}
                                    mode="contained"
                                >
                                    Non
                                </Button>
                            </View>
                        </View>
                    </Modal>
                    <Snackbar
                        visible={this.state.isSnackVisible === true}
                        onDismiss={() => this.setState({isSnackVisible : false})}
                        style = {this.state.message.type === "success" ? styles.success : styles.fail}
                        action={{
                            label: 'Ok',
                            onPress: () => {
                                this.setState({isSnackVisible : false})
                            },
                        }}       
                    > 
                        {this.state.message.type === "success" ? 
                        <Icon size={30} style={styles.icon} name="md-checkmark"></Icon> :
                        <Icon size={30} style={styles.icon} name="md-close-circle-outline"></Icon>}
                        {this.state.message.message != undefined ? this.state.message.message : ""}
                    </Snackbar>
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
      flex : 1,
      alignItems : "center",
      justifyContent : "space-around"
    },
    success : {
      backgroundColor : "green",
    },
    fail : {
      backgroundColor : "red",
    },
    icon : {
      marginRight : 10,
    },
    bold : {
        fontWeight : "bold"
    },
    sub : {
        alignItems : "center",
        justifyContent : "center",
        borderBottomWidth : 3,
        borderColor : "black",
        width : 230,
        paddingBottom : 70
    },
    title : {
        textAlign : "center",
        fontSize : 20
    },
    inputDesc : {
        fontSize : 16,
        paddingBottom : 50
    },
    input : {
        borderColor : "black",
        borderWidth : 1,
        height : 30,
        width : 230
    },
    radio : {
        alignSelf : "stretch",
        textAlign : "right",
        paddingTop : 10
    },
    radioDiv : {
        flexDirection : "row"
    },
    radioContainer : {
        flexDirection : "column",
        justifyContent : "center",
        borderBottomWidth : 3,
        borderColor : "black",
        width : 230,
        paddingBottom : 30
    },
    radioDesc : {
        fontSize : 13,
        paddingBottom : 15,
        textAlign : "center"
    },
    buttonIn : {
        height : 50,
        width : 200
    },
    buttonText : {
        fontSize : 16,
        color : "#D0D0D0"
    },
    button : {
        marginBottom : 50
    },
    modal : {
        flex : 1
    },
    modalContent : {
        backgroundColor : "white",
        borderColor : "black",
        borderWidth : 2,
        justifyContent : "center",
        alignItems : "center",
        position : "absolute",
        left : "50%",
        top : "50%",
        textAlign : "center",
        padding : 5
    },
    modalDesc : {
        textAlign : "center",
        fontSize : 16
    },
    value : {
        fontWeight : "bold"
    },
    buttons : {
        flexDirection : "row",
        justifyContent : "center"
    },
    modalButton : {
        marginHorizontal : 20
    },
    modalButtonIn : {
        height : 40,
        width : 100
    },
    modalButtonText : {
        color : "black"
    },
    final : {
        borderBottomColor : "black",
        borderBottomWidth : 3,
        paddingBottom : 50
    },
    finalText : {
        paddingVertical : 7,
        fontSize : 16
    },
    finalDesc : {
        paddingVertical : 7,
        fontSize : 16,
        textAlign : "center"
    }
})
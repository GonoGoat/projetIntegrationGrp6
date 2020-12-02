import React from "react";
import {StyleSheet, View,Text, TextInput} from 'react-native';
import { Button } from 'react-native-paper';
import {checkVerif,checkVerifAPI} from "../Functions/functionsAjoutPorte"
import AsyncStorage from "@react-native-community/async-storage"

const axios = require('axios')

async function getCheck(valeurs) {
    return axios.post("http://localhost:8081/door/check", valeurs);
}

export default class AjoutPorte_FormVerif extends React.Component {

    constructor(props) {
        super(props);
        this.idPorte = "";
        this.password = "";
    }

    async isDoorExisting() {
        let valeurs = {
            user : AsyncStorage.getItem('user'),
            password : this.password,
            id : this.idPorte
        }
        console.log(AsyncStorage.getItem('user'))
        await getCheck(valeurs).then(res => {
            let rep = checkVerifAPI(res,true);
            if (rep === true) {
                this.props.setDoor(parseInt(this.idPorte));
            }
            else {
                this.props.setMessage(rep);
            }
        })
        .catch(err => {this.props.setMessage(checkVerifAPI(err,false))});
    }

    submit() {
        let valeurs = checkVerif(this.idPorte,this.password);
        if (valeurs === true) {
            this.isDoorExisting();
        }
        else {
            this.props.setMessage(valeurs);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>Pour ajouter un porte, veuillez renseigner l'id et le mot de passe donné.</Text>
                <View style={styles.form}>
                    <Text style={styles.label}>ID :</Text>
                    <TextInput style={styles.input}
                        placeholder="Insérer un ID valide de porte"
                        testID='id'
                        keyboardType={"numeric"}
                        onSubmitEditing={() => this.submit()}
                        onChangeText={(text) => this.idPorte = text}
                    />
                    <Text style={styles.label}>Mot de passe :</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Insérer le mot de passe de la porte"
                        testID='pswd'
                        secureTextEntry={true}
                        onSubmitEditing={() => this.submit()}
                        onChangeText={(text) => this.password = text}
                    />
                </View>
                <Button
                    color="#719ADA"
                    mode="contained"
                    onPress={() => this.submit()}
                    contentStyle = {styles.buttonIn}
                    labelStyle= {styles.buttonText}
                    style={styles.button}
                    testID="button-verif"
                >
                    Rechercher la porte
                </Button>
            </View>
        );  
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    description : {
        height : 100,
        width : 210,
        textAlign : "center",
        fontSize : 18,
        marginTop : 80,
    },
    label : {
        alignSelf : "stretch",
        textAlign : "left",
        fontSize : 18,
        paddingBottom : 6,
    },
    input : {
        alignSelf : "stretch",
        textAlign : "left",
        borderWidth : 2.5,
        height : 40,
        fontSize : 18,
        padding : 7,
        marginBottom : 50
    },
    buttonIn : {
        height : 50,
        width : 270
    },
    buttonText : {
        fontSize : 16,
        color : "#D0D0D0"
    },
    button : {
        marginTop : 50
    },
    form : {
        marginVertical : 50
    }
})


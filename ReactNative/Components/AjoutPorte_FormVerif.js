import React from "react";
import {StyleSheet, View,Text, TextInput} from 'react-native';
import { Button } from 'react-native-paper';

function AjoutPorte_FormVerif(props) {
    const [idPorte,setId] = React.useState("");
    const [password,setPassword] = React.useState("");

    const axios = require('axios')

    function isDoorExisting() {
        axios.post("http://localhost:8081/door/check", {user : 8, password : password, id : idPorte}).then(res => {
            if (!res.data) {
                props.setDoor(parseInt(idPorte));
            }
            else {
                props.setMessage({
                    message : "Vous avez déjà cette porte. Veuillez entrer les données d'un porte que vous ne posséder pas encore.",
                    type : "fail"
                })
            }
        }).catch(err => {
            if (err.reponse) {
                switch(err.response.status) {
                    case 403 :
                        props.setMessage({
                            message : "Mot de passe incorrect. Veuillez insérer le mot de passe valide.",
                            type : "fail"
                        })
                        break;
                    case 404 :
                        props.setMessage({
                            message : "ID de la porte incorrect. Veuillez rentrer un ID valide.",
                            type : "fail"
                        })
                        break;
                    default :
                        console.log(err.response.status);
                        props.setMessage({
                            message : "Une erreur s'est produite. Veuillez réessayer.",
                            type : "fail"
                        })
                }
            }
            else if (err.request) {
                props.setMessage({
                    message : "Une erreur est survenue lors de l'envoi de votre requête. Veuillez réessayer.",
                    type : "fail"
                })
            }
            else {
                props.setMessage({
                    message : "Une erreur s'est produite. Veuillez réessayer.",
                    type : "fail"
                })
            }
        });
    }

    function check() {
        if (!/^[0-9]+$/.test(idPorte)) {
            if (idPorte.length === 0) {
                props.setMessage({
                    message : "Veuillez insérer un ID de porte.",
                    type : "fail"
                })
            }
            else {
                props.setMessage({
                    message : "Veuillez n'insérer que des chiffres pour l'ID de la porte.",
                    type : "fail"
                })
            }
            return false;
        }
        if (!/^[a-zA-Z]{10}$/.test(password)) {
            if (password.length === 0) {
                props.setMessage({
                    message : "Veuillez insérer le mot de passe de la porte.",
                    type : "fail"
                })
            }
            else {
                props.setMessage({
                    message : "Veuillez insérer un mot de passe valide.",
                    type : "fail"
                })
            }
            return false;
        }
        return true;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.description}>Pour ajouter un porte, veuillez renseigner l'id et le mot de passe donné.</Text>
            <View style={styles.form}>
                <Text style={styles.label}>ID :</Text>
                <TextInput style={styles.input} placeholder="Insérer un ID valide de porte" value={idPorte} keyboardType={"numeric"} onSubmitEditing={() => check() ? isDoorExisting() : {}} onChangeText={(text) => setId(text)}></TextInput>
                <Text style={styles.label}>Mot de passe :</Text>
                <TextInput style={styles.input} placeholder="Insérer le mot de passe de la porte" value={password} secureTextEntry={true} onSubmitEditing={() => check() ? isDoorExisting() : {}} onChangeText={(text) => setPassword(text)}></TextInput>
            </View>
            <Button
                color="#719ADA"
                mode="contained"
                onPress={() => check() ? isDoorExisting() : {}}
                contentStyle = {styles.buttonIn}
                labelStyle= {styles.buttonText}
                style={styles.button}
            >
                Rechercher la porte
            </Button>
        </View>
    );   
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
export default AjoutPorte_FormVerif;


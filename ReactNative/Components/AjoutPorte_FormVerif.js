import React from "react";
import {StyleSheet, View,Text,Button, TextInput} from 'react-native';

function AjoutPorte_FormVerif(props) {
    const [idPorte,setId] = React.useState("");
    const [password,setPassword] = React.useState("");

    const axios = require('axios')

    function isDoorExisting() {
        axios.post("http://localhost:8081/door/check", {user : 8, password : password, id : idPorte}).then(res => {
            if (res.data.data === true && !res.data.isExisting) {
                props.setDoor(parseInt(idPorte));
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
                        props.setMessage({
                            message : "Une erreur s'est produite. Veuillez réessayer.",
                            type : "fail"
                        })
                }
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
        if (!/^.[^ ]+$/.test(password)) {
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
        <View>
            <Text>ID de la porte</Text>
            <TextInput placeholder="Insérer un ID valide de porte" keyboardType={"numeric"} onSubmitEditing={() => check() ? isDoorExisting() : {}} onChangeText={(text) => setId(text)}></TextInput>
            <Text>Mot de passe de la porte</Text>
            <TextInput placeholder="Insérer le mot de passe de la porte" secureTextEntry={true} onSubmitEditing={() => check() ? isDoorExisting() : {}} onChangeText={(text) => setPassword(text)}></TextInput>
            <Button title="Rechercher la porte" onPress={() => check() ? isDoorExisting() : {}}/>
        </View>
    );   
}

export default AjoutPorte_FormVerif;


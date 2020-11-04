import React from "react";
import {StyleSheet, View,Text,Button, TextInput} from 'react-native';

function AjoutPorte_FormVerif(props) {
    var idPorte = "";
    var password = "";

    const axios = require('axios')

    async function isDoorExisting() {
        const res = await axios.post("http://localhost:8081/door/check", { password : password, id : idPorte});
        if (res.data === true) {
          props.setDoor(parseInt(idPorte));
        }
      }

    return (
        <View>
            <Text>ID de la porte</Text>
            <TextInput placeholder="Insérer un ID valide de porte" onSubmitEditing={() => isDoorExisting()} onChangeText={(text) => idPorte = text}></TextInput>
            <Text>Mot de passe de la porte</Text>
            <TextInput placeholder="Insérer le mot de passe de la porte" secureTextEntry={true} onSubmitEditing={() => isDoorExisting()} onChangeText={(text) => password = text}></TextInput>
            <Button title="Rechercher la porte" onPress={() => isDoorExisting()}/>
        </View>
    );   
}

export default AjoutPorte_FormVerif;


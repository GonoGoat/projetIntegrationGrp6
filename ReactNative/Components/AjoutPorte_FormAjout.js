import React from "react"
import {StyleSheet, View,Text,Button, TextInput} from 'react-native';

function AjoutPorte_FormAjout(props) {

    var tag = "";
    var nickname = "";

    const axios = require('axios')

    async function addNewAccess() {
      let valeurs = {
          door : props.doorId,
          user : 4,
          tag : tag,
          nickname : nickname,
      }
      const res = await axios.post("http://localhost:8081/newaccess", valeurs);
      if (res.data === true) {
        console.log("porte ajoutée !")
      }
    }

    return (
        <View>
            <Button title="Revenir en arrière" onPress={() => props.setDoor(undefined)}/>
            <Text>Nom de la porte</Text>
            <TextInput placeholder="Nommez la nouvelle porte" onSubmitEditing={() =>  addNewAccess()} onChangeText={(text) => nickname = text}></TextInput>
            <Text>Tag de la porte</Text>
            <TextInput placeholder="Créez un tag" onSubmitEditing={() =>  addNewAccess()} onChangeText={(text) => tag = text}></TextInput>
            <Button title="Ajouter la porte" onPress={() => addNewAccess()}/>
        </View>
    )
}

export default AjoutPorte_FormAjout;
import React from "react"
import {StyleSheet, View,Text, TextInput} from 'react-native';
import { Button } from 'react-native-paper';


function AjoutPorte_FormAjout(props) {

    const [tag,setTag] = React.useState("");
    const [nickname,setNickname] = React.useState("");

    const axios = require('axios')

    function addNewAccess() {
      let valeurs = {
          door : props.doorId,
          user : 8,
          tag : tag,
          nickname : nickname,
      }
      axios.post("http://localhost:8081/newaccess", valeurs).then(res => {
        if (res.data === true) {
          props.setMessage({
            message : `La porte "${nickname}" a bien été ajoutée !`,
            type : "success"
          });
          props.setDoor(undefined);
        }
        else {
          props.setMessage({
            message : "Une erreur est survenue. Veuillez réessayer.",
            type : "fail"
          })
        }
      }).catch(err => {
        if (err.response) {
          switch(Math.floor(err.response/100)) {
            case 4 :
              props.setMessage({
                message : "Erreur client. Veuillez réessayer ou modifier votre requête.",
                type : "fail"
              });
            case 5 :
              props.setMessage({
                message : "Erreur serveur. Veuillez réessayer ultérieurement.",
                type : "fail"
              });
            default : 
              props.setMessage({
                message : "Une erreur est survenue. Veuillez réessayer.",
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
            message : "Une erreur est survenue. Veuillez réessayer.",
            type : "fail"
          })
        }
      })
    }
  
    function check() {
      if (!/^[a-zA-Z ]+$/.test(tag)) {
          if (tag.length === 0) {
              props.setMessage({
                  message : "Veuillez insérer un tag.",
                  type : "fail"
              })
          }
          else {
              props.setMessage({
                  message : "Veuillez n'insérer que des lettres pour le tag.",
                  type : "fail"
              })
          }
          return false;
      }
      if (!/^[a-zA-Z ]+$/.test(nickname)) {
          if (nickname.length === 0) {
              props.setMessage({
                  message : "Veuillez insérer un nom pour la porte.",
                  type : "fail"
              })
          }
          else {
              props.setMessage({
                  message : "Veuillez n'insérer que des lettres pour le nom de la porte .",
                  type : "fail"
              })
          }
          return false;
      }
      return true;
  }

    return (
        <View>
          <Text style={styles.description}>Veuillez indiquer le nom et la tag désiré pour cette porte</Text>
          <View style={styles.form}>
            <Text style={styles.label}>Nom :</Text>
            <TextInput style={styles.input} placeholder="Nommez la nouvelle porte" value={nickname} onSubmitEditing={() => check() ? addNewAccess() : {}} onChangeText={(text) => setNickname(text)}></TextInput>
            <Text style={styles.label}>Tag</Text>
            <TextInput  style={styles.input} placeholder="Créez un tag" value={tag} onSubmitEditing={() => check() ? addNewAccess() : {}} onChangeText={(text) => setTag(text)}></TextInput>
          </View>
          <Button
                color="#719ADA"
                mode="contained"
                onPress={() => check() ? addNewAccess() : {}}
                contentStyle = {styles.buttonIn}
                labelStyle= {styles.buttonText}
                style={styles.button}
            >
                Rechercher la porte
            </Button>
          <Text onPress = {() => props.setDoor(undefined)} style={styles.retour}>Retour</Text>
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  description : {
      height : 100,
      width : 210,
      textAlign : "center",
      fontSize : 18,
      marginTop : 80,
      alignItems : "center",
      justifyContent : "center"
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
      marginBottom : 50
  },
  form : {
      marginVertical : 50
  },
  retour : {
    color : "#719ADA",
    textDecorationLine: 'underline',
    alignSelf : "stretch",
    textAlign : "left",
    fontSize : 18
  }
})
export default AjoutPorte_FormAjout;

//#719ADA  Bleu
//#D0D0D0  gris
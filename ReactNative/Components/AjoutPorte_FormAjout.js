import React from "react"
import {StyleSheet, View, TextInput} from 'react-native';
import { Button,Text } from 'react-native-paper';
import {checkAjout,checkAjoutAPI} from "../Functions/functionsAjoutPorte"
import AsyncStorage from "@react-native-community/async-storage"

const axios = require('axios')

async function checkAccess(valeurs) {
  return axios.post("http://localhost:8081/newaccess", valeurs);
}

export default class AjoutPorte_FormAjout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tag : "",
      nickname : ""
    }
  }

  async addNewAccess() {
    let valeurs = {
        door : this.props.doorId,
        user : 8,//AsyncStorage.getItem('user')
        tag : this.state.tag,
        nickname : this.state.nickname,
    }
    await checkAccess(valeurs).then(res => {
      let rep = checkAjoutAPI(res,true);
      this.props.setMessage(rep);
      if (rep.type === "success") {
        this.props.setDoor(undefined);
      }
    })
    .catch(err => {this.props.setMessage(checkAjoutAPI(err,false))})
  }

  submit() {
    let valeurs = checkAjout(this.state.tag,this.state.nickname);
    if (valeurs === true) {
      this.addNewAccess();
    }
    else {
      this.props.setMessage(valeurs);
    }
  }

  render() {
    return (
      <View>
        <Text style={styles.description}>Veuillez indiquer le nom et la tag désiré pour cette porte</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Nom :</Text>
          <TextInput
            style={styles.input}
            placeholder="Nommez la nouvelle porte"
            onSubmitEditing={() => this.submit()}
            onChangeText={(text) => this.setState({nickname : text})}
            testID='name'
            value={this.state.nickname}
          />
          <Text style={styles.label}>Tag</Text>
          <TextInput 
            style={styles.input}
            placeholder="Créez un tag"
            onSubmitEditing={() => this.submit()}
            onChangeText={(text) =>this.setState({tag : text})}
            testID='tag'
            value={this.state.tag}
          />
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
          Rechercher la porte
        </Button>
        <Text testID='back' onPress = {() => this.props.setDoor(undefined)} style={styles.retour}>Retour</Text>
      </View>
    )
  }
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

//#719ADA  Bleu
//#D0D0D0  gris
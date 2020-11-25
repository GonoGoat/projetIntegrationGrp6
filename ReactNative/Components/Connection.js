import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import { verify } from "../Functions/functionsConnection";

class Connection extends React.Component {

  constructor(props) {
    super(props);
    this.mail = "";
    this.password = "";
    this.state={
      errorMessage: "",
    }
  }
  /* 
  Fonction permettant de récupérer les 3 portes les plus utilisées par l'utilisateur
  @params: id => identifiant de l'utilisateur dont on souhaite récuperer les valeurs.
  */
  getHistory = async (id) => {
    let doors = [];
    await axios.get('http://82.165.248.136:8081/doorHistory/user/'+id)
    .then(res => {
      for(let i = 0; i<res.data.length; i ++) {
        doors[i] = parseInt(res.data[i].door);
      }
    })
    this.setData(id, doors);
  };

  setData = (id, doors) => {
    console.log(id, doors)
    AsyncStorage.setItem('user', id.toString());
    AsyncStorage.setItem('doors', doors.toString());
  }

  redirect () {
    this.props.navigation.navigate('Afficher la liste de vos portes');
    this.setState({errorMessage: ''});
    this.passwordInput.value = "";
    this.mailInput.value = "";
  }

  checkUser(){
    if(verify(this.mail, this.password).state){
      axios.post('http://82.165.248.136:8081/userConnection/', {user : { 
        mail: this.mail,
        password : this.password
      }
      })
      .then((response) => {
        if (!response.data) {
          this.setState({errorMessage:'Mail ou mot de passe incorrect'});
        } else {
          this.setState({errorMessage:''});
          this.getHistory(response.data);
          this.redirect();
        }
      })
    } else {
      this.setState({errorMessage:verify(this.mail, this.password).msg});
    }
  }

  render() {
    const nav = this.props.navigation;
    return (
      <View style={styles.component}>
        <Text style={styles.text}>E-mail : </Text>
        <TextInput ref={input => { this.mailInput = input }} placeholder='E-mail' style={styles.input} onChangeText={(text)=> this.mail = text}/>
        <Text style={styles.text}>Mot de passe : </Text>
        <TextInput ref={input => { this.passwordInput = input }} placeholder='Mot de passe' secureTextEntry={true} style={styles.input} onChangeText={(text)=> this.password = text }/>
        <Text style={styles.error}>{this.state.errorMessage}</Text>
        <TouchableOpacity style={styles.connect} onPress={()=> this.checkUser()}>
          <Text style={styles.textConnection}>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inscript} onPress={() => nav.navigate("Inscription")} >
          <Text style={styles.text}>Pas encore de compte ? </Text>
          </TouchableOpacity>
        <Snackbar visible={this.state.inscriptionSubmitted === true} style = {this.state.type = styles.success } duration={2000} >
        "Votre compte a bien été validé"
        </Snackbar>
        <TouchableOpacity style={styles.password} onPress={() => nav.navigate("MotDePasseOublie")}>
          <Text style={styles.password}><u>mot de passe oublié ?</u></Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  component: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 75,
    marginTop: 100
  },
  text: {
    padding: 5,
    justifyContent: 'center',
    alignContent: 'center'
  },
  input: {
    padding: 5,
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: '#000',
    borderWidth: 1,
  },
  connect: {
    color: 'white',
    textAlign: 'center',
    margin: 25,
    padding: 10,
    backgroundColor: '#719ada',
    justifyContent: 'center',
    alignContent: 'center',
  },
  textConnection: {
    color: 'white',
    textAlign: 'center'
  },
  inscript: {
    textAlign: 'center',
    margin: 25,
    padding: 10,
    backgroundColor: '#d8d8d8',
    justifyContent: 'center',
    alignContent: 'center'
  },
  password: {
    marginTop : 140
  },
  error: {
    color : 'red',
    textAlign: 'center',
    paddingTop: 5
  },
  success : {
    backgroundColor : "green",
  }
});

export default Connection;

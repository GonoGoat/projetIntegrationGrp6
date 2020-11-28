import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import { verify } from "../Functions/functionsConnection";
import {Snackbar} from "react-native-paper";

class Connection extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      errorMessage: "",
      mail: "",
      password: ""
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
    AsyncStorage.setItem('user', id.toString());
    AsyncStorage.setItem('doors', doors.toString());
  }

  redirect () {
    this.props.navigation.navigate('Afficher la liste de vos portes');
    this.setState({errorMessage: ''});
    this.setState({mail : ''});
    this.setState({password: ''});
  }

  async userConnection() {
    return await axios.post('http://localhost:8081/userConnection/', {user : { 
      mail: this.state.mail,
      password : this.state.password
    }
    })
  }

  async checkUser(){
    if(verify(this.state.mail, this.state.password).state){
      await this.userConnection()
        .then(response => {
        if (!response.data.status) {
          this.setState({errorMessage:response.data.msg})
        }
        else {
          this.setState({errorMessage:''});
          this.getHistory(response.data.msg);
          this.redirect();
        }});
    } else {
      this.setState({errorMessage:verify(this.state.mail, this.state.password).msg});
    }
  }

  render() {
    const nav = this.props.navigation;
    return (
      <View style={styles.component}>
        <Text style={styles.text}>E-mail : </Text>
        <TextInput 
          placeholder='E-mail' style={styles.input} 
          onChangeText={(text)=> this.setState({mail: text})}
          testID='mail' 
          value={this.state.mail}
          />
        <Text style={styles.text}>Mot de passe : </Text>
        <TextInput testID='password' value={this.state.password} placeholder='Mot de passe' secureTextEntry={true} style={styles.input} onChangeText={(text)=> this.setState({password: text}) }/>
        <Text style={styles.error}>{this.state.errorMessage}</Text>
        <TouchableOpacity testID='connexion' style={styles.connect} onPress={()=> this.checkUser()}>
          <Text style={styles.textConnection}>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity testID='inscription' style={styles.inscript} onPress={() => nav.navigate("Inscription")} >
          <Text style={styles.text}>Pas encore de compte ? </Text>
        </TouchableOpacity>
        <Snackbar visible={this.state.inscriptionSubmitted === true} style = {this.state.type = styles.success } duration={2000} >
        "Votre compte a bien été validé"
        </Snackbar>
        <TouchableOpacity testID='forgot' style={styles.password} onPress={() => nav.navigate("MotDePasseOublie")}>
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

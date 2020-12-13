import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
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
  getHistory = async (user) => {
    let doors = [];
    axios.get('http://82.165.248.136:8081/doorHistory/user/'+user.id)
      .then(res => {
        console.log(res.data)
        for(let i = 0; i<res.data.length; i ++) {
          doors[i] = parseInt(res.data[i].door);
        }
        AsyncStorage.setItem('user', user.id);
        AsyncStorage.setItem('doors', doors);
        AsyncStorage.setItem('isadmin', user.admin)
        this.redirect();
      })
  };

  setData = (id, doors) => {
    AsyncStorage.setItem('user', id.toString());
    AsyncStorage.setItem('doors', doors.toString());
  };

  redirect () {
    this.props.navigation.navigate('Mon compte');
    this.props.navigation.navigate('Afficher la liste de vos portes');
    this.setState({errorMessage: ''});
    this.setState({mail : ''});
    this.setState({password: ''});
  }

  async userConnection() {
    return await axios.post('http://82.165.248.136:8081/userConnection/', {user : {
        mail: this.state.mail.toLowerCase(),
        password : this.state.password
      }
    })
  }

  async checkUser() {
    if(verify(this.state.mail.toLowerCase(), this.state.password).state){
      await this.userConnection()
        .then(response => {
        if (!response.data.status) {
          this.setState({errorMessage:response.data.msg})
        }
        else {
          this.setState({errorMessage:''});
          console.log(response.data)
          this.getHistory(response.data.msg);
        }});
    } else {
      this.setState({errorMessage:verify(this.state.mail.toLowerCase(), this.state.password).msg});
    }
  }

  render() {
    const nav = this.props.navigation;
    return (
      <View style={styles.component}>
        <Text style={styles.text}>E-mail : </Text>
        <TextInput
          placeholder='E-mail' style={styles.input}
          onChangeText={(text)=> this.setState({mail: text.trim()})}
          testID='mail'
          value={this.state.mail}
          autoCapitalize = 'none'
          />
        <Text style={styles.text}>Mot de passe : </Text>
        <TextInput testID='password' value={this.state.password} placeholder='Mot de passe' secureTextEntry={true} style={styles.input} onChangeText={(text)=> this.setState({password: text}) }/>
        <Text style={styles.error}>{this.state.errorMessage}</Text>
        <TouchableOpacity testID='forgot' style={styles.password} onPress={() => nav.navigate("MotDePasseOublie")}>
          <Text style={styles.password}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
        <TouchableOpacity testID='connexion' style={styles.connect} onPress={()=> this.checkUser()}>
          <Text style={styles.textConnection}>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity testID='inscription' style={styles.inscript} onPress={() => nav.navigate("Inscription")} >
          <Text style={styles.textInscription}>Pas encore de compte ? </Text>
        </TouchableOpacity>
        <Snackbar visible={this.state.inscriptionSubmitted === true} style = {this.state.type = styles.success } duration={2000} >
        "Votre compte a bien été validé" 
        </Snackbar>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  component: {
    flex : 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal : '12%',
    marginVertical : '5%'
  },
  text: {
    paddingVertical: '3%',
    alignContent: 'center',
  },
  input: {
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: '#000',
    borderWidth: 1,
  },
  connect: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#719ada',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: '10%',
    marginVertical: '5%',
    marginTop: '20%',
    paddingVertical: '5%'
  },
  textConnection: {
    color: 'white',
    textAlign: 'center'
  },
  inscript: {
    textAlign: 'center',
    marginHorizontal: '10%',
    marginVertical: '5%',
    paddingVertical: '5%',
    backgroundColor: '#d8d8d8',
    justifyContent: 'center',
    alignContent: 'center'
  },
  textInscription: {
    textAlign: 'center',
    paddingVertical: '3%',
    alignContent: 'center',
  },
  password: {
    textDecorationLine: 'underline',
    textAlign: 'right'
  },
  error: {
    color : 'red',
    textAlign: 'center',
    paddingTop: '5%'
  },
  success : {
    backgroundColor : "green",
  }
});

export default Connection;

import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import Inscription from "./Inscription";
import MotDePasseOublie from "./MotDePasseOublie"
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import {Snackbar} from "react-native-paper";

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
  getHistory = (id) => {
    let doors = [];
    axios.get('http://192.168.1.10:8081/doorHistory/user/'+id)
      .then(res => {
        for(let i = 0; i<res.data.length; i ++) {
          doors[i] = parseInt(res.data[i].door);
        }
        AsyncStorage.setItem('user', id);
        AsyncStorage.setItem('doors', doors);
        this.redirect();
      })
  };

  redirect () {
    this.props.navigation.navigate('Afficher la liste de vos portes');
}

  checkUser(){
    if(this.password.length > 0 && this.mail.length > 0){
    axios.post('http://192.168.1.10:8081/userConnection/', {user : {
        mail: this.mail,
        password : this.password
      }
    })
      .then((response) => {
        if (response.data != false) {
          this.getHistory(response.data);
        } else {
          this.setState({errorMessage:'Mail ou mot de passe incorrect'});
        }
      })
    } else {
      this.setState({errorMessage:'Veuillez renseigner une valeur dans chaque champ'});
    }
  }

  render() {
    const nav = this.props.navigation;
    var isSubmitted = this.props.route.params.inscriptionSubmitted
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.component}>
            <Text style={styles.text}>E-mail : </Text>
            <TextInput placeholder='E-mail' style={styles.input} onChangeText={(text)=> this.mail =  text.trim().toLowerCase()}/>
            <Text style={styles.text}>Mot de passe : </Text>
            <TextInput placeholder='Mot de passe' secureTextEntry={true} style={styles.input} onChangeText={(text)=> this.password = text }/>
            <Text style={styles.error}>{this.state.errorMessage}</Text>
            <TouchableOpacity style={styles.connect} onPress={()=> this.checkUser()}>
              <Text style={styles.textConnection}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inscript} onPress={() => nav.navigate("Inscription")} >
              <Text style={styles.text}>Pas encore de compte ? </Text>
            </TouchableOpacity>
            <Snackbar visible={isSubmitted} onDismiss={true} style={this.state.type = styles.success } duration={2000} >
              "Votre compte a bien été validé"
            </Snackbar>
          </View>
          <TouchableOpacity style={styles.password} onPress={() => nav.navigate("MotDePasseOublie")}>
            <Text style={styles.password}>Mot de passe oublié ? </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1
    },
    component: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 75,
    marginTop: 75
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
      marginBottom : 25,
      marginLeft: 25
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

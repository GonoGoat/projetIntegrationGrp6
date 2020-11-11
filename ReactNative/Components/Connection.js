import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import Inscription from "./Inscription";
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";

class Connection extends React.Component {

  constructor(props) {
    super(props);
    this.mail = "";
    this.password = "";
    this.state={
      errorMessage: ""
    }
  }

  /* Ajouter des données dans la mémoire locale de l'application */ 
  storeData  = async (name, data) => {
    try {
      await AsyncStorage.setItem(name, JSON.stringify(data));
      
    } catch (error) {
      throw error
    }
  };

  retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value
      }
      return false;
    } catch (error) {
      throw error;
    }
  };

  getHistory = (id) => {
    let doors = [];
    axios.get('http://localhost:8081/doorHistory/user/'+id)
      .then(res => {
        for(let i in res.data) {
          doors.push(parseInt(i));
        }
      })
      .catch(err => console.log(err));
      this.storeData('user', id).then();
      this.storeData('doors', doors).then();
      this.redirect();
  };

  redirect () {
    this.props.navigation.navigate('Afficher la liste de vos portes');
}

  checkUser(){
      if(this.password.length > 0 && this.mail.length > 0){
        axios.post('http://localhost:8081/userConnection/', {user : { 
            mail: this.mail,
            password : this.password
          }
        })
        .then((response) => {
          while (AsyncStorage.getItem('user') === null ){
          if (response.data != false) {
            console.log(response.data);
            this.getHistory(response.data);
          }
        }
        })
      } 
    this.setState({errorMessage:'Verify mail or password'});
  }

  render() {
    const nav = this.props.navigation;
    return (
      <View style={styles.component}>
        <Text style={styles.text}>E-mail : </Text>
        <TextInput placeholder='E-mail' style={styles.input} onChangeText={(text)=> this.mail = text}/>
        <Text style={styles.text}>Mot de passe : </Text>
        <TextInput placeholder='Mot de passe' secureTextEntry={true} style={styles.input} onChangeText={(text)=> this.password = text }/>
        <Text style={styles.error}>{this.state.errorMessage}</Text>
        <TouchableOpacity style={styles.connect} onPress={()=> this.checkUser()}>
          <Text style={styles.textConnection}>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inscript} onPress={() => nav.navigate("Inscription")} >
          <Text style={styles.text}>Pas encore de compte ? </Text>
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
    borderWidth: 1
  },
  connect: {
    color: 'white',
    textAlign: 'center',
    margin: 50,
    padding: 10,
    backgroundColor: '#719ada',
    justifyContent: 'center',
    alignContent: 'center'
  },
  textConnection: {
    color: 'white'
  },
  inscript: {
    textAlign: 'center',
    margin: 50,
    padding: 10,
    backgroundColor: '#d8d8d8',
    justifyContent: 'center',
    alignContent: 'center'
  },
  error: {
    color : 'red',
    textAlign: 'center',
    paddingTop: 5
  }
});

export default Connection;

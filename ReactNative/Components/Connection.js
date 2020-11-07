import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import Inscription from "./Inscription";
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";

class Connection extends React.Component {
  /* Ajouter des données dans la mémoire locale de l'application */ 
  _storeData  = async (name, data) => {
    try {
      await AsyncStorage.setItem(name, JSON.stringify(data));
    } catch (error) {
      throw error
    }
  };

  _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log(value);
        return value
      }
    } catch (error) {
      throw error;
    }
  };

  _getHistory = (id) => {
    axios.get('http://localhost:8081/doorHistory/user/'+id)
      .then(res => {
        let doors = [];
        for(let i in res.data) {
          doors.push(parseInt(i));
        }
        this._storeData('user', id).then();
        this._storeData('doors', doors).then();
        this.redirect();
      })
      .catch(err => console.log(err));
  };

  redirect () {
    this.props.navigation.navigate('Afficher la liste de vos portes');
}

  constructor(props) {
    super(props);
    this.mail = "";
    this.password = "";
    this.state={
      errorMessage: ""
    }
  }

  _mailChanged(text) {
    this.mail = text;
  }

  _passwordChanged(text) {
    this.password = text;
  }

  _checkUser(){
    if(this.password.length > 0 && this.mail.length > 0){
    axios.post('http://localhost:8081/userConnection/', {user : { 
        mail: this.mail,
        password : this.password
      }
    })
      .then((response) => {
        if (!response.data) {
          this.setState({errorMessage:'Verify mail or password'});
        }
        else {
          this._getHistory(response.data);
        }
      })
    }
  }


  test(value) {
    console.log(value);
  }

  render() {
    const nav = this.props.navigation.navigate;
    return (
      <View style={styles.component}>
        <Text style={styles.text}>E-mail : </Text>
        <TextInput placeholder='E-mail' style={styles.input} onChangeText={(text)=> this._mailChanged(text)}/>
        <Text style={styles.text}>Mot de passe : </Text>
        <TextInput placeholder='Mot de passe' secureTextEntry={true} style={styles.input} onChangeText={(text)=> this._passwordChanged(text)}/>
        <Text>{this.state.errorMessage}</Text>
        <TouchableOpacity style={styles.button} onPress={()=> this._checkUser()}>
          <Text style={styles.text}>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connect} onPress={() => nav("Inscription")} >
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
    margin: 75
  },
  text: {
    marginTop: 25,
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
  button: {
    color: '#fff',
    textAlign: 'center',
    margin: 50,
    padding: 10,
    backgroundColor: '#719ada',
    justifyContent: 'center',
    alignContent: 'center'
  },
  connect: {
    textAlign: 'center',
    margin: 50,
    padding: 10,
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignContent: 'center'
  },
});

export default Connection;

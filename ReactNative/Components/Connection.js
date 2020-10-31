import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import Inscription from "./Inscription";
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";

class Connection extends React.Component {
  _storeData  = async (name, data) => {
    try {
      await AsyncStorage.setItem(name, JSON.stringify(data));
    } catch (error) {
      return error
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

  clearAllData = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      throw e;
    }

    console.log('Done.')
  };

  _getHistory = (id) => {
    axios.get('http://localhost:8081/doorHistory/user/'+id)
      .then(res => {
        console.log(res.data);
        let doors = [];
        for(let i in res.data) {
          doors.push(parseInt(i));
        }
        this._storeData('user', id).then();
        this._storeData('doors', doors).then();
      })
      .catch(err => console.log(err));
  };

  constructor(props) {
    super(props);
    this.mail = "";
    this.password = "";
    this.state={
      errorMessage: ""
    }
  }

  _mailChanged(name, text) {
    this.mail = text;
  }

  _passwordChanged(name, text) {
    this.password = text;
  }

  _checkUser(){
    axios.get('http://localhost:8081/userConnection/', { 
      params : {
        mail: this.mail,
        password : this.password
      }
    })
      .then((response) => {
        console.log(response.data);
        if (!response.data) {
          this.setState({errorMessage:'Verify mail or password'});
        } 
        else {
          this._getHistory(response.data);
        }
        /* for (let i = 0; i < json.length; i++) {
          if (json[i].mail === this.mail && json[i].password === this.password) {
            this._getHistory(json[i].id);
            break;
          }
        }
        this.setState({errorMessage:'Verify mail or password'})*/
      })
  }

  render() {
    const nav = this.props.navigation.navigate;
    return (
      <View style={styles.component}>
        <Text style={styles.text}>E-mail : </Text>
        <TextInput placeholder='E-mail' style={styles.input} onChangeText={(text)=> this._mailChanged(this.mail, text)}/>
        <Text style={styles.text}>Mot de passe : </Text>
        <TextInput placeholder='Mot de passe' secureTextEntry={true} style={styles.input} onChangeText={(text)=> this._passwordChanged(this.password, text)}/>
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
    fontFamily: 'Consolas',
    justifyContent: 'center',
    alignContent: 'center'
  },
  input: {
    padding: 5,
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: '#000',
    borderWidth: 1,
    fontFamily: 'Consolas'
  },
  button: {
    color: '#fff',
    textAlign: 'center',
    margin: 50,
    padding: 10,
    backgroundColor: '#719ada',
    fontFamily: 'Consolas',
    justifyContent: 'center',
    alignContent: 'center'
  },
  connect: {
    textAlign: 'center',
    margin: 50,
    padding: 10,
    backgroundColor: '#efefef',
    fontFamily: 'Consolas',
    justifyContent: 'center',
    alignContent: 'center'
  },
});

export default Connection;

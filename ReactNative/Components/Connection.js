import {Picker, StyleSheet, Text, TextInput, View, TouchableOpacity} from "react-native";
import React from "react";
import Inscription from "./Inscription";

class Connection extends React.Component {

  render() {
    const nav = this.props.navigation.navigate;
    return (
      <View style={styles.component}>
        <Text style={styles.text}>E-mail : </Text>
        <TextInput placeholder='E-mail' style={styles.input}/>
        <Text style={styles.text}>Mot de passe : </Text>
        <TextInput placeholder='Mot de passe' style={styles.input}/>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connect} onPress={() => nav('Inscription')} >
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

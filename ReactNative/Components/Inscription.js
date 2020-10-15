import {Picker, StyleSheet, Text, TextInput, View, TouchableOpacity} from "react-native";
import React from "react";
import Connection from "./Connection";

class Inscription extends React.Component {
  render() {
    const nav = this.props.navigation.navigate;
    return (
      <View style={styles.component}>
        <Text style={styles.text}>Nom : </Text>
        <TextInput style={styles.input} placeholder='Nom de famille'/>
        <Text style={styles.text}>Prénom : </Text>
        <TextInput style={styles.input} placeholder='Prénom'/>
        <Text style={styles.text}>Sexe : </Text>
        <Picker style={styles.input}>
          <Picker.Item label='' value=''/>
          <Picker.Item label='F' value='F'/>
          <Picker.Item label='M' value='M'/>
        </Picker>
        <Text style={styles.text}>E-mail : </Text>
        <TextInput style={styles.input} textContentType='emailAddress' autoCompleteType='email' placeholder='E-mail'/>
        <Text style={styles.text}>Mot de passe : </Text>
        <TextInput style={styles.input} secureTextEntry={true} placeholder='Ecrivez votre mot de passe'/>
        <Text style={styles.text}>Confirmation : </Text>
        <TextInput style={styles.input} secureTextEntry={true} placeholder='Réécrivez le même mot de passe'/>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Inscription</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nav("Connexion")} style={styles.connect}>
          <Text style={styles.text}>Déjà un compte ? </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 75
  },
  text: {
    padding: 5,
    fontFamily: 'Consolas',
    justifyContent: 'center',
    alignContent: 'center'
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
  input: {
    padding: 5,
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: '#000',
    borderWidth: 1,
    fontFamily: 'Consolas'
  }
});

export default Inscription

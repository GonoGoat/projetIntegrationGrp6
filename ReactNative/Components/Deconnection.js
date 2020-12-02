import React from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
class Deconnection extends React.Component {

  constructor(props){
    super(props)
  }
    
  async clearAllData() {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Connexion', {inscriptionSubmitted: false});
  };

  render() {
    return (
      <View style={styles.component}>
        <Text style={styles.text}>Êtes-vous sur de vouloir vous déconnecter ?</Text>
        <TouchableOpacity style={styles.deconnect} onPress={()=> this.clearAllData()}>
          <Text style={styles.text}>Confirmer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancel} onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.text}>Annuler</Text>
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
  deconnect: {
    textAlign: 'center',
    margin: 50,
    padding: 10,
    backgroundColor: '#719ada',
    justifyContent: 'center',
    alignContent: 'center'
  },
  cancel: {
    textAlign: 'center',
    margin: 50,
    padding: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignContent: 'center'
  },
  text: {
    fontSize: 20,
    textAlign: 'center'
  }
});
export default Deconnection;

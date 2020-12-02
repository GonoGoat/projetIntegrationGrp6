import React from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
class Deconnection extends React.Component {

  constructor(props){
    super(props)
  }
    
  async clearAllData() {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Connexion');
  };

  render() {
    return (
      <View style={styles.component}>
        <Text style={styles.text_deco}>Êtes-vous sur de vouloir vous déconnecter ?</Text>
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
    flex : 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal : '12%',
    marginVertical : '5%' 
  },
  deconnect: {
    textAlign: 'center',
    marginHorizontal: '5%',
    marginVertical: '10%',
    paddingVertical: '5%',
    paddingHorizontal: '10%',
    backgroundColor: '#71daa5',
    justifyContent: 'center',
    alignContent: 'center'
  },
  cancel: {
    textAlign: 'center',
    marginHorizontal: '5%',
    marginVertical: '10%',
    paddingVertical: '5%',
    paddingHorizontal: '10%',
    backgroundColor: '#da7171',
    justifyContent: 'center',
    alignContent: 'center'
  },
  text: {
    textAlign: 'center'
  },
  text_deco: {
    marginVertical: '25%',
    textAlign: 'center'
  }
});
export default Deconnection;

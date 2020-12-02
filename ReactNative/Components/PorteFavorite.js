import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

class PorteFavorite extends React.Component {
  render() {
    console.log(AsyncStorage.getItem('doors'))
    return (
      <View style={styles.container}>
        <Text style={styles.Text}>Accueil</Text>
        
      </View>
    )}
}

export default PorteFavorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  Text: {
    fontSize: 30,
  }
});

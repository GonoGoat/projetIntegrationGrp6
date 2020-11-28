import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, TouchableHighlight, View, Dimensions, ScrollView} from 'react-native';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';

let idPorte = [];
let user;

async function loadDoors() {
  let info = [];
  let promise = []
  for(let i = 0; i < 6; i=i+2) {
    promise.push(
    axios
      .get('http://localhost:8081/doorIdUser/' + idPorte[0][i] + "/" + user)
      .catch(function(error) {
        if (error.response) {
          alert("40X Not Found page")
        } else if (error.request) {
          alert("Network Error")
        } else {
          alert('Erreur ' + error.message)
        }
      })
      .then(response => {
        info.push(response.data)
      })
      )
  }
  Promise.all(promise).then(() => console.log(info)); 
}

class PorteFavorite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listePorte: []
    }
  }
 loadIdDoor() {
  AsyncStorage.getItem('doors', function(errs, result) {
    if (!errs) {
      if (result !== null) {
        idPorte.push(result)
      }
      else {

      }
    }
  })
  AsyncStorage.getItem('user', function(errs, result) {
    if (!errs) {
      if (result !== null) {
        user = result
        loadDoors()
      }
      else {

      }
    }
  })
}
componentDidMount() {
  this.loadIdDoor()
}
  render() {
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

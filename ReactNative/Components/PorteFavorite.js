import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import { getStatus, getDoorById, getTitle } from '../Functions/functionsPorteDetail'

let idPorte = [];
let user;

class PorteFavorite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listePorte: [],
      switchValue : false,
      reload: true   
    }
  }
  loadDoors() {
    this.loadIdDoor()
    this.setState({
      listePorte : []
    })
    for(let i = 0; i < 6; i=i+2) {
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
          this.setState({
            listePorte : [ ...this.state.listePorte, ...response.data]
          })          
        })
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
      }
      else {

      }
    }
  })
}

componentDidMount() {
  this.loadDoors()
}

openDoor(doorId, status){
  var newStatus;
  var textStatus
  if(status == 0) {
    newStatus = 1
    textStatus = "ouverture";
  } else { 
    newStatus = 0
    textStatus = "fermeture";
  }
  const door = {
    id : doorId,
    status : newStatus
  };

  axios.get(`http://192.168.1.60/` + textStatus)
    .then(res => {
      this.setState({doors: res.data});
    })
    .catch(error => {
      console.log(error)
  })

  axios.put('http://localhost:8081/doorStatus',{door})
  .then(res => {
      this.sendHistory(doorId, status)
  })
  .catch(err => {
      console.log(err)
  });
}

sendHistory(doorId, status) {
  var newStatus;
  if(status == 0) {
    newStatus = 1
  } else { 
    newStatus = 0
  }

  const history = {
    door: doorId,
    users : 1,
    date: new Date,
    action: newStatus
  }

  axios.post('http://localhost:8081/newhistory',{history})
    .then(res => {
      this.setState({reload : false})
      this.componentDidMount();
    })
    .catch(err => {
        console.log(err)
    });
}

renderItem = ({item}) => {
  var statusString = getStatus(item.status);
  return (
    <View style={styles.zonePorte}>
  <Text>Nom : {item.nickname}</Text>
  <Text>Tag : {item.tag}</Text>
  <Text style={{position: "absolute", right: 30, fontSize: 20}}>Status : {statusString}</Text>
  <TouchableHighlight style={styles.openButton}
              onPress={() => this.openDoor(item.id, item.status)}>
              <View>
                <Text style={{fontSize: 20}}>{getTitle(item.status)}</Text>
              </View>
  </TouchableHighlight>
  </View>
  )
}
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.Text}>Accueil</Text>
        <FlatList        
            data={this.state.listePorte}
            keyExtractor={(item) => item.id.toString()}
            numColumns={1}
            renderItem={this.renderItem}
            />
      </View>
    )}
}

export default PorteFavorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25
  },
  Text: {
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  zonePorte : {
    flex : 1,
    padding : 45,
    borderWidth : 3,
    margin : 20
  },
  switch : {
    flex : 3,
    marginLeft : 50
  }
});

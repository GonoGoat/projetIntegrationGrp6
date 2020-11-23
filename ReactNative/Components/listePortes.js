import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View, Dimensions, ScrollView} from 'react-native';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

let user;

export function _loadTag () {
     return axios
      .get('http://82.165.248.136:8081/userTag/' + user)
      .catch(function(error) {
        if (error.response) {
          alert("404 Not Found page")
        } else if (error.request) {
          alert("Network Error")
        } else {
          alert('Erreur ' + error.message)
        }
      })
}

export function _loadDoor (tag) {
  return axios
    .get("http://82.165.248.136:8081/doorTagUser/" + tag + "/" + user)
    .catch(function(error) {
      if (error.response) {
        alert("404 Not Found page")
      } else if (error.request) {
        alert("Network Error")
      } else {
        alert('Erreur ' + error.message)
      }
    })
};

const WIDTH = Dimensions.get('window').width

class listPortes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listeTag : [],
      listeDoor : [],
      erreur : false
    }
  }
  
  _getTag() {
    _loadTag().then(data => {
      if(data) {
      this.setState({
        listeTag : [ ...this.state.listeTag, ...data.data]
      })}
      else {
        this.setState({erreur : true})
      }
    })
  }
  _getDoor = item => {
    this.setState({
      listeDoor: []
    })
    _loadDoor(item.tag, this.state.user).then(data => {
      this.setState({
        listeDoor : [ ...this.state.listeDoor, ...data.data]
      })
    })
  }
  _goToDetail = item => {
    this.props.navigation.navigate('PorteDetail', {doorIdParam: item.door, nickname: item.nickname, tagName: item.tag})    
  }
componentDidMount() {
  AsyncStorage.getItem('user', function(errs, result) {
    if (!errs) {
      if (result !== null) {
        user = result
      }
      else {
        //alert("Connectez-vous avant de pouvoir accéder à vos portes")        
        //Le cas ne devrait pas arriver si on bloque la navigation avant d'être connecté
      }
    }
  })
  this._getTag()
}
  render() {
    if ((this.state.erreur === false) && (this.state.listeTag.length !== 0)) {
  return (
    <View style={styles.MainContainer}>
        <Text style={styles.Title}>Mes tags :</Text>
        <View style={styles.tagContainer}>
            <FlatList        
            data={this.state.listeTag}
            keyExtractor={(item) => item}
            numColumns={3}
            renderItem={({item}) =>
            <TouchableHighlight
            style={styles.tagList}  
            onPress={() => this._getDoor(item)}
            >
              <Text style={styles.tagText}>{item.tag}</Text>  
            </TouchableHighlight>}
            />
          </View>          
          <Text style={styles.Title}>Mes portes :</Text>
          <ScrollView style={styles.contentDoor}>
            <FlatList
            data={this.state.listeDoor}
            keyExtractor={(item) => item.door.toString()}
            renderItem={({item}) => <TouchableHighlight
            onPress={() => this._goToDetail(item)}>
            <Text style={styles.doorText}>{item.nickname}</Text>
            </TouchableHighlight>}
            />
            </ScrollView>      
    </View>
  )} //Si la personne ne possède pas encore de tag 
  else if ((this.state.erreur === false) && (this.state.listeTag.length == 0)) {
    return (
    <View>
      <View style={styles.MainContainer}>
        <View style={styles.tagContainer}>
            <Text style={styles.Title}>Vous ne possédez pas de tag pour l'instant</Text>
            <TouchableHighlight style={styles.addDoor} onPress={() => this.props.navigation.navigate('Ajouter une porte')}>
              <Text style={styles.tagText}  >Commencez par ajouter une porte</Text>
              </TouchableHighlight>
          </View>          
            </View>      
    </View>
  )
  } //Si une erreur survient lors de la requête
  else {
    return (
    <View>
      <Text style={styles.erreur}>Une erreur est survenu</Text>
      <TouchableHighlight style={styles.addDoor} onPress={() => this.props.navigation.navigate('Connexion')}>
              <Text style={styles.tagText}  >Rendez-vous à la page de connexion</Text>
              </TouchableHighlight>
    </View>
    )
  }
} 
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 25
  },
  Title : {
    fontSize: 15,
    marginLeft : 20 ,
  textDecorationLine: "underline"

  },
  tagContainer : {
    padding: 20
  },

  tagList: {
    flex : 1,
    backgroundColor: 'rgb(33, 150, 243)',
    padding: 10,
    margin : 4,
    textAlign: "center"

  },
  tagText : {
    color: 'rgb(255, 255, 255)',
  },

  contentDoor : {
    flex : 1,
    borderWidth : 3,
    margin : 30
  },
  doorText : {
    borderBottomWidth : 0.5,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    padding : 7
  },
  addDoor : {
    flex : 1,
    backgroundColor: 'rgb(33, 150, 243)',
    padding: 10,
    margin : 4,
    textAlign: "center"
  },
  erreur : {
    fontSize: 30,
    padding: 20,
    textAlign:"center"
  }
});

export default listPortes;

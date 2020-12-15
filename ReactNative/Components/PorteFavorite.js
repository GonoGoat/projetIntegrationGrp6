import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import { getStatus, getTitle } from '../Functions/functionsPorteDetail'

let idPorte = [];
let user;

class PorteFavorite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listePorte: [],
      erreur : false,
      reload: true,
      backgroundColor : "",
      isChangingStatus: false
    }
  }
  loadDoors() {
    this.loadIdDoor()
    this.setState({
      listePorte : []
    })
    if((idPorte === "undefined")) {
      this.setState({erreur: true})
  }
  else if(idPorte[0].length > 0) {
    let numero = idPorte[0].split(',')
        for(let i of numero) {
       axios
        .get('http://localhost:8081/doorIdUser/' + i + "/" + user)
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
          if(response) {
          this.setState({
            listePorte : [ ...this.state.listePorte, ...response.data]
          })
        }   
        else {
          this.setState({erreur: true})
        }       
        })
    }
  }
  }

 loadIdDoor() {
  AsyncStorage.getItem('doors', function(errs, result) {
    if (!errs) {
      if (result.length > 0) {
        idPorte.push(result)
      }
      else {
        idPorte = "undefined"
      }
    }
  })
  AsyncStorage.getItem('user', function(errs, result) {
    if (!errs) {
      if (result !== null) {
        user = result
      }
      else {
        console.log("pas connecté")
      }
    }
  })
}

componentDidMount() {
  this.loadDoors()
}

openDoor(doorId, status){
  if(status == 2 || status == 3) {
    alert('Erreur')
  }
  else {
  var newStatus;
  var textStatus
  if(status == 0) {
    newStatus = 2
    textStatus = "ouverture";
  } else { 
    newStatus = 3
    textStatus = "fermeture";
  }
  var door = {
    id : doorId,
    status : newStatus
  }

  axios.put('http://82.165.248.136:8081/doorStatus',{door})
  .then(res => {
      this.componentDidMount()
      axios.get(`http://192.168.1.19/` + textStatus + '/' + res.data[0].password)
      .then(res => {
      })
      .catch(error => {
      console.log(error)
  })
  })
  .catch(err => {
    console.log(err)
  });
  this.timeoutHandle = setTimeout(()=>{
    this.setState({isChangingStatus: false})
    if(status == 0) {
      newStatus = 1
    } else { 
      newStatus = 0
    }
    door = {
      id : doorId,
      status : newStatus
    };
    axios.put('http://82.165.248.136:8081/doorStatus',{door})
    .then(res => {
      this.sendHistory(doorId, newStatus)
    })
    .catch(err => {
      alert(err)
    });
  }, 5000);
}
}

async sendHistory (doorId, newStatus) {
  const history = {
    door: doorId,
    users : user,
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

 getColorButton(boolStatus) {
  if((boolStatus == 1) || (boolStatus == 3)) {
      return "#DC143C";
  }
  else {
      return "limegreen";
  }
}

renderItem = ({item}) => {
  var statusString = getStatus(item.status);
  var colorButton = this.getColorButton(item.status)
  var colorText = this.getColorButton(!item.status)    
    if(item.status == 2 || item.status == 3) {
      this.state.isChangingStatus = true
    }
    else {
      this.state.isChangingStatus = false
    }
  return (
    <View style={styles.zonePorte}>
  <Text style={styles.textPorte}>Nom : {item.nickname}</Text>
  <Text style={styles.textPorte}>Tag : {item.tag}</Text>
  <Text style={{position: "absolute" , right: 10, fontSize: 20}}>Status : <Text style={{color: colorText, fontSize: 20}}>{statusString}</Text></Text>
  <TouchableHighlight style={{backgroundColor : colorButton, marginTop : 10, width : '50%', left: '25%', height:35}} 
              onPress={() => this.openDoor(item.id, item.status)}>
              <View>
                <Text style={{fontSize: 20, textAlign : "center", justifyContent:"center", color:'white'}}>{getTitle(item.status)}</Text>
              </View>
  </TouchableHighlight>
  </View>
  )
}
  render() {

    if (this.state.erreur === false) {
    return (
      <View style={styles.container}>
        <FlatList        
            data={this.state.listePorte}
            keyExtractor={(item) => item.id.toString()}
            numColumns={1}
            renderItem={this.renderItem}
            />
      </View>
    )}
    else if((this.state.erreur === true) && (idPorte == "undefined") && (user > 0)) {
      return (
        <View>
          <View style={styles.MainContainer}>
            <View style={styles.tagContainer}>
                <Text style={styles.Title}>Vous ne possédez pas de porte favorite pour l'instant.</Text>
                <TouchableHighlight style={styles.addDoor} onPress={() => this.props.navigation.navigate('Ajouter une porte')}>
                  <Text style={styles.tagText}  >Commencez par ajouter une porte</Text>
                  </TouchableHighlight>
              </View>          
                </View>      
        </View>
      )
    }
    else {
      return(
<View>
      <Text style={styles.erreur}>Une erreur est survenu</Text>
      <TouchableHighlight style={styles.addDoor} onPress={() => this.props.navigation.navigate('Connexion')}>
              <Text style={styles.tagText}  >Rendez-vous à la page de connexion</Text>
              </TouchableHighlight>
    </View>
    )
    }
  }
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
  Title : {
    fontSize: 15,
    marginLeft : 20,
    textAlign: "center"
  },
  zonePorte : {
    flex : 1,
    padding : 30,
    borderWidth : 3,
    margin : 15
  },
  switch : {
    flex : 3,
    marginLeft : 50
  },
  erreur : {
    fontSize: 30,
    padding: 20,
    textAlign:"center"
  },
  addDoor : {
    flex : 1,
    backgroundColor: 'rgb(33, 150, 243)',
    padding: 10,
    margin : 4,
    textAlign: "center"
  },
  tagText : {
    color: 'rgb(255, 255, 255)',
  },
  textPorte : {
    fontSize : 15,
    fontWeight : "bold",
    left: 0
  }
});

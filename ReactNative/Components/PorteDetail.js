import React from 'react';
import {Button, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import axios from 'axios';

export default class PorteDetail extends React.Component {

  constructor(props){
    super(props)
    
    this.state={ 
      doors : [],
      isLoading: true
    }
  }

  getStatus(boolStatus) {
    if(boolStatus == true) {
      return "Ouvert";
    }
    else {
      return "Fermé";
    }
  }

  getDoorById(doorId) {
    for(var j=0; j<this.state.doors.length; j++) {
      if(this.state.doors[j].id == doorId) {
        return Object.values(this.state.doors[j]);
      }
    }
  }

  send(doorId, status) {
    this.setState({isLoading: true})
    var newStatus;
    if(status == 0) {
      newStatus = 1
    } else { 
      newStatus = 0
    }

    const door = {
      id : doorId,
      status : newStatus
    };

    axios.put('http://192.168.0.28:8081/doorStatus',{door})
    .then(res => {
        this.sendHistory(doorId, status)
    })
    .catch(err => {
        console.log(err),
        this.setState({isLoading: false})
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

    axios.post('http://192.168.0.28:8081/newhistory',{history})
      .then(res => {
          this.setState({isLoading: false})
          this.componentDidMount();
      })
      .catch(err => {
          console.log(err),
          this.setState({isLoading: false})
      });
  }
  

  getTitle(status) {
    if(status == 0) {
      return("Ouvrir");
    } else {
      return("Fermer");
    }
  }

  componentDidMount() {
    axios.get(`http://192.168.0.28:8081/doors`)
      .then(res => {
        this.setState({isLoading: false, doors: res.data});
      })
      .catch(error => {
        console.log(error)
    })
  }

  render() {
    if(this.state.isLoading) {
      return <Text>Loading...</Text>
    }
    else {
      const doorIdParam = this.props.route.params.doorIdParam;
      const nickname = this.props.route.params.nickname;
      const tagName = this.props.route.params.tagName;

      var dataDoor =  this.getDoorById(doorIdParam);
      var statusString = this.getStatus(dataDoor[2]);
      return (
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Text style={styles.title}>Détails</Text>
          </View>
          <View style={{flex: 3}}>
            <View style={{top:20}}>
              <Text style={{left: 30, fontSize: 20}}>Statut : </Text>
              <Text style={{position: "absolute", right: 30, fontSize: 20}}>{statusString}</Text>
            </View>
            <View style={{top:60}}>
              <Text style={{left: 30, fontSize: 20}}>Nom : </Text>
              <Text style={{position: "absolute", right: 30, fontSize: 20}}>{nickname}</Text>
            </View>
            <View style={{top:100}}>
              <Text style={{left: 30, fontSize: 20}}>Tag : </Text>
              <Text style={{position: "absolute", right: 30, fontSize: 20}}>{tagName}</Text>
            </View>
          </View>

          <View style={{flex: 6}}>
            <TouchableHighlight style={styles.openButton}
              onPress={() => this.send(doorIdParam, dataDoor[2])}>
              <View>
                <Text style={{fontSize: 20, color: "white"}}>{this.getTitle(dataDoor[2])}</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.histoButton}
              onPress={() => this.props.navigation.navigate("Historique", {doorIdParam: doorIdParam, nickname: nickname})}>
              <View>
                <Text style={{fontSize: 20}}>Historique</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.editButton}
              onPress={() => alert('To do')}>
              <View>
                <Text style={{fontSize: 20, color: "white"}}>Édition</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.backButton}
              onPress={() => this.props.navigation.goBack()}>
              <View>
                <Text style={{fontSize: 20}}>Retour</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: "center",
    top: 20,
    fontSize: 25,
    textDecorationLine: 'underline'
  },
  openButton: {
    flex:1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#719ada",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 25,
    marginBottom: 15
  },
  histoButton: {
    flex:1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#d0d0d0",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 15
  },
  editButton: {
    flex:1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#719ada",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 15
  },
  backButton: {
    flex:1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#d0d0d0",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 25
  }
})

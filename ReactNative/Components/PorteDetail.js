
import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, TextInput, TouchableOpacity,TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Modal from 'modal-react-native-web';
export default class PorteDetail extends React.Component {

  constructor(props){
    super(props)

    this.state={
      doors : [],
      isLoading: true,
      modalVisible: false
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });

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


    axios.put('http://82.165.248.136:8081/doorStatus',{door})
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

    axios.post('http://82.165.248.136:8081/newhistory',{history})
      .then(res => {
          this.setState({isLoading: false})
          this.componentDidMount();
      })
      .catch(err => {
          console.log(err),
          this.setState({isLoading: false})
      });
  }

  deleteAccess(userId, doorId) {
    const params = {
      door: doorId,
      users : userId,
    }
    axios.post('http://82.165.248.136:8081/access/delete',{params})
      .then(res => {
        //this.props.navigation.navigate("Accueil")
        alert('Porte supprimée. To do : confirmation avant de supprimer')
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

  getDoorById(doorId) {
    for(var j=0; j<this.state.doors.length; j++) {
      if(this.state.doors[j].id == 1) {
        return Object.values(this.state.doors[j]);
      }

    }
  }

  componentDidMount() {

    axios.get(`http://82.165.248.136:8081/doors`)
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


      const nav = this.props.navigation.navigate;
      
      var dataDoor =  this.getDoorById(doorIdParam);
      var statusString = this.getStatus(dataDoor[2]);
      return (
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <View style={styles.delete}>
              <Icon.Button  
              name="ios-trash" 
              size={30} 
              onPress={() => /*this.deleteAccess(1,doorIdParam)}*/ alert('En construction...')}
              style={{backgroundColor: "#719ada",}} >
                Delete door
              </Icon.Button>
            </View>
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


      <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible}
      ariaHideApp={false}
          >
          <View style={styles.centeredView,styles.containerO}>
          <View style={styles.modalView}>
            <Text style={styles.text}>Nom : </Text>
            <TextInput placeholder={nickname} style={styles.input}/>
            <Text style={styles.text}>Tag : </Text>
            <TextInput placeholder={tagName} style={styles.input}/>
            <TouchableOpacity
            style={styles.button}
            onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
            }}
          >
            <Text style={styles.textStyleSave}>Sauver </Text>
          </TouchableOpacity>
          <TouchableOpacity
      style={styles.button}
      onPress={() => {
        this.setModalVisible(!this.state.modalVisible);
      }}
    >
    <Text style={styles.textStyleReturn}>Annuler </Text>
          </TouchableOpacity>
          </View>

          </View>
          </Modal>
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  delete: {
    width: 125,
    alignSelf: "flex-end"
  },
  title: {
    alignSelf: "center",
    top: -10,
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


  },
  containerO : {
    flex: 1,
    backgroundColor:"rgba(110,189,254,0.9)",
  },
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
  textStyleSave: {
    color: '#fff',
    textAlign: 'center',
    margin: 50,
    padding: 10,
    backgroundColor: '#719ada',
    justifyContent: 'center',
    alignContent: 'center'
  },
  textStyleReturn: {
    color: '#000000',
    textAlign: 'center',
    margin: 50,
    padding: 10,
    backgroundColor: '#979797',
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})

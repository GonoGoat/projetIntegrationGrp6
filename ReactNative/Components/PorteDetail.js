
import React, { Component } from 'react';
import {StyleSheet, Text, View,TouchableHighlight, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Modal} from "react-native-paper";
import axios from 'axios';
import { getStatus, getDoorById, getTitle } from '../Functions/functionsPorteDetail'
import ModificationInfos from "./ModificationInfos";
import AsyncStorage from '@react-native-community/async-storage';

export default class PorteDetail extends React.Component {

  constructor(props){
    super(props)

    this.state={
      doors : [],
      isLoading: true,
      modalVisible: false,
      errorVisible: false,
      errorMessage: "",
      userLogged: 0,
      isChangingStatus: false
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  send(doorId, status) {
    if(status == 2 || status== 3) {
      alert('Erreur')
    }
    else {
      this.setState({isLoading: true})
      var statusChanging = 2;
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
      };

      axios.put('http://localhost:8081/doorStatus',{door})
      .then(res => {
          axios.get(`http://192.168.1.60/` + textStatus + '/' + res.data[0].password)
          .then(res => {
            this.setState({isLoading: false});
          })
          .catch(error => {
          console.log(error)
      })
      })
      .catch(err => {
          this.setState({isLoading: false})
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
        axios.put('http://localhost:8081/doorStatus',{door})
        .then(res => {
          this.sendHistory(doorId, newStatus)
        })
        .catch(err => {
          this.setState({isLoading: false})
        });
      }, 5000);
    }
  }


  async sendHistory(doorId, newStatus) {
    const history = {
      door: doorId,
      users: this.state.userLogged,
      date: new Date,
      action: newStatus
    }
    await axios.post('http://localhost:8081/newhistory',{history})
      .then(res => {
          this.setState({isLoading: false})
          this.componentDidMount();
      })
      .catch(err => {
          this.setState({errorVisible: true})
          this.setState({isLoading: false})
      });
  }

  deleteAccess(userId, doorId) {
    this.setState({modalVisible: false})
    var params = {
      door: doorId,
      users : userId,
    }
    axios.post('http://localhost:8081/access/delete',{params})
      .then(res => {
        this.props.navigation.navigate("ListePortes")
        this.setState({isLoading: false})
      })
      .catch(err => {
        this.setState({isLoading: false})
        this.setState({errorMessage: "Une erreur du système s'est produite. La suppression n'a pas été prise en compte. Veuillez réessayer. Si l'erreur persiste, revenez plus tard."});
        this.setState({errorVisible: true})
      });
  }

  getDoors() {
    
    axios.get(`http://localhost:8081/doors`)
    .then(res => {
      this.setState({isLoading: false, doors: res.data});
    })
    .catch(error => {
      this.setState({errorMessage: "Une erreur s'est produite. Essayez de redémarrez l'application. Si l'erreur persiste, veuillez réessayer plus tard."});
      this.setState({errorVisible: true});
      this.setState({isLoading: false})
  })
  }

  componentDidMount() {
    let user;
    AsyncStorage.getItem('user', function(errs, result) {
      if (!errs) {
        if (result !== null) {
          user = result
        }
        else {
          //alert(errs)
        }
      }
    })
    this.interval = setInterval(() => (this.getDoors()), 2000);
    this.setState({userLogged: user});
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if(this.state.isLoading) {
      return (

        <View style={styles.container}>
        <ActivityIndicator style={{alignContent: "center", justifyContent: "space-around", padding: 10}}/>
          <Modal visible={this.state.errorVisible} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
            <Text style={{fontSize: 11, textAlign: "center", color:"red"}}>Erreur !</Text>
            <Text style={{fontSize: 8, textAlign: "center", marginBottom: 60}}>{this.state.errorMessage}</Text>
            <TouchableHighlight style={styles.okErrorModal}
              onPress={() => this.props.navigation.goBack()             
              }>
              <View>
                <Text style={{fontSize: 15}}>Ok</Text>
              </View>
            </TouchableHighlight>
          </Modal>


        </View>
      )
    }
    else {
      const doorIdParam = this.props.route.params.doorIdParam;
      const nickname = this.props.route.params.nickname;
      const tagName = this.props.route.params.tagName;
      let modalVisible = this.state.modalVisible;
      
      var dataDoor =  getDoorById(doorIdParam, this.state.doors);
      var statusString = getStatus(dataDoor[1]);
      if(dataDoor[1] == 2 || dataDoor[1] == 3) {
        this.state.isChangingStatus = true
      }
      else {
        this.state.isChangingStatus = false
      }
      return (
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <View style={styles.delete}>
              
              <Icon.Button  
              name="ios-trash" 
              size={30} 
              onPress={() => this.setState({modalVisible: true})}
              style={{backgroundColor: "#719ada",}}>
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
            <TouchableHighlight disabled={this.state.isChangingStatus}
            style={styles.openButton}
              onPress={() => this.send(doorIdParam, dataDoor[1])}
              >
              <View>
                <Text style={{fontSize: 20, color: "white"}}>{getTitle(dataDoor[1])}</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.histoButton}
              onPress={() => 
              this.props.navigation.navigate("Historique", {doorIdParam: doorIdParam, nickname: nickname})}>
              <View>
                <Text style={{fontSize: 20}}>Historique</Text>
              </View>
            </TouchableHighlight>

            <ModificationInfos
              nickname={nickname}
              tagName={tagName}
              doorIdParam={doorIdParam}
              visible={modalVisible}
            />

            <TouchableHighlight style={styles.backButton}
              onPress={() => this.props.navigation.goBack()}>
              <View>
                <Text style={{fontSize: 20}}>Retour</Text>
              </View>
            </TouchableHighlight>
          </View>
          <Modal visible={this.state.modalVisible} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
            <Text style={{fontSize: 18, textAlign: "center", marginBottom: 5}}>Voulez-vous vraiment supprimer cette porte ?</Text>
            <Text style={{fontSize: 11, textAlign: "center", color:"red"}}>Attention !</Text>
            <Text style={{fontSize: 8, textAlign: "center", marginBottom: 60}}>Cette action est irréversible. Pour trouver à nouveau cette porte dans vos portes enregistrées, vous aurez à nouveau besoin de l'identifiant et du mot de passe de cette porte.</Text>
            <TouchableHighlight style={styles.cancelModal}
              onPress={() => this.setState({modalVisible: false})}>
              <View>
                <Text style={{fontSize: 20}}>Non</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.okModal}
              onPress={() => this.deleteAccess(this.state.userLogged, doorIdParam)}>
              <View>
                <Text style={{fontSize: 20}}>Oui</Text>
              </View>
            </TouchableHighlight>
          </Modal>
        </View>
        
      );
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
cancelModal: {
  position: "absolute",
  bottom: 10,
  left: 100,
  backgroundColor: "#d0d0d0",
  paddingHorizontal: 25,
  paddingVertical: 10
},
okModal: {
 position: "absolute",
 bottom: 10,
 right: 100,
 backgroundColor: '#719ada',
 paddingHorizontal: 25,
  paddingVertical: 10
},
okErrorModal: {
  position: "absolute",
  bottom: 20,
  alignSelf: "center",
  backgroundColor: '#719ada',
  paddingHorizontal: 20,
   paddingVertical: 7
 }
})
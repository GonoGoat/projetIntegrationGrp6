import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
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

  changeStatus(doorId, actualStatus) {
    this.setState({isLoading: true})
    var newStatus;
    if(actualStatus == 0) {
      newStatus = 1;
    } else {
      newStatus = 0;
    }

    const param = {id: doorId, status: newStatus};

    axios.put(`http://82.165.248.136:8081/doorStatus`, {param})
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err));

    this.setState({isLoading: false})
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
          var dataDoor =  this.getDoorById(doorId);
          var statusString = this.getStatus(dataDoor[2]);
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

      console.log(this.props.route);
      const { doorIdParam } = 1;
      const nav = this.props.navigation.navigate;
      var dataDoor =  this.getDoorById(doorIdParam);
      console.log("dorr"+dataDoor);
      var statusString = this.getStatus(dataDoor[2]);
      return (
          <View style={styles.container}>
          <Button
      title="Essai"
      //onPress={() => this.changeStatus(doorIdParam, this.state.doors[doorIdParam].status)}
      onPress={() => alert('To do')}
      />
      <Text>Détails de la porte {doorIdParam} :</Text>
      <Text>Mot de passe : {dataDoor[1]}</Text>
      <Text>Status : {statusString}</Text>
      <Button
      title="Change state"
      onPress={() => this.changeStatus(doorIdParam, dataDoor[2])}
      />
      <Button
      title="Historique"
      onPress={() => nav("Historique")}
      />
      <Button
      title="Paramètres"
      onPress={() => {
        this.setModalVisible(true);
      }}
      />

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
          </View>
    );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerO : {
    flex: 1,
    backgroundColor:"rgba(110,189,254,0.9)",
    blurRadius :1
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

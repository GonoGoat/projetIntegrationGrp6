

import {StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native';
import React from 'react';
import axios from 'axios';
import {getDateFormat, getNomPrenom, getStyleByIntex, getActionStyle, getActionString} from '../Functions/functionsHistorique'
import {Modal} from "react-native-paper";

export default class Historique extends React.Component {
  constructor(props){
    super(props)
    this.state={
      isLoading: true,
      histo: [],
      users: [],
      errorVisible: false,
    }
  }

  getData(doorId) {
    axios.get(`http://localhost:8081/doorHistory/door/`+ doorId)
    .then(res => {
      this.setState({histo: res.data})
    })
    .catch(error => {
      this.setState({errorVisible: true})
    })
  }

  getUsers() {
    axios.get(`http://82.165.248.136:8081/users/name`)
    .then(res => {
      this.setState({isLoading:false, users: res.data})
    })
    .catch(error => {
      this.setState({errorVisible: true})
  })
  }

  getStyleInfosGauche(index) {
    let infoImpair = {
      color: "black",
      fontSize: 15
    }
    let infoPair = {
      color: "white",
      fontSize: 15
    }
    if(index%2 == 0) {
      return infoPair
    } else {
      return infoImpair
    }
  }

  render() {
    const doorIdParam = this.props.route.params.doorIdParam;
    const nickname = this.props.route.params.nickname;
    this.getData(doorIdParam);
    if(this.state.isLoading) {
      this.getUsers();
      return (
        <View style={styles.container}>
          <ActivityIndicator style={{alignContent: "center", justifyContent: "space-around", padding: 10}}/>
          <Modal visible={this.state.errorVisible} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
            <Text style={{fontSize: 11, textAlign: "center", color:"red"}}>Erreur !</Text>
            <Text style={{fontSize: 8, textAlign: "center", marginBottom: 60}}>Une erreur s'est produite. Essayez de redémarrez l'application. Si l'erreur persiste, veuillez réessayer plus tard.</Text>
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
      if(this.state.histo == "") {
        return (
          <View style={styles.container}>
            <View style={{flex: 1}}>
              <Text style={styles.title}>{nickname}</Text>
            </View>
            <SafeAreaView style={{flex: 8}}>
                <Text style={{alignSelf: "center", top: 50}}>Aucun historique n'a été enregistré pour cette porte.</Text>
            </SafeAreaView>
            <View style={{flex: 1}}>
              <TouchableOpacity style={styles.backButton}
                onPress={() =>
                  this.props.navigation.goBack()}>
                <Text>Retour</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
      else {
        return (
          <View style={styles.container}>
            <View style={{flex: 1}}>
              <Text style={styles.title}>{nickname}</Text>
            </View>
            <SafeAreaView style={{flex: 8}}>
              <FlatList
              data={this.state.histo}
              keyExtractor={(item) => item.id.toString()}
              maxToRenderPerBatch={10}
              updateCellsBatchingPeriod={50}
              initialNumToRender={10}
              renderItem={({item, index}) =>
                <View style={styles.itemHisto, getStyleByIntex(index)}>
                  <Text style={this.getStyleInfosGauche(index)}>{getNomPrenom(item.users, this.state.users)}</Text>
                  <Text style={this.getStyleInfosGauche(index)}>{getDateFormat(item.date)}</Text>
                  <Text style={getActionStyle(index)}>{getActionString(item.action)}</Text>
                </View>
              }
              />
            </SafeAreaView>
              <View style={{flex: 1}}>
                <TouchableOpacity style={styles.backButton}
                  testID='backingHisto'
                  onPress={() =>
                    this.props.navigation.goBack()}>
                  <Text>Retour</Text>
                </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: "center",
    fontSize: 25,
    textDecorationLine: 'underline',
    top: 20,

  },

  backButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#d0d0d0",
    borderTopWidth: 15,
    borderTopColor: "#f2f2f2"
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
okErrorModal: {
  position: "absolute",
  bottom: 20,
  alignSelf: "center",
  backgroundColor: '#719ada',
  paddingHorizontal: 20,
   paddingVertical: 7
 }
})

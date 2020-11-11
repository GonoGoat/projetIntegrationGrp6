

import {StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import axios from 'axios';

export default class Historique extends React.Component {
  constructor(props){
    super(props)
    this.state={ 
      isLoading: true,
      histo: [],
      users: []

    }
  }

  getData(doorId) {
    axios.get(`http://82.165.248.136:8081/doorHistory/`+ doorId)
    .then(res => {
      this.setState({isLoading:false, histo: res.data})
    })
    .catch(error => {
      console.log(error)
  })
  }

  getUsers() {
    axios.get(`http://82.165.248.136:8081/user/*`)
    .then(res => {
      this.setState({users: res.data})
    })
    .catch(error => {
      console.log(error)
  })
  }
  
  getDateFormat(date) {
    var dateFormatee = "";
    dateFormatee += date[8];
    dateFormatee += date[9];
    dateFormatee += "/";
    dateFormatee += date[5];
    dateFormatee += date[6];
    dateFormatee += "/";
    dateFormatee += date[0];
    dateFormatee += date[1];
    dateFormatee += date[2];
    dateFormatee += date[3];
    dateFormatee += " ";
    dateFormatee += date[11];
    dateFormatee += date[12];
    dateFormatee += ":";
    dateFormatee += date[14];
    dateFormatee += date[15];
    return dateFormatee;
  }

  getNomPrenom(id) {
    for(var i=0; i<this.state.users.length; i++) {
      if(this.state.users[i].id == id) {
        var nomPrenom = this.state.users[i].lastname + " " + this.state.users[i].firstname
        return nomPrenom;
      }
    }
  }

  getStyleByIntex(index) {
    if(index%2 == 0) {
      return styles.itemHistoPair
    } else {
      return styles.itemHistoImpair
    }
  }

  getActionStyle(index) {
    if(index%2 == 0) {
      return styles.actionPair
    } else {
      return styles.actionImpair
    }
  }

  getActionString(action) {
    if(action == 1) {
      return "Ouverture"
    } else {
      return "Fermeture"
    }
  }

  render() {
    const doorIdParam = this.props.route.params.doorIdParam;
    const nickname = this.props.route.params.nickname;

    if(this.state.isLoading) {
      this.getData(doorIdParam);
      this.getUsers();
      return <Text>Loading...</Text>
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
                onPress={() => this.props.navigation.goBack()}>
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
              keyExtractor={(item) => item.id}
              renderItem={({item, index}) => 
                <View style={styles.itemHisto, this.getStyleByIntex(index)}>
                  <Text style={{fontSize: 15}}>{this.getNomPrenom(item.users)}</Text>
                  <Text style={{fontSize: 15}}>{this.getDateFormat(item.date)}</Text>
                  <Text style={this.getActionStyle(index)}>{this.getActionString(item.action)}</Text>
                </View>
              }
              />
            </SafeAreaView>
              <View style={{flex: 1}}>
                <TouchableOpacity style={styles.backButton}
                  onPress={() => this.props.navigation.goBack()}>
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
  itemHistoPair: {
    backgroundColor: '#719ada',
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 15,
    paddingVertical: 10
  },
  itemHistoImpair: {
    backgroundColor: '#d0d0d0',
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 15,
    paddingVertical: 10
  },
  actionPair: {
    position: "absolute",
    color: "white",
    top: 15,
    right: 10,
    fontSize: 20
  },
  actionImpair: {
    position: "absolute",
    color: "black",
    top: 15,
    right: 10,
    fontSize: 20
  },
  backButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#d0d0d0",
    borderTopWidth: 15,
    borderTopColor: "#f2f2f2"
  }
})

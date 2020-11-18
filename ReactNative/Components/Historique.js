

import {StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import axios from 'axios';
import {getDateFormat, getNomPrenom, getStyleByIntex, getActionStyle, getActionString} from '../Functions/functionsHistorique'

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
    axios.get(`http://localhost:8081/doorHistory/`+ doorId)
    .then(res => {
      this.setState({histo: res.data})
    })
    .catch(error => {
      console.log(error)
  })
  }

  getUsers() {
    axios.get(`http://localhost:8081/user/*`)
    .then(res => {
      this.setState({isLoading:false, users: res.data})
    })
    .catch(error => {
      console.log(error)
  })
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
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item, index}) => 
                <View style={styles.itemHisto, getStyleByIntex(index)}>
                  <Text style={{fontSize: 15}}>{getNomPrenom(item.users, this.state.users)}</Text>
                  <Text style={{fontSize: 15}}>{getDateFormat(item.date)}</Text>
                  <Text style={getActionStyle(index)}>{getActionString(item.action)}</Text>
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

  backButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#d0d0d0",
    borderTopWidth: 15,
    borderTopColor: "#f2f2f2"
  }
})

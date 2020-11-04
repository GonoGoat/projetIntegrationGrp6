import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';

function _loadTag () {
    return axios
      .get('http://192.168.0.28:8081/listTag')
      .catch(function(error) {
        // handle error
        alert(error.message);
      })
  };
function _loadDoor (tag) {
  return axios
    .get("http://192.168.0.28:8081/doorTag/" + tag)
    .catch(function(error) {
      alert(error.message);
    })
};

class listPortes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listeTag : [],
      listeDoor : []
    }
  }
  _getTag() {
    _loadTag().then(data => {
      console.log(data);
      this.setState({
        listeTag : [ ...this.state.listeTag, ...data.data]
      })
    })
  }
  _getDoor = item => {
    this.setState({
      listeDoor: []
    })
    _loadDoor(item.tag).then(data => {
      this.setState({
        listeDoor : [ ...this.state.listeDoor, ...data.data]
      })
    })
  }
  _goToDetail = item => {
    //console.log(item)
    this.props.navigation.navigate('PorteDetail', {doorIdParam: item.door, nickname: item.nickname, tagName: item.tag})
    
  }
componentDidMount() {
    this._getTag()
  }
  render() {
  return (
    <View style={styles.MainContainer}>
      <Text style={{ fontSize: 30, textAlign: 'center' }}>
        Liste des portes
      </Text>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>Cliquer sur un des tag ci-dessous pour afficher ses portes attribuées</Text>
        <View>
          <SafeAreaView>
            <FlatList
            data={this.state.listeTag}
            keyExtractor={(item) => item.tag}
            renderItem={({item}) => <TouchableHighlight
            onPress={() => this._getDoor(item)}>
              <View style={{backgroundColor: 'white'}}>
              <Text>{item.tag}</Text>
              </View>
            </TouchableHighlight>}
            />
          </SafeAreaView>
          <SafeAreaView>
            <FlatList
            data={this.state.listeDoor}
            keyExtractor={(item) => item.door.toString()}
            renderItem={({item}) => <TouchableHighlight
            onPress={() => this._goToDetail(item)}>
            <Text>{item.nickname}</Text>
            </TouchableHighlight>}
            />
          </SafeAreaView>
        </View>
    </View>
  )}
};

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    padding: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#AAAAAA',
    padding: 10,
    width: '100%',
    marginTop: 16,
  },
});

export default listPortes;

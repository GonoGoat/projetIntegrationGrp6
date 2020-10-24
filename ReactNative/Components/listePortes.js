import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Button, TouchableHighlight} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';

function _loadTag () {
    return axios
      .get('http://localhost:8888/listTag')
      .catch(function(error) {
        // handle error
        alert(error.message);
      })      
  };
function _loadDoor (tag) {
  return axios
    .get("http://localhost:8888/doorTag/" + tag)
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
    console.log(item)
    //navigation vers le détail de la porte (voir avec Matthieu)
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
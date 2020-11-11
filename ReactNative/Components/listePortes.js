import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View, Dimensions} from 'react-native';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';

function _loadTag () {
    return axios
      .get('http://192.168.0.29:8081/listTag')
      .catch(function(error) {
        // handle error
        alert(error.message);
      })
  };
function _loadDoor (tag) {
  return axios
    .get("http://192.168.0.29:8081/doorTag/" + tag)
    .catch(function(error) {
      alert(error.message);
    })
};
const WIDTH = Dimensions.get('window').width
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
    console.log(item.door)
    this.props.navigation.navigate('PorteDetail', {doorIdParam: item.door, nickname: item.nickname, tagName: item.tag})
    
  }
componentDidMount() {
    this._getTag()
  }
  render() {
  return (
    <View style={styles.MainContainer}>
        <Text style={styles.Title}>Mes tags :</Text>
        <View style={styles.tagContainer}>
            <FlatList        
            data={this.state.listeTag}
            keyExtractor={(item) => item.tag}
            numColumns={3}
            renderItem={({item}) =>
            <TouchableHighlight
            style={styles.tagList}  
            onPress={() => this._getDoor(item)}
            >
              <Text style={styles.tagText}>{item.tag}</Text>  
            </TouchableHighlight>}
            />
          </View>          
          <Text style={styles.Title}>Mes portes :</Text>
          <View style={styles.contentDoor}>
            <FlatList
            data={this.state.listeDoor}
            keyExtractor={(item) => item.door.toString()}
            renderItem={({item}) => <TouchableHighlight
            onPress={() => this._goToDetail(item)}>
            <Text style={styles.doorText}>{item.nickname}</Text>
            </TouchableHighlight>}
            />
            </View>      
    </View>
  )}
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 25
  },
  Title : {
    fontSize: 15,
    marginLeft : 20 ,
  textDecorationLine: "underline"
  },
  tagContainer : {
    padding: 20
  },
  tagList: {
    flex : 1,
    backgroundColor: 'rgb(33, 150, 243)',
    padding: 10,
    margin : 4,
    textAlign: "center"
  },
  tagText : {
    color: 'rgb(255, 255, 255)',
  },
  contentDoor : {
    flex : 1,
    borderWidth : 3,
    margin : 30
  },
  doorText : {
    borderBottomWidth : 0.5,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    padding : 7
  }
});

export default listPortes;

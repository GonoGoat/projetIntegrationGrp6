import {StyleSheet, View, Text, SafeAreaView, FlatList, TouchableHighlight} from 'react-native';
import React from 'react';
import axios from 'axios';

export default class Historique extends React.Component {
  constructor(props){
    super(props)
    
    this.state={ 
      isLoading: true,
      histo: []
    }
  }

  getData(doorId) {
    axios.get(`http://192.168.0.28:8081/doorHistory/`+ doorId)
    .then(res => {
      this.setState({isLoading:false, histo: res.data})
    })
    .catch(error => {
      console.log(error)
  })
  }

  getActionString(action) {
    if(action == 1) {
      return "Ouverture"
    } else {
      return "Fermeture"
    }
  }

  componentDidMount() {
    
  }

  render() {
    const { doorIdParam } = this.props.route.params;
    if(this.state.isLoading) {
      this.getData(doorIdParam);
      return <Text>Loading...</Text>
    }
    else {
      return (
        <View style={styles.container}>
          <Text>Historique de la porte {doorIdParam}</Text>
          <View>
          <SafeAreaView>
            <FlatList
            data={this.state.histo}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => 
              <View style={{backgroundColor: 'white'}}>
                <Text>{this.getActionString(item.action)} {item.date}</Text>
              </View>
            }
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
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

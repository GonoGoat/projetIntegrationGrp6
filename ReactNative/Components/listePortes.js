import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

const DATA = [{"id":1,"password":"test","status":0},{"id":2,"password":"test2","status":1},{"id":3,"password":"test","status":0}];

class listePortes extends React.Component {

  constructor(props) {
    super(props);
    this.data ="";
  }
  
  render() {
    const Item = ({ id, status }) => (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('PorteDetail')}>
        <Text style={[(status == 0) ?  styles.porteFermee : styles.porteOuverte]}>Porte n°{id}</Text>
        </TouchableOpacity>
      </View>
    );

    const renderItem = ({ item }) => {
      return (
        <Item id={item.id} status={item.status}
        />
        
      );
    };
    return (
      <SafeAreaView>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

      </SafeAreaView>
      
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
    porteFermee: {
      width: 411,
      height: 80,
      backgroundColor: '#FFC9C9',
      fontSize: 18,
      paddingTop: 25,
      borderWidth: 0.75,
      borderTopWidth: 0,
      textAlign: "center"
    },
    porteOuverte: {
      width: 411,
      height: 80,
      backgroundColor: '#D4FFD1',
      fontSize: 18,
      paddingTop: 25,
      borderWidth: 0.75,
      borderTopWidth: 0,
      textAlign: "center"
    },
    bouton: {
      color: '#D4FFD1'
    }
})
export default listePortes;
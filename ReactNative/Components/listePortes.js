import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, FlatList } from 'react-native';


var DATA = [{"id":1,"password":"test","status":0},{"id":2,"password":"test2","status":true},{"id":3,"password":"test","status":false},{"id":1,"password":"test","status":false},{"id":2,"password":"test2","status":true},{"id":3,"password":"test","status":false},{"id":1,"password":"test","status":false},{"id":2,"password":"test2","status":true},{"id":3,"password":"test","status":false},{"id":1,"password":"test","status":false},{"id":2,"password":"test2","status":true},{"id":3,"password":"test","status":false}];

const Item = ({ id, status }) => (
  <View>
    <Text style={styles.listeDoors}>Porte n°{id}</Text>
    <View style={[(status == 0) ?  styles.circleFerme : styles.circleOuvert]} />
  </View>
  
);

const App = () => {
  const renderItem = ({ item }) => (
    <Item id={item.id} status={item.status}/>
  );

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
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
    listeDoors: {
      width: 411,
      height: 80,
      backgroundColor: /*'#CAFDFF'*/ '#FFFFFF',
      fontSize: 18,
      paddingTop: 25,
      paddingLeft: 20,
      borderWidth: 0.75,
      borderTopWidth: 0
    },
    circleOuvert: {
      backgroundColor: 'green',
      width: 40,
      height: 40,
      borderRadius: 40/2,
      position: 'absolute',
      marginTop: 20,
      right: 10
    },
    circleFerme: {
      backgroundColor: 'red',
      width: 40,
      height: 40,
      borderRadius: 40/2,
      position: 'absolute',
      marginTop: 20,
      right: 10
    }
})
export default App;
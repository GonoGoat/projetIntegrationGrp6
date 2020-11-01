import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import axios from 'axios';

export default class Historique extends React.Component {
  constructor(props){
    super(props)
    
    this.state={ 
    
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Historique des portes</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

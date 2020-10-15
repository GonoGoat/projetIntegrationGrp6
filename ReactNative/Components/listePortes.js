import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const listePortes = ({navigation}) => {
    return (
      <View style={styles.container}>
          Liste des portes
      </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    }
})

export default listePortes;
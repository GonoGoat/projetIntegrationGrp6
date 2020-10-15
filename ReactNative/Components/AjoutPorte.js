import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AjoutPorte = ({navigation}) => {
    return (
      <View style={styles.container}>
          Ajout de porte
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

export default AjoutPorte;
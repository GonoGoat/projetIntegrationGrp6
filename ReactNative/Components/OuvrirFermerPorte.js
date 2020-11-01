import React from "react";
import {StyleSheet, View, Text} from 'react-native';

const OuvrirFermerPorte = ({navigation}) => {
    return (
      <View style={styles.container}>
          <Text>Ouverture x Fermeture</Text>
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

export default OuvrirFermerPorte;

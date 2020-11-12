import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Accueil = (props) => {
    return (
      <View style={styles.container}>
        <Text style={styles.Text}>Accueil</Text>
        <Button
        title="Aller à la page de connexion"
        onPress={() => props.navigation.navigate("Connexion")}
      />
      <Button
        title="Aller à la page des inscriptions"
        onPress={() => props.navigation.navigate("Inscription")}
      />
      </View>
    );
};

export default Accueil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  Text: {
    fontSize: 30,
  }
});

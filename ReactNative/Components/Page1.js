import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Page1 = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text style={styles.Text}>Accueil</Text>
        <Button
        title="Aller à la page de connexion"
        onPress={() => navigation.navigate("Connexion")}
      />
      <Button
        title="Aller à la page des inscriptions"
        onPress={() => navigation.navigate("Inscription")}
      />
      </View>
    );
};

export default Page1;

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
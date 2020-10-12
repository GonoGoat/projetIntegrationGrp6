import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';

const Page1 = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Button
        title="Go to page2"
        onPress={() => navigation.navigate("Page2")}
      />
      <Button
        title="Go to page3"
        onPress={() => navigation.navigate("Page3")}
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
});
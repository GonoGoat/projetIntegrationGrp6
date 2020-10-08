import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Text, Button } from 'react-native'
import Test from './Components/Test'

const Stack = createStackNavigator();
const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Accéder à vos portes"
      onPress={() =>
        navigation.navigate('Portes', { name: 'door' })
      }
    />
  );
};
const Door = () => {
  return <Text>Voici la liste de vos portes</Text>;
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Bienvenu' }}
        />
        <Stack.Screen name="Portes" component={Door} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./Function/Home"
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

export default function App() {
  return (
    <Provider store={Store}>
      <Navigation/>
    </Provider>
  );
}/*
export default class App extends React.Component {
  render() {
    return (
      <Search/>
    )
  }
}*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

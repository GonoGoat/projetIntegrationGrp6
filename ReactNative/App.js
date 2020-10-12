import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Search from "./Components/Search"
import Home from "./Function/Home"

export default function App() {
  return (
    <Home/>
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

import React from 'react'
import {StyleSheet, View, TextInput, Button, FlatList,Text} from "react-native"

import films from '../Helper/filmsData'
import FilmItem from './FilmItem'


function Home() {
  return (
      <View style={style.view}>
        <TextInput style={style.textInput} placeholder='Titre du film'/>
        <Button title='Rechercher' onPress={() => {}}/>
        <FlatList
          data={films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item,index}) => <FilmItem films={films[index]}/>}
        />
      </View>
    )
};

const style = StyleSheet.create({
  textInput : {
    marginLeft: 5,
    marginRight: 5, 
    height: 50, 
    borderColor: '#000000', 
    borderWidth: 1, 
    paddingLeft: 5
  },
  view : {
    flex : 1,
    marginTop : 50
  }
})
export default Home;

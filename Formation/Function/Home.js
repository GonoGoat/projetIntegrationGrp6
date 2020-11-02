import React, {useState,useEffect} from 'react'
import {StyleSheet, View, TextInput, Button, FlatList,Text, ActivityIndicator} from "react-native"
import { connect } from 'react-redux'

import FilmItem from './FilmItem'

import { getFilmsFromApiWithSearchedText } from './TMDBApi'

function Home(props) {

  const [films, setfilms] = useState([]);
  const [isLoading, setLoading] = useState(false);

  var search = "";

  async function _loadFilms() {
    if (search.length > 0) { // Seulement si le texte recherché n'est pas vide
      setLoading(true);
      getFilmsFromApiWithSearchedText(search).then(data =>{
        setfilms(data.data.results);
        setLoading(false)
        ;}
      );
    }
  }

  function _displayDetailForFilm (idFilm) {
    props.navigation.navigate("FilmDetail",  { idFilm: idFilm });
  }

  function _isFilmFavorite(idFilm) {
    const favoriteFilmIndex = props.favoritesFilm.findIndex(item => item.id === idFilm)
    if (favoriteFilmIndex != -1) {
      return true
    }
    else {
      return false;
    }
  }

  return (
      <View style={styles.view}>
        <TextInput style={styles.textInput} placeholder='Titre du film'
        onChangeText={(text) =>search = text}
        onSubmitEditing={() => _loadFilms()}/>
        <Button title='Rechercher' onPress={() => {_loadFilms()}}/>
          <FlatList
            data={films}
            extraData={props.favoritesFilm}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item,index}) => <FilmItem films={films[index]}
              isFilmFavorite={(props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
              displayDetailForFilm={_displayDetailForFilm}/>}
          />
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' animating={isLoading}/>
        </View>
      </View>
    )
};

const styles = StyleSheet.create({
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
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
})
const mapStateToProps = (state) => {
  return { favoritesFilm : state.favoritesFilm }
}

export default connect(mapStateToProps)(Home);

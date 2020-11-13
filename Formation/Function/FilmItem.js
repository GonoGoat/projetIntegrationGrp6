// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text,Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from './TMDBApi'

function FilmItem(props) {

  function _displayFavoriteImage() {
    if (props.isFilmFavorite) {
      // Si la props isFilmFavorite vaut true, on affiche le 🖤
      return (
        <Image
          style={styles.favorite_image}
          source={require('../Images/ic_favorite.png')}
        />
      )
    }
    else {
      return (
        <Image
          style={styles.favorite_image}
          source={require('../Images/ic_favorite_border.png')}
        />
      )
    }
  }

    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => props.displayDetailForFilm(props.films.id)}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(props.films.poster_path)}}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              {_displayFavoriteImage()}
              <Text style={styles.title_text}>{props.films.title}</Text>
              <Text style={styles.vote_text}>{props.films.vote_average}</Text>
            </View>
            <View style={styles.description_container}>
              <Text style={styles.description_text} numberOfLines={6}>{props.films.overview}</Text>
              {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
            </View>
            <View style={styles.date_container}>
              <Text style={styles.date_text}>{props.films.release_date}</Text>
            </View>
          </View>
      </TouchableOpacity>
    )
}
  
  const styles = StyleSheet.create({
    main_container: {
      height: 190,
      flexDirection: 'row'
    },
    image: {
      width: 120,
      height: 180,
      margin: 5,
      backgroundColor: 'gray'
    },
    content_container: {
      flex: 1,
      margin: 5
    },
    header_container: {
      flex: 3,
      flexDirection: 'row'
    },
    title_text: {
      fontWeight: 'bold',
      fontSize: 20,
      flex: 1,
      flexWrap: 'wrap',
      paddingRight: 5,
      alignItems : 'center'
    },
    vote_text: {
      fontWeight: 'bold',
      fontSize: 26,
      color: '#666666'
    },
    description_container: {
      flex: 7
    },
    description_text: {
      fontStyle: 'italic',
      color: '#666666'
    },
    date_container: {
      flex: 1
    },
    date_text: {
      textAlign: 'right',
      fontSize: 14
    },
    favorite_image: {
      width: 30,
      height: 30
    }
  })
  
  export default FilmItem

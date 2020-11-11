import React, {useState} from 'react'
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity} from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from './TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'

function FilmDetail(props) {
  const [isLoading, setLoading] = useState(true);
  const [film, setFilm] = useState();

  React.useEffect(() => {
    getFilmDetailFromApi(props.navigation.getParam("idFilm"))
      .then(data => {
        setFilm(data);
        setLoading(false);
      })
    },[]
  );

  function _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: film };
    props.dispatch(action);
  }

  function  _displayFavoriteImage() {
    var sourceImage = require('../Images/ic_favorite_border.png')
    if (props.favoritesFilm.findIndex(item => item.id === film.id) !== -1) {
      // Film dans nos favoris
      sourceImage = require('../Images/ic_favorite.png')
    }
    return (
      <Image
        style={styles.favorite_image}
        source={sourceImage}
      />
    )
}

  function _displayLoading() {
    if (isLoading) {
      // Si isLoading vaut true, on affiche le chargement à l'écran
      return (
        <View style={styles.loading_container}>
          <Text>Loading ...</Text>
        </View>
      )
    }
  }
    
  function _displayFilm() {
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.backdrop_path)}}
          />
          <Text style={styles.title_text}>{film.title}</Text>
          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => _toggleFavorite()}>
            {_displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
          <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
          <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
            return genre.name;
            }).join(" / ")}
          </Text>
          <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
            return company.name;
            }).join(" / ")}
          </Text>
        </ScrollView>
      )
    }
  }

  return (
    <View style={styles.main_container}>
      {_displayLoading()}
      {_displayFilm()}
    </View>
  )
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_container: {
    alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici
  },
  favorite_image: {
    width: 40,
    height: 40
  }
})

const mapStateToProps = (state) => {
  return {favoritesFilm: state.favoritesFilm}
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmDetail)
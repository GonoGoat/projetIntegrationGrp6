// API/TMDBApi.js
import axios from "axios"
const API_TOKEN = "17bd62cc476b319141fbaaceb846867d";

export function getFilmsFromApiWithSearchedText (text) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text
  return axios
  .get(url)
  .catch(function(error) {
    // handle error
    alert(error.message);
    })
}

export function getImageFromApi (name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}
  import axios from 'axios'
  
  export async function loadDoors() {
       return await axios
        .get('http://localhost:8081/doorIdUser/' + 1 + "/" + 33)
        .catch(function(error) {
          return error.message
        }) 
        .then(response => {
          if (response.data) {
          return response.data[0].nickname
          }  
        else {
          return 'Network Error'
        }})      
  }
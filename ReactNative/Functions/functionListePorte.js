import axios from 'axios';

export async function _loadTag (utili) {
    return await axios
     .get('http://82.165.248.136:8081/userTag/' + utili)
     .catch(function(error) {
       if (error.response) {
        throw error
       } else if (error.request) {
        throw error
       } else {
         console.log(error.message)
          throw error.message
       }
     })
     .then(response => {
         return response.data[0].tag
     })   
};


export async function _loadDoor (tag, utili) {
    return await axios
      .get("http://82.165.248.136:8081/doorTagUser/" + tag + "/" + utili)
      .catch(function(error) {
        if (error.response) {
          alert("40X Not Found page")
        } else if (error.request) {
          alert("Network Error")
        } else {
          alert('Erreur ' + error.message)
        }
      })
      .then(response => {
        return response.data[0].nickname
    }) 
  };
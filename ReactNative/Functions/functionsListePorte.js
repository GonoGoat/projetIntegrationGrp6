import axios from 'axios';

export async function _loadTag (utili) {
    return await axios
     .get('http://82.165.248.136:8081/userTag/' + utili)
     .catch(function(error) {
        return error.message
     })
     .then(response => {
       if(response.data) {
         return response.data[0].tag
     }
    else {
      return 'Network Error'
    }})   
};


export async function _loadDoor (tag, utili) {
    return await axios
      .get("http://82.165.248.136:8081/doorTagUser/" + tag + "/" + utili)
      .catch(function(error) {
          return error.message      
      })
      .then(response => {
        if(response.data) {
          return response.data[0].nickname
      }
     else {
       return 'Network Error'
     }})  
  };
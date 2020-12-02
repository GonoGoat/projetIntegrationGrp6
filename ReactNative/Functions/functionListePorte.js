import axios from 'axios';

export async function _loadTag (utili) {
    return await axios
     .get('http://82.165.248.136:8081/userTag/' + utili)
     .catch(function(error) {
       if (error.response) {
        return error.response
       } else if (error.request) {
        return error.request
       } else {
          return error.message
       }
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
        if (error.response) {
          return "40X Not Found page"
        } else if (error.request) {
          return "Network Error"
        } else {
          return error.message
        }
      })
      .then(response => {
        if(response.data) {
          return response.data[0].nickname
      }
     else {
       return 'Network Error'
     }})  
  };
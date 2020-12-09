export function verify(mail, password ){
    let error = "";
    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(password)) {
      if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(mail)) {
        return {"state" : true, "msg" : error};
      } else {
        error = 'L\'email n\'est pas valide';
      }
    } else {
      error = 'Le mot de passe ne répond pas aux contraintes de l\'inscription';
    }
    return {"state" : false, "msg" : error};
  }
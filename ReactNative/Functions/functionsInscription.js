export function _verifyname(firstname, name){
    let error = "";
    if (/^[A-Za-z]+$/.test(firstname) && /^[A-Za-z]+$/.test(name)) {
        return {"state" : true, "msg" : error};}
    else {
        error = 'Le nom et le prénom ne peuvent contenir que des lettres';
    }
    return {"state" : false, "msg" : error};
}

export function _verifyMail(mail){
    let error = "";
    if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(mail)) {
        return {"state" : true, "msg" : error};
    }
    else {
        error = 'l\'email n\'est pas valide';
    }
    return {"state" : false, "msg" : error};
}

export function _verifyPhone(phone){
    let error = "";
    if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)){
        return {"state" : true, "msg" : error};
    }
    else {
        error = 'le téléphone ne peut contenir que des chiffres';
    }
    return {"state" : false, "msg" : error};
}

export function _verifyPassword(password){
    let error = "";
    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(password)){
        return {"state" : true, "msg" : error};
    }
    else {
        error = 'Le mot de passe nécessite au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial';
    }
    return {"state" : false, "msg" : error};
}

export function _verifyconfirm(confirm, password){
    let error = "";
    if (password === confirm){
        return {"state" : true, "msg" : error};
    }
    else {
        error = "Le mot de passe et celui de confirmation doivent être identique";
    }
    return {"state" : false, "msg" : error};
}

export function _reset(prenom, name, phone, gender, mail, password, confirm) {
    prenom = "";
    name = "" ;
    phone = "";
    gender = "";
    mail = "";
    password = "";
    confirm = "";
}


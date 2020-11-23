

export function _verify(firstname, name, mail, phone, password, confirm ){
    let error = "";
    if (password == confirm) {
        if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(password)) {
            if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(mail)) {
                if (/^[A-Za-z]+$/.test(firstname) && /^[A-Za-z]+$/.test(name)) {
                    if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)) {
                        return {"state" : true, "msg" : error};
                    }
                    else {
                        error = 'le téléphone ne peut contenir que des chiffres';
                    }
                } else {
                    error = 'Le nom et le prénom ne peuvent contenir que des lettres';
                }
            } else {
                error = 'l\'email n\'est pas valide';
            }
        } else {
            error = 'Le mot de passe nécessite au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial';
        }
    } else {
        error = "Le mot de passe et celui de confirmation doivent être identique";
    }
    return {"state" : false, "msg" : error};
}

export function _redirect (test) {
    this.props.navigation.navigate('Connexion');
}

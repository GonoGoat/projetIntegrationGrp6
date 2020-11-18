export function checkAjout(tag, nickname) {
    let valeurs;
    if (!/^[a-zA-Z ]+$/.test(tag)) {
        if (tag.length === 0) {
            valeurs = {
                message : "Veuillez insérer un tag.",
                type : "fail"
            };
        }
        else {
            valeurs = {
                message : "Veuillez n'insérer que des lettres pour le tag.",
                type : "fail"
            };
        }
        return valeurs;
    }
    if (!/^[a-zA-Z ]+$/.test(nickname)) {
        if (nickname.length === 0) {
            valeurs = {
                message : "Veuillez insérer un nom pour la porte.",
                type : "fail"
            };
        }
        else {
            valeurs = {
                message : "Veuillez n'insérer que des lettres pour le nom de la porte .",
                type : "fail"
            };
        }
        return valeurs;
    }
    return true;
}

export function checkVerif(idPorte,password) {
    let valeurs;
    if (!/^[0-9]+$/.test(idPorte)) {
        if (idPorte.length === 0) {
            valeurs = {
                message : "Veuillez insérer un ID de porte.",
                type : "fail"
            }
        }
        else {
            valeurs = {
                message : "Veuillez n'insérer que des chiffres pour l'ID de la porte.",
                type : "fail"
            }
        }
        return valeurs;
    }
    if (!/^[a-zA-Z]{10}$/.test(password)) {
        if (password.length === 0) {
            valeurs = {
                message : "Veuillez insérer le mot de passe de la porte.",
                type : "fail"
            };
        }
        else {
            valeurs = {
                message : "Veuillez insérer un mot de passe valide.",
                type : "fail"
            };
        }
        return valeurs;
    }
    return true;
}

export function checkVerifAPI(req,type) {
    if (type === true) {
        if (req.data === true) {
            return true;
        }
        else if (req.data === false) {
            return ({
                message : "Vous avez déjà cette porte. Veuillez entrer les données d'un porte que vous ne posséder pas encore.",
                type : "fail"
            })
        }
        else {
            return ({
                message : "Votre requête a abouti mais n'a pas donné de réponse correcte. Veuillez réessayer.",
                type : "fail"
            })
        }
    }
    else {
        if (req.response) {
            switch(req.response.status) {
                case 403 :
                    return({
                        message : "Mot de passe incorrect. Veuillez insérer le mot de passe valide.",
                        type : "fail"
                    })
                case 404 :
                    return({
                        message : "ID de la porte incorrect. Veuillez rentrer un ID valide.",
                        type : "fail"
                    })
                default :
                    return({
                        message : "Une erreur s'est produite. Veuillez réessayer.",
                        type : "fail"
                    })
            }
        }
        else if (req.request) {
            return({
                message : "Une erreur est survenue lors de l'envoi de votre requête. Veuillez réessayer.",
                type : "fail"
            })
        }
        else {
            return({
                message : "Une erreur s'est produite. Veuillez réessayer.",
                type : "fail"
            })
        }
    }
}

export function checkAjoutAPI(req,type) {
    if (type === true) {
        if (req.data === true) {
            return ({
                message : `Votre porte a bien été ajoutée !`,
                type : "success"
            });
        }
        else {
            return ({
                message : "Votre requête a abouti mais n'a pas donné de réponse correcte. Veuillez réessayer.",
                type : "fail"
            })
        }
    }
    else {
        if (err.response) {
            switch(Math.floor(err.response/100)) {
                case 4 :
                    props.setMessage({
                    message : "Erreur client. Veuillez réessayer ou modifier votre requête.",
                    type : "fail"
                    });
                case 5 :
                    props.setMessage({
                    message : "Erreur serveur. Veuillez réessayer ultérieurement.",
                    type : "fail"
                    });
                default : 
                    props.setMessage({
                    message : "Une erreur est survenue. Veuillez réessayer.",
                    type : "fail"
                })
            }
        }
        else if (err.request) {
            props.setMessage({
            message : "Une erreur est survenue lors de l'envoi de votre requête. Veuillez réessayer.",
            type : "fail"
            })
        }
        else {
            props.setMessage({
            message : "Une erreur est survenue. Veuillez réessayer.",
            type : "fail"
            })
        }
    }
}
    
export function checkIp (ip) {
    let valeurs;
    if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/.test(ip)) {
        if (!ip) {
            valeurs = {
                message : "Veuillez insérer une adresse IP.",
                type : "fail"
            };
        }
        else {
            valeurs = {
                message : "Veuillez insérer une adresse IP valide.",
                type : "fail"
            };
        }
        return valeurs;
    }
    return true;
}

export function error(err) {
    if (err.response) {
        switch(Math.floor(err.response.status/100)) {
            case 4 :
                return({
                    message : "Erreur client. Veuillez réessayer ou modifier votre requête.",
                    type : "fail"
                });
            case 5 :
                return({
                    message : "Erreur serveur. Veuillez réessayer ultérieurement.",
                    type : "fail"
                });
        }
    }
    else if (err.request) {
        return({
            message : "Une erreur est survenue lors de l'envoi de votre requête. Veuillez réessayer.",
            type : "fail"
        })
    }
    else {
        return({
            message : "Une erreur est survenue. Veuillez réessayer.",
            type : "fail"
        })
    }
};
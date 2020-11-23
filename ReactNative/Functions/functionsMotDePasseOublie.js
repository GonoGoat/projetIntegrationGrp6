export function checkmail(mail) {
    let valeurs;
    if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(mail)) {
        valeurs = {
            message : "Votre mot de passe a été réinitialisé.",
            type : "success"
        };
    }
    else {
        valeurs = {
            message : "Veuillez insérer un e-mail valide.",
            type : "fail"
        };
    }
    return valeurs;
}

export function check() {
    if (nickname.length === 0) {
        setMessage({
            message: "Veuillez insérer un nom pour la porte.",
            type: "fail"
        })
        return false;
    }
    if (tagName.length === 0) {
        setMessage({
            message: "Veuillez insérer un tag pour la porte.",
            type: "fail"
        })
        return false;
    }
}
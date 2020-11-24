function checkValue(value, valueTag){
    let message;
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
        if (value.length === 0) {
            message = {
                message : "Veuillez insérer un "+valueTag+".",
                type : "fail"
            };
        }
        else {
            message = {
                message : "Veuillez n'insérer que des lettres ou des chiffres pour le "+valueTag+".",
                type : "fail"
            };
        }
        return message;
    }
    return true ;
}

export function check(nickname, tagName) {
    let nicknameChecked = checkValue(nickname, "nom");
    let tagNameChecked = checkValue(tagName, "tag");
    if(nicknameChecked !== true){
        return nicknameChecked;
    }
    if(tagNameChecked !== true){
        return tagNameChecked;
    }
    return true;
}
export function getStatus(status) {
    if(status == 0) {
        return "Fermé";
    }
    else if (status == 1){
        return "Ouvert";
    }
    else if (status == 2){
        return "Ouverture";
    }
    else if (status == 3){
        return "Fermeture";
    }
}

export function getDoorById(doorId, table) {
    for(var j=0; j<table.length; j++) {
        if(table[j].id == doorId) {
            return Object.values(table[j]);
        }
    }
}

export function getTitle(status, bool) {
    if(status == 0) {
        return("Ouvrir");
    } 
    else if(status == 1) {
        return("Fermer");
    }
    else if(status == 2) {
        return("Ouverture...");
    }
    else if(status == 3) {
        return("Fermeture...");
    }
}
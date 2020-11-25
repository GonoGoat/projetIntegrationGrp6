export function getStatus(boolStatus) {
    if(boolStatus == true) {
        return "Ouvert";
    }
    else {
        return "Fermé";
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
    if(status == 0 && !bool) {
        return("Ouvrir");
    } 
    else if(status == 1 && !bool) {
        return("Fermer");
    }
    else if(status == 0 && bool) {
        return("Fermeture...");
      } 
    else if(status == 1 && bool) {
        return("Ouverture...");
    }
}
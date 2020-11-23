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

export function getTitle(status) {
    if(status == 0) {
      return("Ouvrir");
    } else {
      return("Fermer");
    }
}
export function getDateFormat(date) {
  var dateFormatee = "";
  dateFormatee += date[8];
  dateFormatee += date[9];
  dateFormatee += "/";
  dateFormatee += date[5];
  dateFormatee += date[6];
  dateFormatee += "/";
  dateFormatee += date[0];
  dateFormatee += date[1];
  dateFormatee += date[2];
  dateFormatee += date[3];
  dateFormatee += " ";
  var heureHiver = (date[11] + date[12]);
  if(heureHiver == "23") {
    dateFormatee += '00'
  }
  else {
    dateFormatee += (parseInt(heureHiver) + 1)
  }

  dateFormatee += ":";
  dateFormatee += date[14];
  dateFormatee += date[15];
  return dateFormatee;
}

export function getNomPrenom(id, table) {
  for(var i=0; i<table.length; i++) {
    if(table[i].id == id) {
      var nomPrenom = table[i].lastname + " " + table[i].firstname;
      return nomPrenom;
    }
  }
}

export function getStyleByIntex(index) {
  let itemHistoPair =  {
    backgroundColor: '#719ada',
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 15,
    paddingVertical: 10
  }
  let itemHistoImpair = {
    backgroundColor: '#d0d0d0',
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 15,
    paddingVertical: 10
  }

  if(index%2 == 0) { 
    return itemHistoPair
  } else {
    return itemHistoImpair
  }
}

export function getActionStyle(index) {
  let actionImpair = {
    position: "absolute",
    color: "black",
    top: 15,
    right: 10,
    fontSize: 20
  }
  let actionPair = {
    position: "absolute",
    color: "white",
    top: 15,
    right: 10,
    fontSize: 20
  }
  if(index%2 == 0) {
    return actionPair
  } else {
    return actionImpair
  }
}

export function getActionString(action) {
  if(action == 1) {
    return "Ouverture"
  } else {
    return "Fermeture"
  }
}
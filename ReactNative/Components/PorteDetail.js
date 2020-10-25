import { BaseRouter } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DATA = [{"id":1,"password":"test","status":0},{"id":2,"password":"test2","status":1},{"id":3,"password":"test","status":0}];

function getDoorById(doorId) {
  return Object.values(DATA[doorId-1]);
}

function getStatus(boolStatus) {
  if(boolStatus == 1) {
    return "Ouvert";
  }
  else {
    return "Fermé";
  }
}

class PorteDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doorId: globalThis.doorId
    }
  }

  render() {
    const { doorIdParam } = this.props.route.params; 
    var dataDoor =  getDoorById(doorIdParam)
    var statusString = getStatus(dataDoor[2])
    return (
      <View style={styles.container}>
        <Text>Détails de la porte {doorIdParam} :</Text>
        <Text>Mot de passe : {dataDoor[1]}</Text>
        <Text>Status : {statusString}</Text>
        <Button
        title="Change state"
        onPress={() => alert('To do')}
      />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
  }
})

export default PorteDetail;
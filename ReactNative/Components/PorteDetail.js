import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';

export default class PorteDetail extends React.Component {

  constructor(props){
    super(props)
    
    this.state={ 
      doors : [],
      isLoading: true
    }
  }

  getStatus(boolStatus) {
    if(boolStatus == true) {
      return "Ouvert";
    }
    else {
      return "Fermé";
    }
  }

  getDoorById(doorId) {
    for(var j=0; j<this.state.doors.length; j++) {
      if(this.state.doors[j].id == doorId) {
        return Object.values(this.state.doors[j]);
      }
    }
  }

  send(doorId, status) {
    this.setState({isLoading: true})
    var newStatus;
    if(status == 0) {
      newStatus = 1
    } else { 
      newStatus = 0
    }

    const door = {
      id : doorId,
      status : newStatus
    };

    axios.put('http://192.168.0.28:8081/doorStatus',{door})
    .then(res => {
        this.setState({isLoading: false})
        this.componentDidMount();
    })
    .catch(err => console.log(err));
    this.setState({isLoading: false})
  }

  getTitle(status) {
    if(status == 0) {
      return("Ouvrir");
    } else {
      return("Fermer");
    }

  }

  componentDidMount() {
    axios.get(`http://192.168.0.28:8081/doors`)
      .then(res => {
        this.setState({isLoading: false, doors: res.data});
      var dataDoor =  this.getDoorById(doorIdParam);
      var statusString = this.getStatus(dataDoor[2]);
      })
      .catch(error => {
        console.log(error)
    })
  }

  render() {
    if(this.state.isLoading) {
      return <Text>Loading...</Text>
    }
    else {
      console.log(this.props.route)
      const { doorIdParam } = this.props.route.params;
      var dataDoor =  this.getDoorById(doorIdParam);
      console.log(dataDoor);
      var statusString = this.getStatus(dataDoor[2]);
      return (
        <View style={styles.container}>
          <Text>Détails de la porte {doorIdParam} :</Text>
          <Text>Mot de passe : {dataDoor[1]}</Text>
          <Text>Status : {statusString}</Text>
          <Button
            title={this.getTitle(dataDoor[2])}
            onPress={() => this.send(doorIdParam, dataDoor[2])}
          />
          <Button
            title="Historique"
            onPress={() => this.props.navigation.navigate("Historique", {doorIdParam: doorIdParam})}
          />
          <Button
            title="Paramètres"
            onPress={() => this.props.navigation.navigate("PorteParametres")}
            />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

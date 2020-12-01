import React from 'react';
import {StyleSheet, View} from 'react-native';
import AjoutPorte_FormVerif from "./AjoutPorte_FormVerif"
import AjoutPorte_FormAjout from "./AjoutPorte_FormAjout"
import {Snackbar,Modal,Button,Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AjoutPorte extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      door : undefined,
      message : {type: "fail"},
      user : false
    };
  }

  componentDidMount() {console.log("oui")};

  setUser() {
    AsyncStorage.setItem("user", "106");
    this.setState({user : 104})
  }

  displayComponent() {
    let user;
    AsyncStorage.getAllKeys().then(res => {
      if (res.indexOf(user) != -1) {
        AsyncStorage.getItem('user').then(res => this.setState({user : parseInt(res)}));
      }
    });
    if (this.state.door === undefined) {
      return (
        <View style={styles.container}>
          <AjoutPorte_FormVerif
            setMessage = {(msg) => this.setState({message : msg})}
            setDoor={(id) => this.setState({door : id})}
          />
        </View>
      );
    }
    else if (this.state.user === false) {
      return (<View style={styles.container}>
        <Text>Vous devez être connecté pour accéder à cette fonctionnalité.</Text>
          <Button
            mode="contained"
            onPress={() => this.props.navigation.navigate('Connexion')}

          >
            Se connecter
          </Button>
          <Button
            mode="contained"
            onPress={() => this.setUser()}
            >
              Add
          </Button>
      </View>)
    }
    else {
      return (
        <View style={styles.container}>
          <AjoutPorte_FormAjout
            setMessage = {(msg) => this.setState({message : msg})}
            doorId={this.state.door}
            setDoor={(id) => this.setState({door : id})}
          />
        </View>
      )
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
          {this.displayComponent()}
          <Snackbar
            visible={this.state.message.message != undefined}
            onDismiss={() => this.setState({type : this.state.message.type})}
            style = {this.state.message.type === "success" ? styles.success : styles.fail}
            duration={2000}            
          >
            {this.state.message.message != undefined ? this.state.message.message : ""}
          </Snackbar>
      </View>
    )
  }
};
const styles = StyleSheet.create({
    container: {
      flex : 1,
      alignItems : "center",
      justifyContent : "center"
    },
    modal : {
      textAlign : "center",
    },
    success : {
      backgroundColor : "green",
    },
    fail : {
      backgroundColor : "red",
    },
    
})

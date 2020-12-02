import React from 'react';
import {StyleSheet, View} from 'react-native';
import AjoutPorte_FormVerif from "./AjoutPorte_FormVerif"
import AjoutPorte_FormAjout from "./AjoutPorte_FormAjout"
import {Snackbar,Button,Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

export default class AjoutPorte extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      door : undefined,
      message : {type: "fail"},
      user : false,
      visible : ''
    };
  }

  checkUser() {
    AsyncStorage.getAllKeys().then(res => {
      if (res.indexOf('user') != -1) {
        AsyncStorage.getItem('user').then(res => this.setState({user : {id : parseInt(res)}}));
      }
      else {
        this.setState({user : false});
      }
    });
  }

  componentDidMount() {
    this.interval = setInterval(() => this.checkUser(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setUser() {
    AsyncStorage.setItem("user", "104");
    this.setState({user : {id : 104}})
  }

  displayComponent() {
    if (this.state.user === false) {
      return (
        <View style={styles.container}>
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
        </View>
      )
    }
    else if (this.state.door === undefined) { 
      return (
        <View style={styles.container}>
          <AjoutPorte_FormVerif
            setMessage = {(msg) => this.setState({message : msg,visible : true})}
            setDoor={(id) => this.setState({door : id})}
          />
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <AjoutPorte_FormAjout
            setMessage = {(msg) => this.setState({message : msg,visible : true})}
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
            visible={this.state.visible === true}
            onDismiss={() => this.setState({visible : false})}
            style = {this.state.message.type === "success" ? styles.success : styles.fail}
            action={{
              label: 'Ok',
              onPress: () => {
                this.setState({visible : false})
              },
            }}       
          > 
            {this.state.message.type === "success" ? 
              <Icon size={30} style={styles.icon} name="md-checkmark"></Icon> :
              <Icon size={30} style={styles.icon} name="md-close-circle-outline"></Icon>}
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
    success : {
      backgroundColor : "green",
    },
    fail : {
      backgroundColor : "red",
    },
    icon : {
      marginRight : 10
    }
})

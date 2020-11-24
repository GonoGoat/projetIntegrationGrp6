import React from 'react';
import {StyleSheet, View,Text,Button, TextInput} from 'react-native';
import AjoutPorte_FormVerif from "./AjoutPorte_FormVerif"
import AjoutPorte_FormAjout from "./AjoutPorte_FormAjout"
import {Snackbar} from 'react-native-paper';

export default class AjoutPorte extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      door : undefined,
      message : {type: "fail"}
    }
  }

  displayComponent() {
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
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    success : {
      backgroundColor : "green",
    },
    fail : {
      backgroundColor : "red",
    }
})

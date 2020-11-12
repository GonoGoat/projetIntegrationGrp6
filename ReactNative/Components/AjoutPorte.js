import React from 'react';
import {StyleSheet, View,Text,Button, TextInput} from 'react-native';
import AjoutPorte_FormVerif from "./AjoutPorte_FormVerif"
import AjoutPorte_FormAjout from "./AjoutPorte_FormAjout"
import {Snackbar} from 'react-native-paper';

function AjoutPorte(props) {
    const [door, setDoor] = React.useState();
    const [message, setMessage] = React.useState({type : "fail"});

    function displayComponent() {
      if (door === undefined) {
        return (
          <View style={styles.container}>
              <AjoutPorte_FormVerif setMessage = {(msg) => setMessage(msg)} doorId={door} setDoor={(id) => setDoor(id)} />
          </View>
        );
      }
      else {
        return (
          <View style={styles.container}>
              <AjoutPorte_FormAjout setMessage = {(msg) => setMessage(msg)} doorId={door} setDoor={(id) => setDoor(id)} />
          </View>
        )
      }
    }
    
    return (
      <View style={styles.container}>
          {displayComponent()}
          <Snackbar
            visible={message.message != undefined}
            onDismiss={() => setMessage({type : message.type})}
            style = {message.type === "success" ? styles.success : styles.fail}
            duration={2000}
          >
            {message.message != undefined ? message.message : ""}
          </Snackbar>
      </View>
    )

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

export default AjoutPorte;

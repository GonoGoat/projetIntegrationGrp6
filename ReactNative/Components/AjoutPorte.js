import React from 'react';
import {StyleSheet, View,Text,Button, TextInput} from 'react-native';
import AjoutPorte_FormVerif from "./AjoutPorte_FormVerif"
import AjoutPorte_FormAjout from "./AjoutPorte_FormAjout"

function AjoutPorte() {
    const [door, setDoor] = React.useState();

    if (door === undefined) {
      return (
        <View style={styles.container}>
            <AjoutPorte_FormVerif doorId={door} setDoor={(id) => setDoor(id)} />
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
            <AjoutPorte_FormAjout doorId={door} setDoor={(id) => setDoor(id)} />
        </View>
      )
    }
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
})

export default AjoutPorte;

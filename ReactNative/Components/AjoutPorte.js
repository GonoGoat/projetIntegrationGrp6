import React from 'react';
import {StyleSheet, View,Text,Button} from 'react-native';
import axios from "axios"

function AjoutPorte() {
    const [doorisExisting, setExistingDoor] = React.useState(false);

    const axios = require('axios')

    function render() {
      if (!doorisExisting) {
        return (
          <View>
            <Button title="Elle existe !" onPress={() => isDoorExisting()}/>
          </View>
        )
      }
      else {
        return (
          <View>
            <Text>Elle existe bien</Text>
          </View>
        )
      }
    }

    async function isDoorExisting() {
      const res = await axios.post("http://localhost:8081/door/check", { password : "test", id : "6"});
      console.log(res);
    }

    return (
      <View style={styles.container}>
          {render()}
      </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
})

export default AjoutPorte;

import React from 'react';
import AsyncStorage from '@react-native-community/async-storage'
class Deconnection extends React.Component {

    clearAllData = async () => {
        try {
          await AsyncStorage.clear()
        } catch(error) {
          throw error;
        }
        console.log('Done.')
    };

    render() {
      this.clearAllData();
      this.props.navigation.navigate('Connexion');
      return true;
    }
}
export default Deconnection;

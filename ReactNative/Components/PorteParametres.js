import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


const PorteParametres = ({navigation}) => {
    return (
        <View style={styles.container}>
        Parametres d'une porte
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

export default PorteParametres;
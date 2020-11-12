import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import Inscription from "./Inscription";
import axios from "axios";

class MotDePasseOublie extends React.Component {
    constructor(props) {
        super(props);
        this.mail = "";
        this.state = {
            error : ""
        }
    }



    render() {
         const nav = this.props.navigation;
        return (
            <View style={styles.component}>
            <Text style={styles.text}>E-mail : </Text>
            <TextInput placeholder='E-mail' style={styles.input} onChangeText={(text)=> this.mail = text}/>
            <TouchableOpacity style={styles.connect} onPress={()=> this.checkUser()}>
                <Text style={styles.textConnection}>Envoyer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.text} onPress={() => nav.goBack()}>
                <Text style={styles.text}> Retour </Text>
            </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    component: {
        justifyContent: 'center',
        alignContent: 'center',
        margin: 75,
        marginTop: 100
    },
    text: {
        padding: 5,
        justifyContent: 'center',
        alignContent: 'center'
    },
    input: {
        padding: 5,
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: '#000',
        borderWidth: 1
    },
    connect: {
        color: 'white',
        textAlign: 'center',
        margin: 50,
        padding: 10,
        backgroundColor: '#719ada',
        justifyContent: 'center',
        alignContent: 'center'
    },
    textConnection: {
        color: 'white'
    },
    inscript: {
        textAlign: 'center',
        margin: 50,
        padding: 10,
        backgroundColor: '#d8d8d8',
        justifyContent: 'center',
        alignContent: 'center'
    },
    error: {
        color : 'red',
        textAlign: 'center',
        paddingTop: 5
    }
});

export default MotDePasseOublie;
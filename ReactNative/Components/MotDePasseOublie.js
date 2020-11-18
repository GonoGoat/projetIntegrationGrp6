import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import Inscription from "./Inscription";
import axios from "axios";

class MotDePasseOublie extends React.Component {
    constructor(props) {
        super(props);
        this.mail = "";
        this.state = {
            mailVerif : false,
            error : ""
        }
    }

    _verifyMail(mail){
        axios.get('http://82.165.248.136:8081/userMail/' + mail)
            .then(res => {
                const verif = res.data;
                if (verif.length !== 0) {
                    this.setState({mailVerif: true});
                }
                if (this.state.mailVerif) {
                    this._changePassword(mail);
                }
                if (!this.state.mailVerif){
                    console.log('Ce mail n\'existe pas');
                }
                this.setState({mailVerif : false});
        })
    }

    _changePassword(mail){
        axios.put('http://82.165.248.136:8081/resetPassword/' + mail)
    }



    render() {
         const nav = this.props.navigation;
        return (
            <View style={styles.component}>
            <Text style={styles.text}>Veuillez rentrer votre addresse mail, nous allons vous envoyer un mail contenant un mot de passe a utiliser temporairement, nous vous conseillons de directement modifer votre nouveau mot de passe une fois connecter dans la section prévue a cet effet dans 'profil'.</Text>
            <Text style={styles.text}>E-mail : </Text>
            <TextInput placeholder='E-mail' style={styles.input} onChangeText={(text)=> this.mail = text.trim().toLowerCase()}/>
            <TouchableOpacity style={styles.connect} onPress={()=> this._verifyMail(this.mail)}>
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
    pave: {
        paddingVertical : 10,
        alignContent : "center",
        textAlign : 'center'

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

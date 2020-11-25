import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import Inscription from "./Inscription";
import axios from "axios";
import {Snackbar} from 'react-native-paper';
import {checkmail} from './../Functions/functionsMotDePasseOublie'

class MotDePasseOublie extends React.Component {
    constructor(props) {
        super(props);
        this.mail = "";
        this.state = {
            mailVerif : false,
            type: "",
            error : ""
        }
    }

    _verifyMail(mail){
        let user = { mail : this.mail };
        this.setState({type : checkmail(mail).type});
        this.setState({error : checkmail(mail).message});
        axios.post('http://localhost:8081/userMail/', {user})
            .then(res => {
                const verif = !res.data;
                if (verif) {
                    this.setState({mailVerif: true});
                }
                if (this.state.mailVerif) {
                    this._changePassword(this.mail);
                    this.mailInput.clear();
                }
                if (!this.state.mailVerif){
                    console.log('Ce mail n\'existe pas');
                }
                this.setState({mailVerif : false});
        })
    }

    _changePassword(mail){
        let user = {
            mail : mail
        };
        axios.put('http://localhost:8081/resetPassword/', {user})
    }



    render() {
         const nav = this.props.navigation;
        return (
            <View style={styles.component}>
            <Text style={styles.text}>Veuillez rentrer votre addresse mail, nous allons vous envoyer un mail contenant un mot de passe a utiliser temporairement, nous vous conseillons de directement modifer votre nouveau mot de passe une fois connecter dans la section prévue a cet effet dans 'profil'.</Text>
            <Text style={styles.text}>E-mail : </Text>
            <TextInput placeholder='E-mail' style={styles.input} ref={input => (this.mailInput = input)} onChangeText={(text)=> this.mail = text.trim().toLowerCase()}/>
            <TouchableOpacity style={styles.reset} onPress={()=> this._verifyMail(this.mail)}>
                <Text style={styles.textConnection}>Envoyer</Text>
            </TouchableOpacity>
            <Snackbar visible={this.state.error != ""} onDismiss={() => this.setState({type : this.state.type})} style = {this.state.type === "success" ? styles.success : styles.fail}duration={2000} >
            {this.state.error}
            </Snackbar>
            <TouchableOpacity style={styles.text} onPress={() => nav.goBack()}>
                <Text style={styles.test}><u>Retour</u></Text>
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
        marginTop: 10,
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
    reset: {
        color: 'white',
        textAlign: 'center',
        marginTop: 80,
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
    },
    test:{
        marginTop: 160
    },
    success : {
        backgroundColor : "green",
    },
    fail : {
        backgroundColor : "red",
    }
});

export default MotDePasseOublie;

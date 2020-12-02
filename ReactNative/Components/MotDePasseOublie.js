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
        axios.post('http://82.165.248.136:8081/userMail/', {user})
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
        axios.put('http://82.165.248.136:8081/resetPassword/', {user})
    }



    render() {
        const nav = this.props.navigation;
        return (
            <View style={styles.component}>
                <Text style={styles.text}>Veuillez rentrer votre addresse mail, nous allons vous envoyer un mail contenant un mot de passe a utiliser temporairement, nous vous conseillons de directement modifer votre nouveau mot de passe une fois connecter dans la section prévue a cet effet dans 'profil'.</Text>
                <Text style={styles.mail}>E-mail : </Text>
                <TextInput placeholder='E-mail' style={styles.input} ref={input => (this.mailInput = input)} onChangeText={(text)=> this.mail = text.trim().toLowerCase()}/>
                <TouchableOpacity style={styles.envoi} onPress={()=> this._verifyMail(this.mail)}>
                    <Text style={styles.textEnvoi}>Envoyer</Text>
                </TouchableOpacity>
                <Snackbar visible={this.state.error != ""} onDismiss={() => this.setState({type : this.state.type})} style = {this.state.type === "success" ? styles.success : styles.fail}duration={2000} >
                    {this.state.error}
                </Snackbar>
                <TouchableOpacity style={styles.text} onPress={() => nav.goBack()}>
                    <Text style={styles.retour}>Retour</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    component: {
        flex : 1,
        justifyContent: 'center',
        alignContent: 'center',
        marginHorizontal : '15%',
        marginVertical : '8%'
    },
    pave: {
        paddingVertical : '4%',
        alignContent : "center",
        textAlign : 'center'
    },
    text: {
        marginTop: '8%',
        marginBottom : '2%',
        justifyContent: 'center',
        alignContent: 'center'
    },
    input: {
        padding: '3%',
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: '#000',
        borderWidth: 1
    },
    textEnvoi: {
        color : '#ffffff',
        textAlign : "center"
    },
    envoi: {
        color: 'white',
        textAlign: 'center',
        marginTop: '12%',
        padding: '6%',
        backgroundColor: '#719ada',
        justifyContent: 'center',
        alignContent: 'center'
    },
    textConnection: {
        color: 'white'
    },
    inscript: {
        textAlign: 'center',
        padding: '3%',
        backgroundColor: '#d8d8d8',
        justifyContent: 'center',
        alignContent: 'center'
    },
    error: {
        color : 'red',
        textAlign: 'center',
        paddingTop: 5
    },
    retour:{
        textDecorationLine: 'underline',
        marginTop : '25%',
        marginLeft: -5,
    },
    mail : {
        marginBottom: '8%',
        marginTop : '12%',
        justifyContent: 'center',
        alignContent: 'center'
    },
    success : {
        backgroundColor : "green",
    },
    fail : {
        backgroundColor : "red",
    }
});

export default MotDePasseOublie;

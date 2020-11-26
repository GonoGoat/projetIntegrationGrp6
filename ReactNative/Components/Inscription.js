import {Picker, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import axios from 'axios';
import { _verifyMail, _verifyconfirm, _verifyname, _verifyPassword, _verifyPhone, _reset} from '../Functions/functionsInscription'
import {Snackbar} from "react-native-paper";

class Inscription extends React.Component {
    constructor(props){
        super(props);
        this.name = "";
        this.firstname = "" ;
        this.phone = "";
        this.gender = "";
        this.mail = "";
        this.password = "";
        this.confirm = "";
    }
    state = {
        mailVerified : false,
        error : "",
    };

    async _getMail(mail){
        let user = {
            mail : this.mail
        };
        await axios.post('http://localhost:8081/userMail/', {user})
             .then(res => {
                const verif = res.data;
                if (verif) {
                    this.setState({
                        mailVerified: true,
                        error : ""
                    });
                }
                else{
                    this.setState({error : "vous possédez déjà un compte avec cette adresse mail"});
                    this.setState({
                        mailVerified: false
                    });
                }
                this._submit();
            });
    }

     _submit(){

        if (_verifyname(this.firstname, this.name).state){
           if (_verifyPhone(this.phone).state){
               if (_verifyMail(this.mail).state){
                   if (_verifyPassword(this.password).state){
                       if (_verifyconfirm(this.confirm, this.password).state){
                           if (this.state.mailVerified){
                               this._send(this.firstname, this.name, this.phone, this.gender, this.mail, this.password);
                               //_reset(this.firstname, this.name, this.phone, this.gender, this.mail, this.password, this.confirm);
                               this.mailInput.clear();
                               this.passwordInput.clear();
                               this.nameInput.clear();
                               this.firstnameInput.clear();
                               this.confirmInput.clear();
                               this.phoneInput.clear();
                               this.props.navigation.navigate('Connexion', {inscriptionSubmitted: true});
                           }
                       }
                       else {
                           this.setState({error : _verifyconfirm(this.confirm, this.password).msg});
                       }
                   }
                   else {
                       this.setState({error : _verifyPassword(this.password).msg});
                   }
               }
               else {
                   this.setState({error : _verifyMail(this.mail).msg});
               }
           }
           else {
               this.setState({error : _verifyPhone(this.phone).msg});
           }
        }
        else {
            this.setState({error : _verifyname(this.firstname, this.name).msg});
        }

    };

    _send(firstname, name, phone, gender, mail, password) {

        const config = {
            'Content-Type': 'application/json'
        };

        const user = {
            firstname : firstname,
            name:  name,
            phone : phone,
            gender : gender,
            mail : mail,
            password : password
        };


        axios.post('http://localhost:8081/newUsers',{user})

            .catch(err => console.log(err));

    }

    render() {
        return (
            <ScrollView style={styles.scrollView}>
            <View style={styles.component}>
            <Text style={styles.text}>Nom : </Text>
        <TextInput style={styles.input}id ={"nom"} onChangeText = {(text) => this.name = text.trim() }  ref={input => (this.nameInput = input)}ref={input => (this.nameInput = input)} placeholder='Nom de famille' />
            <Text style={styles.text}>Prénom : </Text>
        <TextInput style={styles.input} id ={"prenom"} onChangeText ={text => this.firstname = text.trim() } ref={input => (this.firstnameInput = input)}  placeholder='Prénom'/>
            <Text style={styles.text}>Téléphone : </Text>
        <TextInput style={styles.input} id ={"phone"} onChangeText ={text => this.phone = text.trim() } ref={input => (this.phoneInput = input)} placeholder='Téléphone'/>
            <Text style={styles.text}>Sexe : </Text>
        <Picker style={styles.input} onValueChange={value => this.gender = value } ref={input => (this.genderInput = input)}>
    <Picker.Item label='' value=''/>
            <Picker.Item label='F' value='F'/>
            <Picker.Item label='M' value='M'/>
            </Picker>
            <Text style={styles.text}>E-mail : </Text>
        <TextInput style={styles.input} textContentType='emailAddress' id={"mail"} autoCompleteType='email' ref={input => (this.mailInput = input)} onChangeText ={text => this.mail = text.trim().toLowerCase() }  placeholder='E-mail'/>
            <Text style={styles.text}>Mot de passe : </Text>
        <TextInput style={styles.input} secureTextEntry={true} id ={"password"} ref={input => (this.passwordInput = input)} onChangeText ={text => this.password = text.trim() }  placeholder='Ecrivez votre mot de passe'/>
            <Text style={styles.text}>Confirmation : </Text>
        <TextInput style={styles.input} secureTextEntry={true} id ={"confirm"} ref={input => (this.confirmInput = input)} onChangeText ={text => this.confirm = text.trim() } placeholder='Réécrivez le même mot de passe'/>
            <Text style={styles.warning}>{this.state.error}</Text>
            <TouchableOpacity style={styles.button}>
            <Text onPress={()=> this._getMail(this.mail)}  style={styles.textButtonBlue}>Inscription</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Connexion")} style={styles.connect}>
            <Text style={styles.textButton}>Déjà un compte ? </Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
    );
    }
}

const styles = StyleSheet.create({
    component: {
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 60,
        marginRight: 60,
        marginTop: 20,
        marginBottom:20
    },
    text: {
        paddingVertical: 5,
        justifyContent: 'center',
        alignContent: 'center'
    },
    textButton: {
        paddingVertical: 5,
        paddingHorizontal: 22,
        justifyContent: 'center',
        alignContent: 'center'
    },
    textButtonBlue: {
        paddingVertical: 5,
        paddingHorizontal: 22,
        justifyContent: 'center',
        alignContent: 'center',
        color: '#ffffff'
    },
    button: {
        color: '#fff',
        textAlign: 'center',
        marginHorizontal: 50,
        marginVertical: 30,
        padding: 10,
        backgroundColor: '#719ada',
        justifyContent: 'center',
        alignContent: 'center'
    },
    connect: {
        textAlign: 'center',
        marginHorizontal: 50,
        padding: 10,
        backgroundColor: '#d0d0d0',
        justifyContent: 'center',
        alignContent: 'center'
    },
    input: {
        padding: 5,
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: '#000',
        borderWidth: 1,
    },
    warning : {
        paddingTop : 15,
        textAlign : 'center',
        justifyContent: 'center',
        alignContent: 'center',
        color : '#ff6666',
    }
});

export default Inscription

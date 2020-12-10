import {Picker, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import axios from 'axios';
import { _verifyMail, _verifyconfirm, _verifyname, _verifyPassword, _verifyPhone, _reset} from '../Functions/functionsInscription';
import AsyncStorage from '@react-native-community/async-storage';

class Inscription extends React.Component {
    constructor(props){
        super(props);
    }
    state = {
        name : "",
        firstname : "",
        phone : "",
        mail : "",
        password : "",
        confirm : "",
        mailVerified : false,
        error : "",
        gender : ""
    };

    async _getMail(){
        let user = {
            mail : this.state.mail.trim().toLowerCase()
        };
        await axios.post('http://82.165.248.136:8081/userMail/', {user})
             .then(res => {
                const verif = res.data;
                if (verif) {
                    this.setState({
                        mailVerified: true,
                        error : ""
                    });
                    this._submit();
                }
                else{
                    this.setState({error : "vous possédez déjà un compte avec cette adresse mail"});
                    this.setState({
                        mailVerified: false
                    });
                }

            });
    }

     _submit(){
        let name = this.state.name.trim();
        let firstname = this.state.firstname.trim();
        let phone = this.state.phone.trim();
        let password  = this.state.password.trim();
        let confirm = this.state.confirm.trim();
        let mail = this.state.mail.trim().toLowerCase();
        if (_verifyname(firstname, name).state){
           if (_verifyPhone(phone).state){
               if (_verifyMail(mail).state){
                   if (_verifyPassword(password).state){
                       if (_verifyconfirm(confirm, password).state){
                           if (this.state.mailVerified){
                               this._send(firstname, name, phone, this.state.gender, mail, password);
                               this.setState({password : ""});
                               this.setState({confirm : ""});
                               this.setState({mail : ""});
                               this.setState({firstname : ""});
                               this.setState({name : ""});
                               this.setState({phone : ""});
                               this.props.navigation.navigate('Connexion', {inscriptionSubmitted: true});
                           }
                       }
                       else {
                           this.setState({error : _verifyconfirm(confirm, password).msg});
                       }
                   }
                   else {
                       this.setState({error : _verifyPassword(password).msg});
                   }
               }
               else {
                   this.setState({error : _verifyMail(mail).msg});
               }
           }
           else {
               this.setState({error : _verifyPhone(phone).msg});
           }
        }
        else {
            this.setState({error : _verifyname(firstname, name).msg});
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


        axios.post('http://82.165.248.136:8081/newUsers',{user})

            .catch(err => console.log(err));

    }

    componentDidMount() {
        AsyncStorage.getItem('user').then((result) => {
          let user = result;
          console.log(user);
          if(user != null) {
            this.props.navigation.navigate('Afficher la liste de vos portes')
          }
          else {
            this.props.navigation.navigate('Connexion', {inscriptionSubmitted: false})
          }
        })
      }

    render() {
        return (
            <View style={styles.component}>

                    <Text style={styles.text}>Nom : </Text>
                    <TextInput style={styles.input} testID='name' id ={"nom"} onChangeText={(text)=> this.setState({name: text}) }  value={this.state.name}  placeholder='Nom de famille' />
                    <Text style={styles.text}>Prénom : </Text>
                    <TextInput style={styles.input} testID='firstname' id ={"prenom"} onChangeText={(text)=> this.setState({firstname: text}) }  value={this.state.firstname}  placeholder='Prénom'/>
                    <Text style={styles.text}>Téléphone : </Text>
                    <TextInput style={styles.input} testID='phone' id ={"phone"}  onChangeText={(text)=> this.setState({phone: text}) }  value={this.state.phone} placeholder='Téléphone'/>
                    <Text style={styles.text}>Sexe : </Text>
                    <Picker style={styles.input} testID='gender' onValueChange={value => this.setState({gender: value}) } value={this.state.gender}>
                        <Picker.Item label='' value=''/>
                        <Picker.Item label='F' value='F'/>
                        <Picker.Item label='M' value='M'/>
                    </Picker>
                    <Text style={styles.text}>E-mail : </Text>
                    <TextInput style={styles.input} textContentType='emailAddress'  id={"mail"} testID='mail' autoCompleteType='email' onChangeText={(text)=> this.setState({mail: text}) }  value={this.state.mail} placeholder='E-mail'/>
                    <Text style={styles.text}>Mot de passe : </Text>
                    <TextInput style={styles.input} secureTextEntry={true}  id ={"password"} testID='password' onChangeText={(text)=> this.setState({password: text}) }  value={this.state.password}  placeholder='Ecrivez votre mot de passe'/>
                    <Text style={styles.text}>Confirmation : </Text>
                    <TextInput style={styles.input} secureTextEntry={true} id ={"confirm"} testID='confirm' onChangeText={(text)=> this.setState({confirm: text}) }  value={this.state.confirm} placeholder='Réécrivez le même mot de passe'/>
                    <Text style={styles.warning}>{this.state.error}</Text>

                <View style={styles.buttonZone}>
                    <TouchableOpacity style={styles.button}>
                    <Text onPress={()=> this._getMail()} testID="submit"  style={styles.textButtonBlue}>Inscription</Text>
                    </TouchableOpacity>
                    <TouchableOpacity testID='redirect' onPress={() => this.props.navigation.navigate("Connexion")} style={styles.connect}>
                    <Text style={styles.textButton}>Déjà un compte ? </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    component: {
        flex : 1,
        justifyContent: 'center',
        alignContent: 'center',
        marginHorizontal : '12%',
        marginVertical : '2%'
    },
    text: {
        paddingVertical: '1%',
        justifyContent: 'center',
        alignContent: 'center'
    },
    textButton: {
        paddingVertical: '5%',
        paddingHorizontal: '3%',
        textAlign : 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    textButtonBlue: {
        paddingVertical: '5%',
        paddingHorizontal: '3%',
        textAlign : 'center',
        justifyContent: 'center',
        alignContent: 'center',
        color: '#ffffff'
    },
    button: {
        height : '60%',
        width : '48%',
        color: '#fff',
        textAlign: 'center',
        padding: '3%',
        backgroundColor: '#719ada',
    },
    buttonZone: {
        height : '11%',
        marginTop : "12%"
    },
    connect: {
        height : '60%',
        width : '48%',
        position : 'absolute',
        right : "0%",
        textAlign: 'center',
        padding: '3%',
        backgroundColor: '#d0d0d0',
    },
    input: {
        height : '5%',
        padding: '2%',
        marginBottom : '1%',
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: '#000',
        borderWidth: 1,
    },
    warning : {
        textAlign : 'center',
        justifyContent: 'center',
        alignContent: 'center',
        color : '#ff6666',
    }
});

export default Inscription

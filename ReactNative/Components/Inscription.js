import {Picker, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import axios from 'axios';

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
        error : ""
    };

    async _getMail(mail){
         await axios.get('http://82.165.248.136:8081/userMail/' + mail)
             .then(res => {
                const verif = res.data;
                console.log(verif.length);
                if (verif.length === 0) {
                    this.setState({
                        mailVerified: true
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

    _verify(firstname, name, mail, phone, password, confirm ){
        let error = "";
        if (password == confirm) {
            if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(password)) {
                if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(mail)) {
                    if (/^[A-Za-z]+$/.test(firstname) && /^[A-Za-z]+$/.test(name)) {
                        if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)) {
                            return {"state" : true, "msg" : error};
                        }
                        else {
                            error = 'please only use number for phone ';
                        }
                    } else {
                        error = 'please only use letter for firstname and lastname';
                    }
                } else {
                    error = 'email not valid';
                }
            } else {
                error = 'password need at least A / a / 1 / .';
            }
        } else {
            error = "enter twice the same password";
        }
        this.setState({error : error});
        return {"state" : false, "msg" : error};
    }

     _submit(){

        if (this._verify(this.firstname, this.name, this.mail, this.phone, this.password, this.confirm)){
            console.log(this.state.mailVerified);
            if (this.state.mailVerified){
                this._send(this.firstname, this.name, this.phone, this.gender, this.mail, this.password);
                this._redirect();
            }
        }

    };

    _redirect (test) {
        this.props.navigation.navigate('Connexion');
    }

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

            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));

    }

    render() {
        const nav = this.props.navigation.navigate;
        return (
            <ScrollView style={styles.scrollView}>
            <View style={styles.component}>
            <Text style={styles.text}>Nom : </Text>
        <TextInput style={styles.input} onChangeText = {(text) => this.name = text.trim() }  placeholder='Nom de famille' />
            <Text style={styles.text}>Prénom : </Text>
        <TextInput style={styles.input} onChangeText ={text => this.firstname = text.trim() }  placeholder='Prénom'/>
            <Text style={styles.text}>Téléphone : </Text>
        <TextInput style={styles.input}  onChangeText ={text => this.phone = text.trim() } placeholder='Téléphone'/>
            <Text style={styles.text}>Sexe : </Text>
        <Picker style={styles.input} onValueChange={value => this.gender = value }>
    <Picker.Item label='' value=''/>
            <Picker.Item label='F' value='F'/>
            <Picker.Item label='M' value='M'/>
            </Picker>
            <Text style={styles.text}>E-mail : </Text>
        <TextInput style={styles.input} textContentType='emailAddress' id={"mail"} autoCompleteType='email' onChangeText ={text => this.mail = text.trim().toLowerCase() }  placeholder='E-mail'/>
            <Text style={styles.text}>Mot de passe : </Text>
        <TextInput style={styles.input} secureTextEntry={true}  onChangeText ={text => this.password = text.trim() }  placeholder='Ecrivez votre mot de passe'/>
            <Text style={styles.text}>Confirmation : </Text>
        <TextInput style={styles.input} secureTextEntry={true}  onChangeText ={text => this.confirm = text.trim() } placeholder='Réécrivez le même mot de passe'/>
            <Text style={styles.warning}>{this.state.error}</Text>
            <TouchableOpacity style={styles.button}>
            <Text onPress={()=> this._getMail(this.mail)}  style={styles.textButtonBlue}>Inscription</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => nav("Connexion")} style={styles.connect}>
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

import {Picker, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import axios from 'axios';

class Inscription extends React.Component {
    state = {
        name : "" ,
        firstname : "",
        phone : "",
        gender : "",
        mail : "",
        password : "",
        confirm : "",
        mailVerified : true,
        error : ""
    };


     getEmail() {
          axios.get('http://192.168.1.10:8080/userMail/' + this.state.mail)
            .then(res => {
                const verif = res.data;
                if (verif.length != 0) {
                    this.setState({
                        mailVerified: false
                    });
                }
                console.log(this.state.mailVerified);
                if (this.state.mailVerified) {
                    if (this.state.password == this.state.confirm) {
                        if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(this.state.password)) {
                            if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(this.state.mail)) {
                                if (/^[A-Za-z]+$/.test(this.state.firstname) && /^[A-Za-z]+$/.test(this.state.name)) {
                                    if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(this.state.phone)) {
                                        this.setState({error :''});
                                        this.send();
                                        this.redirect();
                                    }
                                    else {
                                        this.setState({error :'please only use number for phone '});
                                    }
                                } else {
                                    this.setState({error : 'please only use letter for firstname and lastname'});
                                }
                            } else {
                                this.setState({error :'email not valid'});
                            }
                        } else {
                            this.setState({error : 'password need at least A / a / 1 / .'});
                        }
                    } else {
                        this.setState({error : "enter twice the same password"});
                    }
                }
                else {
                    this.setState({error : "vous possédez déjà un compte avec cette adresse mail"});
                    this.state.mailVerified = true;
                }
                console.log(this.state.error);
            })
    }


    verify = event => {

        event.preventDefault();

        this.getEmail();


    };

     redirect (test) {
         this.props.navigation.navigate('Connexion');
     }

    send() {

        const config = {
            'Content-Type': 'application/json'
        };

        const user = {
            firstname : this.state.firstname,
            name: this.state.name,
            phone : this.state.phone,
            gender : this.state.gender,
            mail : this.state.mail,
            password : this.state.password
        };

        axios.post('http://192.168.1.10:8080/newUsers',{user})
            .then(res => {
                console.log(res.data);
                console.log('test');
            })
            .catch(err => console.log(err));

    }

  render() {
    const nav = this.props.navigation.navigate;
    return (
        <ScrollView style={styles.scrollView}>
      <View style={styles.component}>
        <Text style={styles.text}>Nom : </Text>
        <TextInput style={styles.input} onChangeText={text => this.setState({ name: text.trim() })}  placeholder='Nom de famille' />
        <Text style={styles.text}>Prénom : </Text>
        <TextInput style={styles.input} onChangeText={text => this.setState({ firstname: text.trim() })}  placeholder='Prénom'/>
        <Text style={styles.text}>Téléphone : </Text>
        <TextInput style={styles.input} onChangeText={text => this.setState({ phone: text.trim() })}  placeholder='Téléphone'/>
        <Text style={styles.text}>Sexe : </Text>
        <Picker style={styles.input} onValueChange={value => this.setState({ gender: value })} >
          <Picker.Item label='' value=''/>
          <Picker.Item label='F' value='F'/>
          <Picker.Item label='M' value='M'/>
        </Picker>
        <Text style={styles.text}>E-mail : </Text>
        <TextInput style={styles.input} textContentType='emailAddress' id={"mail"} autoCompleteType='email'   onChangeText={text => this.setState({ mail: text.trim().toLowerCase() })}  placeholder='E-mail'/>
        <Text style={styles.text}>Mot de passe : </Text>
        <TextInput style={styles.input} secureTextEntry={true} onChangeText={text => this.setState({ password: text.trim() })}  placeholder='Ecrivez votre mot de passe'/>
        <Text style={styles.text}>Confirmation : </Text>
        <TextInput style={styles.input} secureTextEntry={true} onChangeText={text => this.setState({ confirm: text.trim() })} placeholder='Réécrivez le même mot de passe'/>
        <Text style={styles.warning}>{this.state.error}</Text>
        <TouchableOpacity style={styles.button}>
          <Text onPress={this.verify}  style={styles.textButtonBlue}>Inscription</Text>
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
    backgroundColor: '#efefef',
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

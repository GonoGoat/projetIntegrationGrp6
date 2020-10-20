import {Picker, StyleSheet, Text, TextInput, View, TouchableOpacity} from "react-native";
import React from "react";
import Connection from "./Connection";
import axios from 'axios';
import {block} from "react-native-reanimated";

class Inscription extends React.Component {
    state = {
        name : "" ,
        firstname : "",
        gender : "",
        mail : "",
        password : "",
        confirm : ""

    }

    verify = event => {

        event.preventDefault();

        if (this.state.password == this.state.confirm) {
            if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(this.state.password)) {
                if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(this.state.mail)){
                    if(/^[A-Za-z]+$/.test(this.state.firstname) && /^[A-Za-z]+$/.test(this.state.name)){
                        this.send();
                    }
                    else {
                        alert('please only use letter for firstname and lastname');
                    }
                }
                else {
                    alert('email not valid');
                }
            }
            else  {
                alert('password need at least A / a / 1 / .');
            }
        }
        else {
            alert("enter twice the same password");
        }
    };

    send() {

        const user = {
            name: this.state.name,
            firstname : this.state.firstname,
            gender : this.state.gender,
            mail : this.state.mail,
            password : this.state.password
        };

        axios.post('http://192.168.1.114:8081/newUsers',{user})
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(err => console.log(err));

    }

  render() {
    const nav = this.props.navigation.navigate;
    return (
      <View style={styles.component}>
          <Text style={styles.warning}> </Text>
        <Text style={styles.text}>Nom : </Text>
        <TextInput style={styles.input} onChangeText={text => this.setState({ name: text })}  placeholder='Nom de famille' />
        <Text style={styles.text}>Prénom : </Text>
        <TextInput style={styles.input} onChangeText={text => this.setState({ firstname: text })}  placeholder='Prénom'/>
        <Text style={styles.text}>Sexe : </Text>
        <Picker style={styles.input} onValueChange={text => this.setState({ gender: text })} >
          <Picker.Item label='' value=''/>
          <Picker.Item label='F' value='F'/>
          <Picker.Item label='M' value='M'/>
        </Picker>
        <Text style={styles.text}>E-mail : </Text>
        <TextInput style={styles.input} textContentType='emailAddress' id={"mail"} autoCompleteType='email' onChangeText={text => this.setState({ mail: text })}  placeholder='E-mail'/>
        <Text style={styles.text}>Mot de passe : </Text>
        <TextInput style={styles.input} secureTextEntry={true} onChangeText={text => this.setState({ password: text })}  placeholder='Ecrivez votre mot de passe'/>
        <Text style={styles.text}>Confirmation : </Text>
        <TextInput style={styles.input} secureTextEntry={true} onChangeText={text => this.setState({ confirm: text })} placeholder='Réécrivez le même mot de passe'/>
        <TouchableOpacity style={styles.button}>
          <Text onPress={this.verify} style={styles.text}>Inscription</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nav("Connexion")} style={styles.connect}>
          <Text style={styles.text}>Déjà un compte ? </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 75
  },
  text: {
    padding: 5,
    justifyContent: 'center',
    alignContent: 'center'
  },
  button: {
    color: '#fff',
    textAlign: 'center',
    margin: 50,
    padding: 10,
    backgroundColor: '#719ada',
    justifyContent: 'center',
    alignContent: 'center'
  },
  connect: {
    textAlign: 'center',
    margin: 50,
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
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor : '#ff6666',
      display : 'none'
  }
});

export default Inscription

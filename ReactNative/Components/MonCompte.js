import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableHighlight} from "react-native";
import axios from "axios";
import Modal from "modal-react-native-web";
import {Snackbar} from 'react-native-paper';
import { _verifyMail, _verifyconfirm, _verifyname, _verifyPassword, _verifyPhone, _reset} from '../Functions/functionsInscription'


class MonCompte extends React.Component {

    constructor(props){
        super(props)
        this.state={
            isLoading: true,
            user: [],
            visible1: false,
            visible2: false,
            newInfos:[],
            mailVerified : false,
            error : "",
            modifBoolean : false,
            pass : {},
            reussite : ""
        };
    }

    getUser () {
        let user = 1;
        AsyncStorage.getItem('user', function(errs, result) {
            if (!errs) {
                if (result !== null) {
                    user = result
                }
                else {
                    //alert(errs)
                }
            }
        })
        axios.get('http://82.165.248.136:8081/user/' + user)
            .then(res => {
                this.setState({
                    isLoading:false,
                    user: res.data,
                    newInfos:[res.data[0].lastname, res.data[0].firstname, res.data[0].sexe, res.data[0].mail, res.data[0].phone]
                })
            })

            .catch(error => {
                console.log(error)
            })
    }

    async getMail(mail){
        if(mail != this.state.user[0].mail) {
            let user = {
                mail : mail
            };
            await axios.post('http://82.165.248.136:8081/userMail/', {user})
            .then(res => {
                const verif = res.data;
                if (verif) {
                    this.setState({
                        mailVerified: true,
                        error : ""
                    });
                }
                else{
                    this.setState({error : "Vous possédez déjà un compte avec cette adresse mail"});
                    this.setState({
                        mailVerified: false
                    });
                    console.log(this.state.error)
                }
            });
        }
        else {
            this.setState({mailVerified: true})
        }
        this.submit()
    }

    changePassword() {
        let user = {
            old: this.state.pass.old,
            id: this.state.user[0].id
        };
        if (this.state.pass.old !== undefined && this.state.pass.old !== "" && this.state.pass.new !== undefined && this.state.pass.new !== "" && this.state.pass.confirm !== undefined && this.state.pass.confirm !== "") {
            axios.post('http://localhost:8081/verifyPassword/', {user})
                .then(res => {
                    const verif = res.data;
                    if (verif) {
                        if (_verifyPassword(this.state.pass.new).state) {
                            if (_verifyconfirm(this.state.pass.confirm, this.state.pass.new).state) {
                                user = {
                                    new: this.state.pass.new,
                                    id: this.state.user[0].id
                                };
                                axios.put('http://localhost:8081/changePassword/', {user})
                                    .catch(err => console.log(err));
                                this.setState({reussite : "Votre mot de passe a bien été modifié"});
                                this.setState({visible2: false});
                                this.textInput5.clear();
                                this.textInput6.clear();
                                this.textInput7.clear();

                            } else {
                                this.setState({error:_verifyconfirm(this.state.pass.new, this.state.pass.confirm).msg});
                            }
                        } else {
                            this.setState({error:_verifyPassword(this.state.pass.new).msg});
                        }
                    } else {
                        this.setState({error: "l'ancien mot de passe indiqué n'est pas bon"});
                    }
                })
                .catch(err => console.log(err));


        }
        else {
            this.setState({error : "veuillez remplir les champs"})
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('user').then((result) => {
          this.setState({user : result});
          console.log(this.state.user);
          if(this.state.user == null) {
            this.props.navigation.navigate('Connexion', {inscriptionSubmitted: false})
          }
        })
    }

    submit(){
        if (_verifyname(this.state.newInfos[1], this.state.newInfos[0]).state){
           if (_verifyPhone(this.state.newInfos[4]).state){
               if (_verifyMail(this.state.newInfos[3]).state){
                   if (this.state.newInfos[2] == "M" || this.state.newInfos[2] == "F") {
                        if (this.state.mailVerified){
                            let id = this.state.user[0].id;
                            this.send(this.state.newInfos[1], this.state.newInfos[0], this.state.newInfos[4], this.state.newInfos[2], this.state.newInfos[3], id);
                            this.setState({user : [{ lastname : this.state.newInfos[0], firstname : this.state.newInfos[1], sexe : this.state.newInfos[2], mail : this.state.newInfos[3], phone :this.state.newInfos[4]}]})
                            this.setState({reussite : "Votre compte a bien été modifié"});
                            this.setState({visible1: false});
                        }
                    }
                    else {
                       this.setState({error :"Erreur sexe"});
                    }
                }
                else {
                    this.setState({error : _verifyMail(this.state.newInfos[3]).msg});
                }
            }
            else {
                this.setState({error : _verifyPhone(this.state.newInfos[4]).msg});
            }
        }
        else {
            this.setState({error : _verifyname(this.state.newInfos[1], this.state.newInfos[0]).msg});
        }
    };

    send(firstname, name, phone, gender, mail, id) {
        const user = {
            firstname : firstname,
            name:  name,
            phone : phone,
            gender : gender,
            mail : mail,
            id : id
        };


        axios.put('http://localhost:8081/modifUsers',{user})
            .then(() => {
                this.setState({modifBoolean : true})
            })
            .catch(err => console.log(err));


    }

    render(){
        if(this.state.isLoading) {
            this.getUser();
            return <Text>Loading...</Text>
        }
        else {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Nom :</Text>
                    <Text style={styles.textUt}>{this.state.user[0].lastname}</Text>
                    <Text style={styles.text}>Prénom :</Text>
                    <Text style={styles.textUt}>{this.state.user[0].firstname}</Text>
                    <Text style={styles.text}>Sexe :</Text>
                    <Text style={styles.textUt}>{this.state.user[0].sexe}</Text>
                    <Text style={styles.text}>Mail :</Text>
                    <Text style={styles.textUt}>{this.state.user[0].mail}</Text>
                    <Text style={styles.text}>Téléphone :</Text>
                    <Text style={styles.textUt}>{this.state.user[0].phone}</Text>
                    <View style={{flex: 6}}>
                        <TouchableHighlight style={styles.editButton}
                            onPress={() => this.setState({visible1: true})}>
                            <View>
                                <Text style={{fontSize: 15, color :"#ffffff"}}>Modifier</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.visible1}
                    ariaHideApp={false}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={{marginBottom: 8, textDecorationLine: 'underline'}}>Modification infos</Text>
                                <Text style={{fontSize: 15, marginVertical: 8}}>Nom de famille: </Text>
                                <TextInput ref={input => { this.textInput0 = input }} placeholder={this.state.user[0].lastname} style={styles.input} onChangeText={(text)=> this.state.newInfos[0]= text} defaultValue={this.state.user[0].lastname}/>
                                <Text style={{fontSize: 15, marginVertical: 8}}>Prénom : </Text>
                                <TextInput ref={input => { this.textInput1 = input }} placeholder={this.state.user[0].firstname} style={styles.input} onChangeText={(text)=> this.state.newInfos[1]= text} defaultValue={this.state.user[0].firstname}/>
                                <Text style={{fontSize: 15, marginVertical: 8}}>Sexe : </Text>
                                <TextInput ref={input => { this.textInput2 = input }} placeholder={this.state.user[0].sexe} style={styles.input} onChangeText={(text)=> this.state.newInfos[2]= text} defaultValue={this.state.user[0].sexe}/>
                                <Text style={{fontSize: 15, marginVertical: 8}}>Mail : </Text>
                                <TextInput ref={input => { this.textInput3 = input }} placeholder={this.state.user[0].mail} style={styles.input} onChangeText={(text)=> this.state.newInfos[3]= text} defaultValue={this.state.user[0].mail}/>
                                <Text style={{fontSize: 15, marginVertical: 8}}>Téléphone : </Text>
                                <TextInput ref={input => { this.textInput4 = input }} placeholder={this.state.user[0].phone} style={styles.input} onChangeText={(text)=> this.state.newInfos[4]= text} defaultValue={this.state.user[0].phone}/>
                                <Text style={{color : 'red', marginTop : 8, marginHorizontal: 25, textAlign: "center"}}>{this.state.error}</Text>
                                <View style={{flex: 6}}>
                                    <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={() => {
                                        this.getMail(this.state.newInfos[3])
                                    }}
                                    >
                                        <Text style={{fontSize: 15, color: "white"}}>Sauver </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    style={styles.returnButton}
                                    onPress={() => {
                                        this.textInput0.value = this.state.user[0].lastname;
                                        this.textInput1.value = this.state.user[0].firstname;
                                        this.textInput2.value = this.state.user[0].sexe;
                                        this.textInput3.value = this.state.user[0].mail;
                                        this.textInput4.value = this.state.user[0].phone;
                                        this.setState({visible1: false});
                                        this.setState({error : ""})
                                    }}
                                    >
                                        <Text style={{fontSize: 15}}>Annuler </Text>
                                    </TouchableOpacity>


                                </View>

                            </View>
                        </View>
                    </Modal>
                    <View style={{flex: 6}}>
                        <TouchableHighlight style={styles.editPassword}
                                            onPress={() => this.setState({visible2: true})}>
                            <View>
                                <Text style={{fontSize: 15}}>Nouveau mot de passe</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.visible2}
                        ariaHideApp={false}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={{marginBottom: 8, textDecorationLine: 'underline'}}>Modification mot de passe</Text>
                                <Text style={{fontSize: 15, marginVertical: 8}}>Mot de passe actuel: </Text>
                                <TextInput ref={input => { this.textInput5 = input }} secureTextEntry={true} style={styles.input} onChangeText={(text)=> this.state.pass.old= text}/>
                                <Text style={{fontSize: 15, marginVertical: 8}}>Nouveau mot de passe : </Text>
                                <TextInput ref={input => { this.textInput6 = input }} secureTextEntry={true} style={styles.input} onChangeText={(text)=> this.state.pass.new= text}/>
                                <Text style={{fontSize: 15, marginVertical: 8}}>Confirmation nouveau mot de passe : </Text>
                                <TextInput ref={input => { this.textInput7 = input }} secureTextEntry={true} style={styles.input} onChangeText={(text)=> this.state.pass.confirm= text}/>
                                <Text style={{color : 'red', marginTop : 8, marginHorizontal: 25, textAlign: "center"}}>{this.state.error}</Text>
                                <View style={{flex: 6}}>
                                    <TouchableOpacity
                                        style={styles.saveButton}
                                        onPress={() => {
                                            this.changePassword();
                                        }}
                                    >
                                        <Text style={{fontSize: 15, color: "white"}}>Confirmer </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.returnButton}
                                        onPress={() => {
                                            this.setState({visible2: false})
                                            this.setState({error : ""});
                                        }}
                                    >
                                        <Text style={{fontSize: 15}}>Annuler </Text>
                                    </TouchableOpacity>


                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Snackbar visible={this.state.reussite !== ""} onDismiss={() => this.setState({reussite: ""})} style = {this.state.type = styles.success } duration={2000} action={{label: 'Ok', onPress: () => {this.setState({reussite: ""})}}}>
                        {this.state.reussite}
                    </Snackbar>
                </View>
            )
        }
    }
};
const styles = StyleSheet.create({
    container: {
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
        alignContent: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color : '#719ada',
    },

    textUt: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding: 5,
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: '#000000',
        borderWidth: 1,
        fontSize: 15,
    },
    saveButton: {
        flex:1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#719ada",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 25,
        marginBottom: 15,
        padding: 12,
        paddingHorizontal : 45
    },
    editButton: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        flex:1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#719ada",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 40,
        padding: 15,
    },
    editPassword: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        flex:1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#d0d0d0",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 40,
        padding: 15,
    },
    input: {
        marginBottom: 8,
        marginHorizontal :32,
        padding: 5,
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: '#000',
        borderWidth: 1,
        fontFamily: 'Consolas'
    },
    textStyleSave: {
        flex:1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#719ada",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        marginBottom: 15
    },
    returnButton: {
        flex:1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#d0d0d0",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 15,
        padding: 12,
        paddingHorizontal : 45
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        marginHorizontal: 22,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 35,
        paddingVertical: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    success : {
        backgroundColor : "green"
    },
    fail : {
        backgroundColor : "red"
    }
});
export default MonCompte;

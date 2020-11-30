import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, Text,  View, TouchableHighlight} from "react-native";
import axios from "axios";



class MonCompte extends React.Component {

    constructor(props){
        super(props)
        this.state={
            isLoading: true,
            user: []

        }
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
        axios.get('http://192.168.0.29:8081/user/' + user)
            .then(res => {
                this.setState({isLoading:false, user: res.data})
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
        AsyncStorage.getItem('user').then((result) => {
          let user = result;
          console.log(user)
          if(user == null) {
            this.props.navigation.navigate('Connexion', {inscriptionSubmitted: false})
          }
        })
      }

    render(){
        if(this.state.isLoading) {
            this.getUser()
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
                    <View style={{flex: 6}}>
                        <TouchableHighlight style={styles.editButton}
                            onPress={() => alert('toDo')}>
                            <View>
                                <Text style={{fontSize: 20}}>Modifier</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
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
        padding: 5,
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: '#000000',
        borderWidth: 1,
        fontSize: 15,
    },
    editButton: {
        flex:1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#d0d0d0",
        paddingVertical: 10,
        marginTop: 40,
        marginBottom: 15
      },
});
export default MonCompte;
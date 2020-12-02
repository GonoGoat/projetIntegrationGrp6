import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, Text,  View} from "react-native";
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
        axios
            .get('http://82.165.248.136:8081/user/' + user)
            .then(res => {
                this.setState({isLoading:false, user: res.data})
            })
            .catch(error => {
                console.log(error)
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

});
export default MonCompte;
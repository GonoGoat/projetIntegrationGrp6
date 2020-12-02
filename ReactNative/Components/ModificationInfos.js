import React from "react";
import {StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableHighlight} from 'react-native';
import Modal from "modal-react-native-web";
import {Snackbar} from 'react-native-paper';
import axios from "axios";
import {check} from "../Functions/functionsModificationInfos";


function ModificationInfos(props) {

    const data = {tagName : props.tagName, nickname : props.nickname, door : props.doorIdParam, visible : props.visible};

    const [visible, setVisible] = React.useState(data.visible);
    const [nickname,setNickname] = React.useState(data.nickname);
    const [tagName,setTagName] = React.useState(data.tagName);
    const [door,setdoor] = React.useState(data.door);
    const [message, setMessage] = React.useState({
        type : "fail"});


    function updateAccess(nickname, tagName, door) {

        axios.patch('http://82.165.248.136:8081/access/update',{tagName : tagName, nickname : nickname, door : door})
            .then(res => {
                console.log(res);
                setMessage({
                    message : "Informations sauvegardées !",
                    type : "success"
                })
                setTimeout(() => {
                    setVisible(!visible)
                }, 2000)
                return true;
            })
            .catch(err => {
                console.log(err)
                setMessage({
                    message : "Erreur lors de la modification de vos données",
                    type : "fail"
                });

                return false;
            });
    }

    function back(){
        setTagName(data.tagName);
        setNickname(data.nickname);
        setVisible(!visible);
    }

    function fail(messageErreur){
        setMessage(messageErreur);
        setVisible(visible);
    }

    function save(){
        let messageErreur = check(nickname,tagName);
        console.log(messageErreur);
        messageErreur === true ?  updateAccess(nickname, tagName, door) : fail(messageErreur);
    }

    return (
        <View >

        <TouchableHighlight style={styles.editButton}
            onPress={() => {
            setVisible(true);
         }}>
            <View>
            <Text style={{fontSize: 20, color: "white"}}>Édition</Text>
            </View>
        </TouchableHighlight>

        <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        ariaHideApp={false}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>Modification infos</Text>
                    <Text style={{fontSize: 15}}>Nom : </Text>
                    <TextInput placeholder={nickname} style={styles.input} onChangeText={(text)=> setNickname(text)}/>
                    <Text style={{fontSize: 15}}>Tag : </Text>
                    <TextInput placeholder={tagName} style={styles.input} onChangeText={(text)=> setTagName(text)}/>

                    <View style={{flex: 6}}>
                        <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => {
                            save();
                        }}
                        >
                            <Text style={{fontSize: 20, color: "white"}}>Sauver </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={styles.returnButton}
                        onPress={() => {
                            back();
                        }}
                        >
                            <Text style={{fontSize: 20}}>Annuler </Text>
                        </TouchableOpacity>


                    </View>
                    <Snackbar
                        visible={message.message != undefined}
                        onDismiss={() => setMessage({type : message.type})}
                        style = {message.type === "success" ? styles.success : styles.fail}
                        duration={2000}
                    >
                        {message.message != undefined ? message.message : ""}
                    </Snackbar>
                </View>
            </View>
        </Modal>
    </View>


)
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        alignSelf: "center",
        top: -10,
        fontSize: 25,
        textDecorationLine: 'underline',
        marginBottom: 15
    },
    saveButton: {
        flex:1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#719ada",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 25,
        marginBottom: 15,
        padding: 5,
    },
    editButton: {
        flex:1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#719ada",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        marginBottom: 15,
        padding: 22,
    },
    input: {
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
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        marginBottom: 15,
        padding: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
})
export default ModificationInfos;
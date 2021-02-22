import React, {useState} from 'react'
import { StyleSheet, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import * as firebase from "firebase";

export default function  ChangeDisplayNameForm(props) {
    const {displayName, setShowModal, toastRef, setReloadUserInfo} = props;
    const [newDisplayName, setNewDisplayName] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit= () => {
        // console.log(newDisplayName);
        setError(null);
        if(!newDisplayName){
            setError("The field is obligatory");
        } else if(displayName === newDisplayName) {
            setError("The name cannot be the same");
        } else {
            setIsLoading(true)
            //enviar a firebase
            const update = {
                displayName: newDisplayName
            }
            firebase.auth().currentUser.updateProfile(update)
            .then(() => {
                // console.log("enviado");
                setIsLoading(false);
                setReloadUserInfo(true);
                setShowModal(false);
            })
            .catch(() => {
                setError("Error: Cannot update info at the moment");
                setIsLoading(false);
            });
        }
    }

    return (
        <View style={styles.view}>
            <Input 
             placeholder="Update your full name here"
             containerStyle={styles.input}
             rightIcon={{
                 type: "material-community",
                 name: "account-circle-outline",
                 color:"#c2c2c2"
             }}
             defaultValue={displayName || ""}
             onChange={e => setNewDisplayName(e.nativeEvent.text)}
             errorMessage={error}
            />
            <Button 
             title="SAVE"
             containerStyle={styles.btnContainer}
             buttonStyle={styles.btn}
             onPress={onSubmit}
             loading={isLoading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        marginTop: 20,
        width: "95%"
    },
    btn: {
        backgroundColor:"#00a680"
    }
});
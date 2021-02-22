import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from "react-native-elements";
import {validateEmail} from "../../utils/validations";
import {reauthenticate} from "../../utils/api";
import * as firebase from "firebase";

export default function ChangeEmailForm(props) {
    const {email, setShowModal, toastRef, setReloadUserInfo} = props;
    const [formData, setFormData] = useState(defaultValue());
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e, type) => {
        setFormData({...formData, [type] : e.nativeEvent.text}) //type para que la key sea una variable dinamica
    }

    const onSubmit= () => {
        setError({})
        // console.log('clicked');
        // console.log(formData);
        if(!formData.email || email == formData.email) {
            setError({
                email: "The email cannot be the same"
            });
        } else if (!validateEmail(formData.email)) {
            setError({
                email: "The email is incorrect"
            })
        } else if(!formData.password) {
            setError({
                password: "The password is obligatory to change the email"
            }) 
        } else {
            // console.log("enviado");
            setIsLoading(true);
            // firebase pide reauthenticate cuando se pide actualizar datos sensibles (email y pass)
            reauthenticate(formData.password)
            .then(() => {
            // console.log(response);
                firebase.auth()
                .currentUser.updateEmail(formData.email)
                .then(() => {
                    setIsLoading(false);
                    setReloadUserInfo(true); //para refresh datos de la app
                    toastRef.current.show("The email has been updated");
                    setShowModal(false);
                })
                .catch(() => {
                    setError({email: "Error updating email"});
                    setIsLoading(false);
                });
            })
            .catch(()=>{
                setIsLoading(false);
                setError({password: "The password is incorrect"});
            });
        }
    }

    return(
        <View style={styles.view}>
            <Input 
             placeholder="Update your email here"
             containerStyle={styles.input}
             defaultValue={email}
             rightIcon={{
                type: "material-community",
                name: "at",
                color:"#c2c2c2"
            }}
            onChange={(e)=>onChange(e, "email")}
            errorMessage={error.email}
            />
            <Input 
             placeholder="Password"
             containerStyle={styles.input}
             password={true}
             secureTextEntry={showPassword ? false : true}
             rightIcon={{
                 type: "material-community",
                 name: showPassword ? "eye-off-outline" : "eye-outline",
                 color: "#c2c2c2",
                 onPress: () => setShowPassword(!showPassword)
             }}
             onChange={(e)=>onChange(e, "password")}
             errorMessage={error.password}
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

function defaultValue() {
    return {
        email: "",
        password: ""
    }
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
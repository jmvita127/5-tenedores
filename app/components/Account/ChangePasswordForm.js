import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from "react-native-elements";
import {size} from "lodash";
import * as firebase from "firebase";
import {reauthenticate} from "../../utils/api";

export default function ChangePasswordForm(props) {
    const {setShowModal, toastRef} = props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultValue());
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e, type) => {
        setFormData({...formData, [type] : e.nativeEvent.text}) //type para que la key sea una variable dinamica
    }

    const onSubmit = async () => {
        let isSetError = true; //para que al volver a ejecutarse de true
        //console.log(formData);
        let errorTemp = {};
        setError({})
        if(!formData.password || !formData.newPassword || !formData.repeatNewPassword) {
            errorTemp = {
                password: !formData.password ? "The password cannot be empty" : "",
                newPassword: !formData.newPassword ? "The password cannot be empty" : "",
                repeatNewPassword: !formData.repeatNewPassword ? "The password cannot be empty" : ""
            };
        } else if (formData.newPassword !== formData.repeatNewPassword) {
            errorTemp = {
                newPassword: "The passwords must be the same",
                repeatNewPassword: "The passwords must be the same"
            };
        } else if(size(formData.newPassword) < 6) {
            errorTemp = {
                newPassword: "The password must have 6 or more characters",
                repeatNewPassword: "The password must have 6 or more characters",
            }
        } else {
            setIsLoading(true);
            // console.log("enviado");
            await reauthenticate(formData.password)
            .then(async () => {
                // console.log("enviado");
                await firebase.auth()
                .currentUser.updatePassword(formData.newPassword)
                .then(()=>{
                    isSetError = false;
                    setIsLoading(false);
                    setShowModal(false);
                    firebase.auth().signOut(); //para que al cambiar la pass, tenga que reloguearse
                })
                .catch(() => {
                    errorTemp = {
                        other: "An error has ocurred"
                    }
                    setIsLoading(false);
                })
            })
            .catch(() => {
                // console.log(err);
                setIsLoading(false);
                errorTemp = {
                    password: "The password is incorrect"
                }
            });
        }
        isSetError && setError(errorTemp);
    }


    return (
        <View>
            <Input 
             placeholder="Actual Password"
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
             <Input 
             placeholder="New Password"
             containerStyle={styles.input}
             password={true}
             secureTextEntry={showPassword ? false : true}
             rightIcon={{
                 type: "material-community",
                 name: showPassword ? "eye-off-outline" : "eye-outline",
                 color: "#c2c2c2",
                 onPress: () => setShowPassword(!showPassword)
             }}
             onChange={(e)=>onChange(e, "newPassword")}
             errorMessage={error.newPassword}
            />
            <Input 
             placeholder="Repeat New Password"
             containerStyle={styles.input}
             password={true}
             secureTextEntry={showPassword ? false : true}
             rightIcon={{
                 type: "material-community",
                 name: showPassword ? "eye-off-outline" : "eye-outline",
                 color: "#c2c2c2",
                 onPress: () => setShowPassword(!showPassword)
             }}
             onChange={(e)=>onChange(e, "repeatNewPassword")}
             errorMessage={error.repeatNewPassword}
            />
            <Button 
            title="SAVE"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={onSubmit}
            loading={isLoading}
            />
            <Text>{error.other}</Text>
        </View>
    );
}

function defaultValue() {
    return {
        password: "",
        newPassword: "",
        repeatNewPassword: ""
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
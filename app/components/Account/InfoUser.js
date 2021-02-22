import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Avatar} from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function InfoUser(props){
    //doble destructuring, de las props de user info saco photoURL que es null (revisar consolelog)
    const {
        userInfo: { uid, photoURL, displayName, email}, //uid para no pisar avatar (linea44)
        toastRef,
        setLoading,
        setLoadingText
    } = props;
     console.log(props.userInfo);

    //funcion + PERMISOS para cambiar avatar (app.json)
    const changeAvatar =  async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // console.log(resultPermission);
        const resultPermissionCamera = resultPermission.permissions.mediaLibrary.status;

        if (resultPermissionCamera === "denied") {
            toastRef.current.show("It is necesary to accept the permision of the galery");
        } else {
             const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3] //tamanio imagen
            });
        if (result.cancelled) {
            toastRef.current.show("You have closed the galery");
        } else {
            uploadImage(result.uri).then(() => {
                updatePhotoUrl();
            }).catch(() => {
                toastRef.current.show("Error: Cannot update avatar")
            })
        }
      }
    };
    //uri es la direccion fisica donde se encuentra la imagen
    const uploadImage = async (uri) => {
        setLoadingText("Updating avatar..");
        setLoading(true);
       //func asincrona porque debo hacer fetch para que devuelva el fichero
       const response = await fetch(uri);
        //console.log(JSON.stringify(response));
        const blob = await response.blob(); //blob para subir a firebase
        // console.log(JSON.stringify(blob));
        const ref = firebase.storage().ref().child(`avatar/${uid}`);
        return ref.put(blob) //subir a firebase
    };
    //mostrar avatar en tiempo real
    const updatePhotoUrl = () => {
        firebase
        .storage()
        .ref(`avatar/${uid}`)
        .getDownloadURL()
        .then(async (response) => {
            const update = {
                photoURL: response //nuestra url
            };
            await firebase.auth().currentUser.updateProfile(update) //linea57
            setLoading(false);
        })
        .catch(() => {
            toastRef.current.show("Error: Cannot update avatar")
        })
    };

    return (
        <View style={styles.viewUserInfo}>
            <Avatar 
             rounded
             size="large"
             showEditButton
             onEditPress={changeAvatar}
             containerStyle={styles.userInfoAvatar}
             source={photoURL ? {uri: photoURL} : require("../../../assets/img/avatar-default.jpg")}/>
            <View>
                <Text style={styles.displayName}>
                    {displayName ? displayName : "Annonymous"}
                </Text>
                <Text>
                    {email ? email : "Social Loggin"}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar: {
        marginRight: 20
    },
    displayName: {
        fontWeight: "bold",
        paddingBottom: 3
    }
})

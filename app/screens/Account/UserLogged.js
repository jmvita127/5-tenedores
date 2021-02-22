import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import * as firebase from "firebase";
import Loading from '../../components/Loading';
import InfoUser from '../../components/Account/InfoUser';
import AccountOptions from '../../components/Account/AccountOptions';


export default function UserLogged() {
    const [userInfo, setUserInfo] = useState(null); //vacio porque no tenemos el user
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [reloadUserInfo, setReloadUserInfo] = useState(false)
    const toastRef = useRef();
    //peticion a firebase para obtener datos del userlogged
    useEffect(() => {
        //funcion asincrona/autoejecutable
        (async ()=> {
            const user = await firebase.auth().currentUser;
            setUserInfo(user);
        })()
        setReloadUserInfo(false);
    }, [reloadUserInfo]) //el array es donde le diremos cuando queremos que se updatee un estado

    return (
        <View style={styles.viewUserInfo}>
            {userInfo && <InfoUser 
                            userInfo={userInfo} 
                            toastRef={toastRef}
                            setLoading={setLoading}
                            setLoadingText={setLoadingText}
            />}
    
            <AccountOptions 
            userInfo={userInfo}
            toastRef={toastRef}
            setReloadUserInfo={setReloadUserInfo}
            />

            <Button 
            title="Log out"
            buttonStyle={styles.btnLogOut}
            titleStyle={styles.btnCloseSessionText}
            onPress={() => firebase.auth().signOut()}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading text={loadingText} isVisible={loading}/>
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        minHeight: '100%',
        backgroundColor: '#f2f2f2'
    },
    btnLogOut: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e3e3e3",
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10
    },
    btnCloseSessionText: {
        color: "#00a680"
    }
});
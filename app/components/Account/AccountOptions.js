import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import {map} from "lodash";
import Modal from "../Modal";
import ChangeDisplayNameForm from '../Account/ChangeDisplayNameForm';
import ChangeEmailForm from '../Account/ChangeEmailForm';
import ChangePasswordForm from '../Account/ChangePasswordForm';

export default function AccountOptions(props) {
    const {userInfo, toastRef, setReloadUserInfo} = props;
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);
    //Seleccionara la opcion de listItem
    const selectedComponent= (key) => {
        // console.log("clicked!");
        // console.log(key);
        switch(key) { //key -> displayname, email, password
            case "displayName":
                setRenderComponent(
                <ChangeDisplayNameForm 
                 displayName={userInfo.displayName}
                 setShowModal={setShowModal}
                 toastRef={toastRef}
                 setReloadUserInfo={setReloadUserInfo}
                />
                );
                setShowModal(true);
                break;
            case "email":
                setRenderComponent(
                <ChangeEmailForm 
                email={userInfo.email}
                setShowModal={setShowModal}
                toastRef={toastRef}
                setReloadUserInfo={setReloadUserInfo}
                />
                );
                setShowModal(true);
                break;
            case "password":
                setRenderComponent(
                    <ChangePasswordForm 
                    password={userInfo.password}
                    setShowModal={setShowModal}
                    toastRef={toastRef}
                    setReloadUserInfo={setReloadUserInfo}
                    />
                    );
                setShowModal(true);
                break;
            default:
                setRenderComponent(null);
                setShowModal(false);
                break;
        }  
    
    }
    const menuOptions = generateOptions(selectedComponent);
    return (
        <View>
            {map(menuOptions, (menu, index) => (
                <ListItem 
                 key={index}
                 title={menu.title}
                 leftIcon={{
                     type: menu.iconType,
                     name: menu.iconNameLeft,
                     color: menu.iconColorLeft,
                     
                 }}
                 rightIcon={{
                     type: menu.iconType,
                     name: menu.iconNameRight,
                     color: menu.iconColorRight
                 }}
                 containerStyle={styles.menuItem}
                 onPress={menu.onPress}
                />
            ))}
        {renderComponent &&( //par que renderComponent nunca sea nulo y no de warning
         <Modal isVisible={showModal} setIsVisible={setShowModal}>
             {renderComponent}
         </Modal>
         )}
        </View>
    )
};

function generateOptions(selectedComponent) {
    return [
        {
            title: "Change Full Name",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("displayName") //key
        },
        {
            title: "Change Email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("email")
        },
        {
            title: "Change Password",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("password")
        }
    ]
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3"
    }
});
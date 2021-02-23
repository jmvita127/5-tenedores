import React, {useState} from 'react';
import { StyleSheet, View, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Avatar, Imagen, Input, Button} from 'react-native-elements';

export default function AddRestaurantForm(props) {
    const {toastRef, setIsLoading, navigation} = props;
    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantAddress, setRestaurantAddress] = useState("");
    const [restaurantDescription, setRestaurantDescription] = useState("");

    const addRestaurant = () => {
        console.log(restaurantName);
        console.log(restaurantAddress);
        console.log(restaurantDescription);
    };

    return(
        <ScrollView style={styles.ScrollView}>
            <FormAdd 
             setRestaurantName={setRestaurantName}
             setRestaurantAddress={setRestaurantAddress}
             setRestaurantDescription={setRestaurantDescription}
            />
            <Button 
             title="Add Restaurant"
             onPress={addRestaurant}
             buttonStyle={styles.btnAddRestaurant}
            />
        </ScrollView>
    );
}

function FormAdd(props) {
    const {
        setRestaurantName,
        setRestaurantAddress,
        setRestaurantDescription
    } = props;

    return(
        <View style={styles.viewForm}>
            <Input 
             placeholder="Restaurant name"
             containerStyle={styles.input}
             onChange={(e) => setRestaurantName(e.nativeEvent.text)}
            />
             <Input 
             placeholder="Restaurant address"
             containerStyle={styles.input}
             onChange={(e) => setRestaurantAddress(e.nativeEvent.text)}
            />
            <Input 
             placeholder="Description"
             multiline={true}
             inputContainerStyle={styles.textArea}
             onChange={(e) => setRestaurantDescription(e.nativeEvent.text)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
 ScrollView: {
     height: '100%',
 },
 viewForm: {
     marginLeft: 10,
     marginRight: 10
 },
 input: {
     marginBottom: 10,
 },
 textArea: {
     height: 100,
     width: '100%',
     padding: 0,
     margin: 0
 },
 btnAddRestaurant: {
     backgroundColor: '#00a680',
     margin: 20,
 }
});
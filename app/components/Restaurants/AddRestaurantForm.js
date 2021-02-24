import React, {useState} from 'react';
import { StyleSheet, View, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Avatar, Imagen, Input, Button} from 'react-native-elements';
import { map, size, filter} from "lodash";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";



export default function AddRestaurantForm(props) {
    const {toastRef, setIsLoading, navigation} = props;
    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantAddress, setRestaurantAddress] = useState("");
    const [restaurantDescription, setRestaurantDescription] = useState("");
    const [imagesSelected, setImagesSelected] = useState([]);

   

    const addRestaurant = () => {
        console.log(restaurantName);
        console.log(restaurantAddress);
        console.log(restaurantDescription);
        console.log(imagesSelected);
    };

    return(
        <ScrollView style={styles.ScrollView}>
            <FormAdd 
             setRestaurantName={setRestaurantName}
             setRestaurantAddress={setRestaurantAddress}
             setRestaurantDescription={setRestaurantDescription}
            />
            <UpLoadImage 
            toastRef={toastRef} 
            imagesSelected={imagesSelected}
            setImagesSelected={setImagesSelected}
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

const UpLoadImage = (props) => {
    const {toastRef, setImagesSelected, imagesSelected} = props;
    //permisos de camara
    const imageSelect = async () => {
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA)
        console.log(resultPermissions);

        if(resultPermissions === "denied") {
            toastRef.current.show("It is neccessary to accept the permissions to open the gallery", 3000);
         } else {
             const result = await ImagePicker.launchImageLibraryAsync({
                 allowsEditing: true,
                 aspect: [4,3]
             });
            //console.log(result);
             if(result.cancelled) {
                 toastRef.current.show("You has been closed the galery without selecting an image", 2000)
             } else {
                setImagesSelected([...imagesSelected, result.uri]);
             }
         }
    };
    
    const removeImage = (image) => {
        Alert.alert(
            "You are going to delete the image..",
            "Are you sure?",
            [ {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Delete",
                onPress: () => {
                 setImagesSelected(
                    filter(imagesSelected, (imageUrl) => imageUrl !== image)
                 );
                },
            },
        ],
        { cancelable: false}
        )
    };
    

    return(
    <View style={styles.viewImages}>
        {size(imagesSelected) < 4 &&( //para que cuando cargue 5 imagenes, luego desaparezca
     <Icon 
      type="material-community"
      name="camera"
      color="#7a7a7a"
      containerStyle={styles.containerIcon}
      onPress={imageSelect}
     />
    )}
    {map(imagesSelected, (imageRestaurant, index) => (
       <Avatar 
        key={index}
        style={styles.miniatureStyle}
        source={{uri: imageRestaurant}}
        onPress={()=> removeImage(imageRestaurant)}
       />
    ))}
    </View>
    );
};

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
 },
 viewImages: {
     flexDirection: "row",
     marginLeft: 20,
     marginRight: 20,
     marginTop: 30
 },
 containerIcon: {
     alignItems: 'center',
     justifyContent: 'center',
     marginRight: 10,
     height: 70,
     width: 70,
     backgroundColor: "#e3e3e3"
 },
 miniatureStyle: {
     width: 70,
     height: 70,
     marginRight: 10
 }
});
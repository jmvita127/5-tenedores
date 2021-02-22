import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Loading from "../Loading";
import { validateEmail } from "../../utils/validations";
import { size, isEmpty } from "lodash"; //form validate
import * as firebase from "firebase";
import {useNavigation} from "@react-navigation/native";

export default function RegisterForm(props) {
  const { toastRef } = props; //register.js
  const [showPassword, setShowPassword] = useState(false); //para mostrar contrasena oculta
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();
  //ENVIAR DATOS
  const onSubmit = () => {
    // console.log(size(formData.password));
    // console.log(formData);
    // console.log(validateEmail(formData.email));
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.confirmPassword)
    ) {
      toastRef.current.show("All fields are obligatories");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("Email incorrect");
    } else if (formData.password !== formData.confirmPassword) {
      toastRef.current.show("The password does not match");
    } else if (size(formData.password) < 6) {
      toastRef.current.show("Password must have 6 or more characters");
    } else {
      //registro a firebase
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
            setLoading(false);
            navigation.navigate("account"); //account screen
        })
        .catch((err) => {
            setLoading(false);
            toastRef.current.show("This email has been registed before")
        });
    }
  };
  //ACTUALIZAR STATE
  const onChange = (e, type) => {
    //recibe evento onchange y tipo de inpunt
    // console.log(type);
    // console.log(e.nativeEvent.text);
    // setFormData({[type]: e.nativeEvent.text});
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Email"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="email"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Password"
        password={true}
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, "password")}
        containerStyle={styles.inputForm}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off" : "eye"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        placeholder="Confirm Password"
        password={true}
        secureTextEntry={showConfirmPassword ? false : true}
        onChange={(e) => onChange(e, "confirmPassword")}
        containerStyle={styles.inputForm}
        rightIcon={
          <Icon
            type="material-community"
            name={showConfirmPassword ? "eye-off" : "eye"}
            iconStyle={styles.iconRight}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        }
      />
      <Button
        title="Sign Up"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Creating Account.."/>
    </View>
  );
}

//funcion para crear los datos vacios
function defaultFormValue() {
  return {
    email: "",
    password: "",
    confirmPassword: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#00a680",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});

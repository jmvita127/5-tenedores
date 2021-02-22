import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Loading from "../Loading";
import { size, isEmpty } from "lodash"; //form validate
import { validateEmail } from "../../utils/validations";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

export default function LoginForm(props) {
  const [loading, setLoading] = useState(false);
  const { toastRef } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormLoginValue());
  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      toastRef.current.show("All fields are obligatories");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("The email is incorrect");
    } else {
      //registro a firebase
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
          setLoading(false);
          navigation.navigate("account"); //account screen
        })
        .catch((err) => {
          setLoading(false);
          toastRef.current.show("Email or Password incorrect");
        });
    }
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Email"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")} //email de defaultFormLoginValue()
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
        containerStyle={styles.inputForm}
        password={true}
        onChange={(e) => onChange(e, "password")} //email de defaultFormLoginValue()
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off" : "eye"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="Log In"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
     <Loading isVisible={loading} text="Logging in.."  />
    </View>
  );
}

function defaultFormLoginValue() {
  return {
    email: "",
    password: "",
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
  btnContainerLogin: {
    marginTop: 20,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#00a680",
  },
});

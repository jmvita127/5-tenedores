import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Account/Account";
import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={Account}
        options={{ title: "My Account" }}
      />
      <Stack.Screen 
        name="login" //para onPress de UserGuest.js dentro de navigate()
        component={Login}
        options={{title: "Log In"}}
      />
      <Stack.Screen 
        name="register"
        component={Register}
        options={{title: "Sign up"}}
      />
    </Stack.Navigator>
  );
}

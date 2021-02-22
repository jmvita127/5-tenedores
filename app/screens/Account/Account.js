import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";
import Loading from "../../components/Loading";

export default function Account() {
  //primer state para account
  const [login, setLogin] = useState(null); //null porque no sabemos si el user esta logueado o no
  //peticion a firebase para saber si esta logueado
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []); // el array sirve para decirle cuando un estado sea modif. volvete a ejecutar

  if (login === null) return <Loading isVisible={true} text="Loading.." />;
  return login ? <UserLogged /> : <UserGuest />;
}

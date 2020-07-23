import React, { Component } from 'react';
import FacebookLogin from "react-facebook-login";

const FacebookLoginForm = ({responseFacebook})=>{
    return(
        <FacebookLogin
    appId="817570662111285"
    fields="first_name,last_name,birthday,email,picture"
    scope="public_profile, email, user_birthday"
    callback={responseFacebook} />
    )
}
export default FacebookLoginForm;
import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Button, Divider } from 'antd';
import {FacebookOutlined} from '@ant-design/icons';
const FacebookLoginForm = ({ responseFacebook }) => {
    return (
        <React.Fragment>
            <Divider></Divider>
            <FacebookLogin
                appId="757254801763865"
                fields="first_name,last_name,birthday,email"
                scope="public_profile, email, user_birthday"
                callback={ responseFacebook }
                render={ renderProps => (
                    <Button icon={<FacebookOutlined />} style={{backgroundColor: "#3b5998", borderColor: "#3b5998"}} size="large" type="primary" onClick={ renderProps.onClick }>Вхід через facebook</Button>
                ) } />
        </React.Fragment>

    )
}
export default FacebookLoginForm;
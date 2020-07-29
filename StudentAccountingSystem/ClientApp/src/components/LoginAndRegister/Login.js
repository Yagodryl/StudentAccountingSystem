import React, { Component } from 'react';
import { Form, Input, Button, Row, Alert } from 'antd';

import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import Spinner from "../Spinner";
import * as loginActions from './reducer';
import { Link } from 'react-router-dom';
import FacebookLoginForm from './FacebookLoginForm';

class Login extends Component {
    state = {}
    render() {
        const onFinish = values => {
            this.props.login(values);
        };


        const responseFacebook = (response) => {
            console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS", response);
            this.props.loginFacebook(response);
          }
        

        const {errors = []} = this.props;
        const errorsMess = errors.map((item, index)=>{
            return <p key={index}>{item.message}</p>;
        })
        return (
            <React.Fragment>
                {this.props.failed && <Alert style={{marginBottom: '15px'}} type='error' message={errorsMess}></Alert>}

                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={ { remember: true } }
                    onFinish={ onFinish }
                >
                    <Form.Item
                        name="email"
                        rules={ [{ required: true, message: 'Please input your Email!' }, { type: 'email', message: "Incorrect Email!" }] }
                    >
                        <Input prefix={ <MailOutlined className="site-form-item-icon" /> } placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={ [{ required: true, message: 'Please input your Password!' }] }
                    >
                        <Input
                            prefix={ <LockOutlined className="site-form-item-icon" /> }
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Row justify="space-between">
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Вхід
                            </Button>
                            {/* <a className="login-form-forgot" href="#">
                                Забув пароль
                            </a> */}
                        </Row>
                    </Form.Item>
                </Form>
                <div style={{alignContent: "center"}}>

                <FacebookLoginForm responseFacebook = {responseFacebook}/>
                </div>
                {this.props.loading && <Spinner/>}
            </React.Fragment>
        );
    };
}
function mapStateToProps({loginAndRegister}) {
    return {
        loading: loginAndRegister.loading,
        failed: loginAndRegister.loginFailed,
        success: loginAndRegister.success,
        errors: loginAndRegister.loginErrors,
    }
}

  const mapDispatchToProps = {
    login: (model) => {
        return loginActions.login(model);
    },
    loginFacebook: (model)=>{
        return loginActions.loginFacebook(model);
    }
  }


export default connect(mapStateToProps,mapDispatchToProps)(Login);
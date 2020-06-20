import React, { Component } from 'react';
import { Form, Input, Button, Row } from 'antd';

import { MailOutlined, LockOutlined } from '@ant-design/icons';

class Login extends Component {
    state = {}
    render() {
        const onFinish = values => {
            console.log('Success:', values);
        };
        return (
            <React.Fragment>
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
                    <Form.Item a>
                        <Row justify="space-between">
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Вхід
                            </Button>
                            <a className="login-form-forgot" href="#">
                                Забув пароль
                            </a>
                        </Row>
                    </Form.Item>
                </Form>
            </React.Fragment>
        );
    };
}


export default Login;
import React, { Component } from 'react';
import { Form, Input, Button, Row } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';

class Register extends Component {
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
                        name="nikname"
                        rules={ [{ required: true, message: 'Please input your Nikname!' }] }
                    >
                        <Input prefix={ <UserOutlined className="site-form-item-icon" /> } placeholder="Nikname" />
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
                    <Form.Item
                        name="confirm"
                        dependencies={ ['password'] }
                        hasFeedback
                        rules={ [
                            {
                                required: true,
                                message: 'Please confirm your Password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                        ] }
                    >
                        <Input
                            prefix={ <LockOutlined className="site-form-item-icon" /> }
                            type="password"
                            placeholder="Confirm password"
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
    }
}

export default Register;
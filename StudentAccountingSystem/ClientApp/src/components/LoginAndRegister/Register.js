import React, { Component } from 'react';
import { Form, Input, Button, Row } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as registerActions from "./reducer";


class Register extends Component {
    state = {}

    render() {
        const onFinish = values => {
            console.log('Success:', values);
            this.props.register(values);
        };
        return (
            <React.Fragment>
                <Form
                    name="register"
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
                        name="name"
                        rules={ [{ required: true, message: 'Please input your name!' }] }
                    >
                        <Input prefix={ <UserOutlined className="site-form-item-icon" /> } placeholder="Full name" />
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
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Зареєструватися
                            </Button>
                    </Form.Item>
                </Form>
            </React.Fragment>
        );
    }
}

function mapStateToProps({loginAndRegister}) {
    return {
        loading: loginAndRegister.loading,
        failed: loginAndRegister.failed,
        success: loginAndRegister.success,
        errors: loginAndRegister.errors,
    }
}

const mapDispatchToProps = {
    register: (model) => {
        return registerActions.register(model);
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Register);
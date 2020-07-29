import React, { Component } from 'react';
import { Form, Input, Button, DatePicker, Alert } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as registerActions from "./reducer";
import Spinner from '../Spinner';

class Register extends Component {
    state = {}

    render() {
        const onFinish = values => {
            this.props.register(values);
        };
        const {errors = []} = this.props;
        const errorsMess = errors.map((item, index)=>{
            return <p key={index}>{item.message}</p>;
        })
        return (
            <React.Fragment>
                {this.props.failed && <Alert style={{marginBottom: '15px'}} type='error' message={errorsMess}></Alert>}
                {this.props.success && <Alert style={{marginBottom: '15px'}} type='info' message="Реєстрація успішна! Підтвердіть ваш Email!"></Alert> }
                <Form
                    name="register"
                    className="login-form"
                    initialValues={ { remember: true } }
                    onFinish={ onFinish }
                >
                    <Form.Item
                        name="email"
                        rules={ [{ required: true, message: 'Введіть ваш Email!' }, { type: 'email', message: "Не вірний формат Email!" }] }
                    >
                        <Input prefix={ <MailOutlined className="site-form-item-icon" /> } placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="firstName"
                        rules={ [{ required: true, message: "Введіть ім'я!" }] }
                    >
                        <Input prefix={ <UserOutlined className="site-form-item-icon" /> } placeholder="Ім'я" />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        rules={ [{ required: true, message: "Введіть прізвише!" }] }
                    >
                        <Input prefix={ <UserOutlined className="site-form-item-icon" /> } placeholder="Прізвище" />
                    </Form.Item>
                    <Form.Item
                        name="birthday"
                        rules={ [{ required: true, message: "Виберіть дату народження!" }] }
                    >
                        <DatePicker placeholder="Дата народження" format={'DD/MM/YYYY'}/>
                        {/* <Input prefix={ <UserOutlined className="site-form-item-icon" /> } placeholder="Прізвище" /> */}
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={ [{ required: true, message: 'Введіть ваш пароль!' }] }
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
                                message: 'Повторіть пароль!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Паролі не одинакові!');
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
                {this.props.loading && <Spinner/>}
            </React.Fragment>
        );
    }
}

function mapStateToProps({loginAndRegister}) {
    return {
        loading: loginAndRegister.loading,
        failed: loginAndRegister.registerFailed,
        success: loginAndRegister.registerSuccess,
        errors: loginAndRegister.registerErrors,
    }
}

const mapDispatchToProps = {
    register: (model) => {
        return registerActions.register(model);
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Register);
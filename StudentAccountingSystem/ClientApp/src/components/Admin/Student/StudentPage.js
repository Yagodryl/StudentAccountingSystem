import React, { Component } from 'react';
import { Row, Col, Form, Input, Alert, Button } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';

import * as StudentProfileActions from "./reducer";
import { connect } from 'react-redux';
import Spinner from '../../Spinner';


class StudentPage extends Component {
    state = {
        noChanged: true
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getStudentProfile(id);
    }


    render() {
        const { id, firstName, lastName, email, image} = this.props.studentProfile;
        const onFinish = values => {
            this.props.editStudentProfile({ ...values, id });
        };
        const onChange = ()=>{
          
            this.setState({noChanged: false});
        }
        const {editErrors = []} = this.props;
        const errorsMess = editErrors.map((item, index)=>{
            return <p key={index}>{item.message}</p>;
        })


        return (
            <Row>
                {this.props.isLoading && <Spinner/>}

                <Col xs={ 24 } md={ 10 } xl={ 6 } style={ { paddingLeft: 20, paddingRight: 20 } }>
                    <img src={ `${image}?t=${new Date().getTime()}` } width="100%" />
                </Col>
                <Col xs={ 24 } md={ 14 } xl={ 18 } style={ { paddingLeft: 20, paddingRight: 20 } }>
                    {this.props.editFailed && <Alert style={{marginBottom: '15px'}} type='error' message={errorsMess}></Alert>}
                    {this.props.editSuccess && <Alert style={{marginBottom: '15px'}} type='info' message="Редагування пройшло успішно!"></Alert> }
                    {!this.props.isLoading &&
                    (<Form name="edit"
                        layout={"vertical"}
                        initialValues={{email: email,
                            firstName: firstName,
                            lastName: lastName}}
                        onFinish={ onFinish }
                        onChange={onChange}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={ [{ required: true, message: 'Введіть ваш Email!' }, { type: 'email', message: "Не вірний формат Email!" }] }
                        >
                            <Input prefix={ <MailOutlined className="site-form-item-icon" /> } placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            label="Ім'я"
                            name="firstName"
                            rules={ [{ required: true, message: "Введіть ім'я!" }] }
                        >
                            <Input prefix={ <UserOutlined className="site-form-item-icon" /> } placeholder="Ім'я" />
                        </Form.Item>
                        <Form.Item
                            label="Прізвище"
                            name="lastName"
                            rules={ [{ required: true, message: "Введіть прізвише!" }] }
                        ><Input prefix={ <UserOutlined className="site-form-item-icon" /> } placeholder="Прізвище" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={this.state.noChanged}>
                                Змінити
                            </Button>
                    </Form.Item>
                    </Form>)}
                    
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = ({ studentProfile }) => {
    return {
        studentProfile: studentProfile.data,
        isLoading: studentProfile.loading,
        isFailed: studentProfile.failed,
        error: studentProfile.errors,
        editFailed: studentProfile.editFailed,
        editErrors: studentProfile.editErrors,
        editSuccess: studentProfile.editSuccess
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getStudentProfile: (id) => {
            dispatch(StudentProfileActions.getStudentProfile(id));
        },
        editStudentProfile: (model) => {
            dispatch(StudentProfileActions.editStudentProfile(model));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentPage);
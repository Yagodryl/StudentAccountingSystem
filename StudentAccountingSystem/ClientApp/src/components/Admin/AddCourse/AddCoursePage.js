import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

import ImageUploader from "./ImageUploader";

import * as AddCourseActions from "./reducer";
import { connect } from 'react-redux';
import Spinner from '../../Spinner';

class AddCoursePage extends Component {
    state = {}
    render() {

        const onFinish = values => {
            console.log('Success:', values);

            this.props.addCourse(values);
        }

        return (<div>
            <Form onFinish={ onFinish }>
                <Form.Item
                    name="name"
                    rules={ [{ required: true, message: 'Please input Name!' }] }
                >
                    <Input placeholder="Назава курсу" />
                </Form.Item>
                <Form.Item
                    name="image"
                    rules={ [{ required: true, message: 'Please input Image!' }] }
                >
                    <Input placeholder="Картинка" />
                </Form.Item>
                <Form.Item
                    name="shortDescription"
                    rules={ [{ required: true, message: 'Please input Short Description!' }] }
                >
                    <Input.TextArea rows={ 4 } placeholder="Кроткий опис" />
                </Form.Item>
                <Form.Item
                    name="fullDescription"
                    rules={ [{ required: true, message: 'Please input Full Description!' }] }
                >
                    <Input.TextArea rows={ 8 } placeholder="Повний опис" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" >Submit</Button>
                </Form.Item>
            </Form>
                {this.props.loading && <Spinner/>}
        </div>);
    }
}
function mapStateToProps({addCourse}) {
    return{
        loading: addCourse.loading,
        failed: addCourse.failed,
        success: addCourse.success,
        errors: addCourse.errors,
    }
}
const mapDispatchToProps = {
    addCourse: (model) => {
        return AddCourseActions.addCourse(model);
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(AddCoursePage);
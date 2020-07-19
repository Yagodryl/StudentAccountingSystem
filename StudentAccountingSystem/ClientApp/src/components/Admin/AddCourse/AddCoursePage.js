import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Upload } from 'antd';
import { UploadOutlined } from "@ant-design/icons";

import ImageUploader from "./ImageUploader";

import * as AddCourseActions from "./reducer";
import { connect } from 'react-redux';
import Spinner from '../../Spinner';

class AddCoursePage extends Component {
    state = {
        fileList: [],
    }
    render() {

        const onFinish = values => {
            const file = this.state.fileList[0];
            console.log("This image: ", file)
            const data = {...values, image: file}
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('shortDescription', values.shortDescription);
            formData.append('fullDescription', values.fullDescription);
            formData.append('image', file);

            console.log('Success:', formData);
            this.props.addCourse(formData);
        }
        const { uploading, fileList } = this.state;
      
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList
                    };
                });
            },
            beforeUpload: file => {
                this.setState({ fileList: [file] });
                return false;
            },
            fileList
        };
        return (<div>
            <div style={{marginBottom: 15, width: "min-content"}}>
            <Upload { ...props } >
                <Button >
                    <UploadOutlined /> Фото курсу
                </Button>
            </Upload>
            </div>
           

            <Form onFinish={ onFinish }>
                <Form.Item
                    name="name"
                    rules={ [{ required: true, message: 'Please input Name!' }] }
                >
                    <Input placeholder="Назава курсу" />
                </Form.Item>
                {/* <Form.Item
                    name="image"
                    rules={ [{ required: true, message: 'Please input Image!' }] }
                >
                    <Input placeholder="Картинка" />
                </Form.Item> */}
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
            { this.props.loading && <Spinner /> }
        </div>);
    }
}
function mapStateToProps({ addCourse }) {
    return {
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
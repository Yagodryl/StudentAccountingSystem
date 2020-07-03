import React, { Component } from 'react';

import { Upload, message, Button, Icon } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import "./AddCourse.css";

function getBase64(img, callback) {
    console.log(img);
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
        message.error('Image must smaller than 5MB!');
    }
    return isJpgOrPng && isLt2M;
}

class ImageUploader extends Component {
    state = { loading: false, }
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    render() {
        const uploadButton = (
            <div>
                { this.state.loading ? <LoadingOutlined /> : <PlusOutlined /> }
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={ false }
                action="api/admin/upload-course-image"
                beforeUpload={ beforeUpload }
                onChange={ this.handleChange }
            >
                { imageUrl ? <img src={ imageUrl } alt="avatar" style={ { width: '100%' } } /> : uploadButton }
            </Upload>
        );
    }
}

// const props = {
//     name: 'file',
//     action: 'api/admin/upload-course-image',
//     headers: {
//       authorization: 'authorization-text',
//     },
//     onChange(info) {
//       if (info.file.status !== 'uploading') {
//         console.log(info.file, info.fileList);
//       }
//       if (info.file.status === 'done') {
//         message.success(`${info.file.name} file uploaded successfully`);
//       } else if (info.file.status === 'error') {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//   };

//   const ImageUploader = ()=>(
//     <Upload {...props}>
//     <Button>
//        Click to Upload
//     </Button>
//   </Upload>
//   )

export default ImageUploader;
import React, { Component } from 'react';
import { Row, Col, Typography, Button, Upload, message } from 'antd';
import * as ProfileActions from "./reducer";
import { connect } from 'react-redux';
import Spinner from '../../Spinner';

const { Title } = Typography;
class ProfilePage extends Component {

    componentDidMount() {
        this.props.getProfile();
    }


    render() {
        const { id, firstName, lastName, email, image, birthday } = this.props.stydentProfile;

        const props = {
            name: 'file',
            action: `api/profile/change-image/${id}`,
            onChange: (info) => {
                console.log("Info: ", info);
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    window.location.reload(false);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <Row>
                { this.props.isLoading && <Spinner /> }
                <Col xs={ 24 } md={ 12 } xl={ 8 } style={ { paddingLeft: 20, paddingRight: 20 } }>
                    <img src={ `${image}?t=${new Date().getTime()}` } width="100%" />
                    <Upload { ...props } >
                        <Button >Edit photo</Button>
                    </Upload>
                </Col>
                <Col xs={ 24 } md={ 12 } xl={ 16 } style={ { paddingLeft: 20, paddingRight: 20 } }>
                    <Title>{ `${firstName} ${lastName}` }</Title>
                    <Title level={ 3 }>Email: { email }</Title>
                    <Title level={ 3 }>Дата народження: { birthday }</Title>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = ({ profile }) => {
    console.log(profile);
    return {
        stydentProfile: profile.data,
        isLoading: profile.loading,
        isFailed: profile.failed,
        error: profile.errors
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getProfile: () => {
            dispatch(ProfileActions.getProfile());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
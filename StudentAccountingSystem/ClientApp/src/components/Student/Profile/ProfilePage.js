import React, { Component } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import * as ProfileActions from "./reducer";
import { connect } from 'react-redux';
import Spinner from '../../Spinner';

const { Title } = Typography;
class ProfilePage extends Component {
    
    componentDidMount() {
        this.props.getProfile();
    }
  

    render() {
        const {id, name, email, image, birthday} = this.props.stydentProfile;
        return (
            <Row>
              {this.props.isLoading && <Spinner/>}
                <Col xs={ 24 } md={ 12 } xl={ 8 } style={ { paddingLeft: 20, paddingRight: 20 } }>
                    <img src={`${image}?t=${new Date().getTime()}`} width="100%" />
                    <Button size={ "large" } style={ { width: "100%", marginTop: 5 } }>Edit photo</Button>
                </Col>
                <Col xs={ 24 } md={ 12 } xl={ 16 } style={ { paddingLeft: 20, paddingRight: 20 } }>
                    <Title>{name}</Title>
                    <Title level={ 3 }>Email: {email}</Title>
                    <Title level={ 3 }>Дата народження: {birthday}</Title>
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
import React, { Component } from 'react';
import { Row, Col, Tabs, Typography, Button } from 'antd';
import * as ProfileActions from "./reducer";
import { connect } from 'react-redux';

const { Title } = Typography;
class ProfilePage extends Component {
    
    componentDidMount() {
        this.props.getProfile();
    }
  

    render() {
        const {id, name, email, image} = this.props.stydentProfile;
        return (
            <Row>
              {this.props.isLoading && <div>SSSSS</div>}

                <Col xs={ 24 } md={ 12 } xl={ 8 } style={ { paddingLeft: 20, paddingRight: 20 } }>
                    <img src={image} width="100%" />
                    <Button size={ "large" } style={ { width: "100%", marginTop: 5 } }>Edit photo</Button>
                </Col>
                <Col xs={ 24 } md={ 12 } xl={ 16 } style={ { paddingLeft: 20, paddingRight: 20 } }>
                    <Title>{name}</Title>
                    <Title level={ 2 }>Email: {email}</Title>
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
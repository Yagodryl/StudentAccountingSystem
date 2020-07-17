import React, { Component } from 'react';
import { Row, Col,Typography } from 'antd';
import * as StudentProfileActions from "./reducer";
import { connect } from 'react-redux';

const { Title } = Typography;

class StudentPage extends Component {
    state = {}

    componentDidMount() {
        const { id } = this.props.match.params;
        console.log("StudentId: ", id);
        this.props.getStudentProfile(id);
    }

    render() {
        const { id, name, email, image, birthday } = this.props.studentProfile;

        return (
            <Row>
                <Col xs={ 24 } md={ 10 } xl={ 6 } style={ { paddingLeft: 20, paddingRight: 20 } }>
                    <img src={ `${image}?t=${new Date().getTime()}` } width="100%" />
                </Col>
                <Col xs={ 24 } md={ 14 } xl={ 18 } style={ { paddingLeft: 20, paddingRight: 20 } }>
                    <Title level={ 3 }>{ name }</Title>
                    <Title level={ 3 }>Email: { email }</Title>
                    <Title level={ 3 }>Дата народження: { birthday }</Title>
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
        error: studentProfile.errors
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getStudentProfile: (id) => {
            dispatch(StudentProfileActions.getStudentProfile(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentPage);
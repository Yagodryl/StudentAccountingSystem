import React, { Component } from 'react';
import * as CourseInfoActions from "./reducer";
import { connect } from 'react-redux';
import Spinner from '../../Spinner';
import { Typography, Row, Col, Alert } from 'antd';
import SubscribeForm from './SubscribeForm';

const { Title } = Typography;

class CourseInfoPage extends Component {
    state = {}
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getCourseInfo(id);
    }
    subsctibe = (values) => {
        const { id } = this.props.match.params;
        values.courseId = id;
        this.props.subscribeCourse(values);
    }
    render() {
        const { isLoading, CourseInfo } = this.props;
        return (
            <div>
                { isLoading && <Spinner /> }
                <div style={ { textAlign: "center" } }>
                    <Title>{ CourseInfo.title }</Title>
                </div>
                <Row>
                    <Col style={ { padding: 15 } } xs={ 24 } sm={ 12 }>
                        <img alt={ CourseInfo.title } src={ CourseInfo.image } width="100%" />
                    </Col>
                    <Col style={ { padding: 15 } } xs={ 24 } sm={ 12 }>
                        <span style={ { whiteSpace: "pre-line" } }> { CourseInfo.shortDescription }</span>
                        { (CourseInfo.isSubscribed == true) ? <Alert message={ `Ви вже підписані на данний курс! Початок занять ${CourseInfo.startDate}` } type="warning" /> :
                            <SubscribeForm subscribe={ this.subsctibe } /> }
                    </Col>
                </Row>
                <div style={ { padding: 15 } }>
                    <span style={ { whiteSpace: "pre-line" } }> { CourseInfo.description }</span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ courseInfo }) => {
    return {
        CourseInfo: courseInfo.data,
        isLoading: courseInfo.loading,
        isFailed: courseInfo.failed,
        error: courseInfo.errors
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getCourseInfo: (id) => {
            dispatch(CourseInfoActions.getCourseInfo(id));
        },
        subscribeCourse: (model) => {
            dispatch(CourseInfoActions.subscribe(model));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseInfoPage);
import React, { Component } from 'react';
import CourseItem from "../CustomElements/CourseItem";
import { Typography, Row } from 'antd';
import * as MyCoursesActions from "./reducer";
import Spinner from '../../Spinner';
import { connect } from 'react-redux';


const { Title } = Typography;

class MyCoursesPage extends Component {
    state = {}

    componentDidMount(){
        this.props.getMyCourses();
    }

    render() {
        const { listCourses = [], isLoading, error } = this.props

        const content = listCourses.map(item => {
            return <CourseItem id={ item.id }
                description={ item.description }
                image={ item.image }
                title={ item.title }
                key={ item.id } />
        })

        return (
            <React.Fragment>
                <Title level={ 1 }>Мої курси</Title>
                <Row>
                    { content }
                </Row>
                { isLoading && <Spinner /> }
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ myCourses }) => {
    return {
        listCourses: myCourses.data,
        isLoading: myCourses.loading,
        isFailed: myCourses.failed,
        error: myCourses.errors
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getMyCourses: () => {
            dispatch(MyCoursesActions.getMyCourses());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCoursesPage);
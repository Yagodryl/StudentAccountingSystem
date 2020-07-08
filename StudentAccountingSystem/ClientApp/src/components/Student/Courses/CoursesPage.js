import React, { Component } from 'react'; 
import { Row } from 'antd';
import CourseItem from "../CustomElements/CourseItem"
import * as CoursesActions from "./reducer";
import { connect } from 'react-redux';
import Spinner from '../../Spinner';

class CoursesPage extends Component {
    state = {  }

    componentDidMount(){
        this.props.getCourses();
    }

    render() { 

        const {listCourses=[], isLoading, error} = this.props

        const content = listCourses.map(item=>{
            return <CourseItem id={item.id} 
                    description ={item.description}
                    image = {item.image}
                    title = {item.title}
                    key = {item.id} />
        })

        return ( 
            <Row>
                 {isLoading && <Spinner/>}
                 {content}
            </Row>
         );
    }
}
 
const mapStateToProps = ({ courses }) => {
    return {
        listCourses: courses.data,
        isLoading: courses.loading,
        isFailed: courses.failed,
        error: courses.errors
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getCourses  : () => {
            dispatch(CoursesActions.getCourses());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
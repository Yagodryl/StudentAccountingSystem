import React, { Component } from 'react';
import * as CourseInfoActions from "./reducer";
import { connect } from 'react-redux';
import Spinner from '../../Spinner';

class CourseInfoPage extends Component {
    state = {  }
    componentDidMount(){
        const {id} = this.props.match.params;
        console.log("ID:", id);
        this.props.getCourseInfo(id);
    }
    render() { 
        const{isLoading, CourseInfo} = this.props;
        return ( 
            <div>
                {isLoading && <Spinner/>}
                {CourseInfo.description}
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
        getCourseInfo  : (id) => {
            dispatch(CourseInfoActions.getCourseInfo(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseInfoPage);
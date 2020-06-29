import React, { Component } from 'react'; 
import { Row } from 'antd';
import CourseItem from "../CustomElements/CourseItem"
class CoursesPage extends Component {
    state = {  }
    render() { 
        return ( 
            <Row>
                <CourseItem/>
                <CourseItem/>

                <CourseItem/>

            </Row>
         );
    }
}
 
export default CoursesPage;
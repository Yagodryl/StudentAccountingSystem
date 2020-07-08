import axios from "axios";

export default class CourseInfoServices{
    static getCourseInfo(id){
        return axios.get(`api/Course/get-course-info/${id}`);
    }
}
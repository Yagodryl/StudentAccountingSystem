import axios from "axios";

export default class CoursesServices {
    static getCourses=()=>{
        return axios.get("api/course/list-courses");
    }
}
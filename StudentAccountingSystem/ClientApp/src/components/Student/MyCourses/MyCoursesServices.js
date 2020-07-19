import axios from "axios";

export default class CoursesServices {
    static getMyCourses=()=>{
        return axios.get("api/course/list-my-courses");
    }
}
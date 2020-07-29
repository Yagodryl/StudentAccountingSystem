import axios from "axios";

export default class ListCoursesServices {
    static getCourses=()=>{
        return axios.get("api/admin/get-list-courses");
    }
}
import axios from "axios";

export default class StudentServices {
    static getStudentProfile = (id)=>{
        console.log("SSS", id);
        return axios.get(`api/admin/get-student-profile/${id}`);
    }
}
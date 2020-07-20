import axios from "axios";

export default class StudentServices {
    static getStudentProfile = (id)=>{
        return axios.get(`api/admin/get-student-profile/${id}`);
    }
    static editStudentProfile = (model)=>{
        return axios.post(`api/admin/edit-student-profile`,model );
    }
}
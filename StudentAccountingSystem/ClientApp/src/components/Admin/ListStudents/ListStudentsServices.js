import axios from "axios"

export default class ListStudentsServices {
    static getListStudent(filter){
        return axios.post('api/admin/get-list-students',filter);
    }
}
import axios from 'axios';

export default class AddCourseServices {
    static addCourse(model){
        return axios.post('api/admin/add-course', model);
    }
}

import React from 'react';

const ListStudents = React.lazy(()=>import('../components/Admin/ListStudents'));
const AddCoursePage = React.lazy(()=>import('../components/Admin/AddCourse'));
const adminRoutes = [
    {path: '/admin/list-students', exact: true, name: 'List Students', component: ListStudents  },
    {path: '/admin/add-course', exact: true, name: 'Add course', component: AddCoursePage  },

];
export default adminRoutes;
import React from 'react';

const ListStudents = React.lazy(()=>import('../components/Admin/ListStudents'));
const AddCoursePage = React.lazy(()=>import('../components/Admin/AddCourse'));
const StudentInfo = React.lazy(()=>import('../components/Admin/Student'));
const ListCourses = React.lazy(()=>import('../components/Admin/ListCourses'));

const adminRoutes = [
    {path: '/admin/list-students', exact: true, name: 'List Students', component: ListStudents  },
    {path: '/admin/add-course', exact: true, name: 'Add course', component: AddCoursePage  },
    {path: '/admin/student-info/:id', exact: true, name: 'Student info', component: StudentInfo  },
    {path: '/admin/list-courses', exact: true, name: 'List Courses', component: ListCourses  },

];
export default adminRoutes;
import React from 'react';

const StudentProfile = React.lazy(()=> import("../components/Student/Profile"));
const Courses = React.lazy(()=>import("../components/Student/Courses"));
const CourseInfo = React.lazy(()=>import("../components/Student/CourseInfo"));


const studentRoutes = [
    { path: '/student/profile', exact: true, name: 'Profile', component: StudentProfile  },
    { path: '/student/list-courses', exact: true, name: 'List courses', component: Courses  },
    { path: '/student/course-info/:id', exact: true, name: 'Course Info', component: CourseInfo  },


];
export default studentRoutes;
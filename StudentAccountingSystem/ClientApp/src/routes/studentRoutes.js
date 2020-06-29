import React from 'react';

const StudentProfile = React.lazy(()=> import("../components/Student/Profile"));
const Courses = React.lazy(()=>import("../components/Student/Courses"));

const studentRoutes = [
    { path: '/student/profile', exact: true, name: 'Profile', component: StudentProfile  },
    { path: '/student/list-courses', exact: true, name: 'List courses', component: Courses  },


];
export default studentRoutes;
import React from 'react';

const StudentProfile = React.lazy(()=> import("../components/Student/Profile"));

const studentRoutes = [
    { path: '/student/profile', exact: true, name: 'Profile', component: StudentProfile  },

];
export default studentRoutes;
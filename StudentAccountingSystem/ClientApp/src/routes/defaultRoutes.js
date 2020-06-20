import React from 'react';

const LoginAndRegisterPage = React.lazy(() => import("../components/LoginAndRegister"));
const defaultRoutes = [
    { path: '/login', exact: true, name: 'LoginAndRegister', component: LoginAndRegisterPage  },
];
export default defaultRoutes;
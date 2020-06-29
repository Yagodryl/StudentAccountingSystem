import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import MainLayout from "./MainLayout";
import studentRoutes from '../../routes/studentRoutes';
import Spinner from '../../components/Spinner';


class StudentLayout extends Component {
    render() { 
        return ( 
            <MainLayout>
                 <Suspense fallback={ <Spinner/> }>
                    <Switch>
                        { studentRoutes.map((route, idx) => {
                            return route.component ? (
                                <Route
                                    key={ idx }
                                    path={ route.path }
                                    exact={ route.exact }
                                    name={ route.name }
                                    render={ props => (
                                        <route.component { ...props } />
                                    ) } />
                            ) : (null);
                        }) }
                        <Redirect from="/" to="/login" />
                    </Switch>
                </Suspense>
            </MainLayout>
         );
    }
}
 
export default StudentLayout;
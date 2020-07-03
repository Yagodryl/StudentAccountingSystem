import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import MainLayout from "./MainLayout";
import adminRoutes from '../../routes/adminRoutes';
import Spinner from '../../components/Spinner';


class StudentLayout extends Component {
    render() {
        return (
            <MainLayout>
                <Suspense fallback={ <Spinner /> }>
                    <Switch>
                        { adminRoutes.map((route, idx) => {
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
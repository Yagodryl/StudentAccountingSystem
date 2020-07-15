import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from './Layout';
import defaultRoutes from '../../routes/defaultRoutes';
import Spinner from '../../components/Spinner';
class DefaultLayout extends Component {

    render() {
        return (
            <Layout>
                <Suspense fallback={ <Spinner/> }>
                    <Switch>
                        { defaultRoutes.map((route, idx) => {
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
                        <Redirect from="/hangfire" to="/hangfire" />
                        <Redirect from="/" to="/login" />

                    </Switch>
                </Suspense>

            </Layout>
        );
    }
}
export default DefaultLayout;
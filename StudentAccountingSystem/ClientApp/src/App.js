import React, { Suspense, Component } from 'react';
import { Route, Switch } from "react-router";
import 'antd/dist/antd.css';
import Spinner from './components/Spinner';


const DefaultLayout = React.lazy(()=> import("./containers/DefaultLayout"))
const StudentLayout = React.lazy(() => import('./containers/StudentLayout'));
const AdminLayout = React.lazy(() => import('./containers/AdminLayout'));

class App extends Component {

  state = {
    isLoading: false,
    isError: false
  }

  render() {
    return (
      <Suspense fallback={ <Spinner/> }>
        <Switch>
          <Route path="/student" name="Student" render={ props => <StudentLayout { ...props } /> } />
          <Route path="/admin" name="Admin" render={ props => <AdminLayout { ...props } /> } />
          <Route path="/" name="Default"
            render={ props => <DefaultLayout { ...props } /> } />
        </Switch>
      </Suspense>
    )
  }
};
export default App;
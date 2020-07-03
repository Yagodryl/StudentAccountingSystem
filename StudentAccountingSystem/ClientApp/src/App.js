import React, { Suspense, Component } from 'react';
// import DefaultLayout from "./containers/DefaultLayout";
import { Redirect, Route, Switch } from "react-router";
import 'antd/dist/antd.css';
import Spinner from './components/Spinner';



// export default () => (
//   <Layout>
//     <Route exact path='/' component={Home} />
//     {/* <Route path='/counter' component={Counter} />
//     <Route path='/fetch-data/:startDateIndex?' component={FetchData} /> */}
//   </Layout>
// );

const DefaultLayout = React.lazy(()=> import("./containers/DefaultLayout"))
const StudentLayout = React.lazy(() => import('./containers/StudentLayout'));
const AdminLayout = React.lazy(() => import('./containers/AdminLayout'));

class App extends Component {

  state = {
    isLoading: false,
    isError: false
  }

  componentDidMount() {


    //   auth.signInAnonymously().then((snap) => {
    //     console.log("snap App___",snap);
    //     this.setState({ isLoading: false, isError: false });
    //   })
    //   .catch((err)=>{
    //     console.log("Error App___",err)
    //     this.setState({ isLoading: false, isError: true });
    //   })
  }

  render() {


    return (

      // (this.state.isLoading) ? ( <div>Загрузка...</div> ) : ( this.state.isError? <div>Error</div> :(

      <Suspense fallback={ <Spinner/> }>
        <Switch>

          <Route path="/student" name="Student" render={ props => <StudentLayout { ...props } /> } />
          <Route path="/admin" name="Admin" render={ props => <AdminLayout { ...props } /> } />
          <Route path="/" name="Default"
            render={ props => <DefaultLayout { ...props } /> } />

        </Switch>
      </Suspense>
    )


    // );
  }
};
export default App;
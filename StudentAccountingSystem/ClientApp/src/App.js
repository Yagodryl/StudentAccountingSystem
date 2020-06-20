import React, {Suspense, Component} from 'react';
import DefaultLayout from "./containers/DefaultLayout";
import { Redirect, Route, Switch } from "react-router";
import 'antd/dist/antd.css';



// export default () => (
//   <Layout>
//     <Route exact path='/' component={Home} />
//     {/* <Route path='/counter' component={Counter} />
//     <Route path='/fetch-data/:startDateIndex?' component={FetchData} /> */}
//   </Layout>
// );


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

      <Suspense fallback={ <div>Загрузка...</div> }>
        <Switch>

          <Route path="/" name="Default"
            render={ props => <DefaultLayout { ...props } /> } />

        </Switch>
      </Suspense>
      )


    // );
  }
};
export default App;
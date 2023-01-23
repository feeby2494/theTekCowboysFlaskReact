import React, { Component } from 'react';
import { Route, Switch, BrowserRouter} from 'react-router-dom';
import Navigation from './components/navigation/Navigation'
import './App.css';
import Home from './views/home/Home';
import Login from './views/login/Login';
import Secret from './views/secret/Secret';
import withAuth from './hoc/withAuth';
import withAdmin from './hoc/withAdmin';
import Logout from './views/logout/Logout';
import Register from './views/register/Register';
import UserHome from './views/userhome/UserHome';
import Footer from './components/footer/Footer';
import About from './views/about/About';

import RepairAdmin from "views/repair_admin/RepairAdmin";
import { PriceList } from 'views/price_list/PriceList';
import RepairHome from 'views/repair/RepairHome';



// Need to go mod all the services to get the right things from API

// Need to mod all components to have a componentDidMount function
// to check if api works : how to test to show only something that
// users or admins are authorized to see?

// need to get login and logout buttons to change depending on user

class App extends Component {

  constructor(props) {
    super(props);


    this.state = {
      // showModerator: false,
      showAdmin: false,
      currentUser: undefined,
      currentToken: localStorage.getItem('token'),
    }

  }


  render() {
    return (
      <div className="App">
        <BrowserRouter >
          <Navigation />
          <div className="flex-container">

            {this.state.showAdmin && (
              <li className="nav-item">
                You are logged in, {this.state.currentUser.username}!
                And you're an Admin!
              </li>
            )}

            {this.state.currentUser && (
              <li className="nav-item">
                You are logged in, {this.state.currentUser.username}!
              </li>
            )}

            <Switch>

              <Route path="/" exact component={Home} />
              <Route path="/secret" component={withAuth(Secret)} />
              <Route path="/login" >
                <Login  history={this.props.history} loggedIn={this.state.loggedIn}/>
              </Route>
              <Route path="/logout">
                  <Logout history={this.props.history} loggedIn={this.state.loggedIn}/>
              </Route>
              <Route path="/register" component ={Register}/>
              <Route path="/about" exact component={About} />
              <Route path="/price_list" component={PriceList} />
              <Route path="/repair" component={RepairHome} />
              
              <Route path="/admin" component ={withAdmin(RepairAdmin)}/>
              <Route path="/:personId" component ={UserHome}/>
            </Switch>
          </div>
          <div className="clearfix mb-5">
            <br />
            <br />
            <br />
            <br />
          </div>
          <Footer />
        </BrowserRouter>
        
        

      </div>
    );
  }
}

export default App;

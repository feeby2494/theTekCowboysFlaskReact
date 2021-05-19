import React, { Component, useEffect} from 'react';
import { Route, Switch, BrowserRouter} from 'react-router-dom';
import FlashCardSpace from './FlashCardSpace';
import Navigation from './Navigation'
import './App.css';
import Home from './home/Home';
import Login from './login/Login';
import Secret from './secret/Secret';
import withAuth from './hoc/withAuth';
import Logout from './logout/Logout';
import Register from './register/Register';
import UserHome from './userhome/UserHome';
import Footer from './footer/Footer';
import About from './about/About';
import RepairService from './services/device_repair/RepairService';
import TutoringLanguageService from './services/language_tutoring/TutoringLanguageService';
import WebProjectService from './services/web_project/WebProjectService';


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
// Can't use this hook in classes
// useEffect(() => {
//     window.addEventListener('storage', () => {
//       this.setState({
//         currentToken: localStorage.getItem('token')
//       });
//     });
//   }, [])

// Where the hell did changeLoggedInStatus() go?

  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <Navigation/>
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

          <Route path="/flashcards" exact component={FlashCardSpace} />
          <Route path="/" exact component={Home} />
          <Route path="/secret" component={withAuth(Secret)} />
          <Route path="/login" >
            <Login  history={this.props.history}/>
          </Route>
          <Route path="/logout" component ={Logout}/>
          <Route path="/register" component ={Register}/>
          <Route path="/about" exact component={About} />
          <Route path="/device_repair" exact component={RepairService} />
          <Route path="/language_tutoring" exact component={TutoringLanguageService} />
          <Route path="/web_project" exact component={WebProjectService} />
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

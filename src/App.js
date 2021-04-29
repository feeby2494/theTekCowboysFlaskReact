import React from 'react';
import { Route, Switch, BrowserRouter} from 'react-router-dom';
import FlashCardSpace from './FlashCardSpace';
import Navigation from './Navigation'
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation />
     <div className="flex-container">
     <Switch>

        <Route path="/flashcards" exact component={FlashCardSpace} />
        
        {/*  />
        <Route path="/study" component={withAuth(Secret)} />
        <Route path="/login" component={Login} />
        <Route path ="/logout" component ={Logout}/> */}

     </Switch>
     </div>
     </BrowserRouter>

    </div>
  );
}

export default App;

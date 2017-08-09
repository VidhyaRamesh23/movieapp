import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './components/Login';
import Dashboard from './components/Dashboard'
import Search from './components/Search'
import {BrowserRouter as Router, Route} from 'react-router-dom';



ReactDOM.render(
     <MuiThemeProvider>
              <Router>
                    <div>
                          <Route exact path="/" component={Login} />
                          <Route path="/Dashboard" component={Dashboard} />
                          <Route path="/search" component={Search} />
                        
                    </div>
              </Router>
     </MuiThemeProvider>, document.getElementById('root'));

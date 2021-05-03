
import './App.css';
import Card from './components/card/card';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Search from './components/search/search';
import update from './components/update/update';
import Create from './components/create/create';
import ProtectedRoute from './components/protected-route/protectedroute'
import Signup from './components/signup/signup'
import Login from './components/login/login'
import Forgotpassword from './components/forgotpassword/forgotpassword'
import Resetpassword from './components/resetpassword/resetpassword'
import Landingpage from './components/landingpage/landingpage'

function App() {
  const options = {
    timeout: 3000,
    position: positions.TOP_RIGHT
  };
  return (
    <Provider template={AlertTemplate} {...options}><Router>
      <Switch>
      <ProtectedRoute exact path="/create" component={Create}></ProtectedRoute>
      <ProtectedRoute exact path="/app" component={Card} />
      <ProtectedRoute exact path="/search" component={Search}/>
      <ProtectedRoute exact path="/Update/:informationId" component={update}></ProtectedRoute>
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgotpassword" component={Forgotpassword} />
      <Route path="/reset-password/:resetToken" component={Resetpassword} />
      <Route exact path="/" component={Landingpage} />
      </Switch>
    </Router>
    </Provider>
   
  );
}

export default App;

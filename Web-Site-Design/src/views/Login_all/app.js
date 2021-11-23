import './app.css'
import Loginpage from "./Loginpage/Loginpage"
import Login from "./Login/Login"
import Register from "./Register/Register"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

function App() {

  const [ user, setLoginUser] = useState({})

  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem("MyUser")))
  }, [])

  const updateHospital = (user) => {
    localStorage.setItem("MyUser", JSON.stringify(user))
    if (user === undefined) {
      localStorage.clear()
    }
    else{setLoginUser(user)}
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/admin/areum">
            {
              user && user._id ? <Loginpage updateHospital={updateHospital} /> : <Login updateHospital={updateHospital}/>
            }
          </Route>
          <Route path="/admin/areum/login">
            <Login updateHospital={updateHospital}/>
          </Route>
          <Route path="/admin/areum/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
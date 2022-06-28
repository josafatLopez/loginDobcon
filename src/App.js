import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';
import { logUser } from './api/user';

function App() {

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");

  const handleChange = e => {

     setUser(prevUser => ({ ...prevUser, [e.target.name]: e.target.value }))
     console.log(user)
     if (e.target.value == '') {
        setError('Please Complete the Fields')
        return
     }
     if (!/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/.test(e.target.value) && e.target.classList.contains('email')){
        setError('Please enter a valid email address')
        return
     }

     setError(null)
  }

  const handleSubmit = async e => {
     console.log(user)
     //let response = {status: 'failed'};
     let response = await logUser(user);
     console.log(response);
     //response.status = "sucess";
     response !== undefined && response.status === 200 ? navigate.push("/") : console.log("Please Complete All the Fields")
  };
  return (
     <div className="loginPage">
        <div className="general__container flex__container">

           <div className="col__40 align__center">
              <div>
                 <img loading="lazy" className="logoLogin" src="/img/logo/logo-large.png" alt="Dobcon Logo" /><br /><br />
                 <p className="generalParagraph justify hideOn__mobile">
                    Analyze your DevOps financial and performance metrics, identify and optimize your team performance by measuring the efficiency of your software delivery pipeline, and monitor your DevOps operation to improve your initiatives.
                 </p>
              </div>
           </div>
           <div className="col__50">

              <br className="hideOn__desktop" /><h1 className="big__title">Welcome!</h1><br className="hideOn__desktop" /><br className="hideOn__desktop" />

              <form className="loginForm">
                 <h2>LOG IN</h2>
                 <br />
                 {
                    error && (
                       <div className="alert__message">
                          <i className="fas fa-exclamation-triangle"></i> {error}
                       </div>
                    )
                 }
                 <br />
                 <input type="email" className="large__input email" placeholder="&#xf0e0; E-mail" name="email" onChange={handleChange} />
                 <br /><br />
                 <input type="password" className="large__input" placeholder="&#xf023; Password" name="password" onChange={handleChange} />
                 <br /><br />
                 <span className="float__right"><i className="dobcon__light--gray">Forgot password? <a href="/forgot-password"><u className="dobcon__light--gray">Click here</u></a></i></span>
                 <br /><br /><br />
                 <div className="flex__container">
                    <label className="chksqre__container"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Remember Me</i>
                       <input type="checkbox" />
                       <span className="square__checkmark"></span>
                    </label>
                    <button onClick={handleSubmit} className="red__btn small__btn">Login</button>
                 </div>
              </form>

              <br /><br />
              <div className="flex__container no-wrap">
                 <hr className="mid__line" /> Or create a new account <hr className="mid__line" />
              </div>
              <div className="flex__container textAlign__center">
                 <button className="red__btn medium__btn" onClick={() => navigate.push("/sign-up")}>Sign Up</button>
              </div>
           </div>

        </div>
     </div>
  )
}

export default App;

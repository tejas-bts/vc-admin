import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { signIn } from "../../services/authentication.services";
import { setCurrentUser } from "../../utils/user";

const ConfirmContactData = () => {


  console.log('In login')

  let initialState = { username: "", password: "" };
  const [credentials, setCredentials] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});

  let history = useHistory();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSignIn = async () => {
    let newError = {};
    if(!credentials.username) {
      newError = {...newError, email: true}
    }
    if(!credentials.password) {
      newError = {...newError, password: true}
    }
    setError(newError);

    if(Object.keys(newError).length === 0) {
      try {
        setLoading(true);
        const user = await signIn({...credentials, loginType:'staff' });
        setCurrentUser(user);
        history.push('../home')
      }
      catch (error) {
        setError({serverSideError : error.message})
      }
      finally {
        setLoading(false);
      }
    }
  }

  return (
    <div>
      <div className="login-wrapper">
        {/* Main Wrapper */}
        <div className="login-wrapper columns is-gapless">
          {/*Left Side (Desktop Only)*/}
          <div className="column is-6 is-hidden-mobile hero-banner">
            <div className="hero is-fullheight is-login">
              <div className="hero-body">
                <div className="container">
                  <div className="left-caption">
                    <h2>Join an Exciting Virtual Experience. </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Right Side*/}
          <div className="column is-6">
            <div className="hero form-hero is-fullheight">
              {/*Logo*/}
              <div className="logo-wrap">
                <div className="wrap-inner">
                  {/* <img src={} alt="" /> */}
                </div>
              </div>
              {/*Login Form*/}
              <div className="hero-body">
                <div className="form-wrapper">
                  { loading ?
                    <i class="fa fa-spinner fa-spin" style={{fontSize:'3rem', textAlign:'center'}}/> 
                    : 
                    <div className="login-form">
                    <div className="field">
                      <label>First Name</label>  
                        <div className="control">
                          <input
                            className={`input email-input ${error.email ? 'error' : ''}`}
                            type="text"
                            placeholder="John"
                            name="fname"
                            value={ credentials.fname }
                            onChange={handleChange}
                          />
                          <div className="input-icon">
                            <i data-feather="user" />
                          </div>
                        </div>
                      </div>
                      <div className="field">
                        <label>Last Name</label>  
                        <div className="control">
                          <input
                            className={`input email-input ${error.email ? 'error' : ''}`}
                            type="text"
                            placeholder="Doe"
                            name="lname"
                            value={ credentials.lname }
                            onChange={handleChange}
                          />
                          <div className="input-icon">
                            <i data-feather="user" />
                          </div>
                        </div>
                      </div>
                      <div className="field">
                        <label>Password</label> 
                        <div className="control">
                          <input
                            className={`input password-input ${error.password ? 'error' : ''}`}
                            type="password"
                            placeholder="●●●●●●●●"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                          />
                          <div className="input-icon">
                            <i data-feather="lock" />
                          </div>
                        </div>
                      </div>
                      <div className="field">
                        <label>Confirm Password</label> 
                        <div className="control">
                          <input
                            className={`input password-input ${error.password ? 'error' : ''}`}
                            type="password"
                            placeholder="●●●●●●●●"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                          />
                          <div className="input-icon">
                            <i data-feather="lock" />
                          </div>
                        </div>
                      </div>
                      {error.serverSideError && <div className="field">
                        <div className="login-error-text">
                          Error : {error.serverSideError}
                        </div>
                      </div>}
                      <div className="field">
                        <div className="column">
                          <button className="button is-solid primary-button raised is-rounded is-fullwidth" onClick={handleSignIn} > 
                          { loading ? <i class="fa fa-spinner fa-spin" /> : 'Login'}
                          </button>
                        </div>
                      </div>
                    </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ConfirmContactData;
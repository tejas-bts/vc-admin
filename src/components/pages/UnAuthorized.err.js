import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signIn } from "../../services/authentication.services";
import { setCurrentUser } from "../../utils/user";

const UnAuthorized = () => {

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
                    <h4>403 !</h4>
                    <h5>You are not authorized!</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Right Side*/}
          <div className="column is-6">
            <div className="hero form-hero is-fullheight justify-content-center" style={{background: 'white'}}>
              {/*Logo*/}
              <div className="logo-wrap">
                <div className="wrap-inner">
                  <img src="/assets/img/vclogo.png" alt="" />
                </div>
              </div>
              <div className="d-flex  justify-content-center aligh-items-center">
                <img src="/assets/img/unauthorized.jpg" alt="" />
                {/* <h1 className="text-center">You are not authorized to view this page!</h1> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnAuthorized;
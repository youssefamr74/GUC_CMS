import React from "react";
import { useNavigate } from "react-router-dom";
import "./resetpassword.css";

function Resetpassword() {
  const history = useNavigate();

  const doSomething = (e) => {
    e.preventDefault();
    alert("Password Changed\nYou can now sign in with your new password.");
    history("/login");
  };

  return (
    <div>
      <div className="resetContainer">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="resetform text-center">
                  <h3>
                    <i className="fa fa-lock fa-4x"></i>
                  </h3>
                  <h2 className="text-center">Forgot Password?</h2>
                  <p>You can reset your password here.</p>
                  <div className="panel-body">
                    {/* method="post" */}
                    <form id="register-form" onSubmit={doSomething}>
                      <div className="form-group">
                        <div className="emailIcon input-group">
                          <span className="icon input-group-addon">
                            <i
                              className="fas fa-envelope fa-3x"
                              aria-hidden="true"
                            ></i>
                          </span>
                          <input
                            id="email"
                            name="email"
                            placeholder="email address"
                            className="form-control"
                            type="email"
                          ></input>
                        </div>
                      </div>
                      <div className="buttonIcon form-group">
                        <input
                          name="recover-submit"
                          className="btn btn-md btn-primary btn-block rounded"
                          value="Reset Password"
                          type="submit"
                        ></input>
                      </div>

                      <input
                        type="hidden"
                        className="hide"
                        name="token"
                        id="token"
                        value=""
                      ></input>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resetpassword;

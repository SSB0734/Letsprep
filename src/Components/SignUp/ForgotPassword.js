import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import "../../Styles/ForgotPassword.css";
import { auth } from "../../firebaseApp";
import { useHistory } from "react-router-dom";

function ForgotPassword() {
  const [forgotEmail, setForgotEmail] = useState("");
  const history = useHistory();

  const forgotPassword = () => {
    // var auth = fire.auth();
    if (forgotEmail !== "") {
      auth
        .sendPasswordResetEmail(forgotEmail)
        .then(function () {
          alert(
            "Email has been sent to you, Please check and verify..and then you can sign in again.."
          );
          history.push("/SignUp");
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;

          // //console.log(errorCode);
          // //console.log(errorMessage);

          alert("Error Message: " + errorMessage);
        });
    } else {
      alert("Please write your email first!");
    }
  };

  return (
    <div className='container-fluid'>
      <br></br>
      <br></br>
      <center>
        <h3>Forgot Password</h3>
      </center>
      <br></br>
      <center>
        <Paper className='fpPaper' elevation={3}>
          <div className='fp'>
            <p className='parafp'>
              Please enter your email address below and we will send you
              information to recover your account..
            </p>
            <br></br>
            <input
              className='inputfp'
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder='enter your email..'
            />
            <br></br>
            <br></br>
            <button onClick={forgotPassword}>Reset Password</button>
          </div>
        </Paper>
      </center>
    </div>
  );
}

export default ForgotPassword;

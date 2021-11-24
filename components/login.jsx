import Link from "next/link"; 
import React, {useState} from 'react';
import { useFormik } from "formik";
import Router from 'next/router'
import * as Yup from 'yup';

const Login = () => {

    const [userCred, setUserCreds] = useState({
        email:'',
        password: ''
    })

    const validationSchema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required("Email is a required field"),
        password: Yup.string()
          .required("Please enter your password")
          .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character"
          ),
    })

    const formik = useFormik({
        enableReinitialize: true,
        validateOnChange:false,
        validateOnBlur:false,
        initialValues: userCred,
        validationSchema: validationSchema,
        onSubmit:async (values) => {
            console.log("this is onsubmit",values);
        }
      });

    const verifyUser =  () => {
        let data = JSON.parse(localStorage.getItem('userData')) 
        data.map(i => {
            if(i.email.toString() === userCred.email.toString() && i.password.toString() === userCred.password.toString()){
                Router.push("/HomePage")
                console.log('true')
            } 
        })
    } 

    return (
      <>
          <div className="cont">
              <span className="c1"></span>
              <span className="c2"></span>
              <div className="title-cont">
                  <span>Numen</span>
                  <span>Movies</span>
              </div>
              <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={formik.handleSubmit} className="field-cont">
                    <div>
                        <input onChange={(e) => {setUserCreds({...userCred,[e.target.name] : e.target.value}); formik.handleChange}}  
                        className="field" 
                        id="email" 
                        name="email" 
                        placeholder="Email"
                        onBlur={formik.handleBlur}   />
                        {formik.errors.email && formik.touched.email && (
                                        <p className="valErr" >{formik.errors.email}</p>
                                    )}
                    </div>         
                    <div>
                        <input onChange={(e) => {setUserCreds({...userCred,[e.target.name] : e.target.value}); formik.handleChange}}
                        className="field" 
                        id="password" 
                        name="password" 
                        placeholder="Password" 
                        type="password"
                        onBlur={formik.handleBlur}  />
                        {formik.errors.password && formik.touched.password && (
                                        <p className="valErr" >{formik.errors.password}</p>
                                    )}
                    </div>       
                    <button onClick={() => verifyUser()} className="field c-point" type="submit">Login</button>
                </form>
              </div>
              <div className="reglogin">
                <span className="disc">Not a user?&nbsp;&nbsp;</span>
                <Link href="/register"><span className="reg c-point"><a>Register</a></span></Link>
              </div>
          </div>
          <style JSX>{`
            .cont{
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content:center;
                align-items:center;
                position: relative;
                overflow: hidden;
            }
            .login-container {
                display: flex;
                flex-direction: column;
                justify-content:center;
                align-items:center;
                height: 50%;
                padding: 30px;
                width: 30%;
                border: none;
                border-radius: 10px;
                box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
            }
            .field-cont{
                width: 80%;
                height: 70%;
                display: flex;
                flex-direction: column;
                justify-content:space-between;
                padding-top: 20px;
            }
            .field{
                width: 100%;
                padding: 8px;
            }
            .c-point{
                cursor: pointer;
            }
            .disc{
                margin-top: 20px;
            }
            .reg{
                margin-top: 20px;
                text-decoration: underline;
            }
            .valErr{
                font-size: 10px;
                color: red;
                margin-top: 5px;
                margin-bottom: 0;
                padding: 0;
            }
            .title-cont{
                height: 20%;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: start;
                padding-left: 100px;
            }
            .title-cont span{
                font-size: 60px;
                font-family: 'Fjalla One', sans-serif;
            }
            .title-cont span:nth-child(2){
                margin-left: 80px;
            }
            .c1 {
                height: 500px;
                width: 500px;
                background-color: #bbb;
                border-radius: 50%;
                display: inline-block;
                position: absolute;
                right: -100px;
                top: -100px;
                z-index: -1;
            }
            .c2 {
                height: 500px;
                width: 500px;
                background-color: #bbb;
                border-radius: 50%;
                display: inline-block;
                position: absolute;
                left: -100px;
                bottom: -100px;
                z-index: -1;
            }
            .reglogin{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
            }
            `}
      </style>
      </>
    );
  };

  export default Login
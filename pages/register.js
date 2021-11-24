import Link from "next/link"; 
import Router from 'next/router'
import React, {useState} from 'react';
import { useFormik } from "formik";
import validationSchema from '../components/valSchema'

const Login = () => {

    const [userCred, setUserCreds] = useState({
        name:'',
        email:'',
        password: ''
    })

      const formik = useFormik({
        enableReinitialize: true,
        validateOnChange:false,
        validateOnBlur:false,
        initialValues: userCred,
        validationSchema: validationSchema,
        onSubmit:async (values) => {
            console.log("this is onsubmit",values);
            let data = JSON.parse(localStorage.getItem('userData')) || []
            data.push(userCred)
            localStorage.setItem("userData", JSON.stringify(data))
            await Router.push("/HomePage")
            .then(() => {
                alert("Registered")
            }) 
        }
      });


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
                    <h1>Register</h1>
                    <form className="field-cont" onSubmit={formik.handleSubmit}>
                            <div>
                                <input onChange={(e) => {setUserCreds({...userCred,[e.target.name] : e.target.value}); formik.handleChange}} 
                                    className="field" 
                                    id="name" 
                                    name="name" 
                                    placeholder="name"
                                    onBlur={formik.handleBlur} 
                                />
                                {formik.errors.name && formik.touched.name && (
                                        <p className="valErr" >{formik.errors.name}</p>
                                    )}
                            </div>  
                            <div>
                                <input onChange={(e) => {setUserCreds({...userCred,[e.target.name] : e.target.value}); formik.handleChange}} 
                                    className="field" 
                                    id="email" 
                                    name="email" 
                                    placeholder="Email"
                                    onBlur={formik.handleBlur} 
                                />
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
                                    onBlur={formik.handleBlur}  
                                />
                                {formik.errors.password && formik.touched.password ? (
                                        <p className="valErr" >{formik.errors.password}</p>
                                    ) : null}
                            </div>       
                            <button type="submit" disabled={!formik.isValid} className="field-btn c-point">Register</button>
                    </form>
                  </div>
                  <div className="reglogin">
                    <span className="disc">Already a user?&nbsp;&nbsp;</span>
                    <Link href="/"><span className="reg c-point"><a>Login</a></span></Link>
                  </div>
              </div>
          <style JSX>{`
            .cont{
                height: 100vh;
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
                padding: 10px;
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
            }
            .field{
                width: 100%;
                padding: 8px;
            }
            .field-btn{
                height: 15%;
            }
            .c-point{
                cursor: pointer;
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
            .reglogin{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
            }
            .disc{
                margin-top: 20px;
            }
            `}
      </style>
      </>
    );
  };

  export default Login
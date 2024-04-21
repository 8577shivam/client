import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik } from 'formik';

function App() {
  const [data, setData] = useState({ email: "", password: "" });
  const [isLogin,setIsLogin]=useState(false)

  async function handleUserRegisteredApi() {
    const res = await axios.post("http://localhost:8080/reg", { data });
  }
  
  if (data.email !== "" && data.password !== "") {
    isLogin?handleUserLogin():handleUserRegisteredApi();
    
  }
async function handleUserLogin(){
  const res = await axios.post("http://localhost:8080/login", { data });
}
  function handleLoginBtn(){
    setIsLogin(!isLogin); 
  }
  function handleErrors(values) {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    return errors;
  }

  return (
    <div className="App">
      {isLogin?<h1>Login Page</h1>:<h1>User registration form</h1>}
      <Formik
        initialValues={{ email: "", password: "", cnfrmPass: "" }}
        validate={(values) => handleErrors(values)}
        onSubmit={(values, { setSubmitting }) => {
          setData({ email: values.email, password: values.password });
          setSubmitting(false);
        }}
      >
        {({
          values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              {isLogin?"Login":"Submit"}
            </button>
          </form>
        )}
      </Formik>
      <div>
        Alrready have account
        <button onClick={handleLoginBtn}>Login</button>
      </div>
    </div>
  );
}

export default App;

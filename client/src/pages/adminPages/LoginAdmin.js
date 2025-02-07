import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postData } from "../../services/api";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const response = await postData("admin/login", values);
      if (response.access_token) {
        localStorage.setItem("token", response.access_token);
        navigate("/organizations");
      } else {
        alert("Login failed!");
      }
    },
  });

  return (
    <div className="dashboard-container">
      <h1><strong>VolunTree🌳 Admin Login</strong></h1>
      <form onSubmit={formik.handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          className="form-control"
        />
        {formik.errors.username && formik.touched.username && (
          <div className="error">{formik.errors.username}</div>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="form-control"
        />
        {formik.errors.password && formik.touched.password && (
          <div className="error">{formik.errors.password}</div>
        )}

        {/* Link to the Sign-Up page */}
        <div>
          <p style={{ margin: "0 0 10px" }}>
            Don't have a Admin account?{" "}
            <Link to="/signup">
              <strong>Sign-Up Here</strong>
            </Link>
          </p>
        </div>

        <button type="submit" className="btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;

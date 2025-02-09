import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { postData } from "../../services/api";

const CreateVolunteer = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10,15}$/, "Phone number must be between 10-15 digits")
        .required("Phone is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await postData("volunteers", values);
        if (!response) {
          setErrors({ general: "Failed to create volunteer. Please try again." });
        } else {
          navigate("/volunteers");
        }
      } catch (error) {
        setErrors({ general: "Server error. Please try again later." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container my-4">
      <h2 className="text-center mb-5">Create New Volunteer</h2>

      {formik.errors.general && <p className="text-danger text-center">{formik.errors.general}</p>}

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input className="form-control" name="name" {...formik.getFieldProps("name")} />
          {formik.touched.name && formik.errors.name && <small className="text-danger">{formik.errors.name}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" name="email" {...formik.getFieldProps("email")} />
          {formik.touched.email && formik.errors.email && <small className="text-danger">{formik.errors.email}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input className="form-control" name="phone" {...formik.getFieldProps("phone")} />
          {formik.touched.phone && formik.errors.phone && <small className="text-danger">{formik.errors.phone}</small>}
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Creating..." : "Create Volunteer"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/volunteers")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateVolunteer;

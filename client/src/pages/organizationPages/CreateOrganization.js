import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { postData } from "../../services/api";

const CreateOrganization = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            contact_name: "",
            contact_phone: "",
            contact_email: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Organization name is required"),
            contact_name: Yup.string().required("Contact name is required"),
            contact_phone: Yup.string()
                .matches(/^\d{10,15}$/, "Phone number must be between 10-15 digits")
                .required("Contact phone is required"),
            contact_email: Yup.string()
                .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address")
                .required("Contact email is required"),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await postData("organizations", values);
                if (!response) {
                    setErrors({ general: "Failed to create organization. Please try again." });
                } else {
                    navigate("/organizations");
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
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Create New Organization</h2>

                    {formik.errors.general && (
                        <p className="text-danger text-center">{formik.errors.general}</p>
                    )}

                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Organization Name</label>
                            <input
                                className="form-control"
                                name="name"
                                placeholder="Enter organization name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <small className="text-danger">{formik.errors.name}</small>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Contact Name</label>
                            <input
                                className="form-control"
                                name="contact_name"
                                placeholder="Enter contact name"
                                value={formik.values.contact_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.contact_name && formik.errors.contact_name && (
                                <small className="text-danger">{formik.errors.contact_name}</small>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Contact Phone</label>
                            <input
                                className="form-control"
                                name="contact_phone"
                                placeholder="Enter contact phone"
                                value={formik.values.contact_phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.contact_phone && formik.errors.contact_phone && (
                                <small className="text-danger">{formik.errors.contact_phone}</small>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Contact Email</label>
                            <input
                                className="form-control"
                                name="contact_email"
                                placeholder="Enter contact email"
                                value={formik.values.contact_email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.contact_email && formik.errors.contact_email && (
                                <small className="text-danger">{formik.errors.contact_email}</small>
                            )}
                        </div>

                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                                {formik.isSubmitting ? "Creating..." : "Create Organization"}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/organizations")}>
                                Cancel
                            </button>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateOrganization;

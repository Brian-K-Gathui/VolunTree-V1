import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; 
import { postData } from "../../services/api";

const CreateOrganization = () => {
    const navigate = useNavigate(); 

    // Initialize Formik
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
            contact_email: Yup.string().email("Invalid email format").required("Contact email is required"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await postData("organizers", values);
                navigate("/organizations"); 
            } catch (error) {
                console.error("Error creating organization:", error);
                alert("Failed to create organization. Please try again.");
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

                    <form onSubmit={formik.handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Organization Name</label>
                            <div className="col-sm-8">
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
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Contact Name</label>
                            <div className="col-sm-8">
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
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Contact Phone</label>
                            <div className="col-sm-8">
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
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Contact Email</label>
                            <div className="col-sm-8">
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
                        </div>

                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary mt-3" disabled={formik.isSubmitting}>
                                    {formik.isSubmitting ? "Creating..." : "Create Organization"}
                                </button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <button type="button" className="btn btn-secondary mt-3" onClick={() => navigate("/organizations")}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateOrganization;

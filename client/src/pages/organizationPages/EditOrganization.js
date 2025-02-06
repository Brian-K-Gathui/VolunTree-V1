import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchData, updateData } from "../../services/api";

export default function EditOrganization() {
    const [formData, setFormData] = useState({
        name: "",
        contact_name: "",
        contact_phone: "",
        contact_email: ""
    });

    const params = useParams();
    const [initialData, setInitialData] = useState();
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState({});

    // Fetch existing organization details
    const getOrganization = useCallback(() => {
        fetchData(`organizations/${params.id}`)
            .then((data) => {
                setInitialData(data);
                setFormData({
                    name: data.name || "",
                    contact_name: data.contact_name || "",
                    contact_phone: data.contact_phone || "",
                    contact_email: data.contact_email || ""
                });
            })
            .catch(() => {
                alert("Unable to fetch organization details!");
            });
    }, [params.id]);

    useEffect(() => {
        getOrganization();
    }, [getOrganization]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Validate form fields
    const validateFields = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = "Organization name is required.";
        if (!formData.contact_name.trim()) errors.contact_name = "Contact name is required.";
        if (!formData.contact_phone.trim()) errors.contact_phone = "Contact phone is required.";
        if (!formData.contact_email.trim() || !formData.contact_email.includes("@")) {
            errors.contact_email = "Valid email is required.";
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateFields()) return;

        try {
            const response = await updateData("organizations", params.id, formData);
            if (response) {
                navigate("/organizations");
            } else {
                alert("Unable to update the organization.");
            }
        } catch (error) {
            alert("Failed to update organization. Please try again.");
        }
    };

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Edit Organization</h2>

                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Organization ID</label>
                        <div className="col-sm-8">
                            <input
                                readOnly
                                className="form-control-plaintext"
                                defaultValue={params.id}
                            />
                        </div>
                    </div>

                    {initialData && (
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Name</label>
                                <div className="col-sm-8">
                                    <input
                                        className="form-control"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {validationErrors.name && (
                                        <small className="text-danger">{validationErrors.name}</small>
                                    )}
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Contact Name</label>
                                <div className="col-sm-8">
                                    <input
                                        className="form-control"
                                        name="contact_name"
                                        value={formData.contact_name}
                                        onChange={handleChange}
                                    />
                                    {validationErrors.contact_name && (
                                        <small className="text-danger">{validationErrors.contact_name}</small>
                                    )}
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Contact Phone</label>
                                <div className="col-sm-8">
                                    <input
                                        className="form-control"
                                        name="contact_phone"
                                        value={formData.contact_phone}
                                        onChange={handleChange}
                                    />
                                    {validationErrors.contact_phone && (
                                        <small className="text-danger">{validationErrors.contact_phone}</small>
                                    )}
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Contact Email</label>
                                <div className="col-sm-8">
                                    <input
                                        className="form-control"
                                        name="contact_email"
                                        value={formData.contact_email}
                                        onChange={handleChange}
                                    />
                                    {validationErrors.contact_email && (
                                        <small className="text-danger">{validationErrors.contact_email}</small>
                                    )}
                                </div>
                            </div>

                            <div className="row">
                                <div className="offset-sm-4 col-sm-4 d-grid">
                                    <button type="submit" className="btn btn-primary mt-3">Update Organization</button>
                                </div>
                                <div className="col-sm-4 d-grid">
                                    <Link className="btn btn-secondary mt-3" to="/organizations">Cancel</Link>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

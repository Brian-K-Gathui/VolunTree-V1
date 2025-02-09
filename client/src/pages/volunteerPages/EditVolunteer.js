import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchData, updateData } from "../../services/api";

export default function EditVolunteer() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const params = useParams();
    const [initialData, setInitialData] = useState(null);
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState({});

    // Fetch existing volunteer details
    const getVolunteer = useCallback(() => {
        fetchData(`volunteers/${params.id}`)
            .then((data) => {
                setInitialData(data);
                setFormData({
                    name: data.name || "",
                    email: data.email || "",
                    phone: data.phone || "",
                });
            })
            .catch(() => {
                alert("Unable to fetch volunteer details!");
            });
    }, [params.id]);

    useEffect(() => {
        getVolunteer();
    }, [getVolunteer]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Validate form fields
    const validateFields = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = "Volunteer name is required.";
        if (!formData.email.trim() || !formData.email.includes("@")) {
            errors.email = "Valid email is required.";
        }
        if (!formData.phone.trim()) errors.phone = "Contact phone is required.";
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateFields()) return;

        try {
            const response = await updateData("volunteers", params.id, formData);
            if (response) {
                navigate("/volunteers");
            } else {
                alert("Unable to update the volunteer.");
            }
        } catch (error) {
            alert("Failed to update volunteer. Please try again.");
        }
    };

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Edit Volunteer</h2>

                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Volunteer ID</label>
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
                                <label className="col-sm-4 col-form-label">Email</label>
                                <div className="col-sm-8">
                                    <input
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {validationErrors.email && (
                                        <small className="text-danger">{validationErrors.email}</small>
                                    )}
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Phone</label>
                                <div className="col-sm-8">
                                    <input
                                        className="form-control"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                    {validationErrors.phone && (
                                        <small className="text-danger">{validationErrors.phone}</small>
                                    )}
                                </div>
                            </div>

                            <div className="row">
                                <div className="offset-sm-4 col-sm-4 d-grid">
                                    <button type="submit" className="btn btn-primary mt-3">Update Volunteer</button>
                                </div>
                                <div className="col-sm-4 d-grid">
                                    <Link className="btn btn-secondary mt-3" to="/volunteers">Cancel</Link>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

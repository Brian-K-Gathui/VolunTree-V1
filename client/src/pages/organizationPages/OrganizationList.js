import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchData, deleteData } from "../../services/api";

export default function OrganizationList() {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function getOrganizations() {
            setLoading(true);
            try {
                const data = await fetchData("api/organizations");
                if (!data) {
                    setError("Failed to fetch organizations. Please try again.");
                    setOrganizations([]);
                } else {
                    setOrganizations(data);
                }
            } catch (err) {
                setError("Failed to fetch organizations. Please try again.");
            }
            setLoading(false);
        }
        getOrganizations();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this organization?")) return;

        const success = await deleteData("api/organizations", id);
        if (success) {
            setOrganizations((prevOrgs) => prevOrgs.filter((org) => org.id !== id));
        } else {
            alert("Failed to delete organization. Please try again.");
        }
    };

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4">Organizations</h1>

            {loading && <p className="text-center">Loading organizations...</p>}
            {error && <p className="text-danger text-center">{error}</p>}

            {!loading && organizations.length === 0 && !error && (
                <p className="text-center">No organizations found.</p>
            )}

            {!loading && organizations.length > 0 && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Contact Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {organizations.map((org) => (
                            <tr key={org.id}>
                                <td>{org.id}</td>
                                <td>{org.name}</td>
                                <td>{org.contact_name}</td>
                                <td>{org.contact_phone}</td>
                                <td>{org.contact_email}</td>
                                <td>
                                    <Link className="btn btn-warning btn-sm me-2" to={`/organizations/edit/${org.id}`}>
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(org.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

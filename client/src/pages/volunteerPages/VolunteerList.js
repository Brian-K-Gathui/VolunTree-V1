import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchData, deleteData } from "../../services/api";

export default function VolunteerList() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function getVolunteers() {
      setLoading(true);
      try {
        const data = await fetchData("volunteers");
        if (!data) {
          setError("Failed to fetch volunteers. Please try again.");
          setVolunteers([]);
        } else {
          const sortedData = data.sort((a, b) => b.id - a.id);
          setVolunteers(sortedData);
        }
      } catch (err) {
        console.error("Error fetching volunteers:", err);
        setError("Failed to fetch volunteers. Please try again.");
        setVolunteers([]);
      }
      setLoading(false);
    }
    getVolunteers();
  }, []);

  const totalPages = volunteers.length > 0 ? Math.ceil(volunteers.length / itemsPerPage) : 1;
  const paginatedVolunteers = volunteers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this volunteer?")) {
      const success = await deleteData("volunteers", id);
      if (success) {
        setVolunteers((prevVols) => prevVols.filter((vol) => vol.id !== id));
      } else {
        alert("Failed to delete volunteer. Please try again.");
      }
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4"><strong>Volunteers</strong></h1>

      <div className="row mb-3">
        <div className="col">
          <Link className="btn btn-primary me-3" to="/volunteers/create">
            Add New Volunteer
          </Link>
        </div>
      </div>

      {error && <p className="text-danger">{error}</p>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center">Loading...</td>
            </tr>
          ) : paginatedVolunteers.length > 0 ? (
            paginatedVolunteers.map((vol) => (
              <tr key={vol.id}>
                <td>{vol.id}</td>
                <td>{vol.name}</td>
                <td>{vol.email}</td>
                <td>{vol.phone}</td>
                <td>
                  <Link className="btn btn-warning btn-sm me-2" to={`/volunteers/edit/${vol.id}`}>
                    Edit
                  </Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(vol.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No volunteers found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button className="btn btn-secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

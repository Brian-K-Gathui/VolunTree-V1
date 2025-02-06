import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UnderConstruction = () => {
    return (
        <div className="dashboard-container">
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="col-md-12 text-center">
                    <h1>🚧 Tasks Events Under Construction 🚧</h1>
                    <h2>We're working on something awesome!</h2>
                    <p>Stay tuned while we build this page.</p>
                </div>
            </div>
        </div>
    );
};

export default UnderConstruction;

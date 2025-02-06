const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://voluntree-backend.onrender.com/api";

/**
 * Fetch data from an API endpoint.
 * @param {string} endpoint - The API endpoint (e.g., 'organizers', 'volunteers').
 */
export const fetchData = async (endpoint) => {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}`);
        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error(`Fetch error: Failed to get ${endpoint} -`, error.message);
        return null; // Return `null` instead of an empty array for better debugging.
    }
};

/**
 * Send POST request to create a new record.
 * @param {string} endpoint - The API endpoint.
 * @param {Object} data - The data to send.
 */
export const postData = async (endpoint, data) => {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Error ${res.status}: ${errorText}`);
        }

        return await res.json();
    } catch (error) {
        console.error(`Post error: Failed to create ${endpoint} -`, error.message);
        return null;
    }
};

/**
 * Send PATCH request to update an existing record.
 * @param {string} endpoint - The API endpoint.
 * @param {number|string} id - The ID of the record to update.
 * @param {Object} data - The updated data.
 */
export const updateData = async (endpoint, id, data) => {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Error ${res.status}: ${errorText}`);
        }

        return await res.json();
    } catch (error) {
        console.error(`Update error: Failed to update ${endpoint}/${id} -`, error.message);
        return null;
    }
};

/**
 * Send DELETE request to remove a record.
 * @param {string} endpoint - The API endpoint.
 * @param {number|string} id - The ID of the record to delete.
 */
export const deleteData = async (endpoint, id) => {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Error ${res.status}: ${errorText}`);
        }

        return true; // Return true if deletion is successful.
    } catch (error) {
        console.error(`Delete error: Failed to delete ${endpoint}/${id} -`, error.message);
        return false;
    }
};

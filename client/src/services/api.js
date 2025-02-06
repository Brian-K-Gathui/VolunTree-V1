const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://voluntree-backend.onrender.com/api";

// Fetch data from API
export const fetchData = async (endpoint) => {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}`);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return await res.json();
    } catch (error) {
        console.error(`Fetch error: Failed to get ${endpoint} -`, error.message);
        return null;
    }
};

// POST request (Create)
export const postData = async (endpoint, data) => {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
        return await res.json();
    } catch (error) {
        console.error(`Post error: Failed to create ${endpoint} -`, error.message);
        return null;
    }
};

// PATCH request (Update)
export const updateData = async (endpoint, id, data) => {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
        return await res.json();
    } catch (error) {
        console.error(`Update error: Failed to update ${endpoint}/${id} -`, error.message);
        return null;
    }
};

// DELETE request
export const deleteData = async (endpoint, id) => {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
        return true;
    } catch (error) {
        console.error(`Delete error: Failed to delete ${endpoint}/${id} -`, error.message);
        return false;
    }
};

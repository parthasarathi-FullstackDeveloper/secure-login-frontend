import React from "react";
import axios from "axios";

export const ApiCall = (employee) => {
    const sendLocation = async () => {
        const url = "http://localhost:8000/api/attendance/validateLocation";
        const { latitude, longitude } = employee;
console.log(employee.latitude);

        try {
            const response = await axios.post(url, {
                latitude: employee.latitude,
                longitude: employee.longitude,
                employee:employee.employee,
                employeeEmail:employee.employeeEmail,
                logIn:employee.logIn
            });

            console.log("Response from server:", response.data);
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error("Failed to send location. Status:", error.response.status, "Message:", error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                console.error("No response received:", error.request);
            } else {
                // Something else happened
                console.error("Error while sending location:", error.message);
            }
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <button
                onClick={sendLocation}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Send Location
            </button>
        </div>
    );
};

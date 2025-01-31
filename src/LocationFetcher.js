import React, { useEffect, useState } from "react";
import Select from "react-select";
import './App.css';
import ApiConstants from "./components/api/ApiConstants";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners'; // Import ClipLoader

const api = ApiConstants;

const LocationFetcher = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Define the getUserRecords function inside useEffect
        const getUserRecords = async () => {
            try {
                const response = await api.post("api/attendance/getUserByEmail", {
                    email: location.state?.email
                });
                setUser(response.data);
            } catch (e) {
                console.error("Error fetching user records:", e);
            } finally {
                setLoading(false);  // Set loading to false after response or error
            }
        };

        getUserRecords();
    }, [location.state?.email]); // Add location.state?.email as a dependency

    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const [employee, setEmployee] = useState({
        employee: "",
        employeeEmail: "",
        date: new Date().toISOString().split('T')[0],
        latitude: 0,
        longitude: 0,
        in: "",
        out: "",
        totalHours: "",
    });

    // Function to get current location
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setEmployee((prevEmployee) => ({
                        ...prevEmployee,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }));
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setError("Failed to retrieve location.");
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    const EmployeeDetails = user ? [
        { label: user.employee, value: user.email },
    ] : [];

    useEffect(() => {
        if (user) {
            const firstEmployee = {
                employee: user.employee,
                employeeEmail: user.email,
                date: new Date().toISOString().split('T')[0],
                latitude: 0,
                longitude: 0,
                in: "",
                out: "",
                totalHours: "",
            };
            setEmployee(firstEmployee);

            // Get the current location after setting user data
            getLocation();
        }
    }, [user]);

    const handleSelectChange = (selectedOption, field) => {
        setEmployee((prev) => ({
            ...prev,
            [field]: selectedOption ? selectedOption.value : "",
        }));
    };

    const handleSubmit = async (type) => {
        try {
            setLoading(true);
            const url = type === "IN" ? "api/attendance/in" : "api/attendance/out";
            const payload = {
                ...employee,
                [type.toLowerCase()]: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };

            const res = await api.post(url, payload);
            if (res.status === 200) {
                setResponse(res.data || `Attendance marked as ${type}`);
                navigate("/react-tables", { state: { employeeEmail: employee.employeeEmail } });
            }
        } catch (error) {
            console.log(error)
            setError(error.response?.data || "An error occurred.");
        } finally {
            setLoading(false); // Set loading to false after submitting attendance
        }

        setTimeout(() => {
            setResponse(null);
            setError(null);
        }, 3000);
    };

    const renderButton = (label, type) => (
        <button
            onClick={() => handleSubmit(type)}
            className={`${type === "IN" ? "bg-green-500" : "bg-red-500"} text-white px-4 py-2 rounded w-1/2 hover:opacity-90`}
        >
            {label}
        </button>
    );

    return (
        <div style={{ marginLeft: "20px" }} className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">

            {(response || error) && (
                <p
                    className={`${response ? "bg-green-500" : "bg-red-500"} text-white p-2 rounded`}
                    style={{ transition: "opacity 0.5s ease-out" }}
                >
                    {response || error}
                </p>
            )}

            <div className="p-4 w-full max-w-md bg-white rounded shadow">
                <div className="flex justify-center mb-4">
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/044/245/414/small_2x/confident-young-businessman-writing-on-a-clipboard-png.png"
                        alt="Profile"
                        className="rounded-full w-24 h-24 border-4 border-gray-200"
                    />
                </div>

                <h2 className="text-xl font-bold mb-4 text-center">Employee Attendance</h2>

                {loading ? (
                    <div className="flex justify-center items-center min-h-20">
                        <ClipLoader color="#36d7b7" size={50} />
                    </div>
                ) : (
                    <>
                        <Select
                            options={EmployeeDetails}
                            onChange={(selectedOption) => handleSelectChange(selectedOption, "employee")}
                            placeholder="Select Employee Name"
                            className="mb-4"
                            isLoading={loading}
                            getOptionLabel={(e) => e.label}
                            getOptionValue={(e) => e.value}
                            value={EmployeeDetails.find(option => option.value === employee.employeeEmail)}
                        />
                        <Select
                            options={EmployeeDetails}
                            onChange={(selectedOption) => handleSelectChange(selectedOption, "employeeEmail")}
                            placeholder="Select Employee Email"
                            className="mb-4"
                            isLoading={loading}
                            getOptionLabel={(e) => e.value}
                            getOptionValue={(e) => e.value}
                            value={EmployeeDetails.find(option => option.value === employee.employeeEmail)}
                        />
                    </>
                )}

                <div className="flex justify-between">
                    {renderButton("IN", "IN")}
                    {renderButton("OUT", "OUT")}
                </div>
            </div>
        </div>
    );
};

export default LocationFetcher;

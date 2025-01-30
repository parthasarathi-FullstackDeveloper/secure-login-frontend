import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ApiConstants from "./api/ApiConstants";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FaRegClock } from 'react-icons/fa';  // Importing clock icon from react-icons

const ReactTables = () => {
    const location = useLocation();
    const { employeeEmail } = location.state || {};

    const [attendanceData, setAttendanceData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (employeeEmail) {
            const fetchAttendanceData = async () => {
                try {
                    const response = await ApiConstants.post("api/attendance/getByUserAttendance", {
                        employeeEmail: employeeEmail,
                    });

                    if (response && response.status === 200) {
                        setAttendanceData(response.data);
                    } else {
                        setError("Failed to fetch data. Status: " + response.status);
                    }
                } catch (err) {
                    console.error(err);
                    setError(
                        err?.response?.data?.message || "An error occurred while fetching data."
                    );
                } finally {
                    setLoading(false); // Set loading to false after data is fetched
                }
            };

            fetchAttendanceData();
        } else {
            setError("No employee email provided.");
            setLoading(false);
        }
    }, [employeeEmail]);

    const renderTotalHours = (rowData) => {
        return rowData.totalHours ? rowData.totalHours : <FaRegClock style={{ fontSize: '15px', color: 'gray' }} />;
    };
    const renderout= (rowData) => {
        return rowData.out ? rowData.out : <FaRegClock style={{ fontSize: '15px', color: 'gray' }} />;
    };

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div className="error" style={{ color: "red" }}>{error}</div>;
    }

    if (attendanceData.length === 0) {
        return <div>No attendance data available.</div>; 
    }

    return (
        <div>
            <h3>Attendance Data</h3>
            <DataTable value={attendanceData} tableStyle={{ minWidth: '50rem' }}>
                <Column field="employee" header="Name"></Column>
                <Column field="employeeEmail" header="Mail"></Column>
                <Column field="in" header="Login"></Column>
                <Column field="out" header="Logout" body={renderout}></Column>
                <Column field="totalHours" header="Total Hours" body={renderTotalHours}></Column>
            </DataTable>
        </div>
    );
};

export default ReactTables;

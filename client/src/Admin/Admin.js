import React, { useState, useEffect } from 'react';
import "./Admin.css";
import NavAdmin from "../NavAdmin/NavAdmin";
import Footer from "../Footer/Footer";

const Admin = () => {

    const [backendData, setBackendData] = useState([{}])
    useEffect(() => {
        fetch("/api").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
            }
        )
    }, [])

    const handleRemove = (user) => {
    fetch(`/removeStudent/${user}`, { method: 'DELETE', credentials: 'include' })
        .then(response => response.json())
        .then(data => {
        if (data.success) {
            setBackendData(prevData => ({
            ...prevData,
            users: prevData.users.filter(u => u !== user)
            }));
        } else {
            console.error("Failed to remove student");
        }
        })
        .catch(error => console.error("Error:", error));
    };

    return (
        <div className="page-container">
            <NavAdmin />

            <div className="admin-content-wrapper">

                <div className="description">
                    <div className="desc-header">Class Roster</div>
                    <div className="desc-text">
                        Here is a list of all users registered. You may remove any users 
                        that do not belong in the registry!
                        <br />
                        <br />
                    </div>

                    <div className="desc-header">Students:</div>

                    <div className='desc-text'>
                    {(typeof backendData.users === 'undefined') ? (<p>Loading...</p>) :
                        backendData.users.map((user, i) => (
                        <div key={i} className="student-item">
                            <p className="student-name">{user}</p>
                            <button 
                            className="remove-btn" 
                            onClick={() => handleRemove(user)}
                            >
                            Remove
                            </button>
                        </div>
                        ))
                    }
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Admin;
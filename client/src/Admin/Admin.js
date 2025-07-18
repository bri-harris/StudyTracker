import React, { useState, useRef, useEffect } from 'react';
import "./Admin.css";
import Nav_Admin from "../Nav_Admin/Nav_Admin";
import Footer from "../Footer/Footer";

const Admin = () => {

    // create a state variable that will contain the backend data retreived from backend API
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

    return (
        <div className="page-container">
            <Nav_Admin />

            <div className="content-wrapper">

                <div className="description">
                    <div className="desc-header">Class Roster</div>
                    <div className="desc-text">
                        Here is a list of all users registered. You may remove any users 
                        that do not belong in the registry!
                        <br />
                        <br />
                        {(typeof backendData.users === 'undefined') ? (<p>Loading...</p>)
                        : (
                            backendData.users.map((user, i) => (
                                <p key={i}>{user}</p>
                            ))
                        )}
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default Admin;
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
    const { Cmp } = props;
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("role");
        console.log("role :", role);
        
        if (role === "admin") {
            navigate("/admin/dashboard");
        } else if (role === "student") {
            navigate("/");
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div>
            <Cmp />
        </div>
    );
};

export default Protected;

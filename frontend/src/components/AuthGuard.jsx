import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logOut } from '../slices/authSlice';
import { useDispatch } from 'react-redux';

const AuthGuard = ({ children}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const notify = (message) => toast.info(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    );


    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("isAuth"))
        console.log(userData)
            if (!userData) {
                navigate("/login/redirect-auth-required");
                window.location.reload();
                localStorage.setItem('redirectAuthInfo', 'true');
            }
    }, []);
    

    return children;
};

export default AuthGuard;
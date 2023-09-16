import React,{useState,useEffect} from 'react';
import Login from '../../components/Login/Login';
import Landing from '../../components/Common/Landing';

const LoginPage = () => {
    const [showLanding, setShowLanding] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLanding(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);


    return (
        <div>
            {showLanding ? <Landing /> : <Login />}
        </div>
    );
};

export default LoginPage;
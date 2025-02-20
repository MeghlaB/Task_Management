import { useContext } from 'react';
import { Authcontext } from '../Contexts/Authcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const { login, user } = useContext(Authcontext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login(); 
            console.log("User logged in:", user);
            if (user) {
                await axios.post('http://localhost:5000/user', {
                    userId: user?.uid,       
                    displayName: user?.displayName,
                    email: user?.email      
                });

                navigate('/');
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center h-screen">
                <button 
                    onClick={handleLogin} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}

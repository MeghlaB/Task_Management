import { useContext, useEffect } from 'react';
import { Authcontext } from '../Contexts/Authcontext';
import { useNavigate } from 'react-router-dom';
import loginPage from '../assets/images.avif'
import axios from 'axios';

export default function Login() {
    const { login, user } = useContext(Authcontext);
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            await login();
        } catch (error) {
            console.error("Login failed", error);
        }
    };
    useEffect(() => {
        if (user) {
            axios.post('https://task-manager-backend-alpha-mocha.vercel.app/user', {
                userId: user?.uid,
                displayName: user?.displayName,
                email: user?.email
            }).then(() => {
                navigate('/');
            }).catch(error => {
                console.error("User data post failed", error);
            });
        }
    }, [user]);

    return (
        <div className="max-w-3xl mx-auto mt-9 bg-white p-6 shadow-md sm:px-8 sm:py-10 lg:px-12 lg:py-16 justify-center items-center">
            <div className="flex flex-col justify-between space-x-0 sm:flex-row sm:space-x-12">
                <div className="mb-8 w-full sm:mb-0 sm:w-1/2">
                    {/* Left side form */}
                    <h2 className="mb-6 text-3xl font-semibold tracking-tight">Sign In</h2>
                    <img src={loginPage}></img>
                </div>
               {/* Google Sign-In Button (Right side) */}
               <div className="mt-6 flex flex-col items-center justify-center">
                        <button 
                            onClick={handleLogin} 
                            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="size-6 fill-current">
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                            SIGN IN WITH GOOGLE
                        </button>
                    </div>
            </div>
        </div>
    );
}

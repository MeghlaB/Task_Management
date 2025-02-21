import { useContext, useEffect } from 'react';
import { Authcontext } from '../Contexts/Authcontext';
import { useNavigate } from 'react-router-dom';
import loginPage from '../assets/images.avif';
import axios from 'axios';
import { ThemeContext } from '../Contexts/ThemeProvider';

export default function Login() {
    const { theme } = useContext(ThemeContext);
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
        <div className={`min-h-screen bg-${theme === 'dark' ? 'gray-900' : 'gray-100'} flex justify-center items-center p-6`}>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-x-0 sm:space-x-12">
                    {/* Left side: Image */}
                    <div className="mb-8 sm:mb-0 w-full sm:w-1/2 text-center sm:text-left">
                        <img src={loginPage} alt="Login" className="w-full h-auto rounded-lg" />
                    </div>

                    {/* Right side: Form */}
                    <div className="w-full sm:w-1/2">
                        <h2 className="mb-6 text-3xl font-semibold text-center sm:text-left text-gray-900">Sign In</h2>
                        <div className="flex flex-col items-center">
                            <button
                                onClick={handleLogin}
                                className="flex h-12 w-full items-center justify-center gap-3 rounded-md bg-green-600 text-white font-medium px-4 py-2 shadow-md hover:bg-green-700 transition duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6 fill-current">
                                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                                </svg>
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

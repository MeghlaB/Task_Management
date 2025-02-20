
import { useContext, useEffect } from "react";
import { Authcontext } from "../Contexts/Authcontext";
import { useNavigate } from "react-router-dom";
import TaskBoard from "../Components/TaskBoard";

function Home() {
    const { user, logout } = useContext(Authcontext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === undefined) return;
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const logoutAndRedirect = async () => {
        await logout();
        navigate("/login");
    };

    if (user === undefined) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
                <div className="text-lg font-bold text-gray-600 dark:text-gray-300">Loading...</div>
            </div>
        );
    }

    return user ? (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            {/* Navbar */}
            <div className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-wide">📌 Task Manager</h1>
                <button 
                    onClick={logoutAndRedirect} 
                    className="bg-red-500 hover:bg-red-600 transition-all px-4 py-2 rounded-lg text-white font-semibold"
                >
                    Logout
                </button>
            </div>

            {/* Task Board Section */}
            <div className="flex flex-col items-center mt-6 px-4">
                <div className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-center">Manage Your Tasks Efficiently</h2>
                    <TaskBoard />
                </div>
            </div>
        </div>
    ) : null;
}

export default Home;

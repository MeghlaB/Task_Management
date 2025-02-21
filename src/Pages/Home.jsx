import { useContext, useEffect } from "react";
import { Authcontext } from "../Contexts/Authcontext";
import { useNavigate } from "react-router-dom";
import TaskBoard from "../Components/TaskBoard";
import { ThemeContext } from "../Contexts/ThemeProvider";

function Home() {
    const { togglebtn, theme } = useContext(ThemeContext);
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
        <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"}`}>
            {/* Navbar */}
            <div className={`shadow-md py-4 px-6 flex justify-between items-center ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
                <h1 className="text-2xl font-bold tracking-wide">📌 Task Manager</h1>
                <div className="flex items-center gap-4">
                    {/* Theme Toggle Button */}
                    <label className="cursor-pointer">
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={theme === "dark"}
                            onChange={togglebtn}
                        />
                    </label>
                    {/* Logout Button */}
                    <button 
                        onClick={logoutAndRedirect} 
                        className="bg-red-500 hover:bg-red-600 transition-all px-4 py-2 rounded-lg text-white font-semibold"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Task Board Section */}
            <div className="flex flex-col items-center mt-6 px-4">
                <div className={`w-full max-w-5xl shadow-lg rounded-lg p-6 ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
                    <h2 className="text-xl font-semibold mb-4 text-center">{user?.displayName} Task</h2>
                    <TaskBoard />
                </div>
            </div>
        </div>
    ) : null;
}

export default Home;

import { useContext, useEffect } from "react";
import { Authcontext } from "../Contexts/Authcontext";
import { useNavigate } from "react-router-dom";

function Home() {
    const { user, logout } = useContext(Authcontext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const logoutAndRedirect = () => {
        logout();
        navigate("/login");
    };

    // You can add a loading state or a placeholder here while checking user authentication
    if (user === null) {
        return <div>Loading...</div>; // Show a loading indicator or placeholder
    }

    return user ? (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Task Management</h1>
                <div>
                    <button 
                        onClick={logoutAndRedirect} 
                        className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    ) : null;
}

export default Home;

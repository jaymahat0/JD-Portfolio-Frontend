import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLock, FaUser, FaKey, FaExclamationTriangle } from "react-icons/fa";

function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // If already logged in, redirect to admin directly
        if (localStorage.getItem("token")) {
            navigate("/admin");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const basicToken = "Basic " + btoa(`${username}:${password}`);
        const baseUrl = import.meta.env.VITE_API_BASE_URL;

        try {
            // Test auth credentials against a secure endpoint
            await axios.get(`${baseUrl}/contact-messages?page=0&size=1`, {
                headers: {
                    Authorization: basicToken
                }
            });

            // If successful, save token and redirect
            localStorage.setItem("token", basicToken);
            navigate("/admin");
        } catch (err) {
            console.error("Login verification failed:", err);
            setError("Invalid credentials or server unavailable.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-76px)] bg-slate-950 flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md glass rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none"></div>

                <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-slate-900 border border-slate-800 text-cyan-400">
                        <FaLock size={24} />
                    </div>
                </div>

                <h1 className="text-3xl font-extrabold text-center text-slate-100 mb-2">
                    Admin Portal
                </h1>
                <p className="text-slate-400 text-xs text-center mb-8 uppercase tracking-wider font-semibold">
                    Sign in to manage your portfolio
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username */}
                    <div className="space-y-1.5">
                        <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider pl-1">
                            Username
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                <FaUser size={14} />
                            </span>
                            <input
                                type="text"
                                placeholder="Enter admin username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none text-slate-200 transition placeholder:text-slate-650 text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider pl-1">
                            Password
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                <FaKey size={14} />
                            </span>
                            <input
                                type="password"
                                placeholder="Enter security password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none text-slate-200 transition placeholder:text-slate-650 text-sm"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-450 text-xs font-semibold">
                            <FaExclamationTriangle className="shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-3 rounded-xl transition duration-300 shadow-lg cursor-pointer flex justify-center items-center"
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-slate-950"></div>
                        ) : (
                            "Verify Credentials"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
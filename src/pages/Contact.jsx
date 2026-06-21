import { useState } from "react";
import { sendMessage } from "../services/contactService";
import { FaEnvelope, FaUser, FaTag, FaPaperPlane, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: "", text: "" });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: "", text: "" });

        // Simple validation checks
        if (formData.name.trim().length < 3) {
            setStatus({ type: "error", text: "Name must be at least 3 characters long." });
            setLoading(false);
            return;
        }

        try {
            await sendMessage(formData);
            setStatus({ type: "success", text: "Thank you! Your message has been sent successfully." });
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });
        } catch (error) {
            console.error(error);
            setStatus({ type: "error", text: "Could not send message. Please try again later." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-20">
            <div className="w-full max-w-2xl glass rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                {/* Decorative gradients */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-3">
                        Get In Touch
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Have a question, project proposal, or just want to say hello? Drop a message below.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="space-y-1 relative">
                        <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider pl-1">Name</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                <FaUser size={14} />
                            </span>
                            <input
                                type="text"
                                name="name"
                                placeholder="Robert Jr."
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900/50 border border-slate-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none text-slate-200 transition placeholder:text-slate-600 text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1 relative">
                        <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider pl-1">Email Address</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                <FaEnvelope size={14} />
                            </span>
                            <input
                                type="email"
                                name="email"
                                placeholder="robertjr@hotmail.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900/50 border border-slate-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none text-slate-200 transition placeholder:text-slate-600 text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1 relative">
                        <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider pl-1">Subject</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                <FaTag size={14} className="rotate-90" />
                            </span>
                            <input
                                type="text"
                                name="subject"
                                placeholder="Hiring for SDE-2 Role"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900/50 border border-slate-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none text-slate-200 transition placeholder:text-slate-600 text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1">
                        <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider pl-1">Message</label>
                        <textarea
                            name="message"
                            rows="5"
                            placeholder="Tell me about your project or opportunity..."
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-slate-900/50 border border-slate-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none text-slate-200 transition placeholder:text-slate-600 text-sm resize-none"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-slate-950 font-bold py-3.5 rounded-xl transition duration-300 shadow-lg cursor-pointer disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-slate-950"></div>
                        ) : (
                            <>
                                Send Message <FaPaperPlane size={12} />
                            </>
                        )}
                    </button>

                    {/* Status Message */}
                    {status.text && (
                        <div
                            className={`flex items-center gap-3 p-4 rounded-xl text-sm border ${
                                status.type === "success"
                                    ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
                                    : "bg-rose-500/10 border-rose-500/25 text-rose-400"
                            }`}
                        >
                            {status.type === "success" ? (
                                <FaCheckCircle size={18} className="shrink-0" />
                            ) : (
                                <FaExclamationTriangle size={18} className="shrink-0" />
                            )}
                            <p className="font-medium">{status.text}</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
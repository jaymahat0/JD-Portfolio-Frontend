import { useEffect, useState } from "react";
import { getEducation } from "../services/educationService";
import { FaGraduationCap, FaCalendarAlt, FaStar } from "react-icons/fa";

export default function Education() {
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEducation();
    }, []);

    const loadEducation = async () => {
        setLoading(true);
        try {
            const data = await getEducation(0, 20); // Fetch top 20 entries
            const items = data.content || (Array.isArray(data) ? data : []);
            // Sort by start year descending
            const sorted = [...items].sort((a, b) => (b.startYear || 0) - (a.startYear || 0));
            setEducation(sorted);
        } catch (err) {
            console.error("Error loading education:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                        Education Journey
                    </h1>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        My academic background, degrees, and notable achievements.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
                    </div>
                ) : education.length === 0 ? (
                    <div className="text-center text-slate-400 py-20">
                        No education records found.
                    </div>
                ) : (
                    <div className="relative border-l border-slate-900 ml-4 md:ml-8 space-y-12">
                        {education.map(item => (
                            <div key={item.id} className="relative pl-8 group">
                                {/* Timeline Bullet */}
                                <div className="absolute -left-[17px] top-1 bg-slate-950 border-2 border-slate-800 group-hover:border-cyan-400 rounded-full p-2 text-slate-400 group-hover:text-cyan-400 transition-all duration-350 shadow-md">
                                    <FaGraduationCap size={16} />
                                </div>

                                {/* Content Card */}
                                <div className="glass glass-hover rounded-2xl p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <div>
                                            <h2 className="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">
                                                {item.degree}
                                            </h2>
                                            <p className="text-cyan-400/90 font-medium text-sm mt-1">
                                                {item.fieldOfStudy}
                                            </p>
                                            <p className="text-slate-300 font-semibold mt-1">
                                                {item.institution}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2 items-center md:flex-col md:items-end">
                                            <span className="bg-slate-900 border border-slate-800 text-slate-300 text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 font-medium">
                                                <FaCalendarAlt className="text-cyan-400 text-[10px]" />
                                                {item.startYear} - {item.endYear}
                                            </span>
                                            
                                            <span className="bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 font-bold">
                                                <FaStar className="text-yellow-400 text-[10px]" />
                                                CGPA: {item.cgpa.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-slate-400 text-sm leading-relaxed border-t border-slate-900/50 pt-4">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
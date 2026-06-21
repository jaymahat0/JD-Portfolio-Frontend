import { useEffect, useState } from "react";
import { getSkills } from "../services/skillService";

export default function Skills() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSkills();
    }, []);

    const loadSkills = async () => {
        setLoading(true);
        try {
            const data = await getSkills(0, 50); // Get top 50 skills
            const skillList = data.content || (Array.isArray(data) ? data : []);
            setSkills(skillList);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        const cat = skill.category || "General";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-slate-950 py-20 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                        Technical Expertise
                    </h1>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        A detailed breakdown of my tech stack, frameworks, tools, and technical proficiency.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
                    </div>
                ) : skills.length === 0 ? (
                    <div className="text-center text-slate-400 py-20">
                        No skills listed yet.
                    </div>
                ) : (
                    <div className="space-y-12">
                        {Object.entries(groupedSkills).map(([category, items]) => (
                            <div key={category} className="glass rounded-2xl p-8 shadow-xl">
                                <h2 className="text-2xl font-bold text-slate-100 border-b border-slate-900 pb-4 mb-6 tracking-wide">
                                    {category}
                                </h2>

                                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                                    {items.map(skill => (
                                        <div key={skill.id} className="space-y-2 group">
                                            <div className="flex justify-between items-center text-sm font-medium">
                                                <span className="text-slate-300 group-hover:text-cyan-400 transition-colors duration-300">
                                                    {skill.name}
                                                </span>
                                                <span className="text-cyan-400 font-semibold">
                                                    {skill.proficiency}%
                                                </span>
                                            </div>
                                            
                                            {/* Progress Bar Track */}
                                            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                                                {/* Glowing Fill */}
                                                <div
                                                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full group-hover:shadow-[0_0_12px_rgba(6,182,212,0.5)] transition-all duration-1000 ease-out"
                                                    style={{ width: `${skill.proficiency}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import { FaGithub, FaExternalLinkAlt, FaAward } from "react-icons/fa";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProjects(currentPage);
    }, [currentPage]);

    const loadProjects = async (page) => {
        setLoading(true);
        try {
            const data = await getProjects(page, 5);
            if (data && data.content) {
                setProjects(data.content);
                setTotalPages(data.totalPages || 1);
            } else if (Array.isArray(data)) {
                setProjects(data);
                setTotalPages(1);
            } else {
                setProjects([]);
            }
        } catch (err) {
            console.error("Error loading projects:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                        My Projects
                    </h1>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        A curated collection of web applications, microservices, and software engineering projects.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center text-slate-400 py-20">
                        No projects found.
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map(project => (
                                <div
                                    key={project.id}
                                    className="glass glass-hover rounded-2xl overflow-hidden flex flex-col group h-full"
                                >
                                    {/* Image / Header Placeholder */}
                                    <div className="relative h-48 bg-slate-900 overflow-hidden flex items-center justify-center border-b border-slate-800">
                                        {project.imageUrl ? (
                                            <img
                                                src={project.imageUrl}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-850 flex items-center justify-center">
                                                <span className="text-5xl font-black text-slate-800 tracking-wider">CODE</span>
                                            </div>
                                        )}

                                        {project.featured && (
                                            <span className="absolute top-4 right-4 bg-cyan-500/20 text-cyan-300 border border-cyan-500/35 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 backdrop-blur-md">
                                                <FaAward className="text-xs" /> Featured
                                            </span>
                                        )}
                                    </div>

                                    {/* Project Meta */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h2 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors">
                                            {project.title}
                                        </h2>

                                        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-4">
                                            {project.description}
                                        </p>

                                        <div className="flex gap-4 items-center pt-4 border-t border-slate-900 mt-auto">
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-cyan-400 transition duration-300"
                                                >
                                                    <FaGithub size={16} /> Code
                                                </a>
                                            )}
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition duration-300 ml-auto"
                                                >
                                                    Live Demo <FaExternalLinkAlt size={12} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-16">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                    disabled={currentPage === 0}
                                    className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
                                >
                                    Previous
                                </button>
                                <span className="text-slate-400 font-medium text-sm">
                                    Page {currentPage + 1} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                                    disabled={currentPage === totalPages - 1}
                                    className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
import { useState, useEffect } from "react";
import { 
    getProjects, createProject, updateProject, deleteProject 
} from "../services/projectService";
import { 
    getSkills, createSkill, updateSkill, deleteSkill 
} from "../services/skillService";
import { 
    getEducation, createEducation, updateEducation, deleteEducation 
} from "../services/educationService";
import { 
    getExperience, createExperience, updateExperience, deleteExperience 
} from "../services/experienceService";
import { 
    getContactMessages, deleteContactMessage 
} from "../services/contactService";

import { 
    FaProjectDiagram, FaLightbulb, FaGraduationCap, 
    FaBriefcase, FaEnvelope, FaPlus, FaTrash, 
    FaEdit, FaTimes, FaToggleOn, FaToggleOff 
} from "react-icons/fa";

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("projects");
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    
    // Modals control
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null); // Null for create, object for edit
    const [selectedMessage, setSelectedMessage] = useState(null);

    // Form data states
    const [projectForm, setProjectForm] = useState({
        title: "", description: "", githubUrl: "", liveUrl: "", imageUrl: "", featured: false
    });
    const [skillForm, setSkillForm] = useState({
        name: "", category: "", proficiency: 80
    });
    const [educationForm, setEducationForm] = useState({
        institution: "", degree: "", fieldOfStudy: "", startYear: 2023, endYear: 2027, cgpa: 8.50, description: ""
    });
    const [experienceForm, setExperienceForm] = useState({
        company: "", role: "", location: "", description: "", startYear: 2023, endYear: 2024, current: false
    });

    useEffect(() => {
        setCurrentPage(0);
        loadTabContent(activeTab, 0);
    }, [activeTab]);

    useEffect(() => {
        loadTabContent(activeTab, currentPage);
    }, [currentPage]);

    const loadTabContent = async (tab, page) => {
        setLoading(true);
        try {
            let data;
            if (tab === "projects") {
                data = await getProjects(page, 5);
            } else if (tab === "skills") {
                data = await getSkills(page, 10);
            } else if (tab === "education") {
                data = await getEducation(page, 5);
            } else if (tab === "experience") {
                data = await getExperience(page, 5);
            } else if (tab === "messages") {
                data = await getContactMessages(page, 5);
            }

            if (data) {
                if (data.content) {
                    setItems(data.content);
                    setTotalPages(data.totalPages || 1);
                } else if (Array.isArray(data)) {
                    setItems(data);
                    setTotalPages(1);
                } else {
                    setItems([]);
                }
            }
        } catch (err) {
            console.error(`Error loading ${tab}:`, err);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            if (activeTab === "projects") await deleteProject(id);
            else if (activeTab === "skills") await deleteSkill(id);
            else if (activeTab === "education") await deleteEducation(id);
            else if (activeTab === "experience") await deleteExperience(id);
            else if (activeTab === "messages") await deleteContactMessage(id);
            
            loadTabContent(activeTab, currentPage);
        } catch (err) {
            console.error("Delete operation failed:", err);
            alert("Delete operation failed. Please check credentials/server.");
        }
    };

    const openCreateModal = () => {
        setEditItem(null);
        // Reset forms to defaults
        setProjectForm({ title: "", description: "", githubUrl: "", liveUrl: "", imageUrl: "", featured: false });
        setSkillForm({ name: "", category: "", proficiency: 80 });
        setEducationForm({ institution: "", degree: "", fieldOfStudy: "", startYear: 2023, endYear: 2027, cgpa: 8.50, description: "" });
        setExperienceForm({ company: "", role: "", location: "", description: "", startYear: 2023, endYear: 2024, current: false });
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditItem(item);
        if (activeTab === "projects") {
            setProjectForm({
                title: item.title || "",
                description: item.description || "",
                githubUrl: item.githubUrl || "",
                liveUrl: item.liveUrl || "",
                imageUrl: item.imageUrl || "",
                featured: !!item.featured
            });
        } else if (activeTab === "skills") {
            setSkillForm({
                name: item.name || "",
                category: item.category || "",
                proficiency: item.proficiency ?? 80
            });
        } else if (activeTab === "education") {
            setEducationForm({
                institution: item.institution || "",
                degree: item.degree || "",
                fieldOfStudy: item.fieldOfStudy || "",
                startYear: item.startYear ?? 2023,
                endYear: item.endYear ?? 2027,
                cgpa: item.cgpa ?? 8.50,
                description: item.description || ""
            });
        } else if (activeTab === "experience") {
            setExperienceForm({
                company: item.company || "",
                role: item.role || "",
                location: item.location || "",
                description: item.description || "",
                startYear: item.startYear ?? 2023,
                endYear: item.endYear ?? 2024,
                current: !!item.current
            });
        }
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (activeTab === "projects") {
                if (editItem) {
                    await updateProject(editItem.id, projectForm);
                } else {
                    await createProject(projectForm);
                }
            } else if (activeTab === "skills") {
                if (editItem) {
                    await updateSkill(editItem.id, skillForm);
                } else {
                    await createSkill(skillForm);
                }
            } else if (activeTab === "education") {
                if (editItem) {
                    await updateEducation(editItem.id, educationForm);
                } else {
                    await createEducation(educationForm);
                }
            } else if (activeTab === "experience") {
                // Backend requires endYear even if current is true, or we default it
                const payload = { ...experienceForm };
                if (payload.current) {
                    payload.endYear = payload.startYear; // Fallback to startYear for backend validation
                }
                if (editItem) {
                    await updateExperience(editItem.id, payload);
                } else {
                    await createExperience(payload);
                }
            }

            setIsModalOpen(false);
            loadTabContent(activeTab, currentPage);
        } catch (err) {
            console.error("Save operation failed:", err);
            alert("Failed to save. Make sure fields meet character/size limits.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-900 pb-6 mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100">
                            Dashboard
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Manage your portfolio data and inbound queries.
                        </p>
                    </div>
                    {activeTab !== "messages" && (
                        <button
                            onClick={openCreateModal}
                            className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl transition duration-300 shadow cursor-pointer text-sm"
                        >
                            <FaPlus size={12} /> Add New
                        </button>
                    )}
                </div>

                {/* Navigation Tabs */}
                <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2.5 mb-8">
                    {[
                        { id: "projects", label: "Projects", icon: <FaProjectDiagram /> },
                        { id: "skills", label: "Skills", icon: <FaLightbulb /> },
                        { id: "education", label: "Education", icon: <FaGraduationCap /> },
                        { id: "experience", label: "Experience", icon: <FaBriefcase /> },
                        { id: "messages", label: "Messages Inbox", icon: <FaEnvelope /> },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold border transition duration-300 text-sm cursor-pointer justify-center md:justify-start ${
                                activeTab === tab.id
                                    ? "bg-cyan-500/10 border-cyan-500/35 text-cyan-400"
                                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                            }`}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                {loading ? (
                    <div className="flex justify-center py-24">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center text-slate-500 py-24 border-2 border-dashed border-slate-900 rounded-3xl">
                        No records found in this section.
                    </div>
                ) : (
                    <div className="glass rounded-3xl overflow-hidden shadow-xl border border-slate-900">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider font-bold">
                                        <th className="p-4 pl-6">Title / Name</th>
                                        <th className="p-4">Details</th>
                                        <th className="p-4">Duration / Category</th>
                                        <th className="p-4 pr-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-900 text-sm">
                                    {items.map((item) => (
                                        <tr 
                                            key={item.id} 
                                            className={`hover:bg-slate-900/30 transition-colors ${activeTab === "messages" ? "cursor-pointer" : ""}`}
                                            onClick={(e) => {
                                                // Ignore clicks on buttons/SVGs to avoid conflict with delete action
                                                if (e.target.closest('button') || e.target.closest('svg')) return;
                                                if (activeTab === "messages") {
                                                    setSelectedMessage(item);
                                                }
                                            }}
                                        >
                                            {/* Left Cell */}
                                            <td className="p-4 pl-6 font-semibold text-slate-100">
                                                {activeTab === "projects" && item.title}
                                                {activeTab === "skills" && item.name}
                                                {activeTab === "education" && item.degree}
                                                {activeTab === "experience" && item.role}
                                                {activeTab === "messages" && (
                                                    <div>
                                                        <p className="text-slate-100 font-bold">{item.name}</p>
                                                        <p className="text-xs text-slate-500">{item.email}</p>
                                                    </div>
                                                )}
                                            </td>

                                            {/* Mid Cell (Details) */}
                                            <td className="p-4 text-slate-400 max-w-xs truncate">
                                                {activeTab === "projects" && item.description}
                                                {activeTab === "skills" && `Proficiency: ${item.proficiency}%`}
                                                {activeTab === "education" && `${item.institution} (CGPA: ${item.cgpa})`}
                                                {activeTab === "experience" && `${item.company} (${item.location})`}
                                                {activeTab === "messages" && (
                                                    <div>
                                                        <p className="text-slate-200 font-medium text-xs">{item.subject}</p>
                                                        <p className="text-slate-500 text-xs mt-0.5 truncate">{item.message}</p>
                                                        <span className="text-[10px] text-cyan-400 font-medium block mt-1 hover:underline">Click row to read full message</span>
                                                    </div>
                                                )}
                                            </td>

                                            {/* Right Cell */}
                                            <td className="p-4 text-slate-400">
                                                {activeTab === "projects" && (
                                                    <span className={item.featured ? "text-cyan-400 font-semibold" : ""}>
                                                        {item.featured ? "★ Featured" : "Standard"}
                                                    </span>
                                                )}
                                                {activeTab === "skills" && item.category}
                                                {activeTab === "education" && `${item.startYear} - ${item.endYear}`}
                                                {activeTab === "experience" && `${item.startYear} - ${item.current ? "Present" : item.endYear}`}
                                                {activeTab === "messages" && "Received Query"}
                                            </td>

                                            {/* Actions Cell */}
                                            <td className="p-4 pr-6 text-right">
                                                <div className="flex justify-end gap-2.5">
                                                    {activeTab !== "messages" && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openEditModal(item);
                                                            }}
                                                            className="p-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/35 hover:text-cyan-400 rounded-lg transition duration-300 cursor-pointer text-xs"
                                                            title="Edit Record"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(item.id);
                                                        }}
                                                        className="p-2 bg-slate-900 border border-slate-800 hover:border-rose-500/35 hover:text-rose-400 rounded-lg transition duration-300 cursor-pointer text-xs"
                                                        title="Delete Record"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Area */}
                        {totalPages > 1 && (
                            <div className="bg-slate-900/50 border-t border-slate-900 px-6 py-4 flex justify-between items-center text-xs">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                                    disabled={currentPage === 0}
                                    className="px-3 py-1.5 bg-slate-950 border border-slate-850 hover:bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed rounded transition cursor-pointer"
                                >
                                    Previous
                                </button>
                                <span className="text-slate-400">
                                    Page {currentPage + 1} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                                    disabled={currentPage === totalPages - 1}
                                    className="px-3 py-1.5 bg-slate-950 border border-slate-850 hover:bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed rounded transition cursor-pointer"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* MODAL SYSTEM */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-955/80 backdrop-blur-sm">
                        <div className="w-full max-w-lg bg-slate-900 border border-slate-850 rounded-3xl p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-5 right-5 text-slate-500 hover:text-slate-300 transition cursor-pointer"
                            >
                                <FaTimes size={18} />
                            </button>

                            <h2 className="text-2xl font-bold text-slate-100 mb-6">
                                {editItem ? `Edit ${activeTab.slice(0, -1)}` : `Add New ${activeTab.slice(0, -1)}`}
                            </h2>

                            <form onSubmit={handleFormSubmit} className="space-y-5">
                                {/* PROJECT FORM FIELDS */}
                                {activeTab === "projects" && (
                                    <>
                                        <div className="space-y-1">
                                            <label className="text-xs text-slate-450 uppercase font-semibold">Title</label>
                                            <input
                                                type="text"
                                                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-sm text-slate-200"
                                                value={projectForm.title}
                                                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-slate-450 uppercase font-semibold">Description</label>
                                            <textarea
                                                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-sm text-slate-200 resize-none h-24"
                                                value={projectForm.description}
                                                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-slate-450 uppercase font-semibold">GitHub URL</label>
                                            <input
                                                type="url"
                                                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-sm text-slate-200"
                                                value={projectForm.githubUrl}
                                                onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-slate-450 uppercase font-semibold">Live Site URL</label>
                                            <input
                                                type="url"
                                                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-sm text-slate-200"
                                                value={projectForm.liveUrl}
                                                onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-slate-450 uppercase font-semibold">Image URL</label>
                                            <input
                                                type="text"
                                                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-sm text-slate-200"
                                                value={projectForm.imageUrl}
                                                onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setProjectForm({ ...projectForm, featured: !projectForm.featured })}
                                                className="text-cyan-400 cursor-pointer"
                                            >
                                                {projectForm.featured ? <FaToggleOn size={26} /> : <FaToggleOff size={26} className="text-slate-550" />}
                                            </button>
                                            <span className="text-sm font-semibold text-slate-350">Featured Project</span>
                                        </div>
                                    </>
                                )}

                                {/* SKILL FORM FIELDS */}
                                {activeTab === "skills" && (
                                    <>
                                        <div className="space-y-1">
                                            <label className="text-xs text-slate-455 uppercase font-semibold">Skill Name</label>
                                            <input
                                                type="text"
                                                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-sm text-slate-200"
                                                value={skillForm.name}
                                                onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-slate-455 uppercase font-semibold">Category</label>
                                            <select
                                                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-sm text-slate-200"
                                                value={skillForm.category}
                                                onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                                                required
                                            >
                                                <option value="">Select Category</option>
                                                <option value="Languages">Languages</option>
                                                <option value="Frameworks">Frameworks</option>
                                                <option value="Databases">Databases</option>
                                                <option value="Tools">Tools</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-xs text-slate-455 uppercase font-semibold">
                                                <label>Proficiency</label>
                                                <span className="text-cyan-400 font-bold">{skillForm.proficiency}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                className="w-full accent-cyan-400"
                                                value={skillForm.proficiency}
                                                onChange={(e) => setSkillForm({ ...skillForm, proficiency: parseInt(e.target.value) })}
                                            />
                                        </div>
                                    </>
                                )}

                                {/* EDUCATION FORM FIELDS */}
                                {activeTab === "education" && (
                                    <>
                                        <div className="space-y-1">
                                            <label className="text-xs text-slate-450 uppercase font-semibold">Institution Name</label>
                                            <input
                                                type="text"
                                                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-sm text-slate-200"
                                                value={educationForm.institution}
                                                onChange={(e) => setEducationForm({ ...educationForm, institution: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs text-slate-450 uppercase font-semibold">Degree</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-sm text-slate-200"
                                                    value={educationForm.degree}
                                                    onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-slate-450 uppercase font-semibold">Field of Study</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-sm text-slate-200"
                                                    value={educationForm.fieldOfStudy}
                                                    onChange={(e) => setEducationForm({ ...educationForm, fieldOfStudy: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs text-slate-450 uppercase font-semibold">Start Year</label>
                                                <input
                                                    type="number"
                                                    min="2004"
                                                    max="2050"
                                                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-sm text-slate-200"
                                                    value={educationForm.startYear}
                                                    onChange={(e) => setEducationForm({ ...educationForm, startYear: parseInt(e.target.value) })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-slate-450 uppercase font-semibold">End Year</label>
                                                <input
                                                    type="number"
                                                    min="2004"
                                                    max="2050"
                                                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-sm text-slate-200"
                                                    value={educationForm.endYear}
                                                    onChange={(e) => setEducationForm({ ...educationForm, endYear: parseInt(e.target.value) })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-slate-450 uppercase font-semibold">CGPA</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    max="10"
                                                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-sm text-slate-200"
                                                    value={educationForm.cgpa}
                                                    onChange={(e) => setEducationForm({ ...educationForm, cgpa: parseFloat(e.target.value) })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-slate-450 uppercase font-semibold">Description</label>
                                            <textarea
                                                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-sm text-slate-200 resize-none h-24"
                                                value={educationForm.description}
                                                onChange={(e) => setEducationForm({ ...educationForm, description: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                {/* EXPERIENCE FORM FIELDS */}
                                {activeTab === "experience" && (
                                    <>
                                        <div className="space-y-1">
                                            <label className="text-xs text-slate-450 uppercase font-semibold">Company Name</label>
                                            <input
                                                type="text"
                                                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-sm text-slate-200"
                                                value={experienceForm.company}
                                                onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs text-slate-450 uppercase font-semibold">Role / Job Title</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-sm text-slate-200"
                                                    value={experienceForm.role}
                                                    onChange={(e) => setExperienceForm({ ...experienceForm, role: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-slate-450 uppercase font-semibold">Location</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-sm text-slate-200"
                                                    value={experienceForm.location}
                                                    onChange={(e) => setExperienceForm({ ...experienceForm, location: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs text-slate-450 uppercase font-semibold">Start Year</label>
                                                <input
                                                    type="number"
                                                    min="2023"
                                                    max="2050"
                                                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-sm text-slate-200"
                                                    value={experienceForm.startYear}
                                                    onChange={(e) => setExperienceForm({ ...experienceForm, startYear: parseInt(e.target.value) })}
                                                    required
                                                />
                                            </div>
                                            {!experienceForm.current && (
                                                <div className="space-y-1">
                                                    <label className="text-xs text-slate-450 uppercase font-semibold">End Year</label>
                                                    <input
                                                        type="number"
                                                        min="2023"
                                                        max="2050"
                                                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-sm text-slate-200"
                                                        value={experienceForm.endYear}
                                                        onChange={(e) => setExperienceForm({ ...experienceForm, endYear: parseInt(e.target.value) })}
                                                        required
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setExperienceForm({ ...experienceForm, current: !experienceForm.current })}
                                                className="text-cyan-400 cursor-pointer"
                                            >
                                                {experienceForm.current ? <FaToggleOn size={26} /> : <FaToggleOff size={26} className="text-slate-550" />}
                                            </button>
                                            <span className="text-sm font-semibold text-slate-355">Current Job / Role</span>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-slate-450 uppercase font-semibold">Description</label>
                                            <textarea
                                                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 outline-none text-sm text-slate-200 resize-none h-24"
                                                value={experienceForm.description}
                                                onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                <button
                                    type="submit"
                                    className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-3 rounded-xl transition duration-300 shadow cursor-pointer text-sm"
                                >
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                                                )}

                {/* MESSAGE READER MODAL */}
                {selectedMessage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                        <div className="w-full max-w-lg bg-slate-900 border border-slate-850 rounded-3xl p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="absolute top-5 right-5 text-slate-500 hover:text-slate-300 transition cursor-pointer"
                            >
                                <FaTimes size={18} />
                            </button>

                            <h2 className="text-2xl font-bold text-slate-100 mb-6 border-b border-slate-850 pb-4">
                                Message Details
                            </h2>

                            <div className="space-y-4 text-sm text-slate-300">
                                <div>
                                    <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider">Sender Name</span>
                                    <span className="text-slate-150 font-semibold">{selectedMessage.name}</span>
                                </div>
                                
                                <div>
                                    <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider">Email Address</span>
                                    <a href={`mailto:${selectedMessage.email}`} className="text-cyan-400 hover:underline">{selectedMessage.email}</a>
                                </div>

                                <div>
                                    <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider">Subject</span>
                                    <span className="text-slate-150 font-medium">{selectedMessage.subject}</span>
                                </div>

                                <div>
                                    <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider">Message Body</span>
                                    <p className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 leading-relaxed whitespace-pre-wrap mt-1">
                                        {selectedMessage.message}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="w-full mt-6 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold py-2.5 rounded-xl transition duration-300 cursor-pointer text-sm"
                            >
                                Close Message
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
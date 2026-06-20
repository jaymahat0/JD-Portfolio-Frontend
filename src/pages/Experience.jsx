function Experience() {
    return (
        <div className="max-w-6xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-8">
                Experience
            </h1>

            <div className="bg-white shadow-md rounded-lg p-6">

                <h2 className="text-2xl font-semibold">
                    Full Stack Java Developer
                </h2>

                <p className="text-gray-600 mt-2">
                    Personal Projects & Self Learning
                </p>

                <p className="text-gray-500 mt-2">
                    2024 - Present
                </p>

                <ul className="list-disc pl-6 mt-4 text-gray-700 space-y-2">
                    <li>
                        Developed REST APIs using Java, Spring Boot, and PostgreSQL.
                    </li>

                    <li>
                        Built secure applications using Spring Security and JWT.
                    </li>

                    <li>
                        Created responsive frontend applications using React and Tailwind CSS.
                    </li>

                    <li>
                        Implemented Docker-based deployment and cloud hosting.
                    </li>
                </ul>

            </div>

        </div>
    );
}

export default Experience;
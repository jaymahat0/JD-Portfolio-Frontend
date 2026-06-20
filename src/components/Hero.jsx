import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Left Side */}
          <div>
            <p className="text-cyan-400 text-lg mb-2">
              Hello, I'm
            </p>

            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Jaydev Mahato
            </h1>

            <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">
              Java Backend Developer
            </h2>

            <p className="text-gray-400 leading-8 mb-8 max-w-xl">
              Passionate about building scalable REST APIs using
              Spring Boot, Spring Security, PostgreSQL and modern
              backend technologies.
            </p>

            <div className="flex flex-wrap gap-4">

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg transition"
              >
                Download Resume
              </a>

              <Link
                to="/contact"
                className="border border-cyan-500 px-6 py-3 rounded-lg hover:bg-cyan-500 transition"
              >
                Contact Me
              </Link>

            </div>
          </div>

          {/* Right Side */}
          <div className="flex justify-center">

            <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-cyan-500 shadow-2xl">

              <img
                src="/profile.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
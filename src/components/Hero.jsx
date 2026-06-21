import { Link } from "react-router-dom";
import { FaDownload, FaArrowRight } from "react-icons/fa";

function Hero() {
  return (
    <section
      id="home"
      className="min-h-[calc(100vh-76px)] bg-slate-950 flex items-center relative overflow-hidden py-16 px-6"
    >
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto w-full relative">
        <div className="grid md:grid-cols-12 gap-12 items-center">

          {/* Left Side */}
          <div className="md:col-span-7 text-left space-y-6">
            <p className="text-cyan-400 font-bold tracking-wider uppercase text-sm">
              Welcome to my portfolio
            </p>

            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-100 tracking-tight leading-none">
              Jaydev Mahato
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Java Backend Developer
            </h2>

            <p className="text-slate-400 leading-relaxed text-base md:text-lg max-w-xl">
              I specialize in engineering secure, scalable, and high-performance backend applications using
              <span className="text-cyan-300 font-medium"> Java</span>,
              <span className="text-cyan-300 font-medium"> Spring Boot</span>,
              <span className="text-cyan-300 font-medium"> Spring Security</span>,
              <span className="text-cyan-300 font-medium"> Spring Data JPA</span>,
              <span className="text-cyan-300 font-medium"> JWT</span>,
              <span className="text-cyan-300 font-medium"> RESTful APIs</span>, and
              <span className="text-cyan-300 font-medium"> PostgreSQL</span>. Passionate about clean architecture and efficient system design, I focus on building robust, maintainable, and production-ready software solutions while solving complex problems.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition duration-300 shadow-lg cursor-pointer"
              >
                Download Resume <FaDownload size={12} />
              </a>

              <Link
                to="/contact"
                className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-400 font-bold px-6 py-3.5 rounded-xl transition duration-300 shadow-md"
              >
                Contact Me <FaArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Right Side */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>

              <div className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-cyan-500/30 shadow-2xl relative bg-slate-900 flex items-center justify-center">
                <img
                  src="/profile.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initial avatar representation if image is missing
                    e.target.style.display = "none";
                    e.target.parentNode.innerHTML = `<span class="text-8xl font-black text-cyan-400 tracking-wider">JM</span>`;
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;

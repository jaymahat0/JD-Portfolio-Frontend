import { FaUserGraduate, FaCode, FaLaptopCode, FaRocket } from "react-icons/fa";

function About() {
  return (
    <section
      id="about"
      className="bg-slate-950 text-slate-100 py-24 px-6 relative"
    >
      <div className="max-w-6xl mx-auto relative">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16">
          About <span className="text-cyan-400">Me</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-stretch">

          {/* Left Side: Biography */}
          <div className="space-y-6 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-200">
              Java Backend Engineer
            </h3>

            <p className="text-slate-400 leading-relaxed">
              I'm Jaydev Mahato, currently pursuing a Bachelor of Technology (B.Tech) in Electrical and Electronics Engineering at the
              <span className="text-slate-200 font-semibold"> National Institute of Technology Goa</span>.
              I specialize in backend development and have a strong interest in building secure, scalable, and high-performance applications
              using Java and the Spring ecosystem.
            </p>

            <p className="text-slate-400 leading-relaxed">
              I have hands-on experience developing RESTful APIs and implementing authentication and authorization using Spring Security and JWT.
              I enjoy writing clean, maintainable code and regularly practice Data Structures and Algorithms (DSA) to strengthen my problem-solving
              skills and improve the efficiency of my solutions.
            </p>

            <p className="text-slate-400 leading-relaxed">
              Passionate about software engineering and system design, I thrive on challenges that require analytical thinking, performance
              optimization, and architecting reliable backend systems that are robust, scalable, and easy to maintain.
            </p>
          </div>

          {/* Right Side: Key Metadata */}
          <div className="glass rounded-3xl p-8 flex flex-col justify-center space-y-6">
            <h4 className="text-xl font-bold text-slate-100 mb-2">Details & Focus Areas</h4>

            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                  <FaUserGraduate size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Education</p>
                  <p className="text-sm text-slate-200 font-medium">B.Tech EEE, NIT Goa (2023 - 2027)</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                  <FaCode size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Core Tech</p>
                  <p className="text-sm text-slate-200 font-medium">Java, Spring Boot, Spring Security, Spring Data JPA, SQL</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                  <FaLaptopCode size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Databases & Tools</p>
                  <p className="text-sm text-slate-200 font-medium">PostgreSQL, MySQL, JPA/Hibernate, Git, Maven</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                  <FaRocket size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Interests</p>
                  <p className="text-sm text-slate-200 font-medium">Backend Development, AI & ML, Problem Solving</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;

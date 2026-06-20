import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import HomePage from "./pages/HomePage";
import About from "./pages/About";

function App() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/education" element={<Education />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />

        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
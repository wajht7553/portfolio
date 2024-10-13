import Skills from "./components/homepage/skills";
import Projects from "./components/homepage/projects";
import AboutSection from "./components/homepage/about";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import ContactSection from "./components/homepage/contact";
import HeroSection from "./components/homepage/hero-section";


/**
 * The Home component is an asynchronous function that returns a JSX fragment
 * containing various sections of a portfolio page.
 *
 * @async
 * @function Home
 * @returns {JSX.Element} A JSX fragment containing the HeroSection, AboutSection,
 * Experience, Skills, Projects, Education, and ContactSection components.
 */
export default async function Home() {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <Experience />
            <Skills />
            <Projects />
            <Education />
            <ContactSection />
        </>
    )
};
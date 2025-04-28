import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from './components/ui/toaster.tsx';
import { queryClient } from "./lib/queryClient.ts";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { LanguageProvider } from "./i18n/LanguageContext.tsx";
import SplashScreen from './components/SplashScreen.tsx';
import Navbar from './components/Navbar.tsx';
import HeroSection from './components/HeroSection.tsx';
import AboutSection from './components/AboutSection.tsx';
import SkillsSection from './components/SkillsSection.tsx';
import ExperienceSection from './components/ExperienceSection.tsx';
import ProjectsSection from './components/ProjectsSection.tsx';
import EducationSection from './components/EducationSection.tsx';
import ContactSection from './components/ContactSection.tsx';
import Footer from './components/Footer.tsx';
import BackToTop from './components/BackToTop.tsx';
import GameSection from './components/GameSection.tsx';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          {loading ? (
          <SplashScreen />
        ) : (
          <div className="bg-white dark:bg-dark-900 text-dark-800 dark:text-white transition-colors duration-300">
            <Navbar />
            <main>
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ExperienceSection />
              <ProjectsSection />
              <EducationSection />
              <GameSection />
              <ContactSection />
            </main>
            <Footer />
            <BackToTop />
          </div>
        )}
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;

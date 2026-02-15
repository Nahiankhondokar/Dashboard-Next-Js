"use client";

import { useState } from "react";
import HomeSection from "@/app/(portfolio)/components/HomeSection";
import AboutSection from "@/app/(portfolio)/components/AboutSection";
import PortfolioSection from "@/app/(portfolio)/components/PortfolioSection";
import ContactSection from "@/app/(portfolio)/components/ContactSection";
import HeaderSection from "@/app/(portfolio)/components/HeaderSection";
import { motion, AnimatePresence } from "framer-motion";
import {About, Home, Section} from "@/app/(portfolio)/type/type";

export default function PortfolioClient({ home, about, portfolio, contact }: {
    home: Home,
    about: About,
    portfolio: Home,
    contact: Home
}) {
    const [activeSection, setActiveSection] = useState<Section>("home");

    return (
        <>
            <div className="bg-[#0f172a] text-white min-h-screen font-sans selection:bg-yellow-500 selection:text-black">
                {/* Headers */}
                <HeaderSection activeSection={activeSection} setActiveSection={setActiveSection} />

                <main className="container mx-auto mb-10 px-4 lg:px-20 ">
                    <AnimatePresence mode="wait">
                        {/* nav omitted */}
                        {activeSection === "home" && <HomeSection data={home} onNavigate={setActiveSection} />}
                        {activeSection === "about" && <AboutSection data={about} />}
                        {activeSection === "portfolio" && <PortfolioSection data={portfolio} />}
                        {activeSection === "contact" && <ContactSection data={contact} />}
                    </AnimatePresence>
                </main>
            </div>
        </>
    );
}

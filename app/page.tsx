"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home, User, Briefcase, Mail, FileText,
    ExternalLink, Download, MapPin, Phone, Mail as MailIcon, GraduationCapIcon
} from "lucide-react";
import {GraduationCap} from "lucide";
import Image from "next/image";
import Me from "@/public/assets/me/me.jpg";

// --- Types ---
type Section = "home" | "about" | "portfolio" | "contact";

export default function Portfolio() {
    const [activeSection, setActiveSection] = useState<Section>("home");

    // --- Navigation Items ---
    const navItems = [
        { id: "home", icon: <Home size={20} />, label: "Home" },
        { id: "about", icon: <User size={20} />, label: "About" },
        { id: "portfolio", icon: <Briefcase size={20} />, label: "Portfolio" },
        { id: "contact", icon: <Mail size={20} />, label: "Contact" },
    ];

    return (
        <div className="bg-[#111111] text-white min-h-screen font-sans selection:bg-yellow-500 selection:text-black">
            {/* Fixed Desktop Navigation */}
            <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-5">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id as Section)}
                        className={`group relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                            activeSection === item.id ? "bg-yellow-500 text-white" : "bg-[#2b2b2b] hover:bg-yellow-500"
                        }`}
                    >
            <span className={activeSection === item.id ? "text-white" : "group-hover:text-white"}>
              {item.icon}
            </span>
                        <span className="absolute right-14 px-4 py-2 bg-yellow-500 text-black font-bold opacity-0 group-hover:opacity-100 transition-all rounded-l-full uppercase text-xs tracking-widest pointer-events-none">
              {item.label}
            </span>
                    </button>
                ))}
            </nav>

            {/* Main Content Area */}
            <main className="container mx-auto px-4 lg:px-20">
                <AnimatePresence mode="wait">
                    {activeSection === "home" && <HomeSection key="home" onNavigate={setActiveSection} />}
                    {activeSection === "about" && <AboutSection key="about" />}
                    {activeSection === "portfolio" && <PortfolioSection key="portfolio" />}
                    {activeSection === "contact" && <ContactSection key="contact" />}
                </AnimatePresence>
            </main>
        </div>
    );
}

// --- 1. HOME SECTION ---
function HomeSection({ onNavigate }: { onNavigate: (s: Section) => void }) {
    return (
        <motion.section
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
            className="flex flex-col lg:flex-row items-center min-h-screen py-10"
        >
            <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
                <div className="w-72 h-72 lg:w-[450px] lg:h-[550px] rounded-3xl border-4 border-[#252525] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                    {/* Replace with your image */}
                    <div className="bg-[#252525] w-full h-full flex items-center justify-center text-gray-500">
                        <Image src={Me} alt="image"/>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-2/3 mt-10 lg:mt-0 lg:pl-10 text-center lg:text-left">
                <h1 className="text-4xl lg:text-6xl font-extrabold uppercase leading-tight">
                    <span className="text-yellow-500 block">I'm Abdullah Al Nahian.</span>
                    Software Engineer
                </h1>
                <p className="mt-6 text-gray-300 max-w-xl text-lg leading-relaxed mx-auto lg:mx-0">
                    I am a professional Full Stack Software Engineer based in Dhaka, Bangladesh.
                    I specialize in building robust backend systems with Laravel and modern
                    frontends with React and Vue.
                </p>
                <button
                    onClick={() => onNavigate("about")}
                    className="mt-8 group flex items-center gap-4 border-2 border-yellow-500 rounded-full pl-8 pr-2 py-2 font-bold uppercase tracking-wider hover:bg-yellow-500 hover:text-black transition-all mx-auto lg:mx-0"
                >
                    More About Me
                    <span className="bg-yellow-500 text-white p-3 rounded-full group-hover:bg-black transition-colors">
            <User size={20} />
          </span>
                </button>
            </div>
        </motion.section>
    );
}

// --- 2. ABOUT SECTION ---
function AboutSection() {
    const skills = [
        { name: "PHP", val: 90 },
        { name: "Laravel", val: 80 },
        { name: "React", val: 70 },
        { name: "JavaScript", val: 80 }
    ];

    const experienceData = [
        {
            year: "May, 2023 - Present",
            title: "Backend Developer (Laravel)",
            place: "E-commerce & Sales Automation Solution",
            description: "Focusing on backend architecture including Product, Order, Courier Service, Payment Gateway, and Inventory Management.",
        },
        {
            year: "Jan, 2021 - Apr, 2021",
            title: "Full Stack Software Engineer",
            place: "Product for CodeCanyon (Part Time)",
            description: "Built an E-commerce solution for farmers. Developed APIs for the backend and designed the frontend using React js.",
        },
    ];

    const educationData = [
        {
            year: "2021 - 2022",
            title: "Web Development Course",
            place: "Interactive Cares",
            description: "Advanced training in modern web technologies and software engineering principles.",
        },
        {
            year: "2020 - 2021",
            title: "Web Design Course",
            place: "Coder Trust Bangladesh",
            description: "Focused on responsive UI/UX design and frontend fundamentals.",
        },
        {
            year: "2015 - 2019",
            title: "Bachelor of Business Administration (BBA)",
            place: "National University of Bangladesh",
            description: "Academic foundation in business management and administration.",
        },
    ];

    // Internal helper component for Timeline items
    const TimelineItem = ({ data, icon }: { data: any; icon: React.ReactNode }) => (
        <li className="relative pl-16 mb-12 last:mb-0 before:content-[''] before:absolute before:left-[19px] before:top-0 before:bottom-0 before:w-[1px] before:bg-[#333]">
            <div className="absolute left-0 top-0 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white z-10 shadow-[0_0_20px_rgba(255,180,0,0.2)]">
                {icon}
            </div>
            <span className="inline-block px-3 py-1 mb-3 text-[12px] font-semibold uppercase tracking-wide bg-[#252525] text-gray-300 rounded-full">
                {data.year}
            </span>
            <h5 className="text-lg font-bold uppercase text-white mt-2">
                {data.title}
                <span className="block text-sm font-medium text-gray-400 mt-1 opacity-80 before:content-['—'] before:mr-2">
                    {data.place}
                </span>
            </h5>
            <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                {data.description}
            </p>
        </li>
    );

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-20 relative overflow-hidden"
        >
            {/* Background Text Accent */}
            <div className="absolute top-10 left-0 w-full text-center pointer-events-none select-none">
                <span className="text-7xl lg:text-9xl font-black uppercase opacity-[0.03] text-white">Resume</span>
            </div>

            <h2 className="text-center text-4xl lg:text-5xl font-black uppercase mb-20 relative z-10">
                About <span className="text-yellow-500">Me</span>
            </h2>

            {/* Personal Info & Stats */}
            <div className="grid lg:grid-cols-2 gap-16 mb-24">
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold uppercase tracking-tight">Personal Info</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-gray-300">
                        <p><span className="opacity-60 font-medium">Name:</span> Abdullah Al Nahian</p>
                        <p><span className="opacity-60 font-medium">Address:</span> Dhaka, BD</p>
                        <p><span className="opacity-60 font-medium">Phone:</span> +880 1346 767027</p>
                        <p><span className="opacity-60 font-medium">Email:</span> info.nahian13@gmail.com</p>
                        <p><span className="opacity-60 font-medium">Freelance:</span> Available</p>
                        <p><span className="opacity-60 font-medium">Nationality:</span> Bangladeshi</p>
                    </div>
                    <button className="group mt-6 flex items-center gap-4 border-2 border-yellow-500 rounded-full px-8 py-3 font-bold uppercase tracking-wider hover:bg-yellow-500 hover:text-black transition-all">
                        Download CV
                        <span className="bg-yellow-500 group-hover:bg-black p-2 rounded-full transition-colors">
                            <Download size={16} className="text-white" />
                        </span>
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Years Exp", val: "3+" },
                        { label: "Projects", val: "20+" },
                        { label: "Clients", val: "15+" },
                        { label: "Awards", val: "2" },
                    ].map((stat, i) => (
                        <div key={i} className="border border-[#252525] p-6 rounded-xl hover:border-yellow-500/30 transition-colors">
                            <h4 className="text-4xl font-bold text-yellow-500">{stat.val}</h4>
                            <p className="uppercase text-xs tracking-[2px] mt-2 text-gray-300">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="border-[#252525] mb-20 max-w-2xl mx-auto" />

            {/* Skills Section */}
            <div className="mb-24">
                <h3 className="text-center text-3xl font-bold uppercase mb-16 tracking-tight">My Skills</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {skills.map(skill => (
                        <div key={skill.name} className="flex flex-col items-center">
                            <div className="relative w-28 h-28 rounded-full border-[6px] border-[#252525] border-t-yellow-500 flex items-center justify-center text-2xl font-bold shadow-lg">
                                {skill.val}%
                            </div>
                            <p className="mt-6 uppercase font-bold tracking-widest text-sm">{skill.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="border-[#252525] mb-20 max-w-2xl mx-auto" />

            {/* Experience & Education Section */}
            <div className="max-w-6xl mx-auto">
                <h3 className="text-center text-3xl font-bold uppercase mb-16">
                    Experience <span className="text-yellow-500">&</span> Education
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
                    {/* Experience Column */}
                    <div>
                        <ul className="list-none p-0">
                            {experienceData.map((item, idx) => (
                                <TimelineItem key={idx} data={item} icon={<Briefcase size={18} />} />
                            ))}
                        </ul>
                    </div>

                    {/* Education Column */}
                    <div className="mt-12 lg:mt-0">
                        <ul className="list-none p-0">
                            {educationData.map((item, idx) => (
                                <TimelineItem key={idx} data={item} icon={<GraduationCapIcon size={18} />} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

// --- 3. PORTFOLIO SECTION ---
function PortfolioSection() {
    const projects = [
        { title: "E-commerce Solution", category: "Laravel", img: "🛍️" },
        { title: "Inventory Design", category: "React", img: "📊" },
        { title: "Sales Automation", category: "Full Stack", img: "⚙️" },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="py-20"
        >
            <h2 className="text-center text-4xl lg:text-5xl font-black uppercase mb-16">My <span className="text-yellow-500">Portfolio</span></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((proj, i) => (
                    <div key={i} className="group relative overflow-hidden rounded-xl cursor-pointer">
                        <div className="bg-[#252525] h-64 flex items-center justify-center text-6xl">
                            {proj.img}
                        </div>
                        <div className="absolute inset-0 bg-yellow-500 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                            <h4 className="text-black font-bold text-xl uppercase tracking-tighter">{proj.title}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}

// --- 4. CONTACT SECTION ---
function ContactSection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="py-20"
        >
            <h2 className="text-center text-4xl lg:text-5xl font-black uppercase mb-16">Get In <span className="text-yellow-500">Touch</span></h2>
            <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1 space-y-8">
                    <h3 className="text-2xl font-bold uppercase">Do not be shy!</h3>
                    <p className="text-gray-400">Feel free to get in touch with me. I am always open to discussing new projects or creative ideas.</p>
                    <div className="flex items-center gap-4">
                        <div className="text-yellow-500"><MapPin /></div>
                        <div><p className="uppercase opacity-60 text-xs">Address</p><p>Dhaka, Bangladesh</p></div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-yellow-500"><MailIcon /></div>
                        <div><p className="uppercase opacity-60 text-xs">Mail Me</p><p>info.nahian13@gmail.com</p></div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input placeholder="YOUR NAME" className="bg-[#252525] border-none rounded-full px-6 py-3 focus:ring-2 focus:ring-yellow-500 outline-none" />
                        <input placeholder="YOUR EMAIL" className="bg-[#252525] border-none rounded-full px-6 py-3 focus:ring-2 focus:ring-yellow-500 outline-none" />
                        <input placeholder="YOUR SUBJECT" className="md:col-span-2 bg-[#252525] border-none rounded-full px-6 py-3 focus:ring-2 focus:ring-yellow-500 outline-none" />
                        <textarea rows={5} placeholder="YOUR MESSAGE" className="md:col-span-2 bg-[#252525] border-none rounded-3xl px-6 py-4 focus:ring-2 focus:ring-yellow-500 outline-none" />
                        <button className="w-fit flex items-center gap-4 border-2 border-yellow-500 rounded-full px-10 py-3 font-bold uppercase tracking-wider hover:bg-yellow-500 hover:text-black transition-all">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </motion.section>
    );
}
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Download, GraduationCapIcon, Info } from "lucide-react";
import { About, Metrics } from "@/app/(main-portfolio)/type/type";

// --- Sub-component: Empty State Wrapper ---
const EmptyState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center py-10 px-4 border border-dashed border-[#333] rounded-xl opacity-50">
        <Info size={24} className="mb-2 text-yellow-500" />
        <p className="text-sm uppercase tracking-widest">{message}</p>
    </div>
);

// --- Sub-component: Timeline Item ---
const TimelineItem = ({ data, icon }: { data: any; icon: React.ReactNode }) => (
    <li className="relative pl-16 mb-12 last:mb-0 before:content-[''] before:absolute before:left-[19px] before:top-0 before:bottom-0 before:w-[1px] before:bg-[#333]">
        <div className="absolute left-0 top-0 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white z-10 shadow-[0_0_20px_rgba(255,180,0,0.2)]">
            {icon}
        </div>
        <span className="inline-block px-3 py-1 mb-3 text-[12px] font-semibold uppercase tracking-wide bg-[#252525] text-gray-300 rounded-full">
      {data.year || "Year N/A"}
    </span>
        <h5 className="text-lg font-bold uppercase text-white mt-2">
            {data.title || "Untitled Role"}
            <span className="block text-sm font-medium text-gray-400 mt-1 opacity-80 before:content-['—'] before:mr-2">
        {data.institute || data.company || "Institution N/A"}
      </span>
        </h5>
        {data.description && (
            <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                {data.description}
            </p>
        )}
    </li>
);

const AboutSection = ({ data }: { data: About }) => {
    // Destructure with fallbacks to avoid crashes
    const {
        expertise: skills = [],
        metrics = [],
        experiences = [],
        educations = [],
        name = "User",
        location = "N/A",
        phone,
        email = "N/A",
        job_type = "N/A",
        nationality = "N/A",
    } = data || {};

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-20 relative overflow-hidden"
        >
            {/* Background Text Accent */}
            <div className="absolute top-10 left-0 w-full text-center pointer-events-none select-none">
        <span className="text-7xl lg:text-9xl font-black uppercase opacity-[0.03] text-white">
          Resume
        </span>
            </div>

            <h2 className="text-center text-4xl lg:text-5xl font-black uppercase mb-20 relative z-10">
                About <span className="text-yellow-500">Me</span>
            </h2>

            {/* Personal Info & Stats */}
            <div className="grid lg:grid-cols-2 gap-16 mb-24">
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold uppercase tracking-tight">Personal Info</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-gray-300">
                        <p><span className="opacity-60 font-medium">Name:</span> {name}</p>
                        <p><span className="opacity-60 font-medium">Address:</span> {location}</p>
                        <p><span className="opacity-60 font-medium">Phone:</span> {phone || "Not Shared"}</p>
                        <p><span className="opacity-60 font-medium">Email:</span> {email}</p>
                        <p><span className="opacity-60 font-medium">Freelance:</span> {job_type}</p>
                        <p><span className="opacity-60 font-medium">Nationality:</span> {nationality}</p>
                    </div>
                    <button className="group mt-6 flex items-center gap-4 border-2 border-yellow-500 rounded-full px-8 py-3 font-bold uppercase tracking-wider hover:bg-yellow-500 hover:text-black transition-all">
                        Download CV
                        <span className="bg-yellow-500 group-hover:bg-black p-2 rounded-full transition-colors">
              <Download size={16} className="text-white" />
            </span>
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {metrics.length > 0 ? (
                        metrics.map((stat: Metrics, i) => (
                            <div key={i} className="border border-[#252525] p-6 rounded-xl hover:border-yellow-500/30 transition-colors">
                                <h4 className="text-4xl font-bold text-yellow-500">{stat.value}</h4>
                                <p className="uppercase text-xs tracking-[2px] mt-2 text-gray-300">{stat.label}</p>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-2"><EmptyState message="No metrics available" /></div>
                    )}
                </div>
            </div>

            <hr className="border-[#252525] mb-20 max-w-2xl mx-auto" />

            {/* Skills Section */}
            <div className="mb-24">
                <h3 className="text-center text-3xl font-bold uppercase mb-12 tracking-tight">My Skills</h3>
                {skills.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {skills.map((skill) => (
                            <div key={skill.name} className="flex flex-col items-center">
                                <div
                                    className="relative w-28 h-28 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg"
                                    style={{
                                        background: `conic-gradient(#eab308 ${skill.progress}%, #252525 0)`,
                                    }}
                                >
                                    <div className="absolute inset-[6px] bg-[#111] rounded-full flex items-center justify-center">
                                        <span className="text-white">{skill.progress}%</span>
                                    </div>
                                </div>
                                <p className="mt-6 uppercase font-bold tracking-widest text-sm text-gray-300">
                                    {skill.name}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState message="No expertise data found" />
                )}
            </div>

            <hr className="border-[#252525] mb-20 max-w-2xl mx-auto" />

            {/* Experience & Education Section */}
            <div className="max-w-6xl mx-auto pb-10">
                <h3 className="text-center text-3xl font-bold uppercase mb-16">
                    Experience <span className="text-yellow-500">&</span> Education
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
                    {/* Experience Column */}
                    <div>
                        <h4 className="text-xl font-bold mb-8 uppercase text-gray-400">Experience</h4>
                        {experiences.length > 0 ? (
                            <ul className="list-none p-0">
                                {experiences.map((item, idx) => (
                                    <TimelineItem key={idx} data={item} icon={<Briefcase size={18} />} />
                                ))}
                            </ul>
                        ) : (
                            <EmptyState message="No professional history" />
                        )}
                    </div>

                    {/* Education Column */}
                    <div className="mt-12 lg:mt-0">
                        <h4 className="text-xl font-bold mb-8 uppercase text-gray-400">Education</h4>
                        {educations.length > 0 ? (
                            <ul className="list-none p-0">
                                {educations.map((item, idx) => (
                                    <TimelineItem key={idx} data={item} icon={<GraduationCapIcon size={18} />} />
                                ))}
                            </ul>
                        ) : (
                            <EmptyState message="No educational records" />
                        )}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default AboutSection;
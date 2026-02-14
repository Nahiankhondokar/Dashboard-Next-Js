import { motion } from "framer-motion";
import {Briefcase, Download, GraduationCapIcon} from "lucide-react";
import Me from "@/public/assets/me/me.jpg";

// ----- Type ----
type About = {

}

const AboutSection = (
    {data} : {
        data: About
    }
) => {
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
    const TimelineItem = (
        { data, icon }:
        { data: any; icon: React.ReactNode }) => (
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

export  default  AboutSection;
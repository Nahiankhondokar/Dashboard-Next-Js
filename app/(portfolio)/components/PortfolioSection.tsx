import { motion } from "framer-motion";

// ---- type ---
type Portfolio = {

}

const PortfolioSection = (
    {data}: {data: Portfolio}) => {

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

export default PortfolioSection;
import { motion } from "framer-motion";
import {MailIcon, MapPin} from "lucide-react";

// --- Type ----
type Contact = {

}

const ContactSection = ({data}: {data: Contact}) => {
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

export default ContactSection;
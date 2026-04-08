import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const ArrowRightIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const GithubIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"/><path d="M9 20c-5 1.5-5-2.5-7-3"/></svg>;
const LinkedinIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;

const PROJECTS = [
    { title: 'GoSH', category: 'Systems', year: '2025', link: 'https://github.com/noxire-dev/GoSH' },
    { title: 'Moji', category: 'Web App', year: '2025', link: 'https://github.com/noxire-dev/moji' },
    { title: 'LoreKeeper', category: 'Platform', year: '2025', link: 'https://github.com/noxire-dev/LoreKeeper' },
    { title: 'Midnight Moon', category: 'Design', year: '2024', link: 'https://github.com/noxire-dev/midnight-theme' },
];

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.closest('button') || target.closest('a')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center hidden md:flex mix-blend-difference"
            animate={{
                x: mousePosition.x - 20,
                y: mousePosition.y - 20,
                scale: isHovering ? 2 : 1,
            }}
            transition={{ type: "tween", duration: 0 }}
        >
            <div className="w-10 h-10 border-2 border-white flex items-center justify-center">
                <motion.div 
                    className="w-2 h-2 bg-[#FF4500]"
                    animate={{ opacity: isHovering ? 0 : 1 }}
                />
            </div>
        </motion.div>
    );
};

const NavBar = () => (
    <nav className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center bg-[#1A1A1A] border-b-2 border-white/10 mix-blend-difference">
        <Link to="/" className="text-4xl font-bold tracking-tighter text-white uppercase hover:text-[#FF4500] transition-colors">SD</Link>
        <div className="hidden md:flex items-center gap-8 text-xl font-bold text-white uppercase tracking-widest">
            <a href="#work" className="hover:text-[#FF4500] transition-colors cursor-none">Work</a>
            <a href="#contact" className="hover:text-[#FF4500] transition-colors cursor-none">Contact</a>
            <Link to="/" className="text-white/50 hover:text-[#FF4500] transition-colors cursor-none">← All designs</Link>
        </div>
    </nav>
);

const Hero = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 200]);

    return (
        <section className="relative h-screen flex flex-col justify-end px-6 md:px-12 pb-24 overflow-hidden bg-[#1A1A1A]">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
            
            <motion.div style={{ y }} className="z-10 w-full">
                <div className="w-full border-t-2 border-white/20 pt-8 mb-8 flex justify-between text-white/50 text-xl font-bold uppercase tracking-widest">
                    <span>PORTFOLIO</span>
                    <span>2026</span>
                    <span className="text-[#FF4500]">AVAILABLE</span>
                </div>
                
                <h1 className="text-[10vw] font-black tracking-tighter leading-[0.8] mb-8 text-white uppercase break-words">
                    SINA<br/>DILEK
                </h1>

                <p className="text-2xl md:text-4xl text-white max-w-3xl font-bold uppercase tracking-wide border-l-4 border-[#FF4500] pl-6">
                    Product-minded frontend developer. Systems programming. Pushing boundaries.
                </p>
            </motion.div>
        </section>
    );
};

const Projects = () => (
    <section id="work" className="py-24 px-6 md:px-12 bg-[#1A1A1A]">
        <div className="mb-16 border-b-2 border-white/20 pb-8">
            <h2 className="text-4xl font-bold text-white uppercase tracking-widest">SELECTED WORK ({PROJECTS.length})</h2>
        </div>

        <div className="flex flex-col">
            {PROJECTS.map((project, i) => (
                <motion.a
                    key={i}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="group flex flex-col md:flex-row justify-between items-start md:items-center py-12 border-b-2 border-white/10 hover:border-[#FF4500] hover:bg-white/5 transition-all duration-300 cursor-none px-4"
                >
                    <div className="flex flex-col">
                        <span className="text-[#FF4500] font-bold text-xl mb-4 uppercase">[{project.category}]</span>
                        <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white group-hover:translate-x-8 transition-transform duration-500">{project.title}</h3>
                    </div>
                    <div className="mt-8 md:mt-0 flex items-center gap-8">
                        <span className="text-3xl font-bold text-white/50">{project.year}</span>
                        <div className="w-20 h-20 bg-[#FF4500] flex items-center justify-center text-white opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                            <ArrowRightIcon />
                        </div>
                    </div>
                </motion.a>
            ))}
        </div>
    </section>
);

const Stack = () => {
    const skills = ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Three.js", "WebGL", "Figma", "Node.js", "GraphQL"];
    return (
        <section className="py-32 px-6 md:px-12 bg-[#1A1A1A] border-y-2 border-white/20 relative overflow-hidden">
            <div className="flex whitespace-nowrap gap-8 -mx-12">
                <motion.div 
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="flex gap-8 items-center"
                >
                    {[...skills, ...skills, ...skills].map((skill, i) => (
                        <div key={i} className="text-6xl md:text-8xl font-black uppercase text-transparent stroke-text hover:text-[#FF4500] hover:stroke-none transition-colors cursor-none select-none">
                            {skill}
                        </div>
                    ))}
                </motion.div>
            </div>
            <style>{`
                .stroke-text {
                    -webkit-text-stroke: 2px rgba(255,255,255,0.5);
                    color: transparent;
                }
                .stroke-text:hover {
                    -webkit-text-stroke: 0px;
                }
            `}</style>
        </section>
    );
};

const Footer = () => (
    <footer id="contact" className="py-32 px-6 md:px-12 bg-[#FF4500] text-[#1A1A1A]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
            <h2 className="text-[12vw] font-black tracking-tighter leading-[0.8] uppercase">
                LET'S<br/>TALK.
            </h2>
            <div className="flex flex-col gap-8 text-2xl font-bold uppercase">
                <a href="mailto:contact@sinadilek.com" className="border-b-4 border-[#1A1A1A] pb-2 hover:bg-[#1A1A1A] hover:text-[#FF4500] transition-colors cursor-none px-2">
                    contact@sinadilek.com
                </a>
                <div className="flex gap-6">
                    <a href="https://github.com/noxire-dev" target="_blank" rel="noopener noreferrer" className="w-16 h-16 border-4 border-[#1A1A1A] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-[#FF4500] transition-colors cursor-none">
                        <GithubIcon />
                    </a>
                    <a href="https://linkedin.com/in/sina-dilek-0b1b3b1b9" target="_blank" rel="noopener noreferrer" className="w-16 h-16 border-4 border-[#1A1A1A] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-[#FF4500] transition-colors cursor-none">
                        <LinkedinIcon />
                    </a>
                </div>
            </div>
        </div>
        <div className="mt-32 pt-8 border-t-4 border-[#1A1A1A] flex justify-between text-xl font-bold uppercase">
            <span>© {new Date().getFullYear()}</span>
            <span>SINA DILEK</span>
        </div>
    </footer>
);

export default function Design36() {
    return (
        <div className="min-h-screen bg-[#1A1A1A] font-sans selection:bg-[#FF4500] selection:text-[#1A1A1A] md:cursor-none">
            <CustomCursor />
            <NavBar />
            <Hero />
            <Projects />
            <Stack />
            <Footer />
        </div>
    );
}

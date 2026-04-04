import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ArrowRightIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const GithubIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"/><path d="M9 20c-5 1.5-5-2.5-7-3"/></svg>;
const TwitterIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const LinkedinIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
const TerminalIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>;

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() === 'button' || 
                target.tagName.toLowerCase() === 'a' ||
                target.closest('button') ||
                target.closest('a')) {
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
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-50 flex items-center justify-center mix-blend-difference hidden md:flex"
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                scale: isHovering ? 1.5 : 1,
                backgroundColor: isHovering ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)'
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        >
            <motion.div 
                className="w-1 h-1 bg-white rounded-full"
                animate={{
                    opacity: isHovering ? 0 : 1
                }}
            />
        </motion.div>
    );
};

const NavBar = () => (
    <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center mix-blend-difference"
    >
        <div className="text-xl font-bold tracking-tighter text-white">JX.</div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#work" className="hover:text-white transition-colors cursor-none">Work</a>
            <a href="#about" className="hover:text-white transition-colors cursor-none">About</a>
            <a href="#contact" className="hover:text-white transition-colors cursor-none">Contact</a>
        </div>
    </motion.nav>
);

const Hero = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 300]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <section className="relative h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden">
            <motion.div style={{ y, opacity }} className="max-w-5xl z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] text-xs font-mono mb-8 text-white/70"
                >
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                    Obsidian Glass
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-[0.9] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50"
                >
                    Crafting digital<br/>experiences.
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-lg md:text-xl text-white/50 max-w-xl font-light"
                >
                    Senior Frontend Engineer & Product Designer specializing in building exceptional, premium interfaces.
                </motion.p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4 text-xs font-mono text-white/40"
            >
                <span>SCROLL</span>
                <div className="w-12 h-[1px] bg-white/20 relative overflow-hidden">
                    <motion.div 
                        className="absolute top-0 left-0 w-full h-full bg-white"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                </div>
            </motion.div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        </section>
    );
};

const Projects = () => {
    const projects = [
        { title: 'Neural Engine UI', category: 'Web App', year: '2026' },
        { title: 'Aura Design System', category: 'Library', year: '2025' },
        { title: 'Onyx Financial', category: 'Platform', year: '2025' }
    ];

    return (
        <section id="work" className="py-32 px-6 md:px-12">
            <div className="mb-16 md:mb-32">
                <h2 className="text-sm font-mono text-white/50 mb-4">SELECTED WORK (03)</h2>
            </div>

            <div className="flex flex-col gap-8 md:gap-12">
                {projects.map((project, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative w-full aspect-[4/3] md:aspect-[21/9] bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden cursor-none"
                    >
                        <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-white/[0.05] transition-colors duration-500" />
                        
                        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 text-white">
                            <div className="flex justify-between items-start">
                                <div className="text-white/50 font-mono text-sm">{project.category}</div>
                                <div className="text-white/50 font-mono text-sm">{project.year}</div>
                            </div>
                            
                            <div className="flex justify-between items-end">
                                <h3 className="text-4xl md:text-6xl font-medium tracking-tight transform group-hover:-translate-y-2 transition-transform duration-500">{project.title}</h3>
                                <div className="w-12 h-12 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    <ArrowRightIcon />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const Stack = () => {
    const skills = ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Three.js", "WebGL", "Figma", "Node.js", "GraphQL"];
    return (
        <section className="py-32 px-6 md:px-12 overflow-hidden border-y border-white/5 relative">
            <div className="flex gap-4 items-center mb-16">
                <span className="text-white/50"><TerminalIcon /></span>
                <h2 className="text-sm font-mono text-white/50">TECH STACK</h2>
            </div>
            <div className="flex flex-wrap gap-4 relative z-10">
                {skills.map((skill, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] px-6 py-3 rounded-full text-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-none"
                    >
                        {skill}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const Footer = () => (
    <footer id="contact" className="py-32 px-6 md:px-12 relative overflow-hidden text-white">
        <div className="max-w-5xl relative z-10">
            <h2 className="text-5xl md:text-8xl font-semibold tracking-tighter mb-12">
                Let's build something <br/>
                <span className="text-white/40">extraordinary.</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                <a href="mailto:hello@example.com" className="text-xl md:text-3xl border-b border-white/20 pb-2 hover:border-white transition-colors inline-block w-fit cursor-none">
                    hello@example.com
                </a>
                <div className="flex gap-6">
                    <a href="#" className="w-12 h-12 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-none">
                        <GithubIcon />
                    </a>
                    <a href="#" className="w-12 h-12 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-none">
                        <TwitterIcon />
                    </a>
                    <a href="#" className="w-12 h-12 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-none">
                        <LinkedinIcon />
                    </a>
                </div>
            </div>
        </div>
        <div className="mt-32 pt-8 border-t border-white/10 flex justify-between text-sm font-mono text-white/40 relative z-10">
            <span>© 2026</span>
            <span>Design & Developed by JX</span>
        </div>
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none -z-10 translate-x-1/4 translate-y-1/4" />
    </footer>
);

export default function Design33() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-white/20 selection:text-white md:cursor-none">
            <CustomCursor />
            <NavBar />
            <Hero />
            <Projects />
            <Stack />
            <Footer />
        </div>
    );
}

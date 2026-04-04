import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ArrowRightIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const GithubIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"/><path d="M9 20c-5 1.5-5-2.5-7-3"/></svg>;
const TwitterIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const LinkedinIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
const TerminalIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>;

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
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 flex items-center justify-center hidden md:flex mix-blend-difference"
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                scale: isHovering ? 1.5 : 1,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        >
            <div className="w-full h-full border border-[#00E599] rotate-45" />
            <motion.div 
                className="absolute w-2 h-2 bg-[#00E599]"
                animate={{ opacity: isHovering ? 0 : 1 }}
            />
        </motion.div>
    );
};

const NavBar = () => (
    <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-[#00E599]/20"
    >
        <div className="text-xl font-bold tracking-tighter text-[#00E599]">SYS.INIT()</div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#00E599]/70">
            <a href="#work" className="hover:text-[#00E599] transition-colors cursor-none">Work</a>
            <a href="#about" className="hover:text-[#00E599] transition-colors cursor-none">About</a>
            <a href="#contact" className="hover:text-[#00E599] transition-colors cursor-none">Contact</a>
        </div>
    </motion.nav>
);

const Hero = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 300]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <section className="relative h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden bg-black grid-bg">
            <motion.div style={{ y, opacity }} className="max-w-5xl z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-[#111] border border-[#00E599]/30 text-xs text-[#00E599] mb-8"
                >
                    <span className="w-2 h-2 bg-[#00E599] animate-pulse"></span>
                    NEON VOID ONLINE
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8 text-white uppercase"
                >
                    BUILDING THE<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E599] to-[#0070F3]">FUTURE.</span>
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-lg md:text-xl text-white/50 max-w-xl"
                >
                    &gt; 10x Engineer architecting high-performance infrastructure and dark mode interfaces.
                </motion.p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4 text-xs text-[#00E599]/40"
            >
                <span>[SCROLL_DOWN]</span>
                <div className="w-12 h-[1px] bg-[#00E599]/20 relative overflow-hidden">
                    <motion.div 
                        className="absolute top-0 left-0 w-full h-full bg-[#00E599]"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                </div>
            </motion.div>

            <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-[#00E599]/5 rounded-full blur-[150px] pointer-events-none -z-10" />
            
            <style>{`
                .grid-bg {
                    background-image: linear-gradient(rgba(0, 229, 153, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 229, 153, 0.05) 1px, transparent 1px);
                    background-size: 40px 40px;
                }
            `}</style>
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
        <section id="work" className="py-32 px-6 md:px-12 bg-black border-t border-[#00E599]/20">
            <div className="mb-16 md:mb-32">
                <h2 className="text-sm text-[#00E599]/50 mb-4">&gt; EXECUTING: FETCH_WORK() (03)</h2>
            </div>

            <div className="flex flex-col gap-8 md:gap-12">
                {projects.map((project, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5 }}
                        className="group relative w-full aspect-[4/3] md:aspect-[21/9] bg-[#111] border border-[#00E599]/20 hover:border-[#00E599] overflow-hidden cursor-none transition-colors duration-300"
                    >
                        <div className="absolute inset-0 bg-[#00E599]/0 group-hover:bg-[#00E599]/5 transition-colors duration-500" />
                        
                        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 text-white">
                            <div className="flex justify-between items-start">
                                <div className="text-[#00E599]/50 text-sm">[{project.category}]</div>
                                <div className="text-[#00E599]/50 text-sm">[{project.year}]</div>
                            </div>
                            
                            <div className="flex justify-between items-end">
                                <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tight transform group-hover:translate-x-4 transition-transform duration-300">{project.title}</h3>
                                <div className="w-12 h-12 border border-[#00E599] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#00E599] bg-black">
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
        <section className="py-32 px-6 md:px-12 overflow-hidden border-y border-[#00E599]/20 relative bg-[#050505]">
            <div className="flex gap-4 items-center mb-16 text-[#00E599]/50">
                <TerminalIcon />
                <h2 className="text-sm">&gt; TECH_STACK</h2>
            </div>
            <div className="flex flex-wrap gap-4 relative z-10">
                {skills.map((skill, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="bg-[#111] border border-[#00E599]/30 px-6 py-3 text-lg text-white/80 hover:text-[#00E599] hover:border-[#00E599] transition-colors cursor-none"
                    >
                        {skill}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const Footer = () => (
    <footer id="contact" className="py-32 px-6 md:px-12 relative overflow-hidden text-white bg-black">
        <div className="max-w-5xl relative z-10">
            <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-12">
                INITIATE <br/>
                <span className="text-[#00E599]">CONNECTION.</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                <a href="mailto:hello@example.com" className="text-xl md:text-3xl border-b border-[#00E599]/30 pb-2 hover:border-[#00E599] hover:text-[#00E599] transition-colors inline-block w-fit cursor-none">
                    hello@example.com
                </a>
                <div className="flex gap-6">
                    <a href="#" className="w-12 h-12 border border-[#00E599]/30 bg-[#111] flex items-center justify-center hover:bg-[#00E599] hover:text-black transition-colors cursor-none">
                        <GithubIcon />
                    </a>
                    <a href="#" className="w-12 h-12 border border-[#00E599]/30 bg-[#111] flex items-center justify-center hover:bg-[#00E599] hover:text-black transition-colors cursor-none">
                        <TwitterIcon />
                    </a>
                    <a href="#" className="w-12 h-12 border border-[#00E599]/30 bg-[#111] flex items-center justify-center hover:bg-[#00E599] hover:text-black transition-colors cursor-none">
                        <LinkedinIcon />
                    </a>
                </div>
            </div>
        </div>
        <div className="mt-32 pt-8 border-t border-[#00E599]/20 flex justify-between text-sm text-[#00E599]/40 relative z-10">
            <span>© 2026 // NEON VOID</span>
            <span>DESIGN & DEVELOPED BY JX</span>
        </div>
    </footer>
);

export default function Design34() {
    return (
        <div className="min-h-screen bg-black font-mono selection:bg-[#00E599]/30 selection:text-[#00E599] md:cursor-none">
            <CustomCursor />
            <NavBar />
            <Hero />
            <Projects />
            <Stack />
            <Footer />
        </div>
    );
}

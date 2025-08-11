import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';

/**
 * Tech Writer 3D Portfolio — Single-file React app
 * - TailwindCSS for layout & styling
 * - Framer Motion for animations
 * - React Three Fiber for lightweight 3D objects
 * - Responsive & GitHub Pages friendly (no external assets required)
 *
 * Edit the content arrays below to customize sections.
 */

const LINKS = {
  email: 'k.balu124@gmail.com',
  linkedin: 'https://www.linkedin.com/in/balasubramanyamkosuri/',
  medium: 'https://medium.com/@k.balu124',
  github: 'https://github.com/balukosuri'
};

const WRITING_SAMPLES = [
  { title: 'Quick Start Guide', href: '#' },
  { title: 'Release Notes', href: '#' },
  { title: 'Configuration Guide', href: '#' },
  { title: 'Concept Topic', href: '#' },
  { title: 'Task Topic', href: '#' },
  { title: 'Single Sourcing with Markdown', href: '#' },
  { title: 'Re‑thinking Information Architecture', href: '#' },
  { title: 'Editing & Rewriting', href: '#' }
];

const SKILLS_LEFT = [
  'User Guides',
  'Configuration Guides',
  'Quick Start Guides',
  'Release Notes',
  'Microcopy, UI text, Error Messages',
  'API / SDK Documentation',
  'Newsletters'
];

const SKILLS_RIGHT = [
  'CMS / Knowledge Base',
  'Information Architecture',
  'Agile Content Strategy',
  'DITA Principles',
  'CI/CD-aware Docs',
  'Flowcharts & Mind maps'
];

const TOOLS = [
  { group: 'Docs & Writing', items: ['Confluence', 'Google Docs', 'Markdown (Docs-as-Code)', 'XML (CMS)'] },
  { group: 'Video / E‑Learning', items: ['Camtasia', 'Clipchamp', 'Google Vids'] },
  { group: 'Grammar', items: ['Grammarly', 'Hemingway', 'Quillbot'] },
  { group: 'KB / Source', items: ['Bitbucket', 'GitHub', 'Git'] },
  { group: 'Design', items: ['Canva', 'Figma', 'Whimsical', 'Visio'] },
  { group: 'Collab', items: ['Jira', 'Slack', 'Zoom', 'Google Workspace'] }
];

const AITOOLS = [
  { group: 'Writing', items: ['ChatGPT', 'Claude', 'GitHub Copilot', 'Gemini'] },
  { group: 'Search & Research', items: ['Perplexity', 'NotebookLM'] },
  { group: 'Diagrams', items: ['Napkin AI', 'Whimsical GPT'] }
];

// ------------------- 3D SCENE ------------------- //
function Floating({ children, speed = 0.4, float = 0.08, rotate = 0.2 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (!ref.current) return;
    ref.current.position.y = Math.sin(t) * float;
    ref.current.rotation.y += 0.003 + rotate * 0.0005;
  });
  return <group ref={ref}>{children}</group>;
}

function Laptop({ scale = 1 }) {
  return (
    <group scale={scale}>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 0.12, 1.5]} />
        <meshStandardMaterial metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 1.1, -0.72]} rotation={[Math.PI / 2.8, 0, 0]}>
        <boxGeometry args={[2.1, 1.3, 0.06]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      {/* Keyboard hint */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[1.9, 0.01, 1.2]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
    </group>
  );
}

function DocSheet({ scale = 1, position = [0, 0, 0] }) {
  return (
    <group position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[1, 1.4, 0.02]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>
      <Html center distanceFactor={16} style={{ pointerEvents: 'none' }}>
        <div className="w-20 p-1 text-[8px] leading-tight text-gray-700">
          <div className="font-semibold">API Spec</div>
          <div className="h-0.5 bg-gray-400 my-1" />
          <ul className="list-disc ml-3">
            <li>Endpoints</li>
            <li>Auth</li>
            <li>Responses</li>
          </ul>
        </div>
      </Html>
    </group>
  );
}

function Pen({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh>
        <cylinderGeometry args={[0.03, 0.03, 1.2, 16]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <coneGeometry args={[0.05, 0.15, 12]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [3, 2, 5], fov: 55 }} className="rounded-3xl shadow-xl">
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 3]} intensity={1.2} />

      <Floating>
        <Laptop scale={1} />
      </Floating>
      <Floating speed={0.55} float={0.12} rotate={0.4}>
        <DocSheet scale={0.8} position={[-2.2, 0.6, 0]} />
      </Floating>
      <Floating speed={0.65} float={0.1} rotate={0.35}>
        <DocSheet scale={0.7} position={[2.2, 1.2, -0.6]} />
      </Floating>
      <Floating speed={0.8} float={0.14} rotate={0.5}>
        <Pen position={[0, 1.6, 1.2]} scale={0.8} />
      </Floating>

      <OrbitControls enablePan={false} minDistance={4} maxDistance={9} />
    </Canvas>
  );
}

// ------------------- UI SECTIONS ------------------- //
function Section({ id, className = '', children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  return (
    <section id={id} ref={ref} className={`py-20 md:py-28 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6"
      >
        {children}
      </motion.div>
    </section>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-block rounded-2xl border px-3 py-1 text-sm text-gray-700 bg-white/60 shadow-sm">
      {children}
    </span>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/60 border-b">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <a href="#top" className="font-black text-xl tracking-tight">Balu Kosuri</a>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#work" className="hover:opacity-70">Work</a>
          <a href="#skills" className="hover:opacity-70">Skills</a>
          <a href="#tools" className="hover:opacity-70">Tools</a>
          <a href="#ai" className="hover:opacity-70">AI</a>
          <a href="#testimonials" className="hover:opacity-70">Praise</a>
          <a href="#contact" className="hover:opacity-70">Contact</a>
        </nav>
        <a href={`mailto:${LINKS.email}`} className="rounded-2xl px-4 py-2 text-sm font-semibold bg-black text-white">Email</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <Section id="top" className="pt-8">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <Pill>Technical Writer · API Docs · Content Strategy</Pill>
          <h1 className="mt-4 text-4xl md:text-6xl font-black leading-tight">
            Hello, I’m <span className="text-orange-600">Balasubramanyam Kosuri</span>
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            I build user‑centric documentation that improves product understanding and adoption — from API
            references and configuration guides to release notes and how‑to videos.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={LINKS.linkedin} target="_blank" className="underline">LinkedIn</a>
            <a href={LINKS.medium} target="_blank" className="underline">Medium</a>
            <a href={LINKS.github} target="_blank" className="underline">GitHub</a>
          </div>
        </div>
        <div className="h-[360px] md:h-[480px]">
          <Scene />
        </div>
      </div>
    </Section>
  );
}

function Approach() {
  return (
    <Section>
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-black">My Approach</h2>
          <p className="mt-4 text-gray-700">
            Great documentation is a product. I combine technical depth with a user‑centric lens to
            craft docs that do more than inform — they help users succeed faster.
          </p>
          <ul className="mt-6 grid gap-3 text-gray-700">
            <li>• Evidence‑based IA, consistent terminology, and actionable examples.</li>
            <li>• Docs‑as‑code workflows with review gates and versioning.</li>
            <li>• Visual explanations: diagrams, short videos, and step flows.</li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {['API Docs', 'Config Guides', 'Release Notes', 'How‑to Videos'].map((t) => (
            <div key={t} className="p-5 rounded-2xl bg-orange-50 border border-orange-100">
              <div className="text-sm font-semibold text-orange-700">{t}</div>
              <div className="mt-2 h-1 w-10 bg-orange-400 rounded" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Work() {
  return (
    <Section id="work" className="bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-black">Writing Samples</h2>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {WRITING_SAMPLES.map((s) => (
          <a key={s.title} href={s.href} className="group block p-6 rounded-2xl bg-white shadow-sm border hover:shadow-lg transition">
            <div className="text-lg font-semibold group-hover:underline">{s.title}</div>
            <div className="mt-2 text-sm text-gray-600">View sample →</div>
          </a>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills">
      <h2 className="text-3xl md:text-4xl font-black">Skill Stack</h2>
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl border">
          <h3 className="font-semibold">Technical Writing</h3>
          <ul className="mt-3 grid gap-2 text-gray-700 list-disc pl-5">
            {SKILLS_LEFT.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
        <div className="p-6 rounded-2xl border">
          <h3 className="font-semibold">Content Management</h3>
          <ul className="mt-3 grid gap-2 text-gray-700 list-disc pl-5">
            {SKILLS_RIGHT.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Tools() {
  return (
    <Section id="tools" className="bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-black">Tool Stack</h2>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {TOOLS.map((g) => (
          <div key={g.group} className="p-6 rounded-2xl bg-white border shadow-sm">
            <div className="font-semibold">{g.group}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {g.items.map((i) => <Pill key={i}>{i}</Pill>)}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function AI() {
  return (
    <Section id="ai">
      <h2 className="text-3xl md:text-4xl font-black">AI Tool Stack</h2>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {AITOOLS.map((g) => (
          <div key={g.group} className="p-6 rounded-2xl border">
            <div className="font-semibold">{g.group}</div>
            <ul className="mt-3 grid gap-2 text-gray-700 list-disc pl-5">
              {g.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Testimonials() {
  const data = [
    {
      name: 'Sagar Mahendrakar',
      role: 'Oracle CPQ Developer',
      quote:
        'Hard‑working, adapts quickly, and delivers quality docs on time. Strong communication and a growth mindset.'
    },
    {
      name: 'Catherine Heath',
      role: 'Freelance Content Writer',
      quote:
        'Brilliant ideas for content, security‑conscious, and very quick off the mark.'
    },
    {
      name: 'Madhuri Rao',
      role: 'Information Developer',
      quote:
        'Curious, punctual, and goes beyond the necessities to deliver complete work. A positive, helpful teammate.'
    }
  ];
  return (
    <Section id="testimonials" className="bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-black">Testimonials from peers</h2>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {data.map((t) => (
          <div key={t.name} className="p-6 rounded-2xl bg-white border shadow-sm">
            <div className="font-semibold">{t.name}</div>
            <div className="text-xs text-gray-500">{t.role}</div>
            <p className="mt-3 text-gray-700">“{t.quote}”</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact">
      <div className="grid md:grid-cols-3 items-center gap-10">
        <div className="md:col-span-2">
          <h2 className="text-3xl md:text-5xl font-black leading-tight">
            Let’s work together to create impactful documentation
          </h2>
          <p className="mt-4 text-gray-700">
            I’m excited to collaborate or chat about how great docs drive product adoption.
          </p>
          <a
            href={`mailto:${LINKS.email}`}
            className="mt-6 inline-block rounded-2xl bg-black text-white px-6 py-3 font-semibold"
          >
            Email {LINKS.email}
          </a>
        </div>
        <div className="h-64">
          {/* Mini decorative 3D scene */}
          <Canvas camera={{ position: [0, 0, 6] }} className="rounded-2xl border">
            <ambientLight intensity={0.7} />
            <directionalLight position={[2, 3, 2]} />
            <Floating speed={0.7} float={0.12}>
              <mesh>
                <torusKnotGeometry args={[1, 0.25, 100, 16]} />
                <meshStandardMaterial metalness={0.7} roughness={0.3} />
              </mesh>
            </Floating>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      </div>
    </Section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <Hero />
      <Approach />
      <Work />
      <Skills />
      <Tools />
      <AI />
      <Testimonials />
      <Contact />
      <footer className="py-10 text-center text-xs text-gray-500">© {new Date().getFullYear()} Balu Kosuri · Built with React, Tailwind, Framer Motion & R3F</footer>
    </div>
  );
}

import { Canvas, useFrame } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
  Sparkles,
} from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import './App.css'

const projects = [
  {
    title: 'Immersive Portfolio World',
    summary: 'A responsive 3D hero that orbits my pillars: experiences, products, research.',
    tags: ['Three.js', 'React', 'Motion'],
  },
  {
    title: 'Narrative Data Story',
    summary: 'WebGL-first story that turns raw metrics into interactive constellations.',
    tags: ['WebGL', 'Data Viz', 'Storytelling'],
  },
  {
    title: 'Realtime Playgrounds',
    summary: 'Playable prototypes with physics, shaders and dynamic audio.',
    tags: ['Shaders', 'Physics', 'Audio'],
  },
]

const highlights = [
  { label: 'Design + Dev', detail: 'End-to-end builds from moodboards to launch.' },
  { label: '3D Systems', detail: 'Materials, lighting, and playful interactions.' },
  { label: 'Shipping', detail: 'Production-ready workflows, CI, QA, and docs.' },
]

const skillColumns = [
  ['React / Next', 'Three.js & R3F', 'WebGPU curious'],
  ['Visual systems', 'Procedural motion', 'Sound design'],
  ['Design ops', 'Storytelling', 'Accessible UI'],
]

function FloatingGem({ color, position, label }) {
  const ref = useRef(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = t * 0.3
    ref.current.rotation.y = t * 0.25
  })

  return (
    <Float speed={2} floatIntensity={1.6} rotationIntensity={1.2}>
      <mesh ref={ref} position={position} castShadow>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
        <Html center distanceFactor={9} className="gem-label">
          {label}
        </Html>
      </mesh>
    </Float>
  )
}

function PortfolioScene() {
  const orbiters = useMemo(
    () => [
      { color: '#7cf0ff', position: [-1.9, 1.4, 0], label: 'Experience' },
      { color: '#ffb6ff', position: [1.5, -0.4, 0.2], label: 'Products' },
      { color: '#ffd27c', position: [0.5, 1.9, -0.6], label: 'Research' },
    ],
    []
  )

  return (
    <Canvas shadows camera={{ position: [0, 0, 7], fov: 42 }}>
      <color attach="background" args={['#07080f']} />
      <ambientLight intensity={0.7} />
      <spotLight
        position={[6, 9, 5]}
        angle={0.5}
        penumbra={1}
        intensity={1.2}
        castShadow
      />
      <Sparkles count={100} scale={[8, 5, 4]} size={2} speed={0.5} />
      <Float speed={1.2} floatIntensity={0.8} rotationIntensity={1}>
        <mesh castShadow receiveShadow>
          <icosahedronGeometry args={[1.6, 2]} />
          <meshStandardMaterial
            color="#5a5dff"
            metalness={0.65}
            roughness={0.2}
            emissive="#1b1c45"
            emissiveIntensity={0.6}
          />
        </mesh>
      </Float>
      {orbiters.map((orbiter) => (
        <FloatingGem key={orbiter.label} {...orbiter} />
      ))}
      <Environment preset="city" />
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.45}
        scale={10}
        blur={3}
        far={4}
      />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}

function Tag({ children }) {
  return <span className="tag">{children}</span>
}

function App() {
  return (
    <div className="page">
      <div className="grid-glow" aria-hidden="true" />
      <header className="topbar">
        <div className="wordmark">SM / Portfolio 3D</div>
        <div className="links">
          <a href="mailto:shubhmehta74.srm@gmail.com">Contact</a>
          <a href="https://github.com/shubh74" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="#projects">Work</a>
        </div>
      </header>

      <main className="hero">
        <div className="intro">
          <p className="eyebrow">Immersive designer / developer</p>
          <h1>
            3D portfolio for all the things I build: playful, polished, production-ready.
          </h1>
          <p className="lede">
            I craft interactive worlds, narrative data stories, and expressive product surfaces
            with WebGL, sound, and motion. Everything here is live, tactile, and ready to ship.
          </p>
          <div className="cta-row">
            <a className="primary" href="#projects">
              See the work
            </a>
            <a
              className="ghost"
              href="mailto:shubhmehta74.srm@gmail.com?subject=Let’s build something"
            >
              Book a build
            </a>
          </div>
          <div className="highlight-grid">
            {highlights.map((item) => (
              <div key={item.label} className="highlight">
                <p className="muted">{item.label}</p>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="canvas-shell">
          <Suspense fallback={<div className="canvas-loading">Calibrating lights…</div>}>
            <PortfolioScene />
          </Suspense>
          <div className="canvas-caption">
            Live WebGL scene with orbiting markers for my pillars.
          </div>
        </div>
      </main>

      <section id="projects" className="section">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2>Immersive builds and expressive experiments</h2>
          <p className="muted">
            Every project keeps the tactile qualities from the hero scene: lighting, depth,
            sound, and motion that respond in real time.
          </p>
        </div>
        <div className="card-grid">
          {projects.map((project) => (
            <article key={project.title} className="card">
              <div className="card-head">
                <h3>{project.title}</h3>
                <div className="pills">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
              <p>{project.summary}</p>
              <div className="progress">
                <div className="progress-fill" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section skills">
        <div>
          <p className="eyebrow">Capabilities</p>
          <h2>Systems I bring into every build</h2>
          <p className="muted">
            From quick explorations to full releases, I balance the artistry of 3D with the
            dependability of solid engineering.
          </p>
        </div>
        <div className="skills-grid">
          {skillColumns.map((column) => (
            <div key={column.join('-')} className="skill-column">
              {column.map((item) => (
                <div key={item} className="chip">
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <div>
          <p className="eyebrow">Let’s make it real</p>
          <h2>Need a 3D story, an interactive prototype, or a production build?</h2>
          <p className="muted">
            I’m available for collaborations, freelance engagements, and full-stack immersive
            product work.
          </p>
        </div>
        <div className="cta-actions">
          <a className="primary" href="mailto:shubhmehta74.srm@gmail.com">
            Start a project
          </a>
          <a className="ghost" href="https://github.com/shubh74" target="_blank" rel="noreferrer">
            Browse repos
          </a>
        </div>
      </section>
    </div>
  )
}

export default App

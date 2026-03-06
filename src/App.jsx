import { useRef, useState } from 'react'
import './App.css'

const projectStages = {
  concept: {
    label: 'Concept',
    title: 'Material direction',
    details: 'Defined the coffee-ground base and compatible natural binders.',
  },
  prototype: {
    label: 'Prototype',
    title: 'Shape and strength',
    details: 'Tested wall thickness, drying behavior and packaging stability.',
  },
  validation: {
    label: 'Validation',
    title: 'Soil and moisture tests',
    details: 'Checked decomposition timing and seed performance in moist soil.',
  },
}

const useCases = {
  retail: {
    label: 'Retail pack',
    description: 'Shelf-ready small package for seed kits and gardening stores.',
    outcome: 'Priority: long shelf life + clean presentation',
  },
  nursery: {
    label: 'Nursery tray',
    description: 'Batch format for seedling operations with faster soil transfer.',
    outcome: 'Priority: handling speed + predictable breakdown',
  },
  home: {
    label: 'Home starter',
    description: 'Direct-to-user format focused on easy planting flow.',
    outcome: 'Priority: simple usage + clear instructions',
  },
}

const faqItems = [
  {
    id: 'water',
    question: 'How does it react to water?',
    answer: 'It keeps shape for handling, then gradually softens in prolonged moist conditions.',
  },
  {
    id: 'time',
    question: 'How long does decomposition take?',
    answer: 'Timing depends on mix and environment, usually from several weeks to a few months.',
  },
  {
    id: 'soil',
    question: 'Does it affect soil quality?',
    answer: 'The material is designed to break down into soil-friendly organic components.',
  },
]

const galleryImages = [
  'images/photo_2026-03-06_00-01-29.png',
  'images/photo_2026-03-06_00-01-40.png',
]

function App() {
  const audioCtxRef = useRef(null)
  const [darkTheme, setDarkTheme] = useState(false)
  const [activeStage, setActiveStage] = useState('concept')
  const [activeUseCase, setActiveUseCase] = useState('retail')
  const [openFaq, setOpenFaq] = useState('water')
  const [activeImage, setActiveImage] = useState(0)

  const playUiSound = (mode = 'soft') => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) {
      return
    }

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContextClass()
    }

    const ctx = audioCtxRef.current
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    const frequency = mode === 'mode' ? 520 : 420
    const endFrequency = mode === 'mode' ? 650 : 520

    osc.type = 'sine'
    osc.frequency.setValueAtTime(frequency, now)
    osc.frequency.exponentialRampToValueAtTime(endFrequency, now + 0.09)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.05, now + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.13)
  }

  const showPrevImage = () => {
    playUiSound('soft')
    setActiveImage((current) => (current === 0 ? galleryImages.length - 1 : current - 1))
  }

  const showNextImage = () => {
    playUiSound('soft')
    setActiveImage((current) => (current + 1) % galleryImages.length)
  }

  return (
    <main className={`page ${darkTheme ? 'dark' : ''}`}>
      <section className="hero">
        <button
          className="theme-toggle"
          onClick={() => {
            playUiSound('mode')
            setDarkTheme((current) => !current)
          }}
          type="button"
          aria-label={darkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
          title={darkTheme ? 'Light mode' : 'Dark mode'}
        >
          <span className={`theme-icon ${darkTheme ? 'moon' : 'sun'}`} aria-hidden="true" />
        </button>

        <div className="hero-top">
          <div className="hero-tags">
            <span>Solution</span>
            <span>Process</span>
            <span>Project</span>
          </div>
        </div>

        <h1>
          Coffee
          <br />
          <span>&amp;</span>
          <br />
          Growth
        </h1>

        <p>
          Packaging that doesn&apos;t end in waste.
          <br />
          Made from coffee grounds. Designed to grow.
        </p>
      </section>

      <section className="single-image-wrap">
        <button className="image-nav" type="button" onClick={showPrevImage} aria-label="Previous image">
          {'<'}
        </button>
        <article className="slide">
          <img
            className={`main-image ${activeImage === 1 ? 'main-image-featured' : ''}`}
            src={galleryImages[activeImage]}
            alt="Packaging preview"
          />
        </article>
        <button className="image-nav" type="button" onClick={showNextImage} aria-label="Next image">
          {'>'}
        </button>
      </section>

      <section className="mission centered-text">
        <h2>Our mission</h2>
        <p>no single-use plastic</p>
        <p>simple planting flow</p>
        <p>designed to break down naturally</p>
      </section>

      <section className="content content-last centered-text">
        <h2>Soil value</h2>
        <p>
          As the coffee-based material decomposes, it already acts as a mild organic soil additive.
          The available version is designed to support plant growth using natural, soil-friendly
          components.
        </p>

        <h2>Developed with the BioLab</h2>
        <p>
          We developed EcoSeed together with the Bio Lab, testing different proportions and material
          mixes, and refining the drying method (natural, molding, also seed-packaging prototype).
        </p>
      </section>

      <section className="interactive-grid">
        <article className="interactive-card">
          <h3>Project stage</h3>
          <div className="pill-buttons">
            {Object.entries(projectStages).map(([key, item]) => (
              <button
                key={key}
                type="button"
                className={activeStage === key ? 'active' : ''}
                onClick={() => {
                  playUiSound('mode')
                  setActiveStage(key)
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <h4>{projectStages[activeStage].title}</h4>
          <p>{projectStages[activeStage].details}</p>
        </article>

        <article className="interactive-card">
          <h3>Packaging mode</h3>
          <div className="pill-buttons">
            {Object.entries(useCases).map(([key, item]) => (
              <button
                key={key}
                type="button"
                className={activeUseCase === key ? 'active' : ''}
                onClick={() => {
                  playUiSound('mode')
                  setActiveUseCase(key)
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p>{useCases[activeUseCase].description}</p>
          <strong>{useCases[activeUseCase].outcome}</strong>
        </article>

        <article className="interactive-card">
          <h3>Material FAQ</h3>
          <div className="faq-list">
            {faqItems.map((item) => (
              <div key={item.id} className="faq-item">
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => {
                    playUiSound('soft')
                    setOpenFaq((current) => (current === item.id ? '' : item.id))
                  }}
                >
                  {item.question}
                </button>
                {openFaq === item.id && <p>{item.answer}</p>}
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}

export default App

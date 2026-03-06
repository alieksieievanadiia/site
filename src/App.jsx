import { useEffect, useRef, useState } from 'react'
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

const processImages = ['images/123.jpg', 'images/321.jpg', 'images/432.jpg', 'images/127.jpg']

const processSteps = [
  {
    title: 'Idea',
    description:
      'The project started with the idea of creating an eco-friendly packaging for seeds made from coffee grounds that could replace traditional paper-plastic packaging and comply with the principles of upcycling and the circular economy.',
  },
  {
    title: 'Sketches and home experiments',
    description:
      'The first sketches of the packaging shape were made and home experiments were conducted with coffee bioplastic to test its properties and find the basic recipe for the material.',
  },
  {
    title: 'Recipe development',
    description:
      'The proportions of the ingredients were selected to create a durable and at the same time biodegradable material suitable for storing seeds.',
  },
  {
    title: 'Prototypes in the laboratory',
    description:
      'Based on the recipe, the first prototypes were made, and an inner layer of recycled paper was also added.',
  },
  {
    title: 'Testing',
    description:
      'The prototypes were tested in soil and water to test the decomposition of the material and its effect on the seeds.',
  },
  {
    title: 'Design Improvements',
    description:
      'After testing, the packaging shape was improved to be more ergonomic with more space for the seeds to prevent them from sprouting, the material was densified for better protection from ultraviolet rays, and an eco-paper label was added.',
  },
  {
    title: 'Final Product',
    description:
      'The result was an eco-friendly packaging for coffee grounds seeds that can be composted or used as a natural fertilizer.',
  },
]

function App() {
  const audioCtxRef = useRef(null)
  const tabTransitionTimerRef = useRef(null)
  const [darkTheme, setDarkTheme] = useState(false)
  const [activeView, setActiveView] = useState('main')
  const [displayView, setDisplayView] = useState('main')
  const [isSwitchingView, setIsSwitchingView] = useState(false)
  const [activeStage, setActiveStage] = useState('concept')
  const [activeUseCase, setActiveUseCase] = useState('retail')
  const [openFaq, setOpenFaq] = useState('water')
  const [activeImage, setActiveImage] = useState(0)
  const [activeProcessImage, setActiveProcessImage] = useState(0)

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

  const showPrevProcessImage = () => {
    playUiSound('soft')
    setActiveProcessImage((current) => (current === 0 ? processImages.length - 1 : current - 1))
  }

  const showNextProcessImage = () => {
    playUiSound('soft')
    setActiveProcessImage((current) => (current + 1) % processImages.length)
  }

  const switchView = (nextView) => {
    if (nextView === activeView) {
      return
    }

    playUiSound('mode')
    setActiveView(nextView)
    setIsSwitchingView(true)

    if (tabTransitionTimerRef.current) {
      window.clearTimeout(tabTransitionTimerRef.current)
    }

    tabTransitionTimerRef.current = window.setTimeout(() => {
      setDisplayView(nextView)
      setIsSwitchingView(false)
    }, 180)
  }

  useEffect(
    () => () => {
      if (tabTransitionTimerRef.current) {
        window.clearTimeout(tabTransitionTimerRef.current)
      }
    },
    [],
  )

  useEffect(() => {
    if (displayView !== 'process') {
      return
    }

    const timerId = window.setInterval(() => {
      setActiveProcessImage((current) => (current + 1) % processImages.length)
    }, 3200)

    return () => window.clearInterval(timerId)
  }, [displayView])

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
            <button
              type="button"
              className={`nav-tab ${activeView === 'solution' ? 'active' : ''}`}
              onClick={() => switchView('solution')}
            >
              Solution
            </button>
            <button
              type="button"
              className={`nav-tab ${activeView === 'process' ? 'active' : ''}`}
              onClick={() => switchView('process')}
            >
              Process
            </button>
          </div>
        </div>

        <div className={`view-transition ${isSwitchingView ? 'is-leaving' : 'is-entering'}`}>
          {displayView === 'main' ? (
            <>
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
            </>
          ) : displayView === 'solution' ? (
            <>
              <h1>
                Sustainable
                <br />
                <span>Seed</span>
                <br />
                Packaging
              </h1>
              <p>Ecological packaging concept based on recycled coffee grounds.</p>
            </>
          ) : (
            <>
              <h1>
                Process
                <br />
                <span>&amp;</span>
                <br />
                Development
              </h1>
              <p>From early idea to final eco-friendly packaging model.</p>
            </>
          )}
        </div>
      </section>

      <div className={`view-transition view-body ${isSwitchingView ? 'is-leaving' : 'is-entering'}`}>
        {displayView === 'main' ? (
          <>
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
          </>
        ) : displayView === 'solution' ? (
          <section className="solution-page">
            <article className="solution-card">
              <h2>Sustainable packaging for seeds made from coffee grounds</h2>
              <p>
                A new ecological model of packaging for seed storage, made from recycled coffee grounds.
                The goal is to replace traditional packaging consisting of thin layers of paper and plastic
                with biomaterial from organic coffee beans, using the principle of upcycling and circular
                economy.
              </p>
              <h3>Packaging:</h3>
              <ul>
                <li>outer material: biomaterial based on coffee grounds</li>
                <li>inner layer of recycled paper to protect the seeds</li>
                <li>label made of ecological paper</li>
                <li>
                  provides strength, ventilation and stability so that fungi and bacteria do not develop
                  during storage
                </li>
                <li>
                  the biomaterial does not affect seed germination until it comes into contact with the
                  soil
                </li>
                <li>when placed in moist soil, the packaging gradually decomposes</li>
              </ul>
              <h3>Packaging disposal methods:</h3>
              <ol>
                <li>Throw away in organic waste - the material will decompose naturally.</li>
                <li>
                  Bury in the soil, having previously cut it into small pieces (the layer of soil on top
                  is at least 3 cm). The material will decompose and act as fertilizer.
                </li>
                <li>
                  Dissolve in hot water, let cool and use as a liquid fertilizer for watering plants.
                </li>
              </ol>
              <button
                type="button"
                className="back-button"
                onClick={() => switchView('main')}
              >
                Back to main site
              </button>
            </article>
          </section>
        ) : (
          <section className="solution-page process-page">
            <article className="solution-card process-card">
              <h2>Project process</h2>
              <ol className="process-list">
                {processSteps.map((step) => (
                  <li key={step.title}>
                    <strong>{step.title}</strong>
                    <p>{step.description}</p>
                  </li>
                ))}
              </ol>

              <div className="process-media-box">
                <button
                  className="image-nav"
                  type="button"
                  onClick={showPrevProcessImage}
                  aria-label="Previous process image"
                >
                  {'<'}
                </button>
                <img
                  className="process-image"
                  src={processImages[activeProcessImage]}
                  alt={`Process slide ${activeProcessImage + 1}`}
                />
                <button
                  className="image-nav"
                  type="button"
                  onClick={showNextProcessImage}
                  aria-label="Next process image"
                >
                  {'>'}
                </button>
              </div>
              <div className="process-dots">
                {processImages.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    className={activeProcessImage === index ? 'active' : ''}
                    onClick={() => setActiveProcessImage(index)}
                    aria-label={`Go to process image ${index + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                className="back-button"
                onClick={() => switchView('main')}
              >
                Back to main site
              </button>
            </article>
          </section>
        )}
      </div>
    </main>
  )
}

export default App

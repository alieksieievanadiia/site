import { useState } from 'react'
import './App.css'

const recipes = {
  natural: {
    label: 'Natural Binder',
    details: 'Balanced decomposition speed and stable form for transport.',
  },
  fast: {
    label: 'Fast Compost',
    details: 'Breaks down quicker in wet soil and warm conditions.',
  },
  durable: {
    label: 'Durable Mix',
    details: 'Holds shape longer for shelf life and dry storage.',
  },
}

const getGrowthStage = (moisture, light) => {
  const score = moisture * 0.55 + light * 0.45
  if (score < 30) return 'Dormant'
  if (score < 55) return 'Sprouting'
  if (score < 80) return 'Leafing'
  return 'Healthy Growth'
}

function App() {
  const [darkTheme, setDarkTheme] = useState(false)
  const [moisture, setMoisture] = useState(55)
  const [light, setLight] = useState(60)
  const [pots, setPots] = useState(20)
  const [recipe, setRecipe] = useState('natural')

  const growthStage = getGrowthStage(moisture, light)
  const growthPercent = Math.min(100, Math.round(moisture * 0.6 + light * 0.4))
  const plasticSavedGrams = pots * 14

  return (
    <main className={`page ${darkTheme ? 'dark' : ''}`}>
      <section className="hero">
        <div className="hero-top">
          <div className="dot" aria-hidden="true" />
          <div className="hero-tags">
            <span>Solution</span>
            <span>Process</span>
            <span>Project</span>
          </div>
        </div>

        <button
          className="theme-toggle"
          onClick={() => setDarkTheme((current) => !current)}
          type="button"
        >
          {darkTheme ? 'Light mode' : 'Dark mode'}
        </button>

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
        <article className="slide">
          <div className="image-placeholder" role="img" aria-label="Insert image here" />
        </article>
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
          <h3>Growth simulator</h3>
          <label>
            Moisture: {moisture}%
            <input
              type="range"
              min="0"
              max="100"
              value={moisture}
              onChange={(event) => setMoisture(Number(event.target.value))}
            />
          </label>
          <label>
            Light: {light}%
            <input
              type="range"
              min="0"
              max="100"
              value={light}
              onChange={(event) => setLight(Number(event.target.value))}
            />
          </label>
          <div className="growth-meter" aria-hidden="true">
            <span style={{ width: `${growthPercent}%` }} />
          </div>
          <strong>{growthStage}</strong>
        </article>

        <article className="interactive-card">
          <h3>Material mix</h3>
          <div className="recipe-buttons">
            {Object.entries(recipes).map(([key, item]) => (
              <button
                key={key}
                type="button"
                className={recipe === key ? 'active' : ''}
                onClick={() => setRecipe(key)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p>{recipes[recipe].details}</p>
        </article>

        <article className="interactive-card">
          <h3>Eco impact</h3>
          <label>
            Pots produced: {pots}
            <input
              type="range"
              min="1"
              max="500"
              value={pots}
              onChange={(event) => setPots(Number(event.target.value))}
            />
          </label>
          <p>
            Approximate plastic avoided: <strong>{plasticSavedGrams} g</strong>
          </p>
        </article>
      </section>
    </main>
  )
}

export default App

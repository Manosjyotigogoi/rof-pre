import { useEffect, useRef, useState } from 'react'

const FLAVORS = [
  { id: 'blueberry', name: 'Blueberry', img: '/blueberry.png', bg: '#EAF0FF', shape: '#3A56F0', ink: '#0B1445', fg: '#fff', fruit: ['🫐', '🫐', '🫐', '🫐', '🫐'], blurb: 'Dark berry sweetness with a clean, cold finish.', detail: 'A smooth, icy berry pre-workout for focused training and a clean finish.' },
  { id: 'fruit-punch', name: 'Fruit Punch', img: '/fruit-punch.png', background: '/fruit-punch-background.png', bg: '#FFEEF4', shape: '#EE3A80', ink: '#4A0B2E', fg: '#2A0618', fruit: ['🍓', '🍊', '🍓', '🍋', '🍓'], blurb: 'Strawberry, citrus and ice. The loud one.', detail: 'A bright strawberry and citrus blend for the sessions when you want to bring the energy.' },
  { id: 'tangy-orange', name: 'Tangy Orange', img: '/tangy-orange.png', background: '/orange-background.png', bg: '#FFF1E2', shape: '#FF7A1A', ink: '#2B1000', fg: '#2B1000', fruit: ['🍊', '🍊', '🍊', '🍋', '🍊'], blurb: 'Sharp, juicy orange that hits before your first set.', detail: 'A sharp, juicy orange flavor that gets you switched on before your first set.' },
]

const NUTRITION = [
  ['Energy', '18 kcal', '36 kcal'], ['Protein', '0g', '0g'], ['Carbohydrate', '1.1g', '2.2g'],
  ['Total Sugar', '0g', '0g'], ['Added Sugar', '0g', '0g'], ['Total Fat', '0g', '0g'], ['Sodium', '44.72mg', '89.44mg'],
]
const INGREDIENTS = [
  ['L-Citrulline DL-Malate', '2200 mg', '4400 mg', 'Nitric Oxide & Massive Pumps'],
  ['Beta-Alanine', '1000 mg', '2000 mg', 'Muscular Endurance & Tingles'],
  ['Caffeine Anhydrous', '100 mg', '200 mg', 'Explosive Energy & Mental Drive'],
  ['L-Theanine', '15 mg', '30 mg', 'Smooth Focus & Zero Crash'],
  ['Black Pepper Extract', '1.5 mg', '3 mg', 'Enhanced Bioavailability & Absorption'],
  ['Taurine', '150 mg', '300 mg', 'Cellular Hydration & Stamina'],
  ['Green Tea Extract', '15 mg', '30 mg', 'Antioxidant & Metabolic Support'],
  ['Betaine Anhydrous', '250 mg', '500 mg', 'Power Output & Muscle Fullness'],
  ['L-Tyrosine', '550 mg', '1100 mg', 'Laser Cognitive Focus'],
  ['L-Arginine', '600 mg', '1200 mg', 'Vascularty & Blood Flow'],
]
const RING_TEXT = 'LEVEL 7 · BUILT FOR INTERMEDIATE GYMERS · ROF PRE · '
const mod = (n, m) => ((n % m) + m) % m

function Hero({ selected, onSelect }) {
  const N = FLAVORS.length
  const [pos, setPos] = useState(0)
  const [ready, setReady] = useState(false)
  const [settled, setSettled] = useState(false)
  const [hover, setHover] = useState(false)
  const heroRef = useRef(null)
  const lock = useRef(0)
  const f = FLAVORS[mod(Math.round(pos), N)]
  const go = (n) => setPos((p) => Math.round(p) + n)

  useEffect(() => {
    const t1 = setTimeout(() => setReady(true), 150)
    const t2 = setTimeout(() => setSettled(true), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const wheel = (e) => {
    e.preventDefault()
    if (Date.now() > lock.current && Math.abs(e.deltaY) > 2) {
      lock.current = Date.now() + 600
      go(e.deltaY > 0 ? 1 : -1)
    }
  }

  useEffect(() => {
    const hero = heroRef.current
    hero.addEventListener('wheel', wheel, { passive: false })
    return () => hero.removeEventListener('wheel', wheel)
  }, [pos])

  const cans = []
  FLAVORS.forEach((fl, i) => {
    const kc = Math.round((pos - i) / N)
    for (let k = kc - 1; k <= kc + 1; k++) {
      const rel = i - pos + N * k
      if (Math.abs(rel) <= 2.6) cans.push({ key: `${i}_${k}`, fl, rel, a: Math.abs(rel) })
    }
  })

  return (
    <section ref={heroRef} className="hero" style={{ background: f.bg, '--c': f.ink, '--flavor-color': f.shape }}>
      <header className="bar">
        <a className="logo" href="#top" aria-label="ROF Nutrition home">
          <span className="logo-lockup">
            <span className="logo-rof"><b>R</b><span className="logo-wolf" /><b>F</b></span>
            <span className="logo-word">NUTRITION</span>
            <small>ATHLETE GRADE</small>
          </span>
        </a>
      </header>

      <div className="hero-fruit-rain" aria-hidden="true">
        <div className="fruit-lane fruit-lane-left">
          {Array.from({ length: 7 }, (_, index) => {
            const fruit = f.fruit[index % f.fruit.length]
            return <i key={`${f.id}-left-fruit-${index}`} style={{ '--fruit-x': `${8 + ((index * 13) % 78)}%`, '--fruit-delay': `${(index % 7) * 0.65}s`, '--fruit-duration': `${5.2 + (index % 4) * 0.7}s`, '--fruit-drift': `${index % 2 ? 15 : -12}px` }}>{fruit}</i>
          })}
        </div>
        <div className="fruit-lane fruit-lane-right">
          {Array.from({ length: 7 }, (_, index) => {
            const fruit = f.fruit[(index + 1) % f.fruit.length]
            return <i key={`${f.id}-right-fruit-${index}`} style={{ '--fruit-x': `${8 + ((index * 13) % 78)}%`, '--fruit-delay': `${0.3 + (index % 7) * 0.65}s`, '--fruit-duration': `${5.2 + (index % 4) * 0.7}s`, '--fruit-drift': `${index % 2 ? 12 : -15}px` }}>{fruit}</i>
          })}
        </div>
      </div>

      <svg className="shape" viewBox="0 0 1000 720" style={{ transform: `translateX(-50%) scale(${ready ? 1 : 0.8})` }}>
        <polygon
          points="70,720 34,570 142,450 500,390 858,450 966,570 930,720"
          style={{ fill: f.shape, stroke: f.shape }}
          strokeWidth="16"
          strokeLinejoin="round"
        />
      </svg>

      <svg className="ring" viewBox="0 0 1000 1000" style={{ transform: `translate(-50%, -50%) scale(${ready ? 1 : 0.6})`, opacity: ready ? 1 : 0 }}>
        <defs><path id="circ" d="M500,500 m-420,0 a420,420 0 1,1 840,0 a420,420 0 1,1 -840,0" /></defs>
        <text><textPath href="#circ" textLength="2630" lengthAdjust="spacingAndGlyphs">{RING_TEXT}</textPath></text>
      </svg>

      {cans.map(({ key, fl, rel, a }) => (
        <button key={key} className="can" data-rel={rel} aria-label={fl.name}
          onClick={() => {
            if (a < 0.5) onSelect(fl)
            else setPos(Math.round(pos) + Math.round(rel))
          }}
          onPointerEnter={() => a < 0.5 && setHover(true)} onPointerLeave={() => setHover(false)}
          style={{
            transform: `translate(calc(-50% + ${rel * 31}vw), calc(-50% + ${ready ? -a * 3 : 70}vh)) rotate(${rel * 13}deg) scale(${1 - Math.min(a, 2) * 0.2})`,
            filter: `blur(${a > 0.6 ? Math.min(a, 2) * 2 : 0}px)`,
            opacity: ready ? Math.max(0, Math.min(1, 2.6 - a)) : 0,
            zIndex: 10 - Math.round(a),
            transitionDelay: settled ? '0ms' : `${a * 90}ms`,
          }}>
          <img src={fl.img} alt={`ROF PRE Level 7 ${fl.name}`} draggable="false" />
        </button>
      ))}

      <div className="cursor" style={{ opacity: hover ? 1 : 0 }}><i style={{ background: f.shape }} />View {f.name}</div>
      <p className="now">{mod(Math.round(pos), N) + 1} / {N} &nbsp;{f.name}</p>
      <p className="hint">Scroll up or down to discover<span /></p>
      {selected && (
        <div className="detail-backdrop" role="presentation" onClick={() => onSelect(null)}>
          <article className="detail-panel" style={{ '--detail-color': selected.shape }} role="dialog" aria-modal="true" aria-labelledby="detail-title" onClick={(e) => e.stopPropagation()}>
            <button className="close-detail" type="button" aria-label="Close flavor details" onClick={() => onSelect(null)}>×</button>
            <img src={selected.img} alt={`${selected.name} ROF PRE tub`} />
            <div>
              <p className="detail-kicker">ROF PRE / LEVEL 7</p>
              <h2 id="detail-title">{selected.name}</h2>
              <p>{selected.detail}</p>
              <button className="buy detail-buy" type="button">Shop {selected.name}</button>
            </div>
          </article>
        </div>
      )}
    </section>
  )
}

function ProductDetails({ flavor, onBack, onSelect }) {
  return (
    <section className={`product-details ${flavor.id === 'fruit-punch' ? 'fruit-punch-details' : ''}`} style={{ '--detail-color': flavor.shape, '--detail-background': `url(${flavor.background || '/blueberry-background.png'})` }}>
      <header className="detail-nav">
        <button type="button" onClick={onBack} aria-label="Back to flavors">← Back</button>
        <strong className="detail-brand">ROF PRE</strong>
        <span>LEVEL 7</span>
      </header>
      <div className="detail-hero">
        <div className="detail-copy">
          <p className="detail-kicker">REAL OVER FAKE / PRE-WORKOUT</p>
          <h1><em>{flavor.name}</em><br />ROF PRE</h1>
          <p className="detail-description">{flavor.detail} A complete Level 7 formula built for intermediate gymers who train with purpose.</p>
          <button className="detail-order" type="button">Start ordering</button>
        </div>
        <div className="detail-product">
          <span className="detail-number">01</span>
          <div className="detail-glow" />
          <img src={flavor.img} alt={`${flavor.name} ROF PRE Level 7`} />
        </div>
      </div>
      <div className="benefits">
        {['1 serving / 1 scoop (5g)', 'Double shot / 2 scoops (10g)', 'Sugar / 0g added', 'Bonus / Free shaker'].map((item) => {
          const [label, value] = item.split(' / ')
          return <div className="benefit" key={item}><small>{label}</small><strong>{value}</strong></div>
        })}
      </div>
      <div className="formula">
        <div className="section-heading"><span>◉</span><h2>Nutritional information</h2><small>PER 5G / 10G SERVING</small></div>
        <div className="nutrition-table">
          <div className="table-head"><strong>NUTRIENTS</strong><strong>1 SCOOP (5G)</strong><strong>2 SCOOPS (10G)</strong></div>
          {NUTRITION.map(([name, one, two]) => <div className="table-row" key={name}><strong>{name}</strong><span>{one}</span><span>{two}</span></div>)}
        </div>
        <div className="section-heading ingredients-heading"><span>ϟ</span><h2>Ingredient / active composition</h2><small>100% TRANSPARENT FORMULA</small></div>
        <div className="ingredient-table">
          <div className="table-head"><strong>INGREDIENT</strong><strong>1 SCOOP (5G)</strong><strong>2 SCOOPS (10G)</strong></div>
          {INGREDIENTS.map(([name, one, two, note]) => <div className="table-row" key={name}><strong>{name}<small>{note}</small></strong><span>{one}</span><span>{two}</span></div>)}
        </div>
        <div className="transparency">◇ &nbsp; ZERO BANNED SUBSTANCES · NO HIDDEN BLENDS · 100% LABEL TRANSPARENCY<small>Every batch is rigorously tested for potency, purity, and athlete performance.</small></div>
      </div>
      <section className="other-flavors">
        <div className="other-flavors-heading">
          <p className="detail-kicker">FIND YOUR FOCUS</p>
          <h2>Explore other flavours</h2>
          <p>Same transparent Level 7 formula. A different way to show up.</p>
        </div>
        <div className="other-flavors-grid">
          {FLAVORS.filter((other) => other.id !== flavor.id).map((other) => (
            <button className="flavor-card" key={other.id} type="button" onClick={() => onSelect(other)} style={{ '--card-color': other.shape }}>
              <span className="falling-fruit" aria-hidden="true">
                {other.fruit.map((fruit, index) => <i key={`${other.id}-${index}`} style={{ '--fruit-x': `${12 + index * 19}%`, '--fruit-delay': `${index * 0.7}s`, '--fruit-duration': `${4.8 + (index % 3) * 0.8}s` }}>{fruit}</i>)}
              </span>
              <span>ROF PRE / LEVEL 7</span>
              <img src={other.img} alt={`${other.name} ROF PRE`} />
              <strong>{other.name}</strong>
              <small>{other.blurb}</small>
              <em>View flavour <b>↗</b></em>
            </button>
          ))}
        </div>
      </section>
    </section>
  )
}

export default function App() {
  const [selected, setSelected] = useState(null)

  return (
    <main id="top">
      {selected ? <ProductDetails flavor={selected} onBack={() => setSelected(null)} onSelect={setSelected} /> : <Hero selected={selected} onSelect={setSelected} />}
    </main>
  )
}

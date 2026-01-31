# custom-pixi-particles-editor by [@lukasz-okuniewicz](http://github.com/lukasz-okuniewicz)

**custom-pixi-particles-editor** is a web-based visual editor for creating and customizing particle effects with the [custom-pixi-particles](https://github.com/lukasz-okuniewicz/custom-pixi-particles) engine. Built with **Next.js** and **React**, it lets you design particle systems in real time without writing code.

### Support My Work

If you find this editor useful, consider supporting the project:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support%20My%20Work-orange?logo=buy-me-a-coffee&logoColor=white)](https://buymeacoffee.com/lukasz.okuniewicz)

---

## 📑 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Quick Start](#-quick-start)
- [Usage](#-usage)
- [Using Exported Config](#-using-exported-config)
- [Technology Stack](#-technology-stack)
- [Requirements](#-requirements)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Related](#-related)

---

## ✨ Features

- **Visual editor** – Configure emitters, behaviours, and effects through an intuitive UI
- **Real-time preview** – Changes apply instantly on the canvas
- **Full engine support** – All particle behaviours, emission types, and special effects
- **Predefined effects** – 80+ presets including fire, smoke, explosions, trails, text, snow, fountains, warp effects, swarms, and more
- **Behaviour descriptions** – Inline "Show Description" for each behaviour with property documentation
- **Export / import** – Save and load emitter configurations as JSON
- **Special effects** – Shatter, Dissolve, Ghost, Glitch, Melt, Magnetic Assembly
- **3D wireframes** – Cube, sphere, torus, and other wireframe shapes with motion options

### Supported Behaviours

Life, Position, Spawn, Size, Color, Rotation, Angular Velocity, Emit Direction, Turbulence, Collision, Attraction/Repulsion, Noise-Based Motion, Force Fields, Timeline, Grouping, Sound Reactive, Light Effect, Stretch, Temperature, Move To Point, Wireframe 3D, Aizawa Attractor, Boids Flocking, Bounce, Color Cycle, Constrain To Shape, Conversion Cascade, Curvature Flow, Flicker, Float Up, Gravity Well, Homing, Jacobian Curl-Field, Lissajous Harmonic Lattice, Limit Cycle, Magnet, Near Miss Dispersion, Orbit, Phase Coherence, Phase Field Flow, Proximity State, Proximity Triggered Phase, Pulse, Ripple, Trail, Toroidal Flow, Vortex, Wobble.

---

## 🎮 Demo

Try the editor online without installing:

🔗 [custom-pixi-particles Live Editor](https://okuniewicz.eu/)

---

## 🚀 Quick Start

### From source (recommended)

Clone the repository (or use the parent repo that contains both the engine and the editor), then:

```bash
cd custom-pixi-particles-editor
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

The app will be served on port 3000.

---

## 📖 Usage

1. Start the app with `npm run dev` or `npm start`.
2. Open [http://localhost:3000](http://localhost:3000).
3. Use the sidebar to:
   - Select a **predefined effect** from the dropdown (fire, smoke, explosion, etc.)
   - Configure **emitters**, **behaviours** (Life, Position, Spawn, Size, Color, etc.), and **emission types**
   - Adjust **special effects** (Shatter, Dissolve, Ghost, Glitch, Melt, Magnetic Assembly)
4. Click **"Show Description"** next to any behaviour for detailed property documentation.
5. Preview updates in real time on the canvas.
6. Use **Load & Save** to export or import emitter configs as JSON.

---

## 📤 Using Exported Config

Exported JSON configs can be used directly with the **custom-pixi-particles** library:

```javascript
import customPixiParticles from 'custom-pixi-particles'

// Load your exported config (e.g. from file or API)
const config = {
  emitterConfig: { /* ... */ },
  textures: ['particle.png'],
}

const particles = customPixiParticles.create({
  textures: config.textures,
  emitterConfig: config.emitterConfig,
  maxParticles: 10000,
})

app.stage.addChild(particles)
particles.play()
```

The exported JSON structure matches the `emitterConfig` and `textures` expected by the library.

---

## 🏗️ Technology Stack

- **Next.js 15** – React framework
- **React 19** – UI
- **PIXI.js Legacy v6** – 2D WebGL canvas
- **custom-pixi-particles** – Particle engine
- **Tailwind CSS 4** – Styling
- **GSAP** – Animations

---

## 📦 Requirements

- **Node.js** v18+
- **npm** or **yarn**

---

## 🐛 Troubleshooting

### Canvas is black or empty
- Ensure textures are loaded (check the predefined images or upload your own).
- Verify a predefined effect is selected or a valid config is loaded.
- Check the browser console for errors.

### Changes not reflecting
- Some properties require a full refresh; try switching to another predefined effect and back.
- Export your config and re-import if the state appears stuck.

### Port 3000 already in use
- Run on a different port: `npm run dev -- -p 3001`

### Build errors
- Run `npm install` again.
- Ensure Node.js v18+ is installed: `node -v`

---

## 🤝 Contributing

Contributions and bug reports are welcome on the [GitHub repository](https://github.com/lukasz-okuniewicz/custom-pixi-particles-editor).

---

## 📄 License

See the [LICENSE](LICENSE) file for details.

---

## 🔗 Related

- [custom-pixi-particles](https://github.com/lukasz-okuniewicz/custom-pixi-particles) – Particle engine used by this editor
- [Live Editor](https://okuniewicz.eu/) – Run the editor in the browser without installing

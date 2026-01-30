# custom-pixi-particles-editor by [@lukasz-okuniewicz](http://github.com/lukasz-okuniewicz)

**custom-pixi-particles-editor** is a web-based visual editor for creating and customizing particle effects with the [custom-pixi-particles](https://github.com/lukasz-okuniewicz/custom-pixi-particles) engine. Built with **Next.js** and **React**, it lets you design particle systems in real time without writing code.

---

## ✨ Features

- **Visual editor** – Configure emitters, behaviours, and effects through the UI
- **Real-time preview** – Changes apply instantly on the canvas
- **Full engine support** – All particle behaviours, emission types, and special effects (Shatter, Dissolve, Ghost, Glitch, Melt, Magnetic Assembly)
- **Export / import** – Save and load emitter configurations as JSON
- **Live demo** – [Try the editor online](https://okuniewicz.eu/)

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
3. Use the sidebar to configure emitters, behaviours (Life, Position, Spawn, Size, Color, etc.), and special effects.
4. Preview updates in real time on the canvas.
5. Export or load emitter configs as JSON (Load & Save section).

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

## 🤝 Contributing

Contributions and bug reports are welcome on the [GitHub repository](https://github.com/lukasz-okuniewicz/custom-pixi-particles-editor).

---

## 📄 License

MIT – see the [LICENSE](LICENSE) file.

---

## 🔗 Related

- [custom-pixi-particles](https://github.com/lukasz-okuniewicz/custom-pixi-particles) – Particle engine used by this editor
- [Live Editor](https://okuniewicz.eu/) – Run the editor in the browser without installing

# Cristy Motion Lab

**Interactive SVG Handwriting & Creative Coding Experiments**

A collection of interactive motion experiments exploring SVG animation, JavaScript, GSAP, and creative frontend development.

The first experiment features a custom handwritten SVG signature that draws itself onto the screen, complete with a bouncing and squishing *i* dot that transforms into an interactive navigation element.

## Live Demo

*Coming soon — standalone demo deployment planned.*

## Experiments

### Experiment 01 — SVG Handwriting

An animated handwritten signature built using custom SVG artwork and GSAP.

**Features:**
- Custom SVG letterforms and individually controlled drawing paths
- SVG masks that progressively reveal the filled lettering
- Synchronized visible strokes and mask animations
- Sequential handwriting animation with individually timed letters
- Custom *i* dot bounce with squash-and-stretch effects
- Animated *t* cross
- Layered strokes for dimensional lettering

### Experiment 02 — Interactive Dot Navigation

Extends the signature animation by transforming the *i* dot into an interactive element after the handwriting finishes.

**Features:**
- Pulsing mauve interaction indicator
- Clickable SVG element with an enlarged invisible hit area
- Keyboard activation using Enter and Space
- Curved GSAP MotionPath animation
- Dynamically generated mauve and lavender particles
- Particle fade, movement, and automatic cleanup
- Animated destination highlight
- Interaction synchronized with the completed handwriting timeline

The experiment currently demonstrates the dot traveling from the signature to a temporary destination. Integration with the main developer portfolio is planned.

## Technologies

- **HTML5** — Page structure and SVG integration
- **CSS3** — Styling, dimensional effects, and responsive layout
- **JavaScript** — Animation logic and interactive behavior
- **SVG** — Custom vector lettering, paths, masks, and shapes
- **GSAP** — Animation timelines, easing, and transforms
- **GSAP MotionPathPlugin** — Curved motion animation

The project also loads GSAP CustomEase and CustomBounce for experimentation.

## How It Works

The signature uses two coordinated layers:

1. **SVG masks** control when each filled letter becomes visible.
2. **Visible stroke paths** animate alongside the masks to create the handwriting effect.

GSAP timelines coordinate the drawing order, dot bounce, squash-and-stretch animation, and *t* cross.

Once the handwriting completes, the dot becomes interactive. Clicking it creates a separate animated element that follows a curved path toward a destination while generating particles.

This approach preserves the original signature artwork and its animation.

## Project Structure

```text
cristy-svg-lab/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── signature.js
└── README.md
```

## Run Locally

1. Clone this repository.
2. Open the project folder in VS Code.
3. Open `index.html` using the Live Server extension or another local web server.
4. Watch the signature animate, then click the *i* dot after the animation finishes.

GSAP and its plugins are loaded through CDN script tags, so no npm installation is required for the current version.

## Development Notes

This project began as an exploration of recreating natural handwriting with SVG paths and animation.

Challenges included synchronizing mask reveals with visible strokes, controlling the timing of the *t* cross, preventing the *i* dot from appearing prematurely, and refining its landing position and squash animation.

The interactive dot experiment builds on the completed signature without modifying its original animation sequence.

## Future Development

- Integrate interactive dot navigation into the main developer portfolio
- Connect the animation to real project categories
- Expand the Motion Lab with additional creative coding experiments
- Add a live demo and visual documentation

---

**Created by Cristy Parsons**

[Developer Portfolio](https://cristy-parsons.com/)
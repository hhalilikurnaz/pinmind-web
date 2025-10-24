# PinMind — Idea Board Module  
Defines the **interactive chalkboard workspace** where users pin, drag, and erase ideas in real time.

---

## 🎯 Role & Goal  
**Role:** Context Interaction Architect  
**Goal:** Build an interactive, tactile workspace that feels alive — ideas appear as chalk sketches, evolve into IdeaCards, and vanish with smooth erasing motion.  
Focus on **visual, motion, and spatial hierarchy**.  
No backend or data manipulation.

---

## 🪶 1. Core Layout & Hierarchy  
- Board: full-viewport base (`z-index: 0`).  
- IdeaCards: draggable layer (`z-index: 1`).  
- Navbar + Modals: top layer (`z-index: 2`).  
- Board always visible, softly blurred behind overlays.  
- Canvas: fixed, `overflow: hidden`, gradient `#0D0D0D → #1C1C1C`.

---

## ✏️ 2. Chalk Motion System  
```js
chalkWrite = { strokeDasharray: 1500, strokeDashoffset: [1500, 0], transition: { duration: 0.8, ease: "easeOut" }};
chalkErase = { opacity: [1, 0], scale: [1, 0.9], transition: { duration: 0.6, ease: "easeInOut" }};
dustExit = { opacity: [0.8, 0], y: [0, -20], transition: { duration: 0.5, ease: "easeOut" }};

🎬 Triggers:

Pin to Board: chalkWrite → IdeaCard appears

Back to Board: chalkErase + dustExit → restore view

Idea Delete: chalk smudge + dust scatter

🧠 3. Interaction Logic (Frontend Only)

Use react-draggable or react-beautiful-dnd.

Snap to invisible grid (5px tolerance).

Prevent dragging off-canvas.

Hover → lift shadow (rgba(0,0,0,0.2)).

🎨 4. Chalkboard Aesthetic Rules

Background: #0D0D0D → #1C1C1C.

Chalk dust overlay (particle layer).

Chalk lines: rgba(255,255,255,0.85).

Accent: mint #C5E4D0.

Optional sound cue on write (low volume).

💫 5. Visual Continuity

Seamless transition from CommunityFeed → Board.

Navbar stays translucent.

Same rounded card style (border-radius: 1rem).

Add 2–3 slow chalk dust particles always floating.

🧩 6. Flow Integration

FlowWorkspace opens beside ChatBar.

On Flow Mode enter:

Fade dust → opacity 0.2

Dim brightness 85%

Sequential node reveal (zoomInFlow)

On exit → restore full brightness

📱 7. Responsive Behavior

Mobile: vertical stacking instead of dragging.

Simplify chalk animations (fadeInSoft only).

Reduce particle density for performance.

🔗 8. Integration Notes

This is the live workspace layer.
When cinematic Agent transitions finish, control passes here.
Board must retain chalk texture and dust animation.
Transitions from Flow Module or Agent should fade smoothly — no hard cuts.
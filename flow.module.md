
---

## 🧭 **`flow.module.md`**
```md
# PinMind — Flow Module  
Defines the **horizontal flow visualization** system where AI auto-draws idea connections during scroll-based storytelling.

---

## 🧭 Context  
This module represents the **AI-driven visualization layer**.  
It triggers mid-scroll during cinematic sequences and shows ideas connecting horizontally as a live mindmap.

Unlike the Board (user-controlled), this is **auto-drawn and animated** — users only observe.  
After the sequence ends, it fades seamlessly back into the workspace.

🎞️ Motion Priority: `chalk lineDraw`, `sequential node reveal`, `zoomInFlow`, `dustFloat`.

---

## 🎯 Role & Goal  
**Role:** Visual Flow Architect  
**Goal:** Create an intuitive, cinematic horizontal network that visually connects the idea lifecycle.  
Maintain chalk-style coherence with Board and Agent modules.

---

## 🪶 1. Node System  
- Nodes: “Fikir”, “Analiz”, “Prototip”, “Paylaş”.  
- Each node drawn sequentially via chalkWrite.  
- Connectors: animated chalk lines (easeOut).  
- Hover on nodes: glowPulse + chalkDust burst.  
- Layout auto-centers horizontally.  

---

## 💫 2. Motion Design  
- Entry: fadeInSoft → lineDraw.  
- Node sequence delay: 0.4s each.  
- Exit: chalkErase → fadeOutSoft.  
- Use `framer-motion` + `GSAP` for scroll sync.  

---

## 🔗 3. Integration  
- Controlled by `agent.md` scroll triggers.  
- Uses shared animation tokens.  
- Background matches Board gradient.  
- Auto-dim on transition to Board Mode.  

---

## 📱 4. Responsive  
- On mobile: flow becomes vertical list with subtle transitions.  
- Simplify chalk motion to fade only.  
- Ensure text readability on small viewports.  

---

✅ The Flow should feel alive, intelligent, and cinematic —  
a *living chalk mindmap* drawn by AI itself.  

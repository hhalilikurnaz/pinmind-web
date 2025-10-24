# PinMind — Landing Agent Module  
This document defines the cinematic **narrative orchestration layer** for the PinMind landing experience.  
It coordinates all vertical scroll-based transitions, combining storytelling, animation timing, and scene composition.

---

## 📽️ Context  
This agent controls the **cinematic narrative sequence** of the PinMind experience.  
It handles **vertical scroll storytelling**, orchestrating transitions between major scenes:  
Hero → Idea Flow → Prototype → Community → Final CTA.  
Focus on **parallax depth**, **timed fade**, and **chalk-style scene transitions**.

💡 The agent synchronizes vertical narrative timing with the horizontal **Flow Module** and visual **Board Module**, using shared animation tokens.

---

## 🎯 Role & Goal  
**Role:** Context Interaction Architect  
**Goal:** Create a film-like landing flow — ideas unfold as the user scrolls, AI “draws” the story step by step, and each scene flows into the next with chalkboard realism.

---

## 🎬 Scene Sequence  

### 1️⃣ Hero Scene  
- Background: chalkboard texture, light dust motion  
- Text: “Bir fikirle başlar her şey.”  
- Subtitle: “AI, fikirlerini hayata geçirir.”  
- Animations: chalkWrite (title), fadeInSoft (subtitle)  
- Scroll indicator: animated chalk arrow  

### 2️⃣ Idea Flow Scene  
- Transition: parallax upward shift  
- Integrates with Flow Module → draws idea chain  
  `Fikir → Analiz → Prototip → Paylaş`  
- Animations: lineDraw + glowPulse + dustFloat  
- Subtitle: “AI, karmaşık süreçleri sadeleştirir.”  

### 3️⃣ Prototype Scene  
- Downward cinematic pan  
- Chalk outlines morph into mockup cards  
- Labels: “Mobil Uygulama”, “Web Platformu”, “Dashboard”  
- Animations: chalkWrite + fadeInSoft  

### 4️⃣ Community Scene  
- Horizontal transition (pan-right)  
- Text: “Gerçek sorunlara fikir üret.”  
- Subtitle: “Senin çözümün, bir başkasına ilham olabilir.”  
- Elements: pin drop animations, soft chalk sparks  

### 5️⃣ Final CTA Scene  
- Fade to dark chalk background  
- Large handwritten: “Fikrini sabitle, toplulukla paylaş.”  
- CTA Button: “Şimdi Başla” — chalk circle hover effect  
- End Transition: chalkErase → fade to login/register  

---

## ⚙️ Animation Tokens  
chalkWrite, chalkErase, lineDraw, fadeInSoft, glowPulse, dustFloat


---

## 🧠 Integration Notes  
- Syncs with `Flow Module` (horizontal animation layer).  
- Hands control to `Board Module` after final CTA.  
- Maintains chalkboard texture and lighting consistency throughout transitions.  


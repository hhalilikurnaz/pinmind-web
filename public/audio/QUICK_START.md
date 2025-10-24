# Quick Audio File Creation Guide

## Using Freesound.org (Recommended - Free)

### 1. Post-it Tack Sound
Search terms: "paper tack", "post-it stick", "paper hit surface"
- Filter: Duration < 1s, High Quality
- Download as MP3, rename to `postit-tack.mp3`
- Target: Crisp, short paper sound

### 2. Chalk Scribble Sound  
Search terms: "chalk write", "chalkboard scrape", "chalk drawing"
- Filter: Duration 0.5-1.5s
- Download as MP3, rename to `chalk-scribble.mp3`
- Edit: Add fade-out at end (use Audacity - free)

### 3. Whoosh/Confirm Sound
Search terms: "whoosh short", "ui confirm", "success sound", "soft swoosh"
- Filter: Duration < 0.5s, UI category
- Download as MP3, rename to `whoosh-confirm.mp3`
- Target: Light, positive, not aggressive

### 4. Lightbulb Bloom Sound
Search terms: "bloom", "illuminate", "glow pulse", "soft hum"
- Filter: Duration 0.8-1.2s, Ambient category
- Download as MP3, rename to `bloom-pulse.mp3`
- Optional: Layer with low-frequency hum (60-100Hz)

---

## Using AI Sound Generation (Alternative)

### ElevenLabs Sound Effects (elevenlabs.io/sound-effects)
- Prompt: "soft paper tack sound, crisp, short"
- Prompt: "gentle chalk on chalkboard, scribbling"
- Prompt: "light whoosh success confirmation, ui sound"
- Prompt: "soft lightbulb bloom with low hum, illumination"
- Export as MP3, rename accordingly

---

## Using Audacity (Free Editor)

### To Optimize Downloaded Files:
1. Import audio file
2. Effects → Normalize (max amplitude -3dB)
3. Effects → Fade Out (last 10% of clip)
4. File → Export → Export as MP3
5. Quality: 128 kbps (good balance of quality/size)
6. Trim silence at start/end
7. Target file size: 80-200KB

### To Record Your Own:
1. Use phone or laptop mic
2. Record real chalk on chalkboard
3. Record paper hitting surface
4. Import to Audacity
5. Apply noise reduction
6. Normalize and export

---

## Quick Test Commands

### Check file sizes:
```bash
cd public/audio
ls -lh *.mp3
```

### Verify total size:
```bash
cd public/audio
du -sh .
```

Target: Total folder size < 500KB

---

## Placeholder Files (For Testing)

If you can't find sounds yet, use these silent placeholders:

```bash
cd public/audio

# Create 0.3s silent mp3 (postit-tack.mp3)
ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t 0.3 -q:a 9 postit-tack.mp3

# Create 0.8s silent mp3 (chalk-scribble.mp3)  
ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t 0.8 -q:a 9 chalk-scribble.mp3

# Create 0.4s silent mp3 (whoosh-confirm.mp3)
ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t 0.4 -q:a 9 whoosh-confirm.mp3

# Create 1.0s silent mp3 (bloom-pulse.mp3)
ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t 1.0 -q:a 9 bloom-pulse.mp3
```

This allows testing the audio system without actual sounds.

---

## License Compliance

### If using Freesound:
- Check license type (CC0, CC-BY, etc.)
- If CC-BY: Add attribution in `/public/audio/CREDITS.txt`
- Format: "Sound by [author] from Freesound.org"

### If using AI-generated:
- ElevenLabs: Commercial use allowed with paid plan
- Include generation source in credits

---

## Final Checklist

- [ ] All 4 files in `/public/audio/`
- [ ] Files named exactly as specified
- [ ] Total size < 500KB
- [ ] Each file is MP3 format
- [ ] Tested playback in browser
- [ ] Volume levels feel balanced
- [ ] Fade-outs smooth (no pops/clicks)
- [ ] License/credits documented if needed

---

**Pro Tip**: Start with free Freesound downloads. The system works perfectly with placeholder sounds while you refine the perfect audio experience!

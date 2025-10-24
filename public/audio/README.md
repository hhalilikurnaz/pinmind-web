# Audio Assets for PinMind Landing Page

This directory contains lightweight audio effects for the cinematic landing page experience.

## Required Audio Files

Place the following audio files in this directory:

### 1. postit-tack.mp3
- **Purpose**: Soft "tack" sound when sticky note attaches to chalkboard
- **Duration**: ~0.3s
- **Format**: MP3, 100-150KB
- **Volume**: 0.4
- **Character**: Short, crisp paper-on-surface sound

### 2. chalk-scribble.mp3
- **Purpose**: Chalk writing/drawing sound
- **Duration**: ~0.8-1.0s
- **Format**: MP3, 150-200KB
- **Volume**: 0.35
- **Character**: Gentle chalk-on-chalkboard scraping, with fade-out

### 3. whoosh-confirm.mp3
- **Purpose**: Prototype completion confirmation
- **Duration**: ~0.4s
- **Format**: MP3, 80-120KB
- **Volume**: 0.4
- **Character**: Light whoosh or click, signifying success/transformation

### 4. bloom-pulse.mp3
- **Purpose**: Lightbulb illumination moment
- **Duration**: ~1.0s
- **Format**: MP3, 150-200KB
- **Volume**: 0.35
- **Character**: Soft bloom/pulse with optional low-frequency hum

## Total Size Target
Keep all files combined under 500KB for optimal performance.

## Sources for Sound Effects
- **Freesound.org**: Creative Commons audio library
- **Zapsplat.com**: Free sound effects (with attribution)
- **AudioJungle**: Paid high-quality options
- **Custom Recording**: Record real chalk/paper sounds for authenticity

## Implementation Notes
- All sounds are lazy-loaded to prevent blocking page load
- Sounds trigger only when user scrolls (implicit user gesture)
- Default state is muted for better UX compliance
- Each sound plays once per scroll session
- Audio Context is globally managed for performance

## Placeholder Mode
If audio files are missing, the page functions normally without sound.
No errors will be thrown - just console warnings in development.

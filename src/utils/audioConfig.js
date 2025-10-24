// Audio configuration for the landing page
export const audioConfig = {
  postItAttach: {
    path: '/audio/postit-tack.mp3',
    volume: 0.4,
    delay: 200, // 0.2s delay after animation starts
    duration: 300 // ~0.3s
  },
  chalkWriting: {
    path: '/audio/chalk-scribble.mp3',
    volume: 0.35,
    delay: 0,
    duration: 800 // ~0.8s
  },
  prototypeComplete: {
    path: '/audio/whoosh-confirm.mp3',
    volume: 0.4,
    delay: 0,
    duration: 400 // ~0.4s
  },
  lightbulbBloom: {
    path: '/audio/bloom-pulse.mp3',
    volume: 0.35,
    delay: 0,
    duration: 1000 // ~1.0s
  }
};

// Scroll thresholds for audio triggers
export const scrollAudioThresholds = {
  chalkWriting: 0.25,
  prototypeComplete: 0.65,
  lightbulbBloom: 0.9
};

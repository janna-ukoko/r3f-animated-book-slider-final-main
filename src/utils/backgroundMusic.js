const BG_MUSIC_SRC = "/audios/background-music.mp3";
const BG_MUSIC_VOLUME = 0.4; // normal playback volume
const BG_MUSIC_DUCK_VOLUME = 0.1; // lowered volume while narration plays

let bgMusicAudio = null;

const getBgMusicAudio = () => {
  if (!bgMusicAudio) {
    bgMusicAudio = new Audio(BG_MUSIC_SRC);
    bgMusicAudio.loop = true;
    bgMusicAudio.volume = BG_MUSIC_VOLUME;
  }
  return bgMusicAudio;
};

export const playBackgroundMusic = () => {
  const audio = getBgMusicAudio();
  audio.play().catch((err) => {
    // Expected until the user interacts with the page (browser autoplay policy)
    console.warn("Background music blocked until user interacts:", err.message);
  });
};

export const duckBackgroundMusic = () => {
  if (bgMusicAudio) bgMusicAudio.volume = BG_MUSIC_DUCK_VOLUME;
};

export const restoreBackgroundMusic = () => {
  if (bgMusicAudio) bgMusicAudio.volume = BG_MUSIC_VOLUME;
};

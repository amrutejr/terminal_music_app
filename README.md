# 🎵 Terminal Music Player

An interactive, terminal-based music player built with **React** and **Ink**, featuring real-time playback control, custom visual progress bars, interactive playlist views, and audio rendering powered by **mpv**.

---

## 📸 Features

- **Interactive CLI UI**: Built using React and [Ink](https://github.com/vadimdemedes/ink) for styled terminal components.
- **Audio Playback Engine**: Spawns `mpv` background processes communicating via UNIX IPC sockets (`/tmp/mpv-socket`).
- **Interactive Playlist**: Lists `.mp3` tracks found in the `music/` directory with selection indicators.
- **Now Playing View**: Shows active track name, ASCII art, playback status (`PLAYING` / `PAUSED`), and real-time progress bar.
- **Auto-Advancement**: Automatically advances to the next track when the current song completes.
- **Keyboard Shortcuts**:
  - `↑` / `↓` — Previous / Next track
  - `←` / `→` — Seek backward / forward 5 seconds
  - `Space` — Toggle Play / Pause
  - `q` or `Ctrl+C` — Quit application

---

## 🛠️ Prerequisites

Before running the terminal music player, ensure you have the following installed:

1. **Node.js** (v16.x or later)
2. **mpv** CLI media player (required for background audio rendering):
   - **macOS** (via Homebrew):
     ```bash
     brew install mpv
     ```
   - **Linux** (Debian/Ubuntu):
     ```bash
     sudo apt update && sudo apt install mpv
     ```
   - **Windows** (via Scoop or Chocolatey):
     ```cmd
     choco install mpv
     ```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Add Audio Files
Place your `.mp3` audio files into the `music/` directory at the root of the project:
```
ISDProject_Terminal_App/
└── music/
    ├── song1.mp3
    └── song2.mp3
```

### 3. Launch the Player
```bash
npm start
```

---

## ⌨️ Controls & Keybindings

| Key | Action |
| --- | --- |
| `Up Arrow` (`↑`) | Play previous song in playlist |
| `Down Arrow` (`↓`) | Play next song in playlist |
| `Left Arrow` (`←`) | Seek backward 5 seconds |
| `Right Arrow` (`→`) | Seek forward 5 seconds |
| `Space` | Toggle Play / Pause |
| `q` / `Ctrl+C` | Quit the player |

---

## 📁 Project Structure

```
ISDProject_Terminal_App/
├── index.js              # Launcher entry point (invokes tsx on src/index.jsx)
├── package.json          # Dependency specifications and scripts
├── music/                # Local MP3 music library directory
└── src/
    ├── App.jsx           # Main React Ink component & input handler
    ├── index.jsx         # Ink renderer entry point
    ├── components/
    │   ├── Header.jsx        # App title banner
    │   ├── NowPlaying.jsx    # Visual playback card with ASCII art & status
    │   ├── Playlist.jsx      # Interactive list of loaded tracks
    │   └── ProgressBar.jsx   # Custom timeline progress bar
    ├── music/
    │   └── library.js        # File system helper for scanning MP3 files
    └── playback/
        └── player.js         # mpv process management & IPC socket communication
```

---

## 🧠 Tech Stack

- **[React 19](https://react.dev/)**: State management and declarative UI components.
- **[Ink 7](https://github.com/vadimdemedes/ink)**: React renderer for interactive Command Line Interfaces.
- **[tsx](https://github.com/privatenumber/tsx)**: TypeScript & JSX execute runner.
- **[mpv IPC](https://mpv.io/)**: Headless audio engine controlling playback via JSON IPC messages over UNIX sockets.

---

## 📄 License

ISC

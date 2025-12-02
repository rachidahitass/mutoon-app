# 📚 Mutoon App - مكتبة المتون

A modern web application for memorizing and reviewing Islamic texts (متون) with synchronized audio playback.

## ✨ Features

- 🎵 **Audio Synchronization**: Real-time text highlighting synchronized with audio
- 🔁 **A-B Repeat**: Set start and end points to repeat specific sections
- 🌙 **Dark Mode**: Full dark mode support with smooth transitions
- ⚡ **Playback Speed Control**: Adjust speed (0.75x, 1x, 1.25x, 1.5x)
- 📱 **Responsive Design**: Works seamlessly on mobile and desktop
- 🔍 **Search & Filter**: Find texts by title or category
- ♿ **Accessible**: ARIA labels and keyboard-friendly controls

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd mutoon-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
mutoon-app/
├── public/
│   ├── audios/          # Audio files for each matn
│   ├── covers/          # Cover images for library cards
│   └── sync/            # JSON sync files for text-audio alignment
├── src/
│   ├── components/      # Reusable React components
│   ├── context/         # React context (Theme)
│   ├── data/            # Static data (mutoons.json)
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components (Library, Player)
│   ├── App.jsx          # Main app component with routing
│   └── main.jsx         # Entry point
└── package.json
```

## 📖 Usage

### Adding a New Matn

1. Add the audio file to `public/audios/`
2. Create a sync JSON file in `public/sync/` with this format:
```json
[
  {
    "id": 1,
    "text": "النص العربي",
    "start_time": 0.0,
    "end_time": 2.5
  }
]
```
3. Add a cover image to `public/covers/`
4. Update `src/data/mutoons.json`:
```json
{
  "id": "unique-id",
  "title": "اسم المتن",
  "category": "الفئة",
  "audio": "/audios/filename.mp3",
  "sync": "/sync/filename.json",
  "cover": "/covers/filename.jpg"
}
```

### Player Controls

- **Play/Pause**: Click the center button
- **Skip**: Use the rotate buttons to skip ±5 seconds
- **Speed**: Toggle between 0.75x, 1x, 1.25x, 1.5x
- **Repeat**: 
  - Click the green flag to set start point
  - Click the red flag to set end point
  - Audio will loop between these points
- **Seek**: Click on any line to jump to that position

## 🛠️ Built With

- **React 19** - UI framework
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Theme

The app supports light and dark modes. Theme preference is saved in localStorage.

### Fonts

Currently using **Amiri** font for Arabic text. You can change this in `src/index.css`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Islamic scholars for preserving these valuable texts
- The React and Vite communities
- All contributors to this project

---

Made with ❤️ for the Muslim community

# 📚 تطبيق المتون — Mutoon App

منصّة حديثة لحفظ ومراجعة المتون الإسلامية مع مزامنة صوتية وخصائص ذكية للتكرار والتنقل.

[![FreePalestine.Dev](https://freepalestine.dev/badge?t=f&u=0&r=1)](https://freepalestine.dev)
<div align="center">

<!-- ضع الشعار هنا -->

<br/>

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/الترخيص-MIT-green)
![Build](https://img.shields.io/badge/البناء-ناجح-brightgreen)

</div>

---

## ✨ المزايا

أداة مصممة لطالب العلم للاستماع إلى المتون ومراجعتها وحفظها بدقة:

- 🎵 **مزامنة صوتية** — تمييز السطر المتوافق مع الصوت  
- 🔁 **تكرار A–B** — تحديد بداية ونهاية للتكرار  
- 🌙 **الوضع الليلي والفاتح**  
- ⚡ **التحكم في سرعة التشغيل**  
- 📱 **تصميم متجاوب**  
- 🔍 **بحث ذكي حسب العنوان أو الفئة**  
- 🎯 **القفز إلى السطر عند الضغط عليه**  
- ⬆️ **التمرير التلقائي للسطر النشط**  
- 🧭 **تنقّل سلس** بين الصفحات  
- ♿ **متوافق مع معايير الوصول**  

---

## 🚀 البدء

### المتطلبات
- Node.js ≥ 16  
- npm أو yarn  

### التثبيت

```bash
git clone <your-repo-url>
cd mutoon-app
npm install
npm run dev
ثم افتح:
👉 http://localhost:5173
```
### 🏗️ هيكلة المشروع
```
mutoon-app/
├── public/
│   ├── audios/          # ملفات الصوت
│   ├── covers/          # صور الأغلفة
│   └── sync/            # ملفات التوقيت JSON
├── src/
│   ├── components/      # المكوّنات
│   ├── context/         # وضع الثيم
│   ├── data/            # mutoons.json
│   ├── hooks/           # useMatnPlayer
│   ├── pages/           # الصفحات
│   ├── App.jsx          # الراوتر
│   └── main.jsx         # نقطة البدء
└── package.json
```
### 📖 الاستخدام
إضافة متن جديد:
1. ضع ملف الصوت في: public/audios/
2. أنشئ ملف التوقيت في: public/sync/

بصيغة:

```
[
  { "id": 1, "text": "النص العربي", "start_time": 0.0, "end_time": 2.5 }
]
```

3. ضع صورة الغلاف في: public/covers/
4. أضف مدخلاً جديدًا إلى: src/data/mutoons.json


  مثال:
```
{
  "id": "jazariya",
  "title": "متن الجزرية",
  "category": "تجويد",
  "audio": "/audios/jazariya.mp3",
  "sync": "/sync/jazariya.json",
  "cover": "/covers/jazariya.jpg"
}
```
### 🎮 أدوات المشغّل

▶️ تشغيل / إيقاف

⏪ رجوع 5 ثوانٍ

⏩ تقديم 5 ثوانٍ

🎚️ تغيير السرعة

🚩 تكرار A–B

🖱️ القفز لسطر

🔽 التمرير التلقائي

🎨 التخصيص
الثيم

الوضع الداكن والفاتح محفوظ في localStorage.

الخط

الخط الافتراضي: أميري
يمكن تغييره في src/index.css:
```
body { font-family: 'Amiri', serif; }
```
### 🛠️ تم بناؤه باستخدام

* React 19
* Vite
* Tailwind CSS
* React Router
* Lucide Icons

### 📝 الأوامر
```
npm run dev
npm run build
npm run preview
npm run lint
```
### 🤝 المساهمة

مرحب بالمساهمات!
الرجاء الالتزام بهيكلية الملفات الحالية.

### 📄 الترخيص

الترخيص المفتوح MIT License.

### 🙏 الشكر

العلماء الذين حفظوا هذه المتون

مجتمع المصادر المفتوحة

كل من ساهم في هذا المشروع

<div align="center">

صُنع بحب لخدمة أهل القرآن وطلبة العلم ❤️

</div>

### English version

# 📚 Mutoon App — مكتبة المتون

An interactive platform for memorizing and reviewing Islamic texts (متون) with synchronized audio and intelligent playback tools.

<div align="center">

<!-- Add your logo here -->

<br/>

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen)

</div>

---

## ✨ Features

A modern study tool designed for students of knowledge to **listen**, **memorize**, and **review** Islamic texts with precision:

- 🎵 **Audio Synchronization** — Real-time text highlighting  
- 🔁 **A–B Repeat Loop** — Loop any selected range  
- 🌙 **Light/Dark Mode** — Saves preference automatically  
- ⚡ **Speed Control** — 0.75× · 1× · 1.25× · 1.5×  
- 📱 **Responsive UI** — Works on phones and desktop  
- 🔍 **Smart Search** — By title or category  
- 🎯 **Click-to-Seek** — Tap a line to jump in audio  
- ⬆️ **Auto-Scroll** — Always centers active line  
- 🧭 **Smooth Routing** — Library → Player → Back  
- ♿ **Accessible** — Keyboard-friendly + ARIA labels  

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 16  
- npm or yarn  

### Installation

```bash
git clone <your-repo-url>
cd mutoon-app
npm install
npm run dev
```
Open:
👉 http://localhost:5173

## 🏗️ Project Structure
```bash
mutoon-app/
├── public/
│   ├── audios/          # Audio files
│   ├── covers/          # Cover images
│   └── sync/            # Timestamp JSON files
├── src/
│   ├── components/      # UI components (PlayerControls, ThemeToggle, etc.)
│   ├── context/         # Theme (dark/light)
│   ├── data/            # mutoons.json (list of available texts)
│   ├── hooks/           # Custom hooks (useMatnPlayer)
│   ├── pages/           # LibraryPage, PlayerPage
│   ├── App.jsx          # Routes
│   └── main.jsx         # App entry point
└── package.json
```
### 📖 Usage

### 📌 Adding a New Matn
Add an audio file to: public/audios/

1. Add a sync JSON file to: public/sync/

Example sync JSON:
```bash
[
  { "id": 1, "text": "النص العربي", "start_time": 0.0, "end_time": 2.5 }
]
```

2. Add a cover image to: public/covers/


3. Add the new matn to: src/data/mutoons.json

Example:
```bash
{
  "id": "jazariya",
  "title": "متن الجزرية",
  "category": "تجويد",
  "audio": "/audios/jazariya.mp3",
  "sync": "/sync/jazariya.json",
  "cover": "/covers/jazariya.jpg"
}
```
### 🎮 Player Controls

▶️ Play / Pause

⏪ Skip −5 seconds

⏩ Skip +5 seconds

🎚️ Playback Speed

🚩 Repeat A–B

🖱️ Click-to-Seek

🔽 Auto-Scroll

## 🎨 Customization
### Theme

Light/dark theme stored in localStorage.
Controlled via ThemeContext.jsx.

### Fonts

Default font: Amiri
Modify in src/index.css:
```bash
body { font-family: 'Amiri', serif; }
```
### 🛠️ Built With

* React 19
* Vite 5
* Tailwind CSS
* React Router
* Lucide Icons

### 📝 Scripts
```bash
npm run dev
npm run build
npm run preview
npm run lint
```
### 🤝 Contributing

Contributions are welcome!
Please follow the existing file structure when adding new components or texts.

### 📄 License

Licensed under the MIT License.

### 🙏 Acknowledgments

Scholars who preserved these texts

The open-source community

All contributors

<div align="center">

Made with ❤️ for the Muslim community

</div>

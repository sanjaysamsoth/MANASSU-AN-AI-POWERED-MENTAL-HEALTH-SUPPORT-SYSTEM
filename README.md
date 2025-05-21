# 🧠 Manassu – AI-Powered Mental Health Support System

**Manassu** is an AI-powered mental wellness companion designed to offer private, accessible, and empathetic support for anyone navigating emotional stress or looking to improve their mental well-being. Built with a deep understanding of real-life challenges, Manassu combines conversational AI with practical self-care tools like mood tracking, journaling, guided meditations, and cognitive behavioral therapy (CBT) exercises. Whether you're dealing with anxiety, burnout, or simply need a safe space to reflect, Manassu is there 24/7—providing thoughtful conversations, personalized insights, and a supportive digital environment where users can take care of their mental health on their own terms, without fear of judgment.

---

## 📋 Features

- 🏠 **Homepage** – Central hub with an overview of all features.
- 📔 **Mood Journal** – Track daily emotions and reflect with visualization tools.
- 💬 **Support Circles** – Join virtual peer support groups with moderation and safety features.
- 🧠 **Memory Booster** – Fun, interactive games to improve memory and focus.
- 🎨 **Creative Canvas** – Art-based expression for stress relief and creativity.
- 🧰 **Coping Toolbox** – Curated resources for managing stress, anxiety, and emotional challenges.
- 📚 **CBT Fundamentals** – Learn cognitive-behavioral therapy techniques in simple modules.
- 🎯 **Goal Planner** – Set personal goals and monitor progress over time.
- 📝 **Wellness Quiz** – Take quizzes to assess and understand your mental well-being.
- 📊 **Habit Organizer** – Build and maintain positive habits with visual tracking.
- 🧘 **Mindful Meditation** – Guided meditations and mindfulness exercises for relaxation.
- 🤖 **AI Counselor** – 24/7 AI chatbot powered by GPT-3.5 for emotional support.
- 📋 **Survey** – Participate in short surveys to reflect on your mental well-being and track your progress.
---

## 🛠 Technology Stack

### 🧩 Frontend
- **React** – Frontend JavaScript framework
- **Tailwind CSS** – Utility-first CSS framework
- **Material UI** – Pre-built React UI components
- **Framer Motion** – Smooth animations and transitions
- **Chart.js** – Mood and habit data visualization

### ☁️ Backend / Cloud
- **Firebase Authentication** – Secure user login system
- **Firestore** – Real-time cloud database for user data
- **Firebase Hosting & Functions** – Backend services and deployment

### ⚙️ State Management
- **Redux** – Centralized state management across the app

### 🤖 AI Layer
- **VoiceFlow** – No-code platform for designing conversational AI flows
- **OpenAI GPT-3.5 API** – Natural language processing model powering the AI chatbot

---

## 🧠 System Architecture

```plaintext
React Frontend (UI)
     ↓
VoiceFlow → GPT-3.5 (OpenAI API)
     ↓
Redux (State Management)
     ↓
Firebase (Auth + Firestore + Functions)
     ↓
Chart.js & UI Libraries (Visualization & Interaction)
```

---

## 🚀 How to Run the Project

### 1. Clone the repository:
```bash
git clone https://github.com/sanjaysamsoth/MANASSU-AN-AI-POWERED-MENTAL-HEALTH-SUPPORT-SYSTEM.git

cd MANASSU-AN-AI-POWERED-MENTAL-HEALTH-SUPPORT-SYSTEM
```
### 2. Set up Firebase:
- Create a Firebase project

- Enable Authentication, Firestore, and Hosting

### 3. Add your Firebase configuration to a .env file in the root directory:

```env
REACT_APP_API_KEY=your_key_here
REACT_APP_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_APP_ID=your_app_id
```
### 4. Install dependencies:
```bash
npm install
```
### 5. Start the development server:
```bash
npm start
```

---

## 📄 Project Documents

For a detailed explanation of system design, implementation, and screenshots, please refer to the following documents available in the `/docs` directory:

- [📘 Thesis Report (PDF)](https://github.com/sanjaysamsoth/MANASSU-AN-AI-POWERED-MENTAL-HEALTH-SUPPORT-SYSTEM/blob/f66b066e8990755fee089e7d75d60ae0c2de4cdf/docs/Thesis%20-%20AI%20Powered%20Mental%20Health%20Support%20System.pdf) – Complete research and development report of the project.

- [🎞️ Presentation Slides (PDF)](https://github.com/sanjaysamsoth/MANASSU-AN-AI-POWERED-MENTAL-HEALTH-SUPPORT-SYSTEM/blob/f66b066e8990755fee089e7d75d60ae0c2de4cdf/docs/PPT%20-%20AI%20Powered%20Mental%20Health%20Support%20System.pdf) – Final project presentation used for academic submission.

- [🖼️ Screenshot Documentation (PDF)](https://github.com/sanjaysamsoth/MANASSU-AN-AI-POWERED-MENTAL-HEALTH-SUPPORT-SYSTEM/blob/f66b066e8990755fee089e7d75d60ae0c2de4cdf/docs/Screenshot%20Documentation%20-%20AI%20Powered%20Mental%20Health%20Support%20System.pdf) – Visual walkthrough of app features and UI.

---

🔒 This project was developed for academic purposes. All assets and ideas are original or properly credited.

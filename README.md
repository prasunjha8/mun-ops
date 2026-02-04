# MUN Ops Command System

**A real-time situational awareness and command-and-control system for Model United Nations (MUN) logistics.**

> *Replace chaos with coordination. Track your Organizing Committee (OC) members live, manage incidents instantly, and keep the event running smoothly.*

---



## 🚀 Features

### 👮‍♂️ For Field Operatives (OC Members)
* **Live Status:** Toggle between `🟢 FREE`, `🔴 BUSY`, and `⚫ OFF` with a single tap.
* **Location Beacon:** Instantly update your location (e.g., AIPPM, WTO, IGH) so the Control Room knows where you are.
* **Incident Reporting:** Raise "High Priority" alerts (Medical, Tech, Water) directly to the command center.
* **My Alerts:** Track the status of issues you reported (Open vs. Resolved).

### 🏢 For the Control Room (Secretariat/USG Admin)
* **God Mode Matrix:** A real-time table showing every OC member, their status, location, and last active timestamp.
* **Stale Detection:** Auto-flags members who haven't updated their status in >15 minutes.
* **Live Incident Feed:** A scrolling feed of all active issues, sorted by priority (Critical > High > Low).
* **Instant Resolution:** Mark issues as "Resolved" to clear them from the board and notify the field agent.

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS
* **Backend / Database:** Firebase Firestore (Real-time NoSQL)
* **Deployment:** Vercel

---

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/mun-ops.git](https://github.com/your-username/mun-ops.git)
    cd mun-ops
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Firebase**
    * Create a project at [console.firebase.google.com](https://console.firebase.google.com).
    * Create a **Web App** and copy the configuration keys.
    * Enable **Firestore Database** (Start in Test Mode).
    * Paste your keys into `src/config/firebase.js`.

4.  **Run Locally**
    ```bash
    npm run dev
    ```

---

## Customization 

The system is built to be flexible. You can change committees and issue types without touching the logic.

* **Locations:** Edit `src/constants/locations.js`
    ```javascript
    export const COMMITTEE_LOCATIONS = ["UNSC", "DISEC", "Lok Sabha", ...];
    ```
* **Issue Types:** Edit `src/constants/systemData.js`
    ```javascript
    export const ISSUE_TYPES = [
      { id: 'water', label: 'Water Logistics', priority: 'high' },
      ...
    ];
    ```

---

## Deployment

This project is optimized for **Vercel**.

1.  Push your code to GitHub.
2.  Import the project dashboard on [Vercel](https://vercel.com).
3.  Click **Deploy**.

---

## 🔒 Security Note

This project currently uses a **Simulated Auth** system (Name + Phone) for rapid deployment and ease of use during high-tempo college events. For enterprise use, it is recommended to switch to **Firebase Phone Auth** (OTP) by updating `src/context/AuthContext.jsx`.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

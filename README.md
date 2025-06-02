# Fitness Activity App

A simple fitness goal and activity tracking application built with **React** and **TypeScript**. Users can add, edit, and filter their daily or weekly goals and track their progress using a calendar-based UI.

---

## 📦 Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **React Hook Form**
- **React Query**
- **PrimeReact**
- **Tailwind CSS**
- **Moment.js**

## 1. Install Dependencies

```bash
npm install
```

## 2. Start the Development Server

```bash
npm run start
```

## 🗄️ JSON Server (Mock Backend)

This project uses **JSON Server** as a mock REST API.

To run only backend (if needed):

```bash
npx json-server --watch db.json --port 3001
```

Make sure that `db.json` is located in the project root directory. This file stores your mock data for activities and goals.

---

## Screenshots Desktop

### Full Page Daily Goal

![full page daily goal](./screenshots/full-page-daily-goal.png)

---

### Full Page Weekly Goal

![full page weekly goal](./screenshots/full-page-weekly-goal.png)

---

### Add Activity Dialog

![add activity dialog](./screenshots/add-activity-dialog.png)

---

### Add Activity Dialog

![set goal dialog](./screenshots/set-goal-dialog.png)

---

### Filters

![filters](./screenshots/filters.png)

---

### Filters

![filters](./screenshots/filters.png)

---

### No Activities on Selected Date

![no activities](./screenshots/no-activities-selected-date.png)

---

## Screenshots Mobile

<p align="center">
  <img src="./screenshots/mobile-full-page-daily-goal.png" alt="Full Page Daily Goal" width="45%" />
  <img src="./screenshots/mobile-full-page-weekly-goal.png" alt="Full Page Weekly Goal" width="45%" />
</p>

<p align="center">
  <img src="./screenshots/mobile-add-activity-dialog.png" alt="Add Activity Dialog" width="45%" />
  <img src="./screenshots/mobile-set-goal-dialog.png" alt="Set Goal Dialog" width="45%" />
</p>

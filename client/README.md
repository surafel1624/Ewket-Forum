# Ewket Forum 💡

A sleek, production-grade, full-stack Q&A platform designed specifically for tech professionals and students to share knowledge, debug code, and discuss software architecture. Built with React, this platform offers a pixel-perfect, highly responsive user experience combined with robust state management and security features.

### 🔗 Quick Links
- [Live Demo](https://ewket_forum.netlify.app)
- [Backend Repository](https://github.com/surafel1624/Ewket-Forum/tree/main/server)

---

## ⚡ Tech Stack & Badges

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS__Modules-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MYSQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

---

## ✨ Core Features

* **🔐 Secure Authentication Flow:** End-to-end user onboarding featuring custom Login and Registration interfaces. Includes optimized side-by-side data fields, dynamic error/success validation alerts, and secure client-side JWT token management via Local Storage.
* **🎨 Modern SaaS UI/UX:** A clean, minimalistic aesthetic tailored for developers. It includes an edge-to-edge sticky navigation bar, context-aware brand-colored focus states, and crisp card-based thread layouts.
* **📱 Fluid Responsive Architecture:** 100% mobile-friendly design built from scratch using CSS Flexbox and Grid. Layout components scale dynamically and seamlessly from ultra-wide desktop monitors down to compact mobile displays.
* **🔄 Interactive Q&A Feed:** Seamless browsing experience allowing users to scroll through technical inquiries, dive into dedicated discussion threads, and navigate back effortlessly using intuitive contextual breadcrumbs (e.g., "Back to feed").
* **👤 Dynamic Initials-Based Avatars:** Enhances UI personalization by automatically generating clean, color-coded user badge avatars computed dynamically from the user’s username initials.

---

## 🛠️ Architectural Choices & Performance

To keep the application lightning-fast and maintainable, the following design systems were implemented:

* **CSS Modules (`.module.css`):** Used exclusively for styling to guarantee locally scoped, collision-free CSS rules. This approach prevents global style pollution and makes components truly reusable.
* **Inline SVGs:** Replaced heavy font icon libraries with raw inline SVG icons. This dramatically cuts down HTTP requests, ensures perfect vector rendering at any scale, and optimizes initial page bundle sizes.
* **State & Routing:** Managed via React Router v6 dynamic layouts to prevent unnecessary component re-renders during view transitions.

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
* Node.js (v16 or higher)
* NPM
* Database (MySQL)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/surafel1624/Ewket-Forum.git]
   cd Ewket-Forum
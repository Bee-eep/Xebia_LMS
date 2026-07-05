# Xebia LMS Platform Console

Welcome to the **Xebia LMS** frontend codebase! This repository is built with **React**, **Vite**, **Tailwind CSS v4**, and **React Router v6**. It is structured to support multi-developer workflows, local data persistence, and an easy transition to a live backend.

---

## Quick Start & Onboarding

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) and **npm** installed on your system.

### 2. Dependency Installation
Run the following command in the root folder of the project to install required library packages (including Lucide icons, Framer Motion, and Tailwind engines):
```bash
npm install
```

### 3. Start Local Development Server
Launch the development server:
```bash
npm run dev
```
Once started, the application will be hosted locally at `http://localhost:5173/`. Visiting the page will immediately redirect you to the main console environment.

### 4. Build for Production
To compile and optimize the client-side bundle for production:
```bash
npm run build
```
This builds optimized assets in the `/dist` directory.

---

## Repository Directory Structure

```
Xebia_LMS/
│
├── src/
│   ├── assets/              # Static media assets (logos, background images)
│   │
│   ├── components/
│   │   ├── layout/          # Dashboard frames, Sidebar controls, Navbar headers
│   │   └── ui/              # Reusable widget cards (BorderGlow, CountUp, Logo)
│   │
│   ├── context/             # Global contexts (ThemeContext for light/dark modes)
│   │
│   ├── data/
│   │   └── mockData.js      # Centralized database arrays (Users, Courses, Tutors)
│   │
│   ├── pages/               # Individual feature sub-pages of the dashboard
│   │   ├── Dashboard/       # Dashboard controller, router, and home charts
│   │   ├── Users/           # Users directory, CRUD logic, and bulk deletes
│   │   ├── Tutors/          # Trainers directory and custom forms
│   │   ├── Courses/         # Course catalogs and progress simulator
│   │   ├── Settings/        # Administration profiles and system configs
│   │   ├── Revenue/         # Finance and MRR overview
│   │   ├── Reports/         # System reports and downloads
│   │   └── Analytics/       # Performance charts
│   │
│   ├── services/
│   │   └── api.js           # Network service client (Mock API and Local Storage)
│   │
│   ├── App.jsx              # Main App wrapper containing global route redirects
│   ├── index.css            # Styles, Google Fonts loading, and design theme variables
│   └── main.jsx             # DOM mounting entry point
│
├── DESIGN_SYSTEM.md         # Reference manual for fonts, zinc colors, and spacings
└── README.md                # Onboarding and development instructions (This file)
```

---

## UI Element & File Reference Map

If you want to customize specific layout elements or feature pages, use this quick map to find their source code:

### Layout Elements

| UI Element | What it does | File to Edit |
| :--- | :--- | :--- |
| **Sidebar Links & Sections** | Add, remove, or change sidebar navigation items, section headers, icons, and logo branding labels. Now supports a sleek transition in collapsed mode. | [Sidebar.jsx](src/components/layout/Sidebar.jsx) |
| **Logo Icon & Container** | Change the main branding logo element or its padding. Adapts dynamically to collapsed state using `/XebiaFavicon.png` for a compact icon view. | [Logo.jsx](src/components/ui/Logo.jsx) |
| **Top Navbar & Breadcrumbs** | Modify header search bar, notify bell, profile cards, and path-to-title breadcrumbs categories mapping. | [Navbar.jsx](src/components/layout/Navbar.jsx) |
| **General Page Frame** | Adjust the flex wrapper that controls the grid positioning of Sidebar, Navbar, and `<main>` viewport scroll dimensions. | [DashboardLayout.jsx](src/components/layout/DashboardLayout.jsx) |
| **Active Sub-Routes** | Configure navigation path patterns inside the React Router `<Routes>` module. | [Dashboard.jsx](src/pages/Dashboard/Dashboard.jsx) |
| **Favicon Icon** | Changes the browser tab icon. | [index.html](index.html) & [public/XebiaFavicon.png](public/XebiaFavicon.png) |

### Page Views

| Feature Page | Navigates to | Active Component / File |
| :--- | :--- | :--- |
| **Dashboard Home** | `/dashboard` | [DashboardHome.jsx](src/pages/Dashboard/DashboardHome.jsx) |
| **Organisations Directory**| `/dashboard/organisations` | [OrganisationsPage.jsx](src/pages/Organisations/OrganisationsPage.jsx) |
| **Users Directory** | `/dashboard/users` | [UsersPage.jsx](src/pages/Users/UsersPage.jsx) |
| **Courses Catalog** | `/dashboard/courses` | [CoursesPage.jsx](src/pages/Courses/CoursesPage.jsx) |
| **Trainer Dashboard** | `/dashboard/trainer` | [TutorsPage.jsx](src/pages/Tutors/TutorsPage.jsx) |
| **Finance Center** | `/dashboard/finance` | [RevenuePage.jsx](src/pages/Revenue/RevenuePage.jsx) |
| **Administration Panel** | `/dashboard/administration` | [SettingsPage.jsx](src/pages/Settings/SettingsPage.jsx) |
| **Other modules** | `/dashboard/*` | Displays `BlankPage` component declared in [Dashboard.jsx](src/pages/Dashboard/Dashboard.jsx) |

### Styling, Animations & Glows

| Styling Element | Description | File to Edit |
| :--- | :--- | :--- |
| **Colors, Fonts & Theme** | Declare and override typography, slate/zinc variables, and custom theme variables (light/dark mode colors). | [index.css](src/index.css) |
| **Interactive Glow Card** | Modify the physics, cursor edge-detection, or border gradients of cards. | [BorderGlow.jsx](src/components/ui/BorderGlow.jsx) & [BorderGlow.css](src/components/ui/BorderGlow.css) |
| **Count Up Text** | Controls number format mappings (used for bento grid metrics). | [CountUp.jsx](src/components/ui/CountUp.jsx) |

---

## Architectural Layout & Data Flow (Where most things are)

To help you navigate the codebase quickly, here is how the core architecture is wired up:

### 1. The Component / Page Layout Hierarchy
* **Entry Point (`main.jsx`):** Mounts the App.
* **App Wrapper (`App.jsx`):** Sets up the `ThemeProvider` and the main `BrowserRouter`. It handles initial app-wide fetches (like courses) and redirects root `/` to `/dashboard`.
* **Sub-routes (`Dashboard.jsx`):** Renders the nested router inside the dashboard. It wraps everything inside the `DashboardLayout` component, rendering the appropriate page view based on the URL path.
* **Layout Container (`DashboardLayout.jsx`):** Grid structural frame. It places the `<Sidebar />` on the left (collapsible) and the `<Navbar />` + `<main>` viewport content on the right.

### 2. State & Data Persistence Flow
* **Data Layer (`mockData.js`):** Exports the raw mock data arrays (e.g. `initialUsers`, `initialOrganisations`).
* **API Wrapper Layer (`api.js`):** Simulates database calls. It utilizes a `getStorageItem` helper to write data to the browser's `localStorage` on first load, and loads from `localStorage` on subsequent fetches.
* **Custom Hooks Layer (`src/hooks/`):** React custom hooks (e.g., `useOrganisations.js` at `src/hooks/useOrganisations.js`) wrap the asynchronous calls to `api.js`, managing loading flags and state updates inside the UI.
* **UI Views (`pages/`):** Page components import hooks (or receive props) and consume the state values to render lists, stats, and search filtering.

---

## Key Developer Workflows

### How to Modify Mock Data
All mock datasets are centralized in [src/data/mockData.js](src/data/mockData.js). To add or edit default records, simply append/edit them in:
* `initialUsers` (Users list)
* `initialCourses` (Courses catalog)
* `initialTutors` (Trainer list)
* `initialOrganisations` (Organisations directory)

> [!IMPORTANT]
> **Local Storage Cache Warning:**
> Because the application initializes data inside `localStorage` under keys like `lms_organisations`, **updates to `mockData.js` will not immediately appear** if your browser already has cached data. 
> To see changes, clear your browser cache or run this in the DevTools console:
> ```javascript
> localStorage.clear(); // Or specific keys: localStorage.removeItem('lms_organisations');
> ```
> Then refresh the page.

### How to Integrate a Live Backend (Spring Boot, Node.js, etc.)
The frontend is already configured for asynchronous service calls. All mock API endpoints reside inside [src/services/api.js](src/services/api.js).

To connect to a live REST API:
1. Open [src/services/api.js](src/services/api.js).
2. Replace the local storage mock promises with `fetch` or `axios` calls pointing to your backend endpoint (e.g. `http://localhost:8080/api/organisations`).
3. You **do not** need to change any logic inside page files like `OrganisationsPage.jsx` or `UsersPage.jsx` since they already asynchronously await promises and show progress spinners during fetching!

---

## Theme and Design System

The layout relies on a clean, modern **Zinc & Velvet** styling system.

* **Primary Font**: `Inter` (Sans-serif). Configured globally in [src/index.css](src/index.css).
* **Color Custom Variables**: Mapped inside `:root` (Light Mode) and `.dark` (Dark Mode) classes in [src/index.css](src/index.css). 
* **Design Guidelines**: Refer to [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for full instructions regarding uppercase label letter spacing, heading sizes, and metric dashboard numbers scaling.

---

## Recent Updates

- **Organisations Directory Page Added**:
  - The new view lives at `src/pages/Organisations/OrganisationsPage.jsx`.
  - Built a custom hook `useOrganisations.js` at `src/hooks/useOrganisations.js` to manage data fetching and addition state.
  - Linked to `api.js` endpoints (`getOrganisations` and `addOrganisation`) for CRUD simulation.
- **Improved Collapsed Sidebar UI**:
  - Increased the collapsed sidebar width from 80px (`w-20`) to 96px (`w-24`) for a cleaner look.
  - Updated `Logo` component to automatically switch to the Xebia favicon mark (`/XebiaFavicon.png`) when collapsed, keeping the alignment clean and centered.
  - Logo wrapper and inner logo components now correctly adapt to the dark mode sidebar background (`#11050F`), removing the solid white background boxes.



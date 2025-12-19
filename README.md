# Salla Challenge - Senior Frontend Engineer

A high-performance, scalable E-commerce application built with **Next.js 15**, **TypeScript**, and **Micro-frontend architecture principles**.

## 🚀 Features & Architecture Decisions

### 1. Architecture

- **Next.js 15 App Router:** Utilized for leveraging React Server Components (RSC) for SEO and initial load performance.
- **Route Groups:** Separated `(auth)` and `(main)` layouts to ensure optimized DOM structure for different user flows.
- **Feature-Sliced Design:** Components and hooks are organized by domain (`cart`, `products`, `auth`) rather than generic types.

### 2. State Management (Hybrid Approach)

- **Server State:** Managed via **React Query (TanStack Query)** for caching, background re-fetching, and handling loading/error states gracefully.
- **Client State:** Managed via **Zustand**.
  - **Auth Store:** Syncs with HttpOnly cookies via middleware logic.
  - **Cart Store:** Persisted to `localStorage` using Zustand middleware to preserve user data across sessions (Cart Merging simulation).

### 3. Authentication (Mock Backend)

Instead of relying solely on client-side logic, I implemented a **Secure Mock Backend** using Next.js API Routes:

- **JWT Cookies:** User sessions are encrypted using `jose` and stored in HttpOnly cookies to prevent XSS attacks.
- **Middleware:** Request interception for localization and session validation.
- **Form Validation:** Strict schema validation using **Zod** and **React Hook Form**.

### 4. Performance & UX

- **Image Optimization:** Used `next/image` with remote patterns.
- **Infinite Scroll:** Implemented using `IntersectionObserver` for a seamless feed experience.
- **Debounced Search:** Prevents unnecessary re-renders and API calls during filtering.
- **Optimistic UI:** Cart interactions feel instant due to optimistic state updates.

### 5. Testing

Unit tests implemented using **Vitest** + **React Testing Library**:

- `npm test` runs suites for:
  - Complex Cart Logic (Add/Remove/Total Calculation).
  - Form Validation Rules.
  - Component Rendering.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State:** Zustand + React Query
- **Testing:** Vitest
- **I18n:** next-intl (Arabic/English support)

## 🏃‍♂️ How to Run

1. **Install Dependencies:**
   ```bash
   npm install
   ```

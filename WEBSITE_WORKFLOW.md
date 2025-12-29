# Vikban Groups Website - User Workflow & Journey

## Overview
This document describes the complete user journey and workflow across the Vikban Groups website.

---

## 1. USER ENTRY POINTS

### Primary Entry Point
- **Homepage (index.html)** - Primary landing page
- Direct URL: `https://vikbangroups.com/` or `/index.html`

### Secondary Entry Points
- **About Page** - Company information and team
- **Services Page** - Service offerings and statistics
- **AI Solutions Page** - AI-specific solutions
- **Portfolio Page** - Client work and case studies
- **Contact Page** - Lead generation form

---

## 2. HOMEPAGE WORKFLOW (index.html)

### Step 1: Hero Section
- **User sees:** Welcome banner with company tagline
- **Action:** User reads mission statement
- **Next:** Scroll down to explore

### Step 2: Mission & Vision Section
- **Content:** About-cards with Mission and Vision
- **Icons:** Rocket (Mission), Eye (Vision)
- **User action:** Reads company values

### Step 3: Statistics Section
- **Stats displayed:**
  - 50+ Projects Completed
  - 25+ Happy Clients
  - 5+ Years Experience
  - 15+ Team Members
- **Animation:** Counter animates when scrolling into view
- **Purpose:** Build credibility

### Step 4: Team Preview
- **Shows:** CEO (Sai Charan) and CTO (Vikram)
- **Link:** "See Full Team" button → About page
- **Purpose:** Establish trust with leadership

### Step 5: Global Presence
- **Content:** Office locations
- **Purpose:** Show international reach

---

## 3. SERVICES WORKFLOW (services.html)

### Step 1: Hero Section
- **Message:** "Innovative IT & AI-driven solutions"
- **Purpose:** Set expectations

### Step 2: Services Grid (10 cards)
- **AI & Software Development**
- **Cloud & Automation Services**
- **Mobile Inventory Management Apps**
- **Web Development**
- **ERP Application Development & Support**
- **Enterprise IT Consulting**
- **Legacy Application Support**
- **Certification & Placement Support**
- **Medical Coding & Billing Training**
- **CPC & CCS Certification Training**

### Step 3: Statistics Section
- **Why Choose Us:**
  - 5+ AI & IT Projects Delivered
  - 5+ Global Enterprise Clients
  - 100% CPC Pass Rate in Training
- **White separator line** between section and footer
- **Purpose:** Reinforce credibility

---

## 4. ABOUT PAGE WORKFLOW (about.html)

### Step 1: Hero Section
- Welcome message and company overview

### Step 2: Mission & Vision Cards
- Expanded company mission statement
- Detailed vision for the future

### Step 3: Statistics Section
- Impact metrics
- Same stat counters as homepage

### Step 4: Full Team Grid
- All team members displayed
- Role descriptions
- Team member photos

### Step 5: Offices Section
- Global office locations
- Contact information per office
- International presence

---

## 5. AI SOLUTIONS WORKFLOW (ai-solutions.html)

### Step 1: Hero Section
- Focus on AI capabilities
- Call-to-action for AI services

### Step 2: AI Solutions Grid
- Machine Learning Solutions
- NLP Services
- Computer Vision
- Automation Services
- Predictive Analytics
- AI Consulting

### Step 3: Statistics Section
- AI-specific achievements
- Project count and client satisfaction

---

## 6. PORTFOLIO WORKFLOW (portfolio.html)

### Step 1: Hero Section
- Portfolio introduction

### Step 2: Client Logo Scroller
- **Features:**
  - Auto-scrolling client logos
  - Manual left/right scroll buttons
  - Touch-friendly on mobile
- **Clients showcased:**
  - I Code Health Care Solutions
  - One Code Solutions
  - (Additional clients)

### Step 3: Interactive Elements
- Scroll buttons appear on desktop and tablet
- Logos pause on hover
- Smooth auto-scroll animation

---

## 7. CONTACT WORKFLOW (contact.html)

### Step 1: Contact Form
- **Fields collected:**
  - Name (required)
  - Email (required)
  - Phone (required, formatted)
  - Company (optional)
  - Job Title (optional)
  - Subject (required, dropdown)
  - Budget (conditional, shows based on subject)
  - Timeline (conditional)
  - Message (required)
  - Privacy checkbox (required)

### Step 2: Real-time Validation
- Validation on blur for each field
- Error messages appear inline
- Phone formatting applied automatically

### Step 3: Conditional Field Visibility
- Budget and timeline fields show/hide based on subject selection
- Reduces form complexity

### Step 4: Form Submission
- FormSubmit.co backend integration
- Email sent to: `vikbangroups@gmail.com`
- User sees success confirmation
- Form clears after submission

### Step 5: Chat Widget Integration
- Chat data can prefill contact form
- Chatbot info auto-populates name and phone

---

## 8. CHAT WIDGET WORKFLOW

### Step 1: Chat Initiation
- User clicks chat widget button
- Chat window opens

### Step 2: User Information Collection
- Name input (required)
- Phone input (required)

### Step 3: Chat Conversation
- Real-time messaging
- Support team responses

### Step 4: Chat Closure
- User closes chat
- Chat log automatically emailed via `sendChatToEmail()`
- localStorage prevents duplicate emails

---

## 9. HEADER & NAVIGATION WORKFLOW

### Navigation Structure
```
Header (Fixed)
├── Top Bar
│   ├── Email link: info@vikban.com
│   └── Social Media Links (5 platforms)
├── Main Header
│   ├── Logo + Brand Name
│   ├── Navigation Menu (6 links)
│   │   ├── Home
│   │   ├── About
│   │   ├── Services
│   │   ├── AI Solutions
│   │   ├── Portfolio
│   │   └── Contact
│   ├── Hamburger Menu (Mobile)
│   └── Theme Toggle Button (Light/Dark mode)
```

### Navigation Features
- **Active Link Highlighting:** Current page link highlighted in nav
- **Sticky Header:** Header stays at top on scroll
- **Hamburger Menu:** Appears on mobile (<768px)
- **Scroll Effect:** Header adds "scrolled" class on scroll
- **Theme Toggle:** Dark/Light mode switcher with localStorage persistence

---

## 10. FOOTER WORKFLOW

### Footer Content
- Company copyright information
- Background gradient (matching stats section)
- Consistent across all pages

### Footer Loading
- Dynamically loaded via fetch() from `components/footer.html`
- Ensures consistency on all pages

---

## 11. ANIMATIONS & INTERACTIONS

### Scroll Animations
- **Stats Counter:** Animates when 40% visible
  - Increments from 0 to target value
  - 40 steps, 30ms intervals
  - Preserves suffix (+, %)

### Client Logo Scroller
- **Auto-scroll:** Continuous bouncing animation
- **Manual Controls:** Left/Right buttons
- **Pause on Interaction:** Hover or touch pauses animation
- **Performance:** Uses requestAnimationFrame() for 60fps

### Theme Toggle
- **System Preference Detection:** Respects OS dark mode on first visit
- **localStorage Persistence:** Remembers user choice
- **Smooth Transitions:** 0.3s color transitions

### Hover Effects
- **Cards:** Slight lift animation on hover
- **Buttons:** Color/shadow changes on hover
- **Links:** Underline or opacity change

---

## 12. RESPONSIVE WORKFLOW

### Breakpoints
- **Mobile:** < 768px (hamburger menu, single column layouts)
- **Tablet:** 768px - 1024px (2 column layouts)
- **Desktop:** > 1024px (3+ column layouts)

### Mobile Workflow
- Hamburger menu for navigation
- Single-column layouts for cards and grids
- Touch-friendly buttons (44px minimum height)
- Optimized form for mobile input
- Scroll buttons for client logos (touch-enabled)

---

## 13. CONVERSION POINTS

### Primary CTAs
1. **Contact Form** (contact.html) - Lead generation
2. **Chat Widget** - Immediate support and lead capture
3. **"See Full Team"** button - Builds trust → About page
4. **Service Cards** - Drive to contact for inquiries

### Secondary CTAs
- Social media links (top bar)
- Email link (top bar)
- Navigation to relevant pages

---

## 14. USER SEGMENTS & JOURNEYS

### Journey 1: Decision Maker/Client
```
Homepage → Services → Portfolio → Contact → Conversion
```

### Journey 2: Curious Visitor
```
Homepage → About → Services → Chat Widget → Contact
```

### Journey 3: Career-Focused User
```
Homepage → Services (Certification) → Contact → Apply
```

### Journey 4: AI Enthusiast
```
Homepage → AI Solutions → Portfolio → Contact
```

---

## 15. TECHNICAL WORKFLOW

### Page Load Sequence
1. Browser requests HTML file
2. CSS loads (styles.css)
3. JavaScript loads (theme.js first for instant theme application)
4. DOM Content Loaded event fires
5. Bootstrap() function executes:
   - Load header/footer
   - Initialize header behavior
   - Initialize header scroll effects
   - Initialize stats counter
   - Initialize client scroller (if on portfolio)
6. Service Worker registers for PWA support

### Data Flow
```
User Action
    ↓
JavaScript Event Listener
    ↓
Form Validation / Animation Trigger
    ↓
FormSubmit.co API / DOM Update / localStorage
    ↓
User Feedback (Email / Visual Change)
```

---

## 16. ERROR HANDLING WORKFLOW

### Network Errors
- Footer fetch fails silently (logged to console)
- Chat email sending fails gracefully
- Form submission shows error message

### Validation Errors
- Form fields show inline error messages
- User cannot submit invalid form
- Phone number formatting corrects invalid input

### Browser Compatibility
- Graceful degradation for older browsers
- CSS Grid and Variables fallbacks
- Service Worker only registers if supported

---

## 17. PERFORMANCE WORKFLOW

### Optimization Strategies
1. **Lazy Loading:** Images load on scroll
2. **requestAnimationFrame:** Smooth 60fps animations
3. **IntersectionObserver:** Efficient scroll detection
4. **CSS Variables:** Efficient theme switching
5. **Service Worker:** Offline asset caching

### Performance Checkpoints
- Page Load: < 2 seconds (target)
- Animation Frame Rate: 60fps (target)
- Form Submission: < 3 seconds with email

---

## WORKFLOW SUMMARY

```
┌─────────────────────────────────────────────────────┐
│         VIKBAN GROUPS WEBSITE WORKFLOW              │
├─────────────────────────────────────────────────────┤
│  Entry → Navigation → Explore → Engage → Convert   │
│    ↓         ↓          ↓        ↓         ↓        │
│ Homepage → Services → Portfolio → Chat → Contact  │
│    ↓                                      ↓        │
│  About    ←─────────────────────── Lead Capture   │
│    ↓                                      ↓        │
│   Team    ←─────────── Form Submission ──→ Email  │
└─────────────────────────────────────────────────────┘
```

---

**Document Version:** 1.0
**Last Updated:** December 28, 2025
**Status:** Production-Ready

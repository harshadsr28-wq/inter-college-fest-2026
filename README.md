# Inter-College Fest 2026 - Official Registration Portal

A national-level, responsive, high-performance web registration portal for **Inter-College Fest 2026**, built with **React**, **Vite**, **Tailwind CSS**, and **Lucide React**. The frontend integrates directly with your existing production **n8n automation webhook**.

---

## 🌟 Highlights & Features

- **National Fest Design Theme**: Dark navy and deep purple gradient background (`#080c14`), electric blue & violet accents, glassmorphism cards, and modern typography.
- **Dynamic Multi-Section Form**:
  - **College Details**: College Name and College Code.
  - **Team Details**: Team Name and Squad Size Selector (1 to 5 members).
  - **Captain Details**: Captain Name, Email, and Phone Number (Primary Contact).
  - **Dynamic Participant Fields**: Participant records scale dynamically with member count. Captain is always synchronized as Participant #1.
  - **Event Selection**: Checkbox tracks for **Hackathon** (`CodeQuest 2026`) and **Quiz** (`TechnoQ 2026`), with support for single or multi-event registration.
- **Frontend Validation**:
  - Non-empty field validation.
  - Strict RFC email validation.
  - 10+ digit phone number validation.
  - Squad count vs participant count verification.
  - Inline error feedback and auto-scroll/focus to the first invalid field.
  - Anti-duplicate submission protection (disables submit button and shows loading state).
- **Direct n8n Production Webhook Integration**:
  - Sends the **exact JSON payload** required by n8n.
  - Webhook URL managed securely via `VITE_N8N_WEBHOOK_URL` environment variable.
- **Registration Response Handling**:
  - On Success: Confetti animation, displays generated Registration ID, College Name, Team Name, Registered Events, and confirmation email notification.
  - Action to **Copy Registration ID** to clipboard.
  - Action to **Print / Save Official Registration Slip**.
  - On Failure: Clearly displays the error or duplicate registration message returned by n8n, allowing the user to correct details without losing data.
- **Editable Placeholders**: Uses clean, professional placeholders for dates (`[TBA / November 2026]`), venues (`[Campus Auditorium TBA]`), and committee contacts (`[fest2026@college.edu]`).

---

## 📁 Project Structure

```text
inter-college-fest-project/
├── .env                          # Local environment variables
├── .env.example                  # Environment variable reference template
├── index.html                    # Root HTML document with typography links
├── package.json                  # Dependencies & scripts
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS design system theme
├── vite.config.js                # Vite development and build settings
├── vercel.json                   # Vercel deployment rewrite rules
├── public/
│   └── _redirects                # Netlify SPA redirect rules
└── src/
    ├── App.jsx                   # Main orchestrator (landing vs success state)
    ├── main.jsx                  # React application entry point
    ├── index.css                 # Global Tailwind styles & print CSS
    ├── services/
    │   └── n8nService.js         # Production n8n webhook API service
    └── components/
        ├── Navbar.jsx            # Fixed header with mobile menu
        ├── Hero.jsx              # Hero banner with fest tagline & badges
        ├── About.jsx             # About fest & official schedule placeholders
        ├── Events.jsx            # Hackathon & Quiz event cards
        ├── RegistrationProcess.jsx # 4-step registration guide
        ├── RegistrationForm.jsx  # Multi-section dynamic form with validation
        ├── ParticipantFields.jsx # Dynamic participant fields component
        ├── SuccessScreen.jsx     # Post-submission confirmation pass screen
        └── Footer.jsx            # Fest Organizing Committee footer
```

---

## 🚀 Quick Start (Local Setup)

### Prerequisites
- **Node.js**: v18.0.0 or later (Node 20+ recommended)
- **npm**: v9.0.0 or later

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Verify your `.env` file exists and points to your n8n production webhook:
```bash
# In .env
VITE_N8N_WEBHOOK_URL=https://harshad03.app.n8n.cloud/webhook/fest-registration
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173` to explore the registration portal.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 🔗 n8n Production Webhook Integration

### Webhook Endpoint
- **URL**: `https://harshad03.app.n8n.cloud/webhook/fest-registration`
- **HTTP Method**: `POST`
- **Content-Type**: `application/json`

### Exact JSON Payload Structure
```json
{
  "college_name": "College Name",
  "college_code": "COL01",
  "team_name": "Team Name",
  "captain_name": "Captain Name",
  "captain_email": "captain@gmail.com",
  "member_count": 2,
  "participants": [
    {
      "name": "Captain Name",
      "email": "captain@gmail.com",
      "phone": "9000000001"
    },
    {
      "name": "Participant Name",
      "email": "participant@gmail.com",
      "phone": "9000000002"
    }
  ],
  "events": ["Hackathon", "Quiz"]
}
```

### Expected n8n Response Format
The frontend expects a JSON response containing:
```json
{
  "success": true,
  "message": "Registration successful!",
  "registration_id": "FEST26-89421",
  "college": "College Name",
  "team": "Team Name",
  "events": ["Hackathon", "Quiz"],
  "confirmation_email": true,
  "organizer_notification": true
}
```

---

## 🌐 n8n CORS Configuration Guide

Because the registration form makes browser-based `fetch` requests directly to your n8n Cloud webhook, **Cross-Origin Resource Sharing (CORS)** headers must be allowed by n8n.

### If you encounter a `CORS error` or `Failed to fetch` in the browser console:

1. **Open your n8n workflow editor** on `https://harshad03.app.n8n.cloud`.
2. **Open the "Webhook" node**:
   - Set **HTTP Method** to `POST`.
   - Set **Respond** to `When Last Node Finishes` (or use a `Respond to Webhook` node).
3. **Configure Options**:
   - In the Webhook node, click **Add Option** -> **Allowed Origins (CORS)**.
   - Enter `*` (or your production frontend URL, e.g. `https://your-fest-domain.vercel.app`).
4. **If using a `Respond to Webhook` node**:
   - In the `Respond to Webhook` node options, add **Response Headers**:
     - `Access-Control-Allow-Origin`: `*`
     - `Access-Control-Allow-Methods`: `POST, OPTIONS, GET`
     - `Access-Control-Allow-Headers`: `Content-Type, Authorization`
5. **Ensure the workflow is set to Active (Production)**:
   - Make sure your workflow is toggled to **Active** so the production `/webhook/` URL is listening.

---

## 🚢 Deployment Instructions

### Option 1: Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (or connect your GitHub repository to Vercel Dashboard):
   ```bash
   npm install -g vercel
   ```
2. **Deploy**:
   ```bash
   vercel
   ```
3. **Set Environment Variable in Vercel**:
   - Key: `VITE_N8N_WEBHOOK_URL`
   - Value: `https://harshad03.app.n8n.cloud/webhook/fest-registration`
4. The included `vercel.json` ensures all routes rewrite cleanly to `index.html`.

### Option 2: Deploy to Netlify

1. **Push your code to GitHub / GitLab**.
2. **Import repository on Netlify**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. **Add Environment Variable in Netlify Site Settings**:
   - Key: `VITE_N8N_WEBHOOK_URL`
   - Value: `https://harshad03.app.n8n.cloud/webhook/fest-registration`
4. The included `public/_redirects` ensures seamless Single Page Application routing.

---

## 📜 Fest Organizing Committee Note
All festival dates, campus venues, and committee contacts in this repository use editable placeholders. Modify them in `src/components/About.jsx` and `src/components/Footer.jsx` once official announcements are finalized.


# Rajiv Kumar H N — AI Research & Marketing Portfolio

A professional, cinematic, production-oriented personal portfolio website for **Rajiv Kumar H N**, AI Research & Marketing Specialist.

Designed to impress company recruiters, enterprise clients, and collaborators, this application showcases verified research, Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), technical SEO, AI-driven lead generation, and content architecture.

---

## Key Features

1. **Cinematic 3D Studio Presentation**:
   - Dark luxury studio aesthetic with soft lighting, atmospheric depth, and reflective floor grid.
   - Smooth 3D tilt and parallax depth keyed to mouse position and device movement.
   - Genuine portrait of Rajiv Kumar H N preserving identity and appearance (`/public/assets/aistudio/rajiv-office_17269915.jpg`).
   - Accessible motion toggle respecting `prefers-reduced-motion`.

2. **Verified Professional Portfolio**:
   - Accurately details Nammaweb AI Index Survey and AI research & digital marketing contributions without exaggeration or fabricated claims.
   - Editable Case Study modals breaking down Problem, Approach, Tooling, and Outcomes.
   - Zero-pill metadata design following high-end editorial standards.

3. **Direct Verified Social Connections**:
   - **LinkedIn**: [https://www.linkedin.com/in/rajiv-kumar-h-n-a024683b5/](https://www.linkedin.com/in/rajiv-kumar-h-n-a024683b5/)
   - **YouTube**: [https://www.youtube.com/@Rajiv02-y6s1f](https://www.youtube.com/@Rajiv02-y6s1f)
   - **WhatsApp**: [+91 7676546577](https://wa.me/917676546577?text=Hello%20Rajiv%2C%20I%20viewed%20your%20portfolio%20and%20would%20like%20to%20connect.) with prefilled greeting.
   - **Email**: `rajiv2122004@gmail.com` with one-click copy and feedback toast.

4. **Production Full-Stack Backend**:
   - Node.js & Express server with TypeScript (`server.ts`).
   - Endpoint `POST /api/contact` with rate limiting, input sanitization, length validation, and honeypot anti-spam.
   - Persistent message storage in local structured database (`data/contact_messages.json`) with atomic file writes.
   - **Secure Owner Inquiries Portal**: Accessible only by Rajiv via his secret passkey (`OWNER_SECRET_KEY`) to review and manage incoming contact submissions without exposing public visitor data.
   - Health check endpoint at `GET /api/health`.

5. **Advanced SEO & Semantic Web**:
   - Schema.org `Person` JSON-LD structured data with verified specializations.
   - OpenGraph and Twitter cards configured for social sharing.
   - Sitemaps (`/sitemap.xml`) and search crawler directives (`/robots.txt`).

---

## Quick Start & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Key variables:
- `PORT`: Port to run the server on (default: `3000`).
- `OWNER_SECRET_KEY`: Secret passkey to access the Owner Inquiries Portal (default: `rajiv-access-2026`).

### 3. Run Development Server
```bash
npm run dev
```
The full-stack application will be available at [http://localhost:3000](http://localhost:3000).

### 4. Build for Production
```bash
npm run build
npm start
```

---

## Customizing Content

All portfolio content is structured cleanly in `src/data/portfolioData.ts`:

- **Personal Information**: Update `PERSONAL_INFO` to edit email, phone number, headline, or biography.
- **Projects & Case Studies**: Add or modify items in `PROJECTS` with problem statement, technical approach, and outcomes.
- **Skills & Stack**: Edit `SKILL_CATEGORIES` to adjust proficiency levels, tools, and specializations.
- **Milestones**: Update `TIMELINE` to add new roles or achievements.
- **Credentials & Education**: Customize `EDUCATION_AND_CREDENTIALS` to add formal university degrees or certificates.

---

## Owner Inquiries Portal

To inspect inquiries submitted through the contact form:
1. Click the **"Owner Inquiries Portal"** button located at the bottom of the Contact section (or in the footer).
2. Enter your secret passkey (`OWNER_SECRET_KEY` from your environment, or default `rajiv-access-2026`).
3. View, mark as read, or archive messages in real time.

---

## Deployment Guide

### Deploying to Google Cloud Run (Recommended for Full-Stack)
1. In Google AI Studio or Google Cloud Console, connect this repository.
2. Build container using the standard Node.js Dockerfile or Cloud Native Buildpacks.
3. Configure environment variable `OWNER_SECRET_KEY` in Cloud Run revision settings.
4. Set container port to `3000`.

### Deploying to Vercel / Netlify / Render
- **Render / Railway**: Run `npm run build && npm start`. The Express server will serve both the API endpoints and the frontend build.
- **Static Hosting (e.g. GitHub Pages)**: If hosting statically, deploy the `/dist` directory produced by `npm run build` and route API calls to an external backend.

---

## License

This project is published under the Apache-2.0 License.

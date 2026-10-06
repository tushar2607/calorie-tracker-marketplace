# Complete Deployment Guide for NutriGen

This repository contains pre-configured deployment settings for **Vercel** (Frontend) and **Render / Railway** (Backend).

---

## Step 1: Push Your Code to GitHub

Your repository is already connected to:
`https://github.com/Tushar9124/calorie-tracker-marketplace.git`

Commit and push your latest changes:
```powershell
git add .
git commit -m "Configure production environment and deployment settings"
git push origin main
```

---

## Step 2: Deploy the Backend (Render)

Deploying the backend first gives you your live API URL:

1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** -> **Web Service**.
3. Select your repository `Tushar9124/calorie-tracker-marketplace`.
4. Configure the service settings:
   - **Name**: `calorie-tracker-backend`
   - **Region**: Any (e.g., Singapore or US)
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `MONGO_URI`: `your_mongodb_atlas_uri` *(from server/.env)*
   - `JWT_SECRET`: `your_jwt_secret`
   - `GEMINI_API_KEY`: `your_gemini_api_key`
6. Click **Deploy Web Service**.
7. Once deployed, copy your backend URL (e.g. `https://calorie-tracker-backend.onrender.com`).
   - You can test it by visiting: `https://calorie-tracker-backend.onrender.com/health`

---

## Step 3: Deploy the Frontend (Vercel)

1. Log in to [Vercel](https://vercel.com/new).
2. Click **Import** next to `Tushar9124/calorie-tracker-marketplace`.
3. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click edit and select `client`
4. Expand **Environment Variables** and add:
   - `VITE_API_BASE_URL`: `https://calorie-tracker-backend.onrender.com/api`
   *(Replace with your actual Render backend URL followed by `/api`)*
5. Click **Deploy**.

Vercel will build and launch your live frontend with automatic HTTPS and global CDN.

---

## Alternative: Free Tunneling for Immediate Live Testing

If you want to share the app right now from your machine without creating cloud accounts:
```powershell
# In client terminal:
npx localtunnel --port 5173
```
This gives you an instant temporary public URL to show or test on mobile.

# Complete Deployment Guide for NutriGen

This repository contains pre-configured deployment settings for **Vercel** (Frontend) and **Render / Railway** (Backend).

---

## Step 1: Create GitHub Repository & Push Code

1. Go to [https://github.com/new](https://github.com/new).
2. Repository Name: `calorie-tracker-marketplace`
3. Access: **Public**
4. Click **Create repository** (do NOT add README, .gitignore, or license).
5. Run the following command in VS Code / PowerShell to push all commits:
   ```powershell
   git push -u origin main
   ```

---

## Step 2: Deploy Frontend on Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new).
2. Click **Import** next to `Tushar9124/calorie-tracker-marketplace`.
3. Under **Framework Preset**, choose **Vite**.
4. Set **Root Directory** to `client`.
5. Click **Deploy**.

Vercel will build and deploy your live frontend URL (e.g., `https://calorie-tracker-marketplace.vercel.app`).

---

## Step 3: Deploy Backend on Render / Railway

### Option A: Render (Recommended)
1. Go to [https://dashboard.render.com/select-repo?type=web](https://dashboard.render.com/select-repo?type=web).
2. Select `Tushar9124/calorie-tracker-marketplace`.
3. Configure Service:
   - **Name**: `calorie-tracker-backend`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `MONGO_URI`: `your_mongodb_atlas_uri`
   - `JWT_SECRET`: `your_jwt_secret`
   - `GEMINI_API_KEY`: `your_gemini_api_key`
5. Click **Create Web Service**.

---

### Option B: Railway
1. Go to [https://railway.app/new](https://railway.app/new).
2. Select **Deploy from GitHub repo** -> `Tushar9124/calorie-tracker-marketplace`.
3. Set Root Directory to `/server`.
4. Add Environment Variables (`MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, `PORT=5000`).
5. Click **Deploy**.

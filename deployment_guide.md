# Deployment Guide: Pokédex (Render + Vercel)

This guide provides the step-by-step instructions to deploy your Retro Pokédex.

---

## 1. Backend Deployment (Render)
**Platform**: [render.com](https://render.com)
**Service Type**: Web Service

### Configuration Checklist:
- **Build Command**: `npm install`
- **Start Command**: `npm start` (Ensure your `package.json` had `"start": "node src/index.js"`)
- **Environment Variables**:
  - `PORT`: (Set automatically by Render)
  - `MONGO_URI`: Your MongoDB Atlas connection string.
  - `GEMINI_API_KEY`: Your Google Generative AI key.
  - `NODE_ENV`: Set to `production`.

### CORS Note:
Your current backend uses `app.use(cors())`, which allows **any** frontend to talk to it. This is fine for now. If you want to be more secure later, you can change it in `backend/src/index.js` to:
```javascript
app.use(cors({ origin: 'https://your-pokedex.vercel.app' }));
```

---

## 2. Frontend Deployment (Vercel)
**Platform**: [vercel.com](https://vercel.com)
**Framework**: Vite / React

### Configuration Checklist:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_BACKEND_URL`: The URL Render gives you (e.g., `https://pokedex-backend.onrender.com/api/v1/pokemon`).

> [!IMPORTANT]
> In Vite, all environment variables **must** start with `VITE_` to be accessible in the browser.

---

## 3. Linking them Together
1.  **Deploy Backend first**: Render will give you a URL (e.g., `https://my-api.onrender.com`).
2.  **Add the API URL to Vercel**: When creating the Vercel project, add `VITE_BACKEND_URL` and paste the Render URL (appending `/api/v1/pokemon`).
3.  **Redeploy**: If you change the URL, you may need to trigger a new build on Vercel.

---

## Final Verification
- Check your Render logs to ensure the **DB Warmup** completes successfully.
- Check the browser console if the grid doesn't load; it's usually a mismatch between the `BASE_URL` and the actual Render endpoint.

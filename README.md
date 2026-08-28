# PMLN Shigar — Official Web Portal

Official Web Portal for **PMLN District Shigar Chapter**, led by **Muhammad Tahir Unahar Shigri** (President, PMLN Shigar Gilgit Baltistan).

---

## 🚀 How to Publish on GitHub Pages

This project is pre-configured and 100% compatible with GitHub Pages.

### Option 1: Automatic Deployment via GitHub Actions (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit of PMLN Shigar website"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY_NAME>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub.
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
   - Your site will automatically build and deploy at `https://<YOUR_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/`!

---

### Option 2: Manual 1-Command Deployment via `gh-pages`

1. In `package.json`, ensure your repository is linked or run:
   ```bash
   npm run deploy
   ```
2. In GitHub **Settings** > **Pages**, set **Source** to `Deploy from a branch` and choose the `gh-pages` branch with folder `/ (root)`.

---

## 💻 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build production bundle:**
   ```bash
   npm run build
   ```

4. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 🛠️ Tech Stack & Features

- **React 19 + TypeScript + Vite**
- **Tailwind CSS v4**
- **Lucide Icons**
- **jsPDF + html2canvas** (PDF Membership Card generation & download)
- **Zero-configuration GitHub Pages compatibility** with relative asset resolution (`base: './'`)

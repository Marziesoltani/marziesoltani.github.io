# Marzieh Soltani Portfolio

A static academic portfolio built with HTML, CSS, and JavaScript. It is designed to run without a build step and deploy directly to GitHub Pages.

## Run locally

From this directory, run:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploy to GitHub Pages

1. Create a GitHub repository and push this directory to the `main` branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select `main` and `/ (root)`, then save.

The `.nojekyll` file keeps the site fully static on GitHub Pages.

## Content sources

- Publication list and citation count: Google Scholar profile.
- Research and experience: supplied CV.
- AIMPS screenshot: public dashboard captured from `avianfludashboard.ca`.
- Paper imagery: graphical abstracts and figures from the linked papers.

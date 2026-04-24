# How to Download This Project

## Option 1: Download from GitHub (ZIP)
1. Open the repository page in your browser.
2. Click **Code**.
3. Click **Download ZIP**.
4. Extract the ZIP file.

## Option 2: Clone with Git (recommended)
```bash
git clone <REPO_URL>
cd Carrousel-of-images
```

## Option 3: Download specific files from terminal
From the repo root, create a zip with the HTML assets:
```bash
zip -r carousel-files.zip html/index.html html/styles.css html/script.js html/PLAN.md html/TESTING.md
```

Then move or share `carousel-files.zip`.

## Option 4: Copy files directly from this environment
Current project path:
- `/workspace/Carrousel-of-images`

Files are located in:
- `html/index.html`
- `html/styles.css`
- `html/script.js`
- `html/PLAN.md`
- `html/TESTING.md`

## Troubleshooting: ZIP downloads empty from GitHub
If **Download ZIP** gives you an empty folder, one of these is usually the cause:

1. **Your changes are local only and were not pushed to GitHub yet.**
   - Check local commits:
   ```bash
   git log --oneline -n 5
   ```
   - Push your branch:
   ```bash
   git push -u origin <branch-name>
   ```

2. **You downloaded from the wrong branch in GitHub UI.**
   - In GitHub, use the branch selector (top-left above file list).
   - Switch to the branch that contains your files, then click **Code → Download ZIP** again.

3. **The repository default branch is still empty.**
   - If your files are in another branch, either:
     - open that branch and download ZIP there, or
     - merge your branch into the default branch (`main`/`master`) and retry.

4. **The commit was never created on GitHub (only in local workspace).**
   - Verify remote branch and tracking:
   ```bash
   git branch -vv
   git remote -v
   ```

Quick sanity check from terminal:
```bash
git status --short --branch
git ls-files
```
If `git ls-files` lists files locally but GitHub shows empty, it is almost always a branch/push mismatch.

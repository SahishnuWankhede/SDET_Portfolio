# SDET Portfolio

React + Vite portfolio in white, black and emerald green.

## New laptop setup (Windows)
1. Install Node.js LTS from https://nodejs.org and VS Code from https://code.visualstudio.com.
2. Extract this ZIP to a local folder, e.g. `C:\Projects\sdet-portfolio`.
3. Open the extracted `sdet-portfolio` folder in VS Code.
4. Open Terminal > New Terminal and run `node -v` and `npm -v`.
5. Run `npm install` (internet required).
6. Run `npm run dev`.
7. Open the Local URL printed by Vite (typically http://localhost:5173/).

## Personalize
Edit the `profile`, `skillGroups`, and `projects` objects near the top of `src/App.jsx`.
For a resume button, put a PDF in `public/resume.pdf` and set `resume: '/resume.pdf'` in the profile object.
Only claim skills and completed projects you can demonstrate in interviews.

## Production check
Run `npm run build`; production output is generated in `dist`.

## Troubleshooting
If the screen is blank, open Chrome DevTools > Console and read the first red error. The app deliberately does not import the `Github` or `Linkedin` icon exports that caused issues previously.

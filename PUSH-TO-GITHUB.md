# Push updates to GitHub (one-time setup)

Your project is a git repo linked to **https://github.com/Domichico20/sheets-web-app**.

Local commits are ready; GitHub just needs you to sign in once from the Mac.

## Option A — GitHub Desktop (easiest)

1. Install [GitHub Desktop](https://desktop.github.com/).
2. **File → Add Local Repository** → choose this folder:
   `MacBook Desktop/WebViewOnline Contacts Manager app`
3. Click **Publish branch** or **Push origin**.

## Option B — Terminal with Personal Access Token

1. GitHub → **Settings → Developer settings → Personal access tokens → Tokens (classic)**.
2. Generate a token with **repo** scope.
3. In Terminal:

```bash
cd "/Users/domichico20/Desktop/MacBook Desktop/WebViewOnline Contacts Manager app"
git push -u origin main
```

4. Username: `Domichico20`
5. Password: paste the **token** (not your GitHub password).

## After every change in Cursor

```bash
cd "/Users/domichico20/Desktop/MacBook Desktop/WebViewOnline Contacts Manager app"
git add index.html apps-script/Code.gs
git commit -m "Describe your change"
git push
```

Wait ~1–10 minutes, then hard-refresh the live site (**Cmd+Shift+R**).

## Verify GitHub got the new file

Open: https://raw.githubusercontent.com/Domichico20/sheets-web-app/main/index.html  

Search for `COL_EXPIRATION = 8` — if you see `= 7`, the push did not succeed.

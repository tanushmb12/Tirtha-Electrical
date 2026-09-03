# Tirtha Electrical & Services — Website

A modern, static business website for **Tirtha Electrical & Services**, an electrical contracting and services company based in Jalgaon, Maharashtra, India.

Built with plain **HTML5, CSS3 and vanilla JavaScript** — no frameworks, no build step. It is ready to host on **GitHub Pages**.

```
tirtha-electrical-services/
├── index.html
├── style.css
├── script.js
├── README.md
├── CNAME
└── images/
    ├── favicon.svg
    ├── logo-mark.svg
    ├── hero-panel.svg
    └── circuit-pattern.svg
```

---

## 1. Run it locally

No build tools are required. Pick any one of these options:

**Option A — just open the file**
Double-click `index.html`, or open it in your browser directly.

**Option B — local server (recommended, avoids some browser file-loading restrictions)**

If you have Python installed:
```bash
cd tirtha-electrical-services
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

If you have Node.js installed:
```bash
npx serve .
```

---

## 2. Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in (create a free account if you don't have one).
2. Click **New repository**.
3. Name it, for example, `tirtha-electrical-services`.
4. Set it to **Public** (required for free GitHub Pages).
5. Do **not** initialize with a README (you already have one) — or if you do, you'll merge it later.
6. Click **Create repository**.

---

## 3. Upload the files

**Option A — via the GitHub website**
1. Open your new repository.
2. Click **Add file → Upload files**.
3. Drag in all files and the `images/` folder, keeping the same structure shown above.
4. Click **Commit changes**.

**Option B — via Git (command line)**
```bash
cd tirtha-electrical-services
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/tirtha-electrical-services.git
git push -u origin main
```

---

## 4. Enable GitHub Pages

1. In your repository, go to **Settings → Pages**.
2. Under **Source**, select **Deploy from a branch**.
3. Choose the **main** branch and the **/ (root)** folder.
4. Click **Save**.
5. GitHub will publish your site at:
   `https://YOUR-USERNAME.github.io/tirtha-electrical-services/`
   (this can take a minute or two the first time).

---

## 5. Configure the enquiry email service (Web3Forms)

The enquiry form on this website is built to deliver submissions straight to
**tirthaelectricalservices@gmail.com** using **[Web3Forms](https://web3forms.com)** — a free
service designed for static sites like this one. It works entirely from the
browser, so **no server, password, or private API key is ever stored in this
project.** Only a public "access key" is used, and Web3Forms is specifically
designed for that key to be safe to expose in client-side code.

### Steps to activate email delivery

1. Go to **[web3forms.com](https://web3forms.com)**.
2. Enter the inbox that should receive enquiries:
   **tirthaelectricalservices@gmail.com**
3. Click **Create Access Key**. Web3Forms will email an **Access Key** to that
   inbox — open the email and confirm/verify it.
4. Copy the Access Key.
5. Open `script.js` in this project and find this line near the top of
   section 6:
   ```js
   var WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
   ```
6. Replace `"YOUR_WEB3FORMS_ACCESS_KEY"` with your real access key, e.g.:
   ```js
   var WEB3FORMS_ACCESS_KEY = "a1b2c3d4-5678-90ab-cdef-1234567890ab";
   ```
7. Save the file, commit, and push the change to GitHub (or re-upload
   `script.js`).

That's it — every enquiry submitted on the live website will now arrive at
**tirthaelectricalservices@gmail.com**, with the subject line
`New Website Enquiry - [Customer Name]` and all form fields (name, company,
phone, email, project location, service required, project type, expected
start date, message, and submission date/time).

> **Note:** the access key identifies *which inbox* receives mail — it is not
> a password and does not grant access to your Gmail account. If you ever
> want to stop receiving enquiries through this key, simply generate a new
> one on web3forms.com and update `script.js`.

### Alternatives

If you would prefer a different provider, the same form can be pointed at
**Formspree** or **EmailJS** instead — both also work without exposing
private credentials in a static site. You would replace the `fetch()` call
in `script.js` (section 6) with that provider's client-side submission code,
following their documentation.

---

## 6. Connect a custom domain (tirthaelectricalservices.com)

1. In your repository, go to **Settings → Pages**.
2. Under **Custom domain**, enter:
   ```
   tirthaelectricalservices.com
   ```
3. Click **Save**. GitHub automatically creates/updates the `CNAME` file in
   your repository (this project already includes one).
4. At your domain registrar (wherever `tirthaelectricalservices.com` was
   purchased), open the DNS settings and add:

   **For the root domain (`tirthaelectricalservices.com`) — add A records:**
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

   **For the `www` subdomain — add a CNAME record:**
   ```
   www.tirthaelectricalservices.com  →  YOUR-USERNAME.github.io
   ```

5. If GitHub asks you to verify domain ownership, it will show you a **TXT
   record** to add in your DNS settings. Use the exact value GitHub provides
   at that time — this project does not include a made-up value, since it is
   unique to your GitHub account and generated only when you request it.
6. DNS changes can take anywhere from a few minutes to 24–48 hours to fully
   propagate.

---

## 7. Enable HTTPS

Once your custom domain is verified and DNS has propagated:

1. Go back to **Settings → Pages** in your repository.
2. Check **Enforce HTTPS**.
   (This option only becomes available once GitHub has verified your
   domain and issued a certificate — this can take a little while after
   step 6.)

Your site will then be served securely at:
- `https://tirthaelectricalservices.com`
- `https://www.tirthaelectricalservices.com`

---

## About the content on this site

All company details (name, location, contact person, phone, and email) are
exactly as provided. Where specific facts were not supplied — such as a
street address, years in operation, project counts, certifications, or
client names — this website intentionally uses general, honest descriptions
instead of inventing figures or claims. Update the copy in `index.html`
directly whenever you have real project examples, certifications, or a
verified office address to add.

## Support

For questions about this website, contact:
**Yuvraj Rane** — tirthaelectricalservices@gmail.com — +91 86003 70669

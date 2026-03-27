# Fitness Heaven Gym – Website

Static single-page website for **Fitness Heaven Gym**. It includes:

- Hero section with logo and intro
- About and facilities with photo gallery
- Membership plans and payment process explanation
- Contact information and Google Maps embed placeholder
- QR code section so customers can scan and open the site

## How to open the site

1. Go to this folder: `c:\Users\arjun\OneDrive\Desktop\gym scanner`.
2. Double–click `index.html` and open it in a browser (Chrome/Edge).

## Updating the QR code link

The QR image in `index.html` currently points to:

- `https://fitnessheavengym.com` (placeholder)

To change it:

1. Open `index.html` in Cursor/VS Code.
2. Search for `qrserver.com`.
3. Replace the URL-encoded value after `data=` with your real website URL encoded as a query parameter.

Example (replace `YOUR_URL_HERE` with your actual link, encoded using any online URL encoder):

```html
<img
  id="qr-image"
  src="https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=YOUR_URL_HERE"
  alt="Scan to open Fitness Heaven Gym website"
/>
```

When you print this QR code (right–click → "Save image as…"), scanning it will open your configured website.

## Adding real online payments

The payment form is a **demo only** and the "Pay Now" button is disabled. To accept real payments you can:

- Integrate a gateway like Razorpay/PayU/Stripe/PayPal.
- Or show your UPI ID / UPI QR on the page and ask members to upload/payment screenshot.

Each provider gives you a script snippet or URL to redirect to after form submission. You can hook that into the button click handler in `script.js`.

## Customising content

- **Text** – edit headings, prices, timings, phone, and email in `index.html`.
- **Colours & layout** – edit styles in `styles.css`.
- **Behaviour** – update smooth scroll or add JS in `script.js`.


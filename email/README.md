# Email assets

The next folder level is the sending email address. Each account has a ready-to-use `signature.html`, its approved artwork and a compact preview.

| Sending address | Artwork | Display size |
| --- | --- | --- |
| paul_armstrong698@hotmail.com | footer-v1.png | 288 × 80 px |
| parmstrong698@gmail.com | footer-v1.png | 288 × 80 px |
| paul.armstrong@gembagroup.co.uk | identity-v1.png | 288 × 76 px |

Each signature uses an absolute HTTPS image URL under `https://thekaizenking.github.io/media-assets/email/`. The `@` in an account path is encoded as `%40`. Open the rendered signature in a browser, copy it and paste into the matching account's formatted-signature editor. Mailbird's Edit HTML option can also accept the table markup directly.

## Account settings

- **Outlook.com / Hotmail:** Settings → Account → Signatures. Edit the named personal signature and retain the desired defaults for new messages and replies.
- **Gmail / Google Workspace:** Settings → See all settings → General → Signature. Select the correct sending address, set the new-message/reply defaults and Save Changes.
- **Mailbird Classic:** Menu → Settings → Identities. Edit each sending identity's signature and save. Menu names may differ in other editions.

Use the personal footer for the Hotmail and personal Gmail addresses, and the Gemba footer for the business address. Keep the Gemba email, website and LinkedIn links live. Open an unsent message from each sender to check the saved result and image dimensions. Do not send a test message as part of installation unless separately requested.

Publish and verify the new image URLs before saving them in an account. Some email apps block external images or recolour content in dark mode. Installation and a rendered browser preview do not establish identical received-message appearance in every client.

The legacy `email-signatures` host remains available for existing messages and links. Current account settings should use the new account-specific paths after migration.
